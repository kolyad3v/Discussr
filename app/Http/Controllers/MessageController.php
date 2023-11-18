<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Passage;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created passage in storage.
     */
    public function storePassage(Request $request)
    {
        $validated = $request->validate([
            'message_origin_id'=> 'required|integer|exists:messages,id',
            'start'=> 'required|integer',
            'length'=> 'required|integer',
        ]);
        $passage = Passage::create([
            'message_origin_id' => $validated['message_origin_id'],
            'start' => $validated['start'],
            'length' => $validated['length'],
        ]);
        return $passage;
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
