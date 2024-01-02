<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\SocialController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Conversation;


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

    Route::get('/dashboard/{conversation?}', [ConversationController::class, 'index'])
    ->name('dashboard');
});

Route::get('/conversations', [ConversationController::class, 'index'])
->name('api.conversations.index')
->can('viewAny', Conversation::class);


Route::post('/conversations', [ConversationController::class, 'store'])
    ->name('conversations.store')
    ->can('create', Conversation::class);

Route::post('/conversations/{conversation}/firstMessage', [ConversationController::class, 'storeFirstMessage'])
    ->name('conversations.firstMessage.store')
    ->can('createMessage', 'conversation');

Route::post('/conversations/{conversation}/messages', [ConversationController::class, 'storeMessage'])
    ->name('conversations.messages.store')
    ->can('createMessage', 'conversation');


Route::delete('/conversations/{conversation}', [ConversationController::class, 'destroy'])
    ->name('api.conversations.destroy')
    ->can('delete', 'conversation');


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
