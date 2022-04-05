<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function orders(Request $request)
    {
        $user = $request->user();
        $status = $request->query('status');

        if ($status) {
            $orders = $user->orders()->orderBy("date", "DESC")->latest()->where('status', $status)->paginate(10);
        } else {
            $orders = $user->orders()->orderBy("date", "DESC")->latest()->where('status', '!=', 'completed')->paginate(10);
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

    public function getOrderImages(Request $request, Order $order) {
        return $order->images()->get();
    }

    public function updateOrderImages(Request $request, Order $order) {

        if ($request->has('images')) {
            foreach ($request->images as $image) {
                $filename = Str::random() . '.' . $image->extension();
                $image->storeAs('orders', $filename, 'public');
                $images[] = [
                    'path' => "orders/$filename",
                ];
            }

            $this->removeAllImages($order);
            $order->images()->createMany($images);
        } else {
            $this->removeAllImages($order);
        }

        return response(['ok' => true]);
    }

    private function removeAllImages($order) {
        foreach ($order->images()->get() as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $order->images()->delete();
    }
}
