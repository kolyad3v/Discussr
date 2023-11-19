<?php
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\ProfileController;

use App\Models\Conversation;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/conversations', [ConversationController::class, 'index'])
    ->name('api.conversations.index')
    ->can('viewAny', Conversation::class);

    Route::post('/conversations', [ConversationController::class, 'store'])
    ->name('api.conversations.store')
    ->can('create', Conversation::class);

    Route::post('/conversations/{conversation}/messages', [ConversationController::class, 'storeMessage'])
    ->name('api.conversations.messages.store')
    ->can('createMessage', 'conversation');

    Route::post('/conversations/{conversation}/firstMessage', [ConversationController::class, 'storeFirstMessage'])
    ->name('api.conversations.firstMessage.store')
    ->can('createMessage', 'conversation');

    Route::delete('/conversations/{conversation}', [ConversationController::class, 'destroy'])
    ->name('api.conversations.destroy')
    ->can('delete', 'conversation');

    Route::post('/profile/{user}/avatar', [ProfileController::class, 'storeAvatar'])
    ->name('api.profile.avatar.store')
    ->can('storeAvatar','user');
});
