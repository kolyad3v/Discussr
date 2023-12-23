<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Conversation;

class ApiTest extends TestCase
{

    use RefreshDatabase;

    protected User $user1;
    protected User $user2;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user1 = User::factory()->create();
        $this->user2 = User::factory()->create();
    }

    public function test_create_new_conversation(): void
    {
        $response = $this->actingAs($this->user1)
            ->postJson(route('api.conversations.store'), [
                'username' => $this->user2->username,
                'label' => 'Test Convo'
            ]);

            // Fine as redirecting for now to try to activate page reload on conversation add.
        $response->assertStatus(302);

    }

    public function test_create_new_non_first_message():void {

        $conversation = Conversation::factory()->create();

        $response = $this->actingAs($this->user1)
        ->postJson(route('api.conversations.messages.store'),[ 'conversation' => $conversation->id ], [
            'message'=>'Hello this is a test!',
            'messageId'=> 123123123123123123,
            'passageStart'=>12,
            'passageLength'=> 100,
        ]);

        $response->assertStatus(200);
    }

}
