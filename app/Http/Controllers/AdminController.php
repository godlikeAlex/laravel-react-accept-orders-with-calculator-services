<?php

namespace App\Http\Controllers;

use App\Mail\SendInstaller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
        // $this->middleware('auth:owner');
    }

    public function index()
    {
        return view('dashboard');
    }

    public function getUsers()
    {
        return User::all();
    }

    public function indexUsers(Request $request)
    {
        $q = $request->input('query');
        $users = [];
        if ($q) {
            $users = User::where('name', 'like', '%' . $q . '%')
                ->orWhere('email', 'like', '%' . $q . '%')
                ->orWhere('phone', 'like', '%' . $q . '%')->paginate(50);
        } else {
            $users = User::paginate(50);
        }

        return view('admin.users.index', compact('users'));
    }

    public function createCustomerForm()
    {
        return view('admin.users.create');
    }

    public function createCustomer(Request $request)
    {

    $request->validate([
            'name' => 'required',
            'email' => "required|unique:users,email",
            'phone' => 'required|max:15',
            'address' => 'required'
        ]);

        User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'password' => Hash::make(Str::random(7))
        ]);

        return redirect('/admin/dashboard/users');
    }

    public function userOrders($id)
    {
        $user = User::findOrFail($id);
        $orders = $user->orders()->orderBy("date", "DESC")->paginate(25);
        return view('admin.orders.index', compact('orders'));
    }

    public function deleteUser($id)
    {
        User::where('id', $id)->first()->delete();

        return back();
    }

    public function sendToInstaller(Request $request, $id)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
        $order = Order::where('id', $id)->firstOrFail();
        Mail::to($request->input('email'))
            ->later(now()->addMinutes(2), new SendInstaller($order));
        return back();
    }
}
