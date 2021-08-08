<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
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

    public function userOrders($id)
    {
        $user = User::find($id)->first();
        $orders = $user->orders()->orderBy("date", "DESC")->paginate(25);
        return view('admin.orders.index', compact('orders'));
    }

    public function deleteUser($id)
    {
        User::where('id', $id)->first()->delete();

        return back();
    }
}
