<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OrderInstaller extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_installer', function(Blueprint $table) {
            $table->unsignedBigInteger('order_id')->nullable();
            $table->unsignedBigInteger('installer_id')->nullable();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('set null');
            $table->foreign('installer_id')->references('id')->on('installers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
