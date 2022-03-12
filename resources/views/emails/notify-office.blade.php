@component('mail::message')
<h1>Order updated</h1>
<p>User: {{$data->user}}</p>
<p>Order ID: {{$data->id}}</p>
<p>Order UUID: {{$data->uuid}}</p>
<p>Status: {{$data->status}}</p>
@endcomponent