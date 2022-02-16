<?php

namespace App\Http\Controllers;

use App\Mail\RequestFromSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class Contacts extends Controller
{
    public function send()
    {
        $to_email = 'info@easywayinstall.com';
        $data = array(
            'name' => request()->name,
            'email' => request()->email,
            'phone' => request()->phone,
            'subject' => request()->subject,
            "body" => request()->message,
            "service" => request()->service
        );

        Mail::to($to_email)->send(new RequestFromSite($data));

        return 'Your message delivered';
    }
}
