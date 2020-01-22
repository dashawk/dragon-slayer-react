<?php

Route::post('/login', 'Auth\LoginController@authenticate');
Route::get('/create', 'Auth\LoginController@create');