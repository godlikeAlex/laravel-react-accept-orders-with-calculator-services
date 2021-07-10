@extends('layouts.app-admin')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-12">
        <div class="card">
            <div class="invoice p-3 mb-3">
                <!-- title row -->
                <div class="row">
                    <div class="col-12">
                        <h4>
                            <i class="fas fa-globe"></i> Easy Way Install NYC Inc
                            <small class="float-right">Date: {{date('D M Y', strtotime($order->createdAt))}} ({{date('d-m-Y', strtotime($order->createdAt))}})</small>
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
                        To
                        <address>
                            <strong>{{$order->user->name}}</strong><br>
                            795 Folsom Ave, Suite 600<br>
                            Email: {{$order->user->email}}
                        </address>
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4 invoice-col">
                        <b>Invoice #007612</b><br>
                        <br>
                        <b>Order ID:</b> {{$order->id}}<br>
                        <b>Order UUID:</b> {{$order->uuid}}<br>
                        <b>Account ID:</b> {{$order->user->id}}
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
                                @foreach(json_decode($order->details)->services as $service)
                                <tr>
                                    <td>{{$service->quantity}}</td>
                                    <td>{{$service->currentService->label}}</td>
                                    <td>{{$service->width}} * {{$service->height}}</td>
                                    <td>{{$service->ftHeight->title}}</td>
                                    <td>${{$service->price}}</td>
                                </tr>
                                @endforeach
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

                        <p class="text-muted well well-sm shadow-none" style="margin-top: 10px;">
                            Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem
                            plugg
                            dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                        </p>
                    </div>
                    <!-- /.col -->
                    <div class="col-6">
                        <div class="table-responsive">
                            <table class="table">
                                <tr>
                                    <th style="width:50%">Subtotal:</th>
                                    <td>$250.30</td>
                                </tr>
                                <tr>
                                    <th>Tax (9.3%)</th>
                                    <td>$10.34</td>
                                </tr>
                                <tr>
                                    <th>Shipping:</th>
                                    <td>$5.80</td>
                                </tr>
                                <tr>
                                    <th>Total:</th>
                                    <td>$265.24</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->

                <!-- this row will not appear when printing -->
                <div class="row no-print">
                    <div class="col-12" style="text-align: right;">
                        <a href="invoice-print.html" rel="noopener" target="_blank" class="btn btn-default"><i class="fas fa-print"></i> Print</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection