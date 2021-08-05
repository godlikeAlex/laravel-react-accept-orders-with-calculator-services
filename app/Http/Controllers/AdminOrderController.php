<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Notifications\OrderStatusUpdated;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->query('status')) {
            $orders = Order::where('status', request()->query('status'))->latest()->select('id', 'status', 'uuid', 'amount', 'created_at')->latest()->paginate(50);
        } else {
            $orders = Order::where('status', '!=', 'finished')->latest()->select('id', 'status', 'uuid', 'amount', 'created_at')->latest()->paginate(50);
        }
        return view('admin.orders.index', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::all();
        return view('admin.orders.create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'nullable',
            'status' => 'nullable',
            'details' => 'required',
        ]);

        try {
            $calculatedServices = calculateServicePrice($request->details);
            $order = new Order();
            $order->user_id = $request->user_id;
            $order->status = $request->status;
            $order->details = json_encode($calculatedServices);
            $order->amount = $calculatedServices->total;
            $order->uuid = Str::random(8);

            $order->save();

            return response()->json(['ok' => true]);
        } catch (Exception $e) {
            return $e;
            return response()->json(['ok' => false]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return view('admin.orders.show', compact('order'));
    }

    public function invoicePrint(Order $order)
    {
        return view('admin.orders.invoice', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        return view('admin.orders.edit', compact('order'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required',
            'details' => 'required',
            'photo' => 'nullable'
        ]);

        $calculatedServices = calculateServicePrice($request->details);

        $data = [
            'status' => $request->status,
            'details' => json_encode($calculatedServices),
            'amount' => $calculatedServices->total
        ];

        if ($request->has('image')) {
            $fileName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('uploads'), $fileName);
            $data['image'] = $fileName;
        }

        $order->update($data);

        $order->user->notify((new OrderStatusUpdated($order))->delay(now()->addMinutes(1)));


        return response()->json(['ok' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully.');
    }
}
