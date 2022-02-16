@component('mail::message')
<h1>Order update</h1>
<p>User: {{$data['user_name']}}</p>
<p>Order ID: {{$data['order_id']}}</p>
<p>Order UUID: {{$data['uuid']}}</p>
@if($data['custom'])
<p>Type: <a href="{{route('custom.order.edit', ['order' => $data['order_id']])}}" style=" text-transform: capitalize; "><strong>{{$data['type']}}</strong></a></p>
@else
<p>Type: <a href="{{route('orders.show', ['order' => $data['order_id']])}}" style=" text-transform: capitalize; "><strong>{{$data['type']}}</strong></a></p>
@endif
<p>Message: {{$data['message']}}</p>
@endcomponent