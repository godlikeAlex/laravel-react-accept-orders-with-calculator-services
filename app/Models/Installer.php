<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Installer extends Authenticatable
{
    use HasFactory;

    private $guard = 'installer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_installer');
    }
}
