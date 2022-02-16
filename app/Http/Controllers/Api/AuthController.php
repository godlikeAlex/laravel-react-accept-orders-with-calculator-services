<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                /** @var User user */
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return response([
                    'ok' => true,
                    'token' => $token,
                    'user' => $user
                ]);
            }
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 400);
        }

        return response([
            'ok' => false,
            'error' => 'Invalid email or password.'
        ], 401);
    }

    public function me()
    {
        return Auth::user();
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'password' => Hash::make($request->input('password'))
        ]);

        $user->saveAsCustomer();

        return response([
            'ok' => true,
            'user' => $user,
            'token' => $user->createToken('app')->accessToken
        ]);
    }
}
