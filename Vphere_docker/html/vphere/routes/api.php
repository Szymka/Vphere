<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(function () {
    Route::post('/user/login','UserController@login');
    Route::group(['middleware'=>'login.check'],function(){
        Route::post('/group/create','GroupController@create');
        Route::post('/group/join','GroupController@join');
        Route::get('/group/joined','GroupController@joined');
    });
});
