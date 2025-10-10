<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'published_at' => optional($this->published_at)->format('Y-m-d'),
            'author' => [
                'name' => $this->author->name ?? 'U Marušky ☕',
            ],
            'cover_image' => $this->cover_image
                ? asset('storage/' . $this->cover_image)
                : asset('images/blog-placeholder.jpg'),

            // ✅ Nová část
            'images' => collect($this->images)
                ->filter() // odstraní null hodnoty
                ->map(fn($path) => asset('storage/' . $path))
                ->values(),

            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
