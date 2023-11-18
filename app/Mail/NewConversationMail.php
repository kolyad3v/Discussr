<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\Conversation;


class NewConversationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $conversation;
    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct(Conversation $conversation, User $user)
    {
        $this->conversation = $conversation;
        $this->user = $user;
    }


    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    public function build()
    {
        return $this->subject('New Conversation Mail')
            ->view('emails.newConversation')
            ->with([
                'conversationLabel' => $this->conversation->label,
                'userName' => $this->user->name,
            ]);
    }

}
