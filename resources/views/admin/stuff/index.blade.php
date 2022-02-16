@extends('layouts.app-admin')

@section('content')
<div class="card">
    <div class="card-body">
        <div class="card-body">
            <a href="{{route('add.new.admin')}}" class="btn btn-primary" style="margin-bottom: 25px" type=" submit">Create new admin</a>
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($users as $user)
                    <tr>
                        <td>{{$user->id}}</td>
                        <td>{{$user->name}}</td>
                        <td>{{$user->email}}</td>
                        <td>
                            <div class="btn-group">
                                <form action="{{ route('admin.delete', $user->id) }}" method="get">
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </tfoot>
            </table>

            {{$users->links('admin.orders.pagenation')}}
        </div>
    </div>
</div>

@endsection