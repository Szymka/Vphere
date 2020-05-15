<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class sign_in extends Model
{
    //
    protected $table="sign_in";
    protected $fillable=[
        'creat_user',
        'group_id',
        'start_time',
        'end_time',
        'location'
    ];
}
