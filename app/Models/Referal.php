<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referal extends Model
{
    use HasFactory;

    protected $fillable = [
        'goal', 'partner_id', 'income'
    ];

    public function partner() {
        return $this->belongsTo(Partner::class);
    }
}
