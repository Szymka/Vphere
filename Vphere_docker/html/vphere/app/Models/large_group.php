<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class large_group extends Model
{
    //
    protected $table="large_group";
    protected $fillable=[
        "group_name",
        "create_user",
    ];
}
