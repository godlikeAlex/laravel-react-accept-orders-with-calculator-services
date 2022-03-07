<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\Auth\AdminLoginController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\InstallerLoginController;
use App\Http\Controllers\Contacts;
use App\Http\Controllers\InstallerController;
use App\Http\Controllers\InstallerManagmentController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\StuffManagmentController;
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
    // $order = App\Models\Order::first();
    return view('welcome');
})->name('main.page');

// Route::get('/contact', function () {
// return view('contact');
// });

// Route::get('/consulting', function () {
//     return view('ConsultingOrder');
// });

Route::post('/contact', [Contacts::class, 'send']);
Route::post('/consulting', [Contacts::class, 'consulting']);

Route::get('/cart/{path?}', function () {
    return view('cart');
})->where('path', '.*');

Route::get('/cabinet/{path?}', function () {
    return view('app');
})->where('path', '.*');

Route::get('/cabinet/reset/{token}', function () {
    return view('app');
})->name('reset.password');

Route::prefix('admin')->group(function () {
    Route::get('login', [AdminLoginController::class, 'showLoginForm'])->name('admin.login');
    Route::post('login', [AdminLoginController::class, 'login'])->name('admin.login.submit');
    Route::get('logout', [AdminLoginController::class, 'logout'])->name('admin.logout');
    Route::get('dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('users', [AdminController::class, 'getUsers']);
    Route::get('/invoce/print/{order}', [AdminOrderController::class, 'invoicePrint'])->name('invoice.print');
    Route::resource('orders', AdminOrderController::class);
    Route::get('/dashboard/orders/custom/create', [AdminOrderController::class, 'customOrder'])->name('custom.order.create');
    Route::post('/dashboard/orders/custom/create', [AdminOrderController::class, 'storeCustom'])->name('custom.order.store');
    Route::get('/dashboard/orders/custom/edit/{order}', [AdminOrderController::class, 'customEdit'])->name('custom.order.edit');
    Route::post('/dashboard/orders/custom/edit/{order}', [AdminOrderController::class, 'customUpdate']);
    Route::get('/dashboard/users', [AdminController::class, 'indexUsers'])->name('index.users');
    Route::get('/dashboard/users/create', [AdminController::class, 'createCustomerForm'])->name('add.new.customer');
    Route::post('/dashboard/users/create', [AdminController::class, 'createCustomer'])->name('add.new.customer.store');
    Route::get('/dashboard/users/orders/{id}', [AdminController::class, 'userOrders'])->name('user.orders');
    Route::get('/dashboard/users/delete/{id}', [AdminController::class, 'deleteUser'])->name('user.delete');
    Route::post('/dashboard/admin/send-installer/{id}', [AdminController::class, 'sendToInstaller'])->name('sendToInstaller');
    Route::get('/dashboard/orders/urgency', [AdminOrderController::class, 'urgency'])->name('orders.urgency');
    Route::post('/dashboard/orders/refund/{order}', [AdminOrderController::class, 'refunded']);

    Route::get('/installers', [AdminOrderController::class, 'getAllInstallers']);

    Route::get('/dashboard/stuff', [StuffManagmentController::class, 'index'])->name('index.stuff');
    Route::get('/dashboard/stuff/create', [StuffManagmentController::class, 'createAdminForm'])->name('add.new.admin');
    Route::post('/dashboard/stuff/create', [StuffManagmentController::class, 'createAdmin'])->name('add.new.admin.store');
    Route::get('/dashboard/stuff/delete/{id}', [StuffManagmentController::class, 'deleteAdmin'])->name('admin.delete');

    Route::get('/dashboard/installer', [InstallerManagmentController::class, 'index'])->name('index.installer');
    Route::get('/dashboard/installer/create', [InstallerManagmentController::class, 'createInstallerForm'])->name('add.new.installer');
    Route::post('/dashboard/installer/create', [InstallerManagmentController::class, 'createInstaller'])->name('add.new.installer.store');
    Route::get('/dashboard/installer/update/{installer}', [InstallerManagmentController::class, 'editInstaller'])->name('edit.installer');
    Route::post('/dashboard/installer/update/{installer}', [InstallerManagmentController::class, 'updateInstaller'])->name('edit.installer.store');
    Route::get('/dashboard/installer/delete/{id}', [InstallerManagmentController::class, 'deleteInstaller'])->name('installer.delete');
});

Route::prefix('installer/dashboard')->group(function () {
    Route::get('/', [InstallerController::class, 'index'])->name('dashboard.installer.index');
    Route::get('login', [InstallerLoginController::class, 'showLoginForm'])->name('login.installer');
    Route::post('login', [InstallerLoginController::class, 'login'])->name('installer.login.submit');
    Route::get('logout', [InstallerLoginController::class, 'logout'])->name('installer.logout');
    Route::get('/orders', [InstallerController::class, 'ordersIndex'])->name('installer.orders.index');


    Route::get('order/{id}', [InstallerController::class, 'editOrder'])->name('inst.show.order');
    Route::put('/edit/order/{order}', [InstallerController::class, 'updateOrder']);
});

// Route::get('/home', 'HomeController@index')->name('home');

Auth::routes([
    'register' => false, // Registration Routes...
    'login' => false
]);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/home', [LoginController::class, 'userLogout'])->name('user.logout');

Route::get('/terms', function() {
    return view('terms');
})->name('terms');

Route::post('/webhook-stripe', [StripeWebhookController::class, 'handle']);
