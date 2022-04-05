<?php

namespace App\Http\Controllers\Api\Installer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordInstallerRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateInstallerProfileRequest;
use Illuminate\Support\Facades\Hash;

class InstallerUserController extends Controller
{
    public function __construct() {
        $this->middleware('auth:installer');
    }

    public function updateView() {
        $user = Auth::user();

        return view('installer.update-profile', compact('user'));
    }

    public function update(UpdateInstallerProfileRequest $request) {
        $user = Auth::user();

        if($request->has('avatar')) {
            $filename = $request->avatar->getClientOriginalName();
            $request->avatar->storeAs('users', $filename, 'public');
            $user->update(['avatar' => "users/$filename"]);
        }

        $user->update($request->validated());

        return $user;
    }

    public function updatePassword(ChangePasswordInstallerRequest $request) {
        $user = Auth::user();

        if (Hash::check($request->input('oldPassword'), $user->password)) {
            $user->update([
                'password' => Hash::make($request->input('newPassword'))
            ]);
            return response(['ok' => true]);
        } else {
            return response(['error' => 'Old password is not correct'], 400);
        }
    }
}
