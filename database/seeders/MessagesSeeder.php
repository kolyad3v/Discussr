<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Message::Truncate();

        $conversations = Conversation::all();

        foreach ($conversations as $conversation) {
            $conversation->messages()->create([
                'message' => fake()->realText(800),
                'user_from_id' => $conversation->user_one_id,
                'user_to_id' => $conversation->user_two_id,
            ]);
        }
    }
}
