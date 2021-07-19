<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function orders(Request $request)
    {
        $user = $request->user();

        return response($user->orders()->latest()->paginate(5));
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
