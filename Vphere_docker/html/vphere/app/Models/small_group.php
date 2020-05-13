<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class small_group extends Model
{
    //
    protected $table="small_group";
    protected $fillable=[
        "group_name",
        "create_user",
    ];
}
