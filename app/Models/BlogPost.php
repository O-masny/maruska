<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image',
        'published_at',
        'user_id',
        'images',      // ✅ přidáno

    ];

    protected $casts = [
        'published_at' => 'datetime',
        'images' => 'array'

    ];

    // Vztah k autorovi
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Auto-slug při ukládání
    protected static function booted()
    {
        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });
    }
}
