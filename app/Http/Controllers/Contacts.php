<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class Contacts extends Controller
{
    public function send()
    {
        $to_name = 'easywayinstall';
        $to_email = 'info@easywayinstall.com';
        $data = array('name' => request()->name,  'email' => request()->email, 'subject' => request()->subject, "body" => request()->message);

        Mail::send('emails.mail', $data, function ($message) use ($to_name, $to_email) {
            $message->to($to_email, $to_name)
                ->subject('EASY WAY INSTALL | MESSAGE FROM ' . request()->email);
            $message->from('info@easywayinstall.com', 'easywayinstall');
        });
        return 'Your message delivered';
    }
}
