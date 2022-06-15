<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Easy Way Install | Invoice Print</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/backend/plugins/fontawesome-free/css/all.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="/backend/dist/css/adminlte.min.css">
</head>

<body>
    <div class="wrapper">
        <!-- Main content -->
        <div class="invoice p-3 mb-3">
            <!-- title row -->
            <div class="row">
                <div class="col-12">
                    <h4>
                        <i class="fas fa-globe"></i> Easy Way Install NYC Inc
                        <small class="float-right">Date: {{$order->date->timezone('America/New_York')->format('Y/m/d H:i')}}

                        </small>
                    </h4>
                </div>
                <!-- /.col -->
            </div>
            <!-- info row -->
            <div class="row invoice-info">
                <div class="col-sm-4 invoice-col">
                    From
                    <address>
                        <strong>Easy Way Install NYC Inc.</strong><br>
                        795 Folsom Ave, Suite 600<br>
                        New York, NY<br>
                        Boston, MA<br>
                        Dalas, TX<br>
                        Phone: +12018556345<br>
                        Email: info@easywayinstall.com
                    </address>
                </div>
                <!-- /.col -->
                <div class="col-sm-4 invoice-col">
                    <address>
                        To
                        {{$order->adderss}}<br>
                        <strong>{{$order->customer_name}}</strong><br>
                        @if($order->user)
                        <strong>{{$order->user->name}}</strong><br>
                        @endif
                        Email: {{$order->email}}
                    </address>
                </div>
                <!-- /.col -->
                <div class="col-sm-4 invoice-col">
                    <b>Invoice {{$order->uuid}}</b><br>
                    <b>Order ID:</b> {{$order->id}}<br>
                    <b>Order UUID:</b> {{$order->uuid}}<br>
                    @if($order->user)
                    <b>Account ID:</b> {{$order->user->id}}
                    @endif
                    <br>
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->

            <!-- Table row -->
            <div class="row">
                <div class="col-12 table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Qty</th>
                                <th>Service</th>
                                <th>Width x Height</th>
                                <th>ft Height</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            @if($order->custom)
                            @foreach(json_decode($order->details)->services as $service)
                            <tr>
                                <td> </td>
                                <td>{{$service->name}}</td>
                                <td></td>
                                <td></td>
                                <td>${{$service->price}}</td>
                            </tr>
                            @endforeach
                            @else
                            @foreach(json_decode($order->details)->services as $service)
                            <tr>
                                <td>{{$service->quantity}}</td>
                                <td>{{$service->currentService->label}}</td>
                                <td>{{$service->width}} * {{$service->height}}</td>
                                <td>{{$service->ftHeight->title}}</td>
                                <td>${{$service->price}}</td>
                            </tr>
                            @endforeach
                            @endif
                        </tbody>
                    </table>
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->

            <div class="row">
                <!-- accepted payments column -->
                <div class="col-6">
                    <p class="lead">Payment Methods:</p>
                    <img src="/backend/dist/img/credit/visa.png" alt="Visa">
                    <img src="/backend/dist/img/credit/mastercard.png" alt="Mastercard">
                    <img src="/backend/dist/img/credit/american-express.png" alt="American Express">
                    <img src="/backend/dist/img/credit/paypal2.png" alt="Paypal">
                </div>
                <!-- /.col -->
                <div class="col-6">
                    <div class="table-responsive">
                        <table class="table">
                            <tr>
                                <th>
                                    <h3>Total:</h3>
                                </th>
                                <td>
                                    <h3>${{$order->amount}}</h3>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.content -->
    </div>
    <!-- ./wrapper -->
    <!-- Page specific script -->
    <script>
        window.addEventListener("load", window.print());
    </script>
</body>

</html>