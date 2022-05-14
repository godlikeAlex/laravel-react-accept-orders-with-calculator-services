<?php

namespace App\Http\Controllers\Api\Installer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Installers\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthInstallerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:installer', ['except' => ['login']]);
    }

    public function login(LoginRequest $request) {
        try {
            $token = auth('installer')->attempt($request->only('email', 'password'));

            if(!$token) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            return $this->respondWithToken($token);

        } catch (\Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }

        /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('installer')->factory()->getTTL() * 60
        ]);
    }
}
