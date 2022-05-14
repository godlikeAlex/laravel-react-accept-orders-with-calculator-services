<?php

namespace App\Http\Controllers\Api\Installer;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateInstallerProfileRequest;
use Illuminate\Http\Request;

class ProfileEditController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:installer');
    }

    public function update(UpdateInstallerProfileRequest $request) {
        $user = auth()->user();

        $data = $request->validated();

        if($request->has('avatar')) {
            $filename = $request->avatar->getClientOriginalName();
            $request->avatar->storeAs('users', $filename, 'public');
            $data = array_merge($request->validated(), ['avatar' => "users/$filename"]);
        }

        $user->update($data);

        return $user;
    }
}
