@component('mail::message')
<h1>NEW ORDER!!! 🎉</h1>
<p>User: {{$data['user_name']}}</p>
<p>Order ID: {{$data['order_id']}}</p>
<p>Order UUID: {{$data['uuid']}}</p>
@endcomponent