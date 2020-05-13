<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class U_SG_estb extends Model
{
    //
    protected $table="u_sg_estb";
    protected $fillable=[
        "user_id",
        "sg_id",
        "remark",
        "status",
    ];
}
