@extends('layouts.app-admin')

@section('content')
<div class="card" style="background: #f7f7f7;">
    <!-- IT IS REACT COMPONENT! IN RESOURCE FOLDER ALL COMPONENTS -->
    <div 
        id="update-order-form-backend" 
        data-order="{{$order}}" 
        data-installers="{{$order->installers()->select('id')->get()}}"
    ></div>
</div>

<script>

</script>
@endsection