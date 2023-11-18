<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Passage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use App\Mail\NewConversationMail;
use Illuminate\Support\Facades\Mail;


class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    $conversations = Cache::remember('conversations.' . Auth::id(), 60, function () {
        $conversations = Auth::user()->conversations;
        $conversations->load([
            'messages' => function ($query) {
                $query->with('passages');
            },
            'userOne' => function ($query) {
                $query->with('avatar');
            },
            'userTwo' => function ($query) {
                $query->with('avatar');
            }
        ]);

        return $conversations;
    });

    return Inertia::render('Dashboard', [
        'conversationsData' => $conversations,
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'username' => 'required',
            'label'=> 'required|string|max:40',
        ]);

        $user = User::where('username', $validated['username'])->first();

        if ($user === null) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        $userTwoId = $user->id;

        if($userTwoId === Auth::id()){
            return response()->json(['message' => 'You cannot start a conversation with yourself.'], 400);
        }

        $newConversation = Conversation::create([
            'user_one_id' => Auth::id(),
            'user_two_id' => $userTwoId,
            'label' => $validated['label'],
        ]);

        Mail::to($user->email)->send(new NewConversationMail($newConversation, $user));

        $conversations = Auth::user()->conversations;
        $conversations = Auth::user()->conversations()->with([
            'messages' => function ($query) {
                $query->with('passages');
            },
            'userOne' => function ($query) {
                $query->with('avatar');
            },
            'userTwo' => function ($query) {
                $query->with('avatar');
            }
        ])->get();

        return Inertia::render('Dashboard', [
            'conversationsData' => $conversations,
            'auth' => [
                'user' => Auth::user()
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conversation $conversation)
    {
        $conversation->load('messages', 'userOne', 'userTwo');

        // Get all passages related to loaded messages
        // $conversation->messages->load('passages');

        // $conversations = Auth::user()->conversations;
        // $conversations->load('userOne', 'userTwo');
        return $conversation;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Conversation $conversation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        $conversation->delete();

        $conversations = Auth::user()->conversations;
        $conversations = Auth::user()->conversations()->with([
            'messages' => function ($query) {
                $query->with('passages');
            },
            'userOne' => function ($query) {
                $query->with('avatar');
            },
            'userTwo' => function ($query) {
                $query->with('avatar');
            }
        ])->get();

        return Inertia::render('Dashboard', [
            'conversationsData' => $conversations,
            'auth' => [
                'user' => Auth::user()
            ],
        ]);
    }

    public function storeMessage(Request $request, Conversation $conversation)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'messageId'=> 'nullable|numeric',
        ]);

        $passage = null; // Initialize $passage variable outside the if block

        if($validated['messageId']!== null){
            // create a new passage and get that passage's Id
            // TODO add Passage details to request body and validate
            $messageLength = strlen($validated['message']);
            $startMax = $messageLength > 100 ? $messageLength - 100 : 0; // Ensure $startMax is not negative

            $passage = Passage::create([
                'start' => fake()->numberBetween(0, $startMax),
                'length' => fake()->numberBetween(0, 100),
                'message_id' => $validated['messageId'],
            ]);
        }

        $conversation->messages()->create([
            'user_from_id' => Auth::id(),
            'user_to_id'=> $conversation->user_one_id === Auth::id() ? $conversation->user_two_id : $conversation->user_one_id,
            'message' => $validated['message'],
            // If passage is null, the message is a first message.
            'passage_id' => $passage? $passage->id : null,
            'conversation_id'=> $conversation->id,
        ]);

        // $message = Message::create([
        //     'user_from_id' => Auth::id(),
        //     'user_to_id'=> $conversation->user_one_id === Auth::id() ? $conversation->user_two_id : $conversation->user_one_id,
        //     'message' => $validated['message'],
        //     'passage_origin_id'=>  $request->passage_origin_id ? $request->passage_origin_id : null,
        //     'conversation_id'=> $conversation->id,

        // ]);


        $conversations = Auth::user()->conversations;
        $conversations = Auth::user()->conversations()->with([
            'messages' => function ($query) {
                $query->with('passages');
            },
            'userOne' => function ($query) {
                $query->with('avatar');
            },
            'userTwo' => function ($query) {
                $query->with('avatar');
            }
        ])->get();

        return Inertia::render('Dashboard', [
            'conversationsData' => $conversations,
            'auth' => [
                'user' => Auth::user()
            ],
        ]);
    }

}
