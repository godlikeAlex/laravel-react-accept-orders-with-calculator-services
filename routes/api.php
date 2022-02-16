<?php

use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\SendRequestController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WishListController;
use App\Http\Controllers\ForgotController;
use App\Models\Order;
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

Route::post('user/update-profile', [UserController::class, 'update']);
Route::post('user/change-password', [UserController::class, 'changePassword']);
Route::get('user/card-wallet', [PaymentController::class, 'cardWallet'])->middleware('auth:api');
Route::get('user/payment-methods', [PaymentController::class, 'listPaymentMethods'])->middleware('auth:api');
Route::post('user/payment-methods/{id}', [PaymentController::class, 'updatePaymentMethod'])->middleware('auth:api');

Route::get('user/payment-methods/delete/{card}', [PaymentController::class, 'deletePaymentMethod'])->middleware('auth:api');
Route::post('order/request', [SendRequestController::class, 'sendRequest']);

Route::get('/page/order', function () {
    $orders = Order::latest()->select('id', 'status', 'uuid', 'amount', 'created_at')->latest()->paginate(1);
    return $orders;
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');
Route::post('/forgot', [ForgotController::class, 'forgot']);
Route::post('/reset', [ForgotController::class, 'reset']);

Route::post('/purchase', [PaymentController::class, 'purchase']);
Route::post('/re-purchase', [PaymentController::class, 'rePurchase'])->middleware('auth:api');

Route::get('/user/orders', [OrderController::class, 'orders'])->middleware('auth:api');
Route::get('/user/orders/{id}', [OrderController::class, 'show'])->middleware('auth:api');

Route::prefix('wish')->group(function () {
    Route::get('list', [WishListController::class, 'list']);
    Route::get('remove/{id}', [WishListController::class, 'remove']);
    Route::post('store', [WishListController::class, 'store'])->middleware('auth:api');
});
