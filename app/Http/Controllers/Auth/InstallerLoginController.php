<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class InstallerLoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest:installer')->except('logout');
    }

    public function showLoginForm()
    {
        return view('installer.auth.login');
    }

    /**
     * @throws ValidationException
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        $credentials = ['email' => $request->email, 'password' => $request->password];

        if (Auth::guard('installer')->attempt($credentials)) {
            return redirect()->intended(route('dashboard.installer.index'));
        }

        throw ValidationException::withMessages([
            'email' => [trans('auth.failed')],
        ]);
    }

    public function logout()
    {
        Auth::guard('installer')->logout();
        return redirect('/installer/dashboard');
    }
}
