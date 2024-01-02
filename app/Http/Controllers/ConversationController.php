<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConversationRequest;
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
use Mockery\Undefined;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(?Conversation $conversation)
    {

        // $conversations = Cache::remember('conversations.' . Auth::id(), 60, function () {
            $conversations = Auth::user()->conversations;

            $conversations->load([
                'messages.passages',
                'userOne.avatar',
                'userTwo.avatar'
            ]);

            if ($conversation)
            {
                $conversation->load([
                    'messages.passages',
                    'userOne.avatar',
                    'userTwo.avatar'
                ]);
            }

        //     return $conversations;
        // });

        Auth::user()->load('avatar');

        return Inertia::render('Dashboard', [
            'conversationsData' => $conversations,
            'conversation' => $conversation

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
    public function store(StoreConversationRequest $request)
    {

        $validated = $request->validated();

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

        // $conversations = Auth::user()->conversations()->with([
        //     'messages.passages',
        //     'userOne.avatar'
        // ])

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

        return to_route('dashboard');
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

        return to_route('dashboard');
    }

    public function storeMessage(Request $request, Conversation $conversation)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'messageId'=> 'required|numeric',
            'passageStart'=> 'required|numeric',
            'passageLength'=> 'required|numeric'
        ]);

        $passage = Passage::create([
            'start' => $validated['passageStart'],
            'length' => $validated['passageLength'],
            'message_id' => $validated['messageId'],
        ]);


        $conversation->messages()->create([
            'user_from_id' => Auth::id(),
            'user_to_id'=> $conversation->user_one_id === Auth::id() ? $conversation->user_two_id : $conversation->user_one_id,
            'message' => $validated['message'],
            'passage_id' => $passage->id,

        ]);


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

        return to_route('dashboard', $conversation);
    }

    public function storeFirstMessage(Request $request, Conversation $conversation)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'messageId'=> 'nullable',
        ]);


        $conversation->messages()->create([
            'user_from_id' => Auth::id(),
            'user_to_id'=> $conversation->user_one_id === Auth::id() ? $conversation->user_two_id : $conversation->user_one_id,
            'message' => $validated['message'],
            // If passage is null, the message is a first message.
            'passage_id' => null,

        ]);


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

        // return Inertia::render('Dashboard', [
        //     'conversationsData' => $conversations,
        //     'auth' => [
        //         'user' => Auth::user()
        //     ],
        // ]);

        return to_route('dashboard', $conversation);
    }

}
