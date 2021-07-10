<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'status', 'details', 'amount', 'uuid', 'transaction_id', 'notes', 'stripe_payment_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
