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
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
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
            ->greeting(new HtmlString('<h1 style="font-size: 30px;">Order update</h1>'))
            ->line("Dear **{$this->order->user->name}**,")
            ->line("Order id: **{$this->order->id}**")
            ->line(new HtmlString("Order status: <span style='color: #ec0798;text-transform: capitalize'>**{$this->order->status}**</span>"))
            ->line("The status of your order has been updated, as shown above.")
            ->line("You can check on the status of your order at any time, by goig **My orders** in your account.")
            ->line('### Thank you for using services!');

        if ($this->order->status == 'finished') {
            $mail->attach(public_path('uploads/' . $this->order->image), [
                'as' => $this->order->image,
            ]);
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
