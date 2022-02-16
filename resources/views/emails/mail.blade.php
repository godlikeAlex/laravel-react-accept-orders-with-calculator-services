@component('mail::message')
<h1>Request from site</h1>
<p>Name <b>{{$data['name']}}</b></p>
@if(!isset($data['service']))
<p>Subject <b>{{$data['subject']}}</b></p>
@endif

@if (isset($data['phone']))
<p>Phone <b>{{$data['phone']}}</b></p>
@else
<p>Email <b>{{$data['email']}}</b></p>
@endif

@if (isset($data['service']))
<p>Service: {{$data['service']}}</p>
@else
<p>Message:</p>
<p>{{$data['body']}}</p>
@endif

@endcomponent
