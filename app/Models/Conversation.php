<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_one_id',
        'user_two_id',
        'label',
    ];

    public function userOne(): BelongsTo
    {
        // Linked by user_one_id
        return $this->belongsTo(User::class, 'user_one_id');
    }

    public function userTwo(): BelongsTo
    {
        // Linked by user_two_id
        return $this->belongsTo(User::class, 'user_two_id');
    }


    public function messages():HasMany
    {
        // Linked by user_1_id and user_2_id
        return $this->hasMany(Message::class);
    }

    public function isParticipant(User $user): bool
    {
        return $user->id === $this->user_one_id || $user->id === $this->user_two_id;
    }
}
