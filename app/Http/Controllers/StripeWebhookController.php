<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class StripeWebhookController extends Controller
{
    public function handle(Request $request)
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        $endpoint_secret = env('STRIPE_ENDPOINT_SECREET');
        $payload = $request->getContent();
        $sig_header = $request->server('HTTP_STRIPE_SIGNATURE');
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            http_response_code(400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            http_response_code(400);
            exit();
        }

        switch ($event->type) {
            case 'payment_intent.succeeded':
                // $transactionId = $event->data->object->id;
                // $order = Order::where('stripe_payment_id', $transactionId)->first();
                // $order->update([
                //     'status' => 'paid'
                // ]);
                // return 'payment_intent.succeeded';
                // break;
            case 'charge.refunded':
                $transactionId = $event->data->object->id;
                $order = Order::where('transaction_id', $transactionId)->first();
                $order->update([
                    'status' => 'refunded'
                ]);
                return 'order_updated';
                break;
                // ... handle other event types
            default:
                echo 'Received unknown event type ' . $event->type;
        }
    }
}
