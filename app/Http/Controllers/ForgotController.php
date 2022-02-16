<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetRequest;
use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ForgotController extends Controller
{
    public function forgot(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $email = $request->input('email');

        if (User::where('email', $email)->doesntExist()) {
            return response([
                'message' => 'User doen\'t exists!'
            ], 404);
        }

        try {
            $token = Str::random(10);

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            Mail::send('emails.fargotPassword', ['token' => $token], function (Message $message) use ($email) {
                $message->to($email);
                $message->subject('Reset your password');
            });

            return response([
                'message' => 'success'
            ]);
        } catch (Exception $error) {
            return response(['message' => $error->getMessage()], 400);
        }
    }

    public function reset(ResetRequest $request)
    {
        $token = $request->input('token');

        if (!$passwordResets = DB::table('password_resets')->where('token', $token)->first()) {
            return response([
                'message' => 'Invalid token!'
            ], 400);
        }

        if (!$user = User::where('email', $passwordResets->email)->first()) {
            return response([
                'message' => 'User doesn\'t exists'
            ], 404);
        }

        $user->password = Hash::make($request->input('password'));
        $user->save();
        DB::table('password_resets')->where('token', $token)->delete();

        return response([
            'message' => 'success'
        ]);
    }
}
