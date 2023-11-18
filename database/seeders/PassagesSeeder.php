<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Passage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PassagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all messages
        $messages = Message::all();

        // Loop through each message
        foreach ($messages as $message) {

                // Get the message text
                $messageText = $message->message;

                // Get the length of the message text
                $messageLength = strlen($messageText);

                // Get a random start position
                // -50 because it's unlikely a user will select the last 30 chars of a messsage or something.
                $start = rand(0, $messageLength - 50);

                // Get a random length
                $length = rand(1, $messageLength - $start);

                $userId = rand(0, 1) ? $message->user_from_id : $message->user_to_id;

                $passage = $message->createPassage($start, $length, fake()->realText(800), $userId);

                // Create a passage


                // Update the message to point to the passage
                // !! This is copilot being a fucking genius, but not in the way that we want because we're creating passages in an original message. I will use this for later when creating messages that spawn from other passages.
                // $message->passage_origin_id = $passage->id;
                // $message->save();

                // TODO I'll also need to edit this so that we create multiple passages in the message which don't overlap. For now just create one passage.

                // Oh shit, If I create a new passage, it will automatically create a new message. Why not do that here?




        }
    }
}
