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
                            <small class="float-right">Date: <span id="date" data-date="{{$order->date->toW3cString()}}"></span>
                                <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                                <script>
                                    const date = document.querySelector('#date');
                                    const d = moment(date.dataset['date']).format('lll')
                                    date.innerHTML = d;
                                </script>
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
                        To
                        <address>
                            @if($order->user)
                            <strong>{{$order->user->name}}</strong><br>
                            Address: {{$order->address}}<br>
                            Email: {{$order->email}} <br />
                            Phone: {{$order->user->phone}}
                            @else
                            <strong>{{$order->name}}</strong><br>
                            Address: {{$order->address}}<br>
                            Email: {{$order->email}} <br />
                            @endif

                        </address>
                        Notes: <br />
                        {{$order->notes}}
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4 invoice-col">
                        <b>Invoice #007612</b><br>
                        <br>
                        <b>Order ID:</b> {{$order->id}}<br>
                        <b>Order UUID:</b> {{$order->uuid}}<br>
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
                <b>Place of installation:</b>
                <div class="row">
                    @foreach($order->placeImages as $image)
                    <div class="col-sm-2">
                        <a href="/storage/{{$image->path}}" data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
                            <img src="/storage/{{$image->path}}" style="height:160px; object-fit: cover;" class="img-fluid mb-2" alt="white sample">
                        </a>
                    </div>
                    <!-- <div>
                    <b>{{ $loop->index + 1 }}</b>. <a href="/storage/{{$image->path}}" target="_blank" rel="noopener noreferrer" data-toggle="lightbox" data-title="Gallery" data-gallery="gallery">Photo</a>
                </div> -->
                    @endforeach
                </div>

                <!-- Table row -->
                <div class="row" style="margin-top: 25px">
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

                <!-- this row will not appear when printing -->
                <div class="row no-print" style="margin-top: 25px;">
                    <div class="col-6">
                        <form class="input-group" action="{{route('sendToInstaller', $order->id)}}" method="POST">
                            <input class="form-control form-control-sidebar" type="search" placeholder="Send email to installer" aria-label="Search" style="height: unset !important; background: white; color: black;" name="email">
                            @csrf
                            <div class="input-group-append">
                                <button class="btn btn-sidebar">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="col-6" style="text-align: right; display: flex; align-items: center; justify-content: flex-end">
                        <a href="{{route('invoice.print', $order->id)}}" rel="noopener" target="_blank" class="btn btn-default"><i class="fas fa-print"></i> Print</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>

<script>
    const swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
</script>
@endsection

@section('custom-script')
<script src="/backend/plugins/ekko-lightbox/ekko-lightbox.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        $(function() {
            $(document).on('click', '[data-toggle="lightbox"]', function(event) {
                event.preventDefault();
                $(this).ekkoLightbox({
                    alwaysShowClose: true
                });
            });
        })
    })
</script>
@endsection