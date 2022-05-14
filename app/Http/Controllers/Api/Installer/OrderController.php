<?php

namespace App\Http\Controllers\Api\Installer;

use App\Events\OrderUpdated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Installers\EditOrderRequest;
use App\Models\Order;
use App\Notifications\OrderStatusUpdated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:installer');
    }

    public function orders() {
        $user = auth()->user();

        return $user->orders()->select('id', 'uuid', 'status', 'created_at')->get();
    }

    public function updateOrder(EditOrderRequest $request, $orderId)
    {

        $user = auth()->user();
        $order = $user->orders()->find($orderId);
        
        if (!$order) {
            return response(['message' => 'Order Not Found'], 404);
        }
        
        $excludedStatuses = [
            'pending', 'cancled', 'completed', 'done'
        ];

        $data = [
            'status' => $request->status,
        ];

        if ($data['status'] === 'cancled') {
            $data['status'] = $order->status;
            $order->cancelOrder();
        }

        $order->update($data);

        if (!in_array($data['status'], $excludedStatuses) && $order->recive_notifaction) {
            $order->user->notify(new OrderStatusUpdated($order, $data['status'], $request->input('installerCustomNote')));
        }

        event(new OrderUpdated($order));

        return response()->json(['ok' => true]);
    }
}
