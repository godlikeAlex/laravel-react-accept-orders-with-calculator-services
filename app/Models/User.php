<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    static function stripe()
    {
        return new \Stripe\StripeClient(
            'sk_test_51JAtkbFjRSGcEV2otTj49Ndz5yYd5a62FdeGlJR3vyUKn4sayyO41rL3xYaAeLN3KIC2ZVlhPGsIuEqZIbd2Z7yy00JTzTGxhm'
        );
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function wishList()
    {
        return $this->hasMany(WishList::class);
    }

    public function isStripeCustomer()
    {
        return !$this->stripe_id == null;
    }

    public function saveAsCustomer()
    {
        $customer = $this->stripe()->customers->create([
            'email' => $this->email,
            'name' => $this->name,
            'phone' => $this->phone,
        ]);

        $this->stripe_id = $customer->id;

        $this->save();
    }

    public function createPayment($amount, $payment_method)
    {
        return $this->stripe()->paymentIntents->create([
            "amount" => $amount,
            'currency' => 'usd',
            'customer' => $this->stripe_id,
            'confirmation_method' => 'automatic',
            'confirm' => true,
            'payment_method' => $payment_method,
        ]);
    }

    public function createIntent()
    {
        return $this->stripe()->setupIntents->create([
            'customer' => $this->stripe_id,
            'usage' => 'on_session'
        ]);
    }

    public function listPaymentMethods()
    {
        return $this->stripe()->paymentMethods->all([
            'customer' => $this->stripe_id,
            'type' => 'card'
        ]);
    }

    public function deletePaymentMethod($card)
    {
        return $this->stripe()->paymentMethods->detach(
            $card
        );
    }
}
