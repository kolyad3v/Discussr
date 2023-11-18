<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Passage extends Model
{
    use HasFactory;

    protected $fillable = [
       'start',
       'length',
       'message_id',
    ];
    public function message():BelongsTo
    {
        // Connected by message_origin_id
        return $this->belongsTo(Message::class);
    }

    public function offshootMessage()
    {
        return $this->hasOne(Message::class, 'passage_origin_id');
    }

}
