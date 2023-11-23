<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\SocialController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/redirect-to-google', function () {
//     // Assuming you have a route named 'auth.google'
//     return redirect()->route('google.redirect');
// })->name('redirect.to.google');

Route::get('/auth/google', [SocialController::class, 'googleRedirect'])
    ->name('google.redirect');

Route::any('/auth/google/callback', [SocialController::class, 'handleGoogleCallback'])
    ->name('google.callback');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', [ConversationController::class, 'index'])
    ->name('dashboard');
});

if (app()->environment('local'))
    {
        Route::get('/users/{user}/cloak', function (User $user) {
            Auth::login($user);
            return redirect()->route('dashboard');
        });
    }

Route::get('/whoami', function () {
    return Auth::user();
});

require __DIR__.'/auth.php';
