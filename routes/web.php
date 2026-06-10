<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// SPA fallback: let the frontend router (vue-router history mode)
// handle any unknown web routes like /auth/login
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
