<?php
namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('author')
            ->orderByDesc('published_at')
            ->get();

        return Inertia::render('blog/Index', [
            'posts' => $posts,
        ]);
    }

    public function show(BlogPost $blogPost)
    {
        return Inertia::render('blog/Show', [
            'post' => $blogPost->load('author'),
        ]);
    }
}
