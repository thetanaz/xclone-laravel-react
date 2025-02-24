<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class Post extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'content',
        'gif',
        'images',
        'parent_id',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'images' => 'array',
    ];

    /**
     * Get the parent post that this post replies to.
     */
    public function parent()
    {
        return $this->belongsTo(Post::class, 'parent_id');
    }

    /**
     * Get the replies to this post.
     */
    public function replies()
    {
        return $this->hasMany(Post::class, 'parent_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }

    public function likedBy(User $user): bool
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }
}
