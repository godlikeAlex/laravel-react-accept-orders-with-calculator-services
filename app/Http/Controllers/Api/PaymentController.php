<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Http\Requests\RePaymentRequest;
use App\Notifications\OrderStatusUpdated;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            $calculatedOrder = calculateServicePrice($request->cart);
            $payment = $user->createPayment($calculatedOrder->total * 100, $request->input('payment_method_id'));
            $order = $user->orders()->create([
                'amount' => $calculatedOrder->total,
                'notes' => $request->input('notes'),
                'details' => json_encode($calculatedOrder),
                'status' => 'paid',
                'uuid' => Str::random(8),
                'stripe_payment_id' => $payment->id,
                'transaction_id' => $payment->charges->data[0]->id
            ]);

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

            $payment = $user->createPayment($newOrder->amount * 100, $request->input('payment_method_id'));
            $newOrder->status = 'paid';
            $newOrder->uuid = Str::random(8);
            $newOrder->stripe_payment_id = $payment->id;
            $newOrder->transaction_id = $payment->charges->data[0]->id;
            $newOrder->save();
            return $newOrder;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
