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
                        <td>{{$order->uuid}}</td>
                        <td style="text-transform:capitalize">{{$order->status}}</td>
                        <td>{{$order->amount}} $</td>
                        <td>{{date('D M Y', strtotime($order->date))}} ({{date('d-m-Y', strtotime($order->date))}})</td>
                        <td>
                            <div class="btn-group">
                                <a href="{{route('orders.show', $order->id)}}" class="btn btn-info">
                                    Show <i class="fas fa fa-eye"></i>
                                </a>
                                <a class="btn btn-warning" href="{{route('orders.edit', $order->id)}}">
                                    Edit <i class="fas fa-file-invoice"></i>
                                </a>
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

@endsection