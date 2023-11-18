<?php

namespace App\Policies;

use App\Models\Conversation;
use App\Models\User;
use App\Models\Message;
use Illuminate\Auth\Access\Response;

class ConversationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Conversation $conversation): bool
    {
        return $user->isParticipant($conversation);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    public function createMessage(User $user, Conversation $conversation): bool
    {
        return $user->isParticipant($conversation);
    }

    public function createPassage(User $user, Conversation $conversation, Message $message): bool
    {

        // return $user->isParticipant($conversation) && $user->id !== $message->user_from_id;

        // return $user->isParticipant($conversation) && $user->isNot($message->from);


        // return $user->isParticipant($conversation) && $user->is($message->to);

        return $user->isParticipant($conversation) && $user->id == $message->user_to_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Conversation $conversation): bool
    {
        return $user->isParticipant($conversation);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Conversation $conversation): bool
    {
        return $user->isParticipant($conversation);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Conversation $conversation): bool
    {
        //
    }
}
