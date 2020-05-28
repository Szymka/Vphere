<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class access extends Model
{
    //
    protected $table="access";
    protected $fillable=[
        'access_token'
    ];
}
