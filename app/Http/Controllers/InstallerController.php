<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Notifications\PleaseRateUs;
use Illuminate\Support\Facades\Auth;
use App\Notifications\OrderStatusUpdated;

class InstallerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:installer');
    }

    public function index()
    {
        $orders = Auth::user()->orders()->latest()->where('status', '!=', 'completed')->take(20)->get();
        return view('installer.dashboard', compact('orders'));
    }

    public function ordersIndex(Request $request)
    {
        $q = $request->input('uuid');

        if ($q) {
            $orders =  Auth::user()->orders()->where('uuid', 'like', '%' . $q . '%')->orderBy("date", "DESC")->paginate(50);
        } else {
            if (request()->query('status')) {
                $orders =  Auth::user()->orders()->where('status', request()->query('status'))->orderBy("date", "DESC")->paginate(50);
            } else {
                $orders =  Auth::user()->orders()->where('status', '!=', 'completed')->orderBy("date", "DESC")->paginate(50);
            }
        }

        return view('installer.orders.index', compact('orders'));
    }

    public function editOrder(Request $request, $id)
    {
        $order =  Auth::user()->orders->where('id', $id)->first();

        if (!$order) {
            return redirect()->back();
        }

        return view('installer.update-order', compact('order'));
    }

    public function updateOrder(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required',
            'images' => 'nullable|array',
            'images.*' => 'mimes:jpg,jpeg,png,webp',
        ]);
        $excludedStatuses = [
            'pending', 'cancled', 'paid'
        ];

        $data = [
            'status' => $request->status,
        ];

        if ($data['status'] === 'cancled') {
            $data['status'] = $order->status;
            $order->cancelOrder();
        }

        if ($request->has('images')) {
            foreach ($request->images as $image) {
                $filename = Str::random() . '.' . $image->extension();
                $image->storeAs('orders', $filename, 'public');
                $images[] = [
                    'path' => "orders/$filename",
                ];
            }
            $order->images()->createMany($images);
        }

        $order->update($data);

        if (!in_array($data['status'], $excludedStatuses)) {
            $order->user->notify(new OrderStatusUpdated($order, $data['status']));
        }

        if ($order->status === 'completed') {
            $order->user->notify((new PleaseRateUs($order))->delay(now()->addDay()));
        }

        return response()->json(['ok' => true]);
    }
}
