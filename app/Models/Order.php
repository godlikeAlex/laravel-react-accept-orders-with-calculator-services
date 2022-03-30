<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    use HasFactory, Notifiable;
    protected $casts = ['recive_notifaction' => 'boolean'];

    static function stripe()
    {
        return new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
    }

    protected $fillable = [
        'status',
        'user_id',
        'details',
        'amount',
        'taxPrice',
        'uuid',
        'installer_id',
        'installer_notes',
        'transaction_id',
        'recive_notifaction',
        'notes',
        'stripe_payment_id',
        'image',
        'date',
        'address',
        'urgencyInstsllstion',
        'email',
        'custom',
        'customer_name'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function installers()
    {
        return $this->belongsToMany(Installer::class, 'order_installer');
    }

    public function images()
    {
        return $this->hasMany(OrderImage::class);
    }

    public function placeImages()
    {
        return $this->hasMany(OrderPlaceImage::class);
    }

    public function cancelOrder()
    {
        return $this->stripe()->refunds->create([
            'charge' => $this->transaction_id,
            'reason' => 'requested_by_customer'
        ]);
    }
}
