<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class BasicTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }


    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
       /**
     * Test accessing the dashboard as a logged in user.
     */
    public function test_dashboard_access_as_logged_in_user(): void
    {

        $response = $this->actingAs($this->user)->get('/dashboard');

        $response->assertStatus(200);
    }


    /**
     * Test accessing the profile edit section as a logged in user.
     */
    public function test_profile_edit_access_as_logged_in_user(): void
    {

        $response = $this->actingAs($this->user)->get(route('profile.edit'));

        $response->assertStatus(200);
    }

     /**
     * Test accessing the profile edit section as a logged in user.
     */
    public function test_profile_update_access_as_logged_in_user(): void
    {
        $response = $this->actingAs($this->user)->get(route('profile.update'));

        $response->assertStatus(200);
    }

       /**
     * Test accessing the profile edit section as a logged in user.
     */
    public function test_profile_destroy_access_as_logged_in_user(): void
    {
        $response = $this->actingAs($this->user)->get(route('profile.destroy'));

        $response->assertOk();
    }


}
