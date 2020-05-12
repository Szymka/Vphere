<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUSGEstbTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('u_sg_estb', function (Blueprint $table) {
            $table->engine='InnoDB';
            $table->id();
            $table->integer("user_id")->comment("用户id");
            $table->integer("sg_id")->comment("remark");
            $table->string("remark",50)->comment("集体内备注");
            $table->integer("status")->default("0");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('_u__s_g_estb');
    }
}
