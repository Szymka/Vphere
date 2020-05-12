<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSmallGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('small_group', function (Blueprint $table) {
            $table->engine='InnoDB';
            $table->id();
            $table->string("group_name",255)->comment("集体名称");
            $table->integer("create_user")->comment("创建集体的用户id");
            $table->timestamp("creat_time")->default(\DB::raw('CURRENT_TIMESTAMP'));
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
        Schema::dropIfExists('small_group');
    }
}
