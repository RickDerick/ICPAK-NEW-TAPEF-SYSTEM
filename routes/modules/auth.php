<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;


/*
|--------------------------------------------------------------------------
| AUTH Routes
|--------------------------------------------------------------------------

*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('resend-otp', [AuthController::class, 'resendOtp']);
Route::post('verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('set-new-password', [AuthController::class, 'setNewPassword']);
Route::post('activate-account', [AuthController::class, 'activateAccount']);