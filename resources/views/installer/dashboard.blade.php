@extends('layouts.app-installer')

@section('content')
<div class="row">
    @if(count($orders) > 0)
    <div class="col-md-12">
        <h3>Current orders</h3>
    </div>
    @foreach($orders as $order)
    <div class="col-md-6">
        <div class="card ">
            <div class="card-header">
                <h3 class="card-title">#{{$order->uuid}}</h3>
                <div class="card-tools">
                    <!-- Buttons, labels, and many other things can be placed here! -->
                    <!-- Here is a label for example -->
                    <span class="badge badge-primary">{{$order->status}}</span>
                </div>
                <!-- /.card-tools -->
            </div>
            <!-- /.card-header -->
            <div class="card-body">
                <p>
                    <b>Schedule</b>: <span class="date" data-date="{{$order->date->toW3cString()}}">
                        {{date('d-m-Y', strtotime($order->date))}}
                    </span>

                </p>

                <p>
                    <b>Status</b>: {{$order->status}}
                </p>

                <p>
                    <b>Customer</b>: {{$order->user->name}}
                </p>
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
                <a class="btn btn-info btn-sm" href="{{ route('inst.show.order', $order->id) }}">
                    <i class="fas fa-pencil-alt">
                    </i>
                    Edit
                </a>
            </div>
            <!-- /.card-footer -->
        </div>
    </div>
    @endforeach
    @else
    <h2 style="text-align: center; padding: 10px">No orders ❌</h2>
    @endif
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    const dates = document.querySelectorAll('.date');
    dates.forEach(date => {
        date.innerHTML = moment(date.dataset['date']).format('L') + ' ' + moment(date.dataset['date']).format('LT')
    })
</script>
@endsection