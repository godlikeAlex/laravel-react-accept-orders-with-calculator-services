<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function orders(Request $request)
    {
        $user = $request->user();
        $status = $request->query('status');

        if ($status) {
            $orders = $user->orders()->orderBy("date", "DESC")->where('status', $status)->paginate(10);
        } else {
            $orders = $user->orders()->orderBy("date", "DESC")->where('status', '!=', 'completed')->paginate(10);
        }

        return response($orders);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();

        try {
            $order = $user->orders()->where('id', $id)->first();
            if ($order) {
                return response([
                    'ok' => true,
                    'order' => $order
                ]);
            }

            return response([
                'ok' => false,
                'order' => $order
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
