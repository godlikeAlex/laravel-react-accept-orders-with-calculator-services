<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Http\Requests\RePaymentRequest;
use App\Mail\OrderCreatedSendToOwner;
use App\Notifications\OrderAccepted;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class PaymentController extends Controller
{
    public function purchase(PaymentRequest $request)
    {
        $user = $request->user('api');

        if (!$user) {
            $user = User::firstOrCreate([
                'email' => $request->input('email')
            ], [
                'name' => $request->input('name'),
                'password' => Hash::make(Str::random(7)),
                'email' => $request->input('email'),
                'name' => $request->input('name'),
                'phone' => $request->input('phone'),
            ]);
        }

        if (!$user->isStripeCustomer()) {
            $user->saveAsCustomer();
        }

        try {
            $calculatedOrder = calculateServicePrice($request->input('cart'));
            $price = round($calculatedOrder->total * 1.0875, 2) * 100;
            $payment = $user->createPayment($price, $request->input('payment_method_id'));
            $order = $user->orders()->create([
                'amount' => $calculatedOrder->total,
                'notes' => $request->input('notes'),
                'address' => $request->input('address'),
                'details' => json_encode($calculatedOrder),
                'status' => 'pending',
                'uuid' => Str::random(8),
                'urgencyInstsllstion' => $calculatedOrder->acceptedServices->urgencyInstsllstion,
                'stripe_payment_id' => $payment->id,
                'transaction_id' => $payment->charges->data[0]->id,
                'date' => Carbon::parse($request->input('date')),
                'email' => $user->email
            ]);

            $order->user->notify((new OrderAccepted($order, $order))->delay(now()->addMinutes(2)));
            $data = [
                'user_name' => $user->name,
                'uuid' => $order->uuid,
                'order_id' => $order->id,
            ];

            if ($request->has('images')) {
                foreach ($request->images as $image) {
                    $filename = Str::random() . '.' . $image->extension();
                    $image->storeAs('orders', $filename, 'public');
                    $images[] = [
                        'path' => "orders/$filename",
                    ];
                }
                $order->placeImages()->createMany($images);
            }

            Mail::to('info@easywayinstall.com')->later(now()->addMinutes(2), new OrderCreatedSendToOwner($data));

            return $order;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function rePurchase(RePaymentRequest $request)
    {
        $user = $request->user();
        $order = $user->orders()->find($request->input('order_id'));
        try {
            $newOrder = $order->replicate();

            // $user->notify((new OrderStatusUpdated(true))->delay(now()->addMinutes(2)));
            $price = round($newOrder->amount * 1.0875, 2) * 100;
            $payment = $user->createPayment($price, $request->input('payment_method_id'));
            $newOrder->status = 'pending';
            $newOrder->uuid = Str::random(8);
            $newOrder->stripe_payment_id = $payment->id;
            $newOrder->transaction_id = $payment->charges->data[0]->id;
            $newOrder->save();
            return $newOrder;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function cardWallet(Request $request)
    {
        $user = $request->user('api');
        return $user->createIntent();
    }

    public function listPaymentMethods(Request $request)
    {
        $user = $request->user();
        if ($user->stripe_id) {
            return $user->listPaymentMethods();
        } else {
            return response(['ok' => false, 'data' => []]);
        }
    }

    public function updatePaymentMethod(Request $request, $id)
    {
        $request->validate([
            'exp_month' => 'required',
            'exp_year' => 'required'
        ]);
        $user = $request->user();

        $user->updatePaymentMethod($id, ['card' => ['exp_month' => $request->input('exp_month'), 'exp_year' => $request->input('exp_year')]]);

        return response(['ok' => true]);
    }

    public function deletePaymentMethod(Request $request, $card)
    {
        $user = $request->user();
        return $user->deletePaymentMethod($card);
    }
}
