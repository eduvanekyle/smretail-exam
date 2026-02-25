<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::middleware('throttle:30,1')->prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
});

// Protected routes
Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::get('/profile', [AuthController::class, 'profile'])->name('auth.profile');
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('auth.logout');
});
