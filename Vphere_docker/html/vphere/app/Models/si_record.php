<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class si_record extends Model
{
    //
    protected $table='si_record';
    protected $fillable=[
        'user_id',
        'sign_in_id',
        'sign_time',
        'status',

    ];

}
