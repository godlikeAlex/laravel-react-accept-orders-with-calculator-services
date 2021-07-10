<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\Auth\AdminLoginController;
use App\Http\Controllers\Auth\LoginController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $order = App\Models\Order::first();
    return view('welcome', compact('order'));
});

Route::get('/cart/{path?}', function () {
    return view('cart');
})->where('path', '.*');

Route::get('/cabinet/{path?}', function () {
    return view('app');
})->where('path', '.*');

Route::get('/cabinets', function () {
    return 'dd';
});

Auth::routes();

Route::prefix('admin')->group(function () {
    Route::get('login', [AdminLoginController::class, 'showLoginForm'])->name('admin.login');
    Route::post('login', [AdminLoginController::class, 'login'])->name('admin.login.submit');
    Route::get('logout', [AdminLoginController::class, 'logout'])->name('admin.logout');
    Route::get('dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('users', [AdminController::class, 'getUsers']);
    Route::resource('orders', AdminOrderController::class);
});

// Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/home', [LoginController::class, 'userLogout'])->name('user.logout');
