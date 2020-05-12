<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSignInTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sign_in', function (Blueprint $table) {
            $table->engine='InnoDB';
            $table->id();
            $table->integer("creat_user")->comment("创建签到的用户id");
            $table->integer("group_id")->comment("小集体id");
            $table->timestamp("start_time")->comment("签到开始时间");
            $table->timestamp("end_time")->comment("签到结束时间");
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
        Schema::dropIfExists('sign_in');
    }
}
