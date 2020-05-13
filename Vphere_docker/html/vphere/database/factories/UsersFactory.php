<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        //
        "username"=> $faker->name,
        "open_id"=>$faker->uuid,
        "avatarUrl"=>$faker->url,
    ];
});
