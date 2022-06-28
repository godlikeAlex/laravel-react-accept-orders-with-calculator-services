<?php

namespace App\Http\Controllers;

use App\Http\Requests\InstallerUpdateRequest;
use App\Models\Installer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class InstallerManagmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('owner');
    }

    public function index()
    {
        $users = Installer::paginate(20);
        return view('admin.installerManagment.index', compact('users'));
    }

    public function createInstallerForm()
    {
        return view('admin.installerManagment.create');
    }

    public function createInstaller(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'password' => 'required',
            'email' => 'required|unique:installers',
        ]);

        Installer::create([
            'name' => $request->input('name'),
            'password' => Hash::make($request->input('password')),
            'email' => $request->input('email'),
        ]);

        return redirect('/admin/dashboard/installer');

    }

    public function editInstaller(Installer $installer)
    {
        return view('admin.installerManagment.edit', compact('installer'));
    }

    public function updateInstaller(InstallerUpdateRequest $request, Installer $installer)
    {
        $validatedData = $request->validated();

        if ($request->has('password')) {
            $validatedData['password'] = Hash::make($request->input('password'));
        }

        $installer->update($validatedData);

        return back();
    }

    public function deleteInstaller($id)
    {
        Installer::where('id', $id)->first()->delete();

        return back();
    }
}
