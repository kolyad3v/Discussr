<?php

namespace Database\Seeders;

use App\Models\Conversation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class ConversationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Conversation::Truncate();

        $users = User::all();

        foreach ($users as $user) {

            Conversation::create([
                'user_one_id' => $user->id,
                'user_two_id' => $users->random()->id,
                'label'=> fake()->sentence(4)
            ]);

        }
    }
}
