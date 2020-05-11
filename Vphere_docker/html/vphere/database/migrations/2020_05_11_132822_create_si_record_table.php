<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSiRecordTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('si_record', function (Blueprint $table) {
            $table->engine='InnoDB';
            $table->id();
            $table->integer("user_id")->comment("签到用户id");
            $table->integer("sign_in_id")->comment("签到记录id");
            $table->timestamp("sign_time")->default(\DB::raw('CURRENT_TIMESTAMP'))->comment("签到时间");
            $table->integer("status")->comment("签到状态");
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
        Schema::dropIfExists('si_record');
    }
}
