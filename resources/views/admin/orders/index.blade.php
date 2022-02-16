@extends('layouts.app-admin')

@section('content')
<div class="card">
    <div class="card-body">
        <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Schedule</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orders as $order)
                    <tr>
                        <td>@if($order->urgencyInstsllstion) ⚡ @endif {{$order->uuid}} @if(isset(json_decode($order->details)->delivery) && json_decode($order->details)->delivery) 📦 @endif </td>
                        <td style="text-transform:capitalize">{{$order->status}} {{$order->delivery == 1 ? '| Delivery need' : ''}}</td>
                        <td>{{$order->amount}} $</td>
                        <td class="date" data-date="{{$order->date->toW3cString()}}"></span>
                            {{date('d-m-Y', strtotime($order->date))}}
                        </td>

                        <td>
                            <div class="btn-group">

                                <a href="{{route('orders.show', $order->id)}}" class="btn btn-info">
                                    Show <i class="fas fa fa-eye"></i>
                                </a>
                                @if($order->custom)
                                <a class="btn btn-warning" href="{{route('custom.order.edit', $order->id)}}">
                                    Edit <i class="fas fa-file-invoice"></i>
                                </a>
                                @else
                                <a class="btn btn-warning" href="{{route('orders.edit', $order->id)}}">
                                    Edit <i class="fas fa-file-invoice"></i>
                                </a>
                                @endif
                                <form action="{{ route('orders.destroy', $order->id) }}" method="post">
                                    <button class="btn btn-danger" style="border-radius: 0 0.25rem 0.25rem 0">
                                        Delete <i class="fas fa-trash"></i>
                                    </button>
                                    @method('delete')
                                    @csrf
                                </form>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <th>UUID</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Schedule</th>
                        <th>Actions</th>
                    </tr>
                </tfoot>
            </table>

            {{$orders->links('admin.orders.pagenation')}}
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    const dates = document.querySelectorAll('.date');
    dates.forEach(date => {
        date.innerHTML = moment(date.dataset['date']).format('L') + ' ' + moment(date.dataset['date']).format('LT')
    })
</script>

@endsection