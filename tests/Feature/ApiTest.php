<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

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
                'title'=> 'Test conversation',
            ]);

        $response->assertStatus(200);

        // $this->assertDatabaseHas('conversations', [
        //     'user_id' => $this->user2->id,
        //     // other conversation data...
        // ]);
    }

}
