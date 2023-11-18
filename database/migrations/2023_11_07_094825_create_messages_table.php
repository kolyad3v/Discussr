<?php

use App\Models\Conversation;
use App\Models\Passage;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('message');
            $table->foreignIdFor(User::class,'user_from_id');
            $table->foreignIdFor(User::class, 'user_to_id');
            // Nullable if message is first message. Otherwise, required.
            $table->foreignIdFor(Passage::class)->nullable();
            // To link to a conversation which will link two users.
            $table->foreignIdFor(Conversation::class, 'conversation_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
