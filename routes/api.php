<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');

Route::post('/purchase', [PaymentController::class, 'purchase']);
Route::post('/re-purchase', [PaymentController::class, 'rePurchase'])->middleware('auth:api');

Route::get('/user/orders', [OrderController::class, 'orders'])->middleware('auth:api');
Route::get('/user/orders/{id}', [OrderController::class, 'show'])->middleware('auth:api');
