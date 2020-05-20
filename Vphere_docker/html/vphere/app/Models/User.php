<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    //
    protected $table = "users";
    protected $fillable = [
        "username",
        "open_id",
        "avatarUrl",
        "join_group",
        "vpr_num",
        "vpr_status",
    ];
}
