<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendRequest;
use App\Mail\UpdateOrder;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendRequestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function sendRequest(SendRequest $request)
    {
        $order = $request->user()->orders()->where('id', $request->input('order_id'))->first();
        $data = [
            'user_name' => $request->user()->name,
            'uuid' => $order->uuid,
            'custom' => $order->custom,
            'order_id' => $request->input('order_id'),
            'type' => $request->input('type'),
            'message' => $request->input('message'),
            'message' => $request->input('message'),
        ];
        try {
            Mail::to('easywaynyc@gmail.com')->send(new UpdateOrder($data));
            return response(['ok' => true]);
        } catch (\Exception $e) {
            return response(['ok' => false]);
        }
    }
}
