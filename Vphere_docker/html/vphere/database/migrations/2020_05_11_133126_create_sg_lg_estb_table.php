<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSGLGEstbTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sg_lg_estb', function (Blueprint $table) {
            $table->engine='InnoDB';
            $table->id();
            $table->integer("sg_id")->comment("小集体id");
            $table->integer("lg_id")->comment("大集体id");
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
        Schema::dropIfExists('_s_g__l_g_estb');
    }
}
