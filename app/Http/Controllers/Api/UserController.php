<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function update(UpdateUserRequest $request)
    {
        $user = $request->user();

        $user->update($request->all());

        if ($request->hasFile('avatar')) {
            $filename = $request->avatar->getClientOriginalName();
            $request->avatar->storeAs('users', $filename, 'public');
            $user->update(['avatar' => "users/$filename"]);
        }

        return response(['ok' => true]);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = $request->user();
        if (Hash::check($request->input('oldPassword'), $user->password)) {
            $user->update([
                'password' => Hash::make($request->input('newPassword'))
            ]);
            return response(['ok' => true]);
        } else {
            return response(['ok' => false]);
        }
    }
}
