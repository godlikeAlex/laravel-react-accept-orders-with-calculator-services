@extends('layouts.app-admin')

@section('content')
<div class="card">
    <div class="card-body">
        <div class="card-body">
            <form id="form" class="form-inline md-form mr-auto mb-4" action="/admin/dashboard/users">
                <input name="query" id="query" class="form-control mr-sm-2" style="height: unset !important" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-primary " type=" submit">Search</button>
            </form>
            <a href="{{route('add.new.customer')}}" class="btn btn-primary" style="margin-bottom: 25px" type=" submit">Create new customer</a>
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($users as $user)
                    <tr>
                        <td>{{$user->id}}</td>
                        <td style="text-transform:capitalize">
                            @if($user->avatar)
                            <img src="/storage/{{$user->avatar}}" style="border-radius: 50%;width: 50px; height: 50px" alt="">
                            @else
                            <img src="/frontend/avatar.png" style="border-radius: 50%;width: 50px; height: 50px" alt="">
                            @endif
                        </td>
                        <td>{{$user->name}}</td>
                        <td>{{$user->email}}</td>
                        <td>{{$user->address}}</td>
                        <td>{{$user->phone}}</td>
                        <td>
                            <div class="btn-group">
                                <a href="{{route('user.orders', $user->id)}}" class="btn btn-info">
                                    Orders <i class="fas fa fa-eye"></i>
                                </a>
                                <form action="{{ route('user.delete', $user->id) }}" method="get">
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
                        <th>Created Date</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </tfoot>
            </table>

            {{$users->links('admin.orders.pagenation')}}
        </div>
    </div>
</div>

@endsection