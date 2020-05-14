<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine='InnoDB';
            $table->id();
            $table->string('username',50)->comment("用户名");
            $table->string("open_id",100)->comment("微信open_id");
            $table->string("avatarUrl",500)->comment("头像");
            $table->integer("vpr_num")->comment("vpr注册剩余次数,初始为3");
            $table->integer("vpr_status")->comment("vpr状态,0表示没有注册,1表示已经注册,2表示注册中");
            $table->json("join_group")->nullable()->comment("加入的集体");
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
        Schema::dropIfExists('users');
    }
}
