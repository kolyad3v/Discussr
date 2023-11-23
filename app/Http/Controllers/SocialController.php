<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SocialController extends Controller
{
    public function googleRedirect(){
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(){
        $googleUser = Socialite::driver('google')->user();


        $user = User::where('social_id', $googleUser->id)
                ->where('social_type', 'google')
                ->first();

        if($user){
            Auth::login($user);
        }else {

            // Create unique username.
            $baseUsername = Str::slug($googleUser->name);
            $uniqueIdentifier = mt_rand(1000, 9999);
            $username ="{$baseUsername}-{$uniqueIdentifier}";

            // Look through the db and recreate new username if exists.
            while(User::where('username', $username)->exists()){
                $uniqueIdentifier = mt_rand(1000, 9999);
                $username ="{$baseUsername}-{$uniqueIdentifier}";
            }

            $newUser = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'username'=> $username,
                'social_id' => $googleUser->id,
                'social_type' => 'google',
                'password' => encrypt('my-google-password')
            ]);

            Auth::login($newUser);
        }

        return redirect()->intended('dashboard');
    }
}
