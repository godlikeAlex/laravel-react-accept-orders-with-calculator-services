<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

use function PHPUnit\Framework\isNull;

class OrderStatusUpdated extends Notification implements ShouldQueue
{
    use Queueable;

    private $order;
    private $status;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($order, $status)
    {
        $this->order = $order;
        $this->status = $status;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $mail = (new MailMessage)
            ->view('emails.orderUpdated', ['order' => $this->order, 'status' => $this->status]);

        if ($this->order->status == 'completed') {
            foreach ($this->order->images as $image) {
                $mail->attach(public_path('storage/' . $image->path), [
                    'as' => $image->path,
                ]);
            }
        }

        return $mail;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
