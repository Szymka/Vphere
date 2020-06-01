<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use ReCaptcha\RequestMethod\Post;

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
        Route::get('/user/schedule','UserController@schedule');
        Route::get('/user/attendance','UserController@attendance');
        Route::get('/user/manage','UserController@manage');

        Route::post('/group/create','GroupController@create');
        Route::post('/group/join','GroupController@join');
        Route::get('/group/joined','GroupController@joined');
        Route::get('/group/small/situation','GroupController@small_situation');
        Route::get('/group/large/situation','GroupController@large_situation');
        Route::get('/group/manage','GroupController@manage');
        Route::get('/group/quit','GroupController@quit');
        Route::get('/group/small/dissolve','GroupController@small_dissolve');
        Route::get('/group/large/dissolve','GroupController@large_dissolve');

        Route::post('/sign/in','SignController@in');
        Route::post('/sign/reg','SignController@reg');
        Route::post('/sign/create','SignController@create');
        Route::get('/sign/status','SignController@status');
        Route::get('/sign/record','SignController@record');
    });
    Route::get('/group/small_group','GroupController@small_group');
    Route::get('/group/large_group','GroupController@large_group');
});
