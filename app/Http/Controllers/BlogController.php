<?php

namespace App\Http\Controllers;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Inertia\Inertia;

class BlogController extends Controller
{


    public function show(BlogPost $blogPost)
    {
        return Inertia::render('blog/Show', [
            'post' => new BlogPostResource($blogPost->load('author')),
        ]);
    }
    public function index()
    {
        return Inertia::render('blog/Index', [
            'posts' => BlogPostResource::collection(
                BlogPost::with('author')->orderByDesc('published_at')->get()
            )->resolve(),
        ]);
    }

}
