<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StuffManagmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('owner');
    }

    public function index()
    {
        $users = Admin::where('isOwner', 0)->paginate(10);
        return view('admin.stuff.index', compact('users'));
    }

    public function createAdminForm()
    {
        return view('admin.stuff.create');
    }

    public function createAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'password' => 'required',
            'email' => 'required',
        ]);

        Admin::create([
            'name' => $request->input('name'),
            'password' => Hash::make($request->input('password')),
            'email' => $request->input('email'),
        ]);

        return redirect('/admin/dashboard/stuff');
    }

    public function deleteAdmin($id)
    {
        Admin::where('id', $id)->first()->delete();

        return back();
    }
}
