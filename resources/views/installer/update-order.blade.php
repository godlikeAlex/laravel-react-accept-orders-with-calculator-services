@extends('layouts.app-installer')

@section('content')
<div class="card" style="background: #f7f7f7;">
    <!-- IT IS REACT COMPONENT! IN RESOURCE FOLDER ALL COMPONENTS -->
    <div id="update-installer-order-form-backend" data-order="{{$order}}" data-user="{{$order->user}}" data-images="{{$order->placeImages}}"></div>
</div>

<script>

</script>
@endsection