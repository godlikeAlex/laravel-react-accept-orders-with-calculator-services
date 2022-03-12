<?php

namespace App\Listeners;

use App\Events\OrderUpdated;
use App\Mail\OrderUpdatedOffice;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendNotificationToOffice
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrderUpdated  $event
     * @return void
     */
    public function handle(OrderUpdated $event)
    {
        $to_email = 'info@easywayinstall.com';


        $dataToOffice = (object) [
            'status' => $event->order->status,
            'uuid' => $event->order->uuid,
            'id' => $event->order->id,
            'user' => $event->order->user->name
        ];

        Mail::to($to_email)->send((new OrderUpdatedOffice($dataToOffice))->delay(now()->addMinute()));
    }
}
