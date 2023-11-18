<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'user_from_id',
        'user_to_id',
        'passage_origin_id',
        'conversation_id',
    ];

    public function from():HasMany
    {
        return $this->belongTo(User::class, 'from_user_id');
    }

    public function to():HasMany
    {
        return $this->belongTo(User::class, 'to_user_id');
    }

    public function conversation():BelongsTo
    {
        // Connected by conversation_id
        return $this->belongsTo(Conversation::class);
    }

    public function passage():BelongsTo
    {
        // One message has one origin  ( or null if first message)
        return $this->belongsTo(Passage::class);
    }

    public function passages():HasMany
    {
        // One message has many offshoots
        return $this->hasMany(Passage::class);
    }

    public function getOtherPartyId(int $ourId)
    {
        return $ourId === $this->from_user_id
            ? $this->user_from_id
            : $this->user_to_id;
    }

    public function createPassage(int $start, int $length, string $message, $authorId = null)
    {
        $passage = $this->passages()->create([
            'start' => $start,
            'length' => $length,
        ]);

        $authorId = Auth::check()
            ? Auth::id()
            : $authorId;

        $recipientId = $this->getOtherPartyId($authorId);

        $message = $this->conversation->messages()->create([
            'message' => $message,
            'user_from_id' => $authorId,
            'user_to_id' => $recipientId,
            'passage_id' => $passage->id,
        ]);

        return $passage;
    }

}
