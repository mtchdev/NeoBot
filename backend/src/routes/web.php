<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/guild/add', 'GuildController@add');
Route::post('/guild/remove', 'GuildController@remove');
Route::get('/guild/get', 'GuildController@getInfo');
Route::post('/warn/new', 'WarningController@new');
Route::get('/cases/get', 'CasesController@get');
Route::get('/cases/specific', 'CasesController@getSpecific');
Route::post('/cases/delete', 'CasesController@delete');
Route::post('/ban/new', 'BanController@new');
Route::post('/ban/unban', 'BanController@unban');
Route::get('/config/roles/muted/get', 'RolesController@getMuted');
Route::post('/config/roles/muted/set', 'RolesController@setMuted');
Route::post('/mute/new', 'MuteController@new');
Route::post('/mute/unmute', 'MuteController@unmute');
Route::get('/mute/get', 'MuteController@get');
Route::post('/kick/new', 'KickController@new');
Route::post('/cases/edit', 'CasesController@edit');