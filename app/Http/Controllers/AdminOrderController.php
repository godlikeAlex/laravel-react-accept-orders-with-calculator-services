<?php

namespace App\Http\Controllers;

use App\Events\OrderUpdated;
use App\Listeners\SendNotificationToOffice;
use App\Models\Installer;
use App\Models\Order;
use App\Models\User;
use App\Notifications\OrderAccepted;
use App\Notifications\OrderStatusUpdated;
use App\Notifications\PleaseRateUs;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Classes\Cart;

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
    public function index(Request $request)
    {

        $q = $request->input('uuid');
        if ($q) {
            $orders = Order::where('uuid', 'like', '%' . $q . '%')->orderBy("date", "DESC")->paginate(50);
        } else {
            if (request()->query('status')) {
                $orders = Order::where('status', request()->query('status'))->orderBy("date", "DESC")->paginate(50);
            } else {
                $orders = Order::where([
                    ['status', '!=', 'completed'],
                    ['status', '!=', 'cancled'],
                    ['status', '!=', 'refunded'],
                ])->orderBy("date", "DESC")->paginate(50);
            }
        }

        return view('admin.orders.index', compact('orders'));
    }

    public function urgency()
    {
        $orders = Order::where('urgencyInstsllstion', true)->orderBy("date", "DESC")->paginate(50);

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
     * Show the form for creating a new custom resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function customOrder()
    {
        return view('admin.orders.custom-create');
    }

    /**
     * Store a newly created custom-resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeCustom(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'status' => 'required',
            'details' => 'required',
            'total' => 'required',
            'date' => 'required',
            'installer_notes' => 'nullable',
            'notes' => 'nullable',
            'installers' => 'nullable',
            'address' => 'nullable',
            'notify' => 'required',
            'images' => 'nullable',
            'images_location' => 'nullable',
        ]);

        $excludedStatuses = [
            'pending', 'cancled', 'paid'
        ];

        try {
            $order = new Order();
            $order->date = Carbon::parse($request->input('date'));
            $order->status = $request->input('status');
            $order->details = $request->input('details');
            $order->amount = $request->input('total');
            $order->user_id = $request->input('user_id');
            $order->notes = $request->input('notes');
            $order->address = $request->input('address');
            $order->custom = true;
            $order->installer_notes = $request->input('installer_notes');
            $order->uuid = Str::random(8);

            $order->save();

            if ($request->has('installers')) {
                $order->installers()->sync(json_decode($request->installers)); // replace relation
            } else {
                $order->installers()->sync([]); // Remov all relation 
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
            

            if ($request->has('images_location')) {
                foreach ($request->images_location as $image) {
                    $filename = Str::random() . '.' . $image->extension();
                    $image->storeAs('orders', $filename, 'public');
                    $imagesLocation[] = [
                        'path' => "orders/$filename",
                    ];
                }
                $order->placeImages()->createMany($imagesLocation);
            }

            $order->user->notify(new OrderAccepted($order, $order));

            if (filter_var($request->input('notify'), FILTER_VALIDATE_BOOLEAN)) {

                if (!in_array($request->input('status'), $excludedStatuses)) {
                    $order->user->notify((new OrderStatusUpdated($order, $request->input('status')))->delay(now()->addMinute()));
                }

                if ($order->status === 'completed') {
                    $order->user->notify((new PleaseRateUs($order))->delay(now()->addDay()));
                }
            }

            return response()->json(['ok' => true]);
        } catch (Exception $e) {
            return $e;
            return response()->json(['ok' => false]);
        }
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
            'date' => 'required',
            'notes' => 'nullable',
            'installer_notes' => 'nullable',
            'installers' => 'nullable|json',
            'address' => 'nullable'
        ]);

        $excludedStatuses = [
            'pending', 'cancled', 'paid'
        ];


        try {
            $calculatedServices = new Cart($request->input('details'));

            $order = new Order();
            $order->date = Carbon::parse($request->input('date'));
            $order->status = $request->status;
            $order->user_id = $request->user_id;
            $order->installer_id = $request->installer_id;
            $order->notes = $request->notes;
            $order->installer_notes = $request->installer_notes;
            $order->address = $request->address;
            $order->details = json_encode([
                'services' => $calculatedServices->services,
                'total' => $calculatedServices->total,
                'additional' => $calculatedServices->additional
            ]);

            $order->urgencyInstsllstion = $calculatedServices->additional->urgencyInstsllstion > 0;
            $order->amount = $calculatedServices->total;
            $order->uuid = Str::random(8);
            $order->email = $order->user->email;

            $order->save();
            
            if ($request->has('installers')) {
                $order->installers()->sync(json_decode($request->installers)); // replace relation
            } else {
                $order->installers()->sync([]); // Remov all relation 
            }

            $order->user->notify(new OrderAccepted($order, $order));

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

            if (!in_array($request->input('status'), $excludedStatuses)) {
                $order->user->notify(new OrderStatusUpdated($order, $request->input('status')));
            }

            if ($order->status === 'completed') {
                $order->user->notify((new PleaseRateUs($order))->delay(now()->addDay()));
            }

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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function customEdit(Order $order)
    {
        return view('admin.orders.custom-edit', compact('order'));
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
            'date' => 'required',
            'images' => 'nullable|array',
            'images.*' => 'mimes:jpg,jpeg,png,webp',
            'notes' => 'nullable',
            'installers' => 'nullable',
            'address' => 'nullable',
            'uuid' => 'required',
            'installer_notes' => 'nullable',
            'notify' => 'nullable'
        ]);
        $excludedStatuses = [
            'pending', 'cancled', 'paid'
        ];

        $calculatedServices = new Cart($request->input('details'));

        $data = [
            'status' => $request->status,
            'details' => json_encode([
                'services' => $calculatedServices->services,
                'total' => $calculatedServices->total,
                'additional' => $calculatedServices->additional
            ]),
            'amount' => $calculatedServices->total,
            'notes' => $request->notes,
            'address' => $request->address,
            'uuid' => $request->uuid,
            'installer_notes' => $request->installer_notes,
            'urgencyInstsllstion' => $calculatedServices->additional->urgencyInstsllstion > 0,
            'date' => Carbon::parse($request->input('date')),
        ];

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

        if ($request->has('installers')) {
            $order->installers()->sync(json_decode($request->installers)); // replace relation
        } else {
            $order->installers()->sync([]); // Remove all relation 
        }

        $order->update($data);

        if (filter_var($request->input('notify'), FILTER_VALIDATE_BOOLEAN)) {
            if (!in_array($data['status'], $excludedStatuses)) {
                $order->user->notify((new OrderStatusUpdated($order, $data['status']))->delay(now()->addMinute()));
            }

            if ($order->status === 'completed') {
                $order->user->notify((new PleaseRateUs($order))->delay(now()->addDay()));
            }
        }

        event(new OrderUpdated($order));

        return response()->json(['ok' => true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function customUpdate(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required',
            'user_id' => 'required',
            'details' => 'required',
            'total' => 'required',
            'date' => 'required',
            'images' => 'nullable|array',
            'images.*' => 'mimes:jpeg,png,jpg,gif,svg',
            'notify' => 'required',
            'installers' => 'nullable',
            'phone' => 'nullable',
            'notes' => 'nullable',
            'address' => 'nullable',
            'uuid' => 'required',
            'installer_notes' => 'nullable',
            'images_location' => 'nullable',
        ]);
        $excludedStatuses = [
            'pending', 'cancled', 'paid'
        ];

        $data = [
            'status' => $request->input('status'),
            'user_id' => $request->input('user_id'),
            'details' => $request->input('details'),
            'amount' => $request->input('total'),
            'date' => Carbon::parse($request->input('date')),
            'installer_id' => $request->input('installer_id'),
            'phone' => $request->input('phone'),
            'notes' => $request->input('notes'),
            'address' => $request->input('address'),
            'uuid' => $request->input('uuid'),
            'installer_notes' => $request->input('installer_notes')
        ];

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

        if ($request->has('images_location')) {
            foreach ($request->images_location as $image) {
                $filename = Str::random() . '.' . $image->extension();
                $image->storeAs('orders', $filename, 'public');
                $imagesLocation[] = [
                    'path' => "orders/$filename",
                ];
            }
            $order->placeImages()->createMany($imagesLocation);
        }

        if ($request->has('installers')) {
            $order->installers()->sync(json_decode($request->installers)); // replace relation
        } else {
            $order->installers()->sync([]); // Remov all relation 
        }

        $order->update($data);

        if (filter_var($request->input('notify'), FILTER_VALIDATE_BOOLEAN)) {
            if (!in_array($data['status'], $excludedStatuses)) {
                $order->user->notify(new OrderStatusUpdated($order, $data['status']));
            }

            if ($order->status === 'completed') {
                $order->user->notify((new PleaseRateUs($order))->delay(now()->addDay()));
            }
        }

        event(new OrderUpdated($order));

        return response()->json(['ok' => true]);
    }

    public function refunded(Order $order)
    {
        if ($order->custom == 1) {
            $order->update([
                'status' => 'refunded'
            ]);
        } else {
            $order->cancelOrder();
        }
        // $order->update(['status' => 'refunded']);
        return ['ok' => true];
    }

    public function getAllInstallers()
    {
        return Installer::all();
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
