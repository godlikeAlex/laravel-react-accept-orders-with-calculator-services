<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\Api\Installer\InstallerUserController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Auth\AdminLoginController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\InstallerLoginController;
use App\Http\Controllers\Contacts;
use App\Http\Controllers\InstallerController;
use App\Http\Controllers\InstallerManagmentController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\StuffManagmentController;
use App\Models\User;
use Carbon\Carbon;
use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use Spatie\GoogleCalendar\Event;

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

    
    Route::get('/update/profile', [InstallerUserController::class, 'updateView'])->name('updateProfileInstaller');
    Route::post('/update/profile/', [InstallerUserController::class, 'update']);
    Route::post('/update/profile/password/change', [InstallerUserController::class, 'updatePassword']);
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

Route::get('test-docusign', function() {
    // return App\Classes\DocuSignClient::sendEmail();
    $order = App\Models\Order::first();
    App\Jobs\ProcessDocuSign::dispatch($order);
    return $order->user->name;
});

Route::get('test-google-calendar', function() {
    $events = Event::get();

    dd($events[1]->location);
});

// Route::get('/test-pdf', function() {
//     $fpdf = new Codedge\Fpdf\Fpdf\Fpdf;
//     $fpdf->AddPage();
//     $fpdf->SetFont('Arial', 'B', 18);
//     $fpdf->Cell(0, 25, 'INSTALLATION COMPLETION FORM', '0', 1, 'C');
//     // FULL WIDTH IS 130

//     $fpdf->SetFont('Arial', 'B', 11);

//     $fpdf->Cell(29, 5, 'Order number:', 0, 0);
//     $fpdf->Cell(160, 5, '#1234567', 'B', 1);

//     // 2

//     $fpdf->cell(0, 5, '', 0, 1); // SPACING LINE

//     $fpdf->Cell(24, 5, 'Install Date:', 0, 0);
//     $fpdf->Cell(165, 5, '#1234567', 'B', 1);

//     $fpdf->cell(0, 5, '', 0, 1); // SPACING LINE

//     $fpdf->Cell(40, 5, 'Installation Address:', 0, 0);
//     $fpdf->Cell(150, 5, '#1234567', 'B', 1);

//     $fpdf->cell(0, 15, '', 0, 1); // SPACING LINE

//     $fpdf->SetY(-120);
//     $fpdf->SetFont('Arial', 'BI', 12);
//     $fpdf->Cell(0, 5, 'By signing below, I certify that the job was done to my satisfaction.', 0, 0, 'C');


//     $fpdf->SetY(-80);

//     $fpdf->SetFont('Arial','B',11);
//     $fpdf->Cell(55,5,'Approved by',0,0);

//     $fpdf->Cell(80,5,'',0,0);

//     $fpdf->Cell(55,5,'Project complete by',0, 1);

//     $fpdf->Cell(55,10,'','B',0);

//     $fpdf->Cell(80,10,'',0,0);

//     $fpdf->Cell(55,10, 'Aleksandr Yurkovsiy','B', 1); // Installer name

//     $fpdf->SetFont('Arial','B',11);
//     $fpdf->Cell(55,10,'(Print name)',0,0, 'C');

//     $fpdf->Cell(80,10,'',0,0);

//     $fpdf->Cell(55,10,'',0,1, 'C');




//     $fpdf->Cell(55,10,'','B',0);

//     // $fpdf->Cell(80,10,'',0,0);

//     $fpdf->Cell(2,10,' ','B',1);

//     $fpdf->SetFont('Arial','B',11);
//     $fpdf->Cell(55,10,'(Sign)',0,0, 'C');

//     $fpdf->Cell(80,10,'',0,0);

//     // $fpdf->Cell(55,10,'(Sign)',0,1, 'C');

//     $fpdf->Output();
//     exit;
// });

Route::get('/test-pdf', function() {
    $order = \App\Models\Order::first();
    $fpdf = new Fpdf();
    $carbon = new Carbon($order->date);

    $fpdf->AddPage();
    $fpdf->SetFont('Arial', 'B', 18);
    $fpdf->Cell(0, 25, 'INSTALLATION COMPLETION FORM', 0, 1, 'C');
    // FULL WIDTH IS 130

    $fpdf->SetFont('Arial', 'B', 11);


    $fpdf->Cell(29, 5, 'Order number:', 0, 0);
    $fpdf->Cell(160, 5, $order->uuid, 'B', 1);

    // 2

    $fpdf->cell(0, 5, '', 0, 1); // SPACING LINE

    $fpdf->Cell(24, 5, 'Install Date:', 0, 0);
    $fpdf->Cell(165, 5, $carbon->toFormattedDateString(), 'B', 1);

    $fpdf->cell(0, 5, '', 0, 1); // SPACING LINE

    $fpdf->Cell(40, 5, 'Installation Address:', 0, 0);
    $fpdf->Cell(150, 5, $order->address, 'B', 1);

    $fpdf->cell(0, 15, '', 0, 1); // SPACING LINE

    $fpdf->SetY(-120);
    $fpdf->SetFont('Arial', 'BI', 12);
    $fpdf->Cell(0, 5, 'By signing below, I certify that the job was done to my satisfaction.', 0, 0, 'C');

    $fpdf->SetY(-80);

    $fpdf->SetFont('Arial','B',11);
    $fpdf->Cell(55,5,'Approved by',0,0);

    $fpdf->Cell(80,5,'',0,0);

    $fpdf->Cell(55,5,'Project complete by',0, 1);

    $fpdf->Cell(55,10,'','B',0);

    $fpdf->Cell(80,10,'',0,0);

    $fpdf->Cell(55,10, $order->installers->first()->name ?? 'Viktor Hnativ','B', 1); // Installer name

    $fpdf->SetFont('Arial','B',11);
    $fpdf->Cell(55,10,'(Print name)',0,0, 'C');

    $fpdf->Cell(80,10,'',0,0);

    $fpdf->Cell(55,10,'',0,1, 'C');




    $fpdf->Cell(55,10,'','B',0);

    // $fpdf->Cell(80,10,'',0,0);

    $fpdf->Cell(2,10,' ','B',1);

    $fpdf->SetFont('Arial','B',11);
    $fpdf->Cell(55,10,'(Sign)',0,0, 'C');

    $fpdf->Cell(80,10,'',0,0);

    // $fpdf->Cell(55,10,'(Sign)',0,1, 'C');

    $fpdf->Output();
    exit;
});


Route::get('/installer-new/{path?}', function () {
    return view('app-installer');
})->where('path', '.*');

Route::get('/orders/images/{order}', [OrderController::class, 'getOrderImages'])->middleware(['auth:admin,installer']);
Route::post('/orders/images/{order}', [OrderController::class, 'updateOrderImages'])->middleware(['auth:admin,installer']);