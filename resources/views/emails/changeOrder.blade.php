@component('mail::message')
<h1>Order update</h1>
<p>User: {{$data['user_name']}}</p>
<p>Order ID: {{$data['order_id']}}</p>
<p>Type: <a href="{{route('orders.show', ['order' => $data['order_id']])}}" style=" text-transform: capitalize; "><strong>{{$data['type']}}</strong></a></p>
<p>Message: {{$data['message']}}</p>
@endcomponent