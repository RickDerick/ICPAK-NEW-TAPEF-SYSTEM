<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['json.response']], function () {
    Route::group(['prefix' => 'v1'],function () {
    Route::prefix('auth')->group(base_path('routes/modules/auth.php'));
    });
});
