<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\EventController;
use App\Models\BlogPost;
use App\Models\Event;
use App\Models\Supplier;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))
        ->name('dashboard');
});

Route::get('/', function () {
    // 📰 Nejnovější články
    $latestPosts = BlogPost::with('author')
        ->whereNotNull('published_at')
        ->orderByDesc('published_at')
        ->take(3)
        ->get()
        ->map(fn($post) => [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'cover_image' => $post->cover_image
                ? asset('storage/' . $post->cover_image)
                : asset('images/blog-placeholder.jpg'),
            'published_at' => optional($post->published_at)->format('d.m.Y'),
            'author' => $post->author?->name ?? 'U Marušky ☕',
        ]);
    $suppliers = Supplier::all()->map(fn($s) => [
        'id' => $s->id,
        'name' => $s->name,
        'specialty' => $s->specialty,
        'description' => $s->description,
        'image' => $s->image ? asset('storage/' . $s->image) : asset('images/supplier-placeholder.jpg'),
    ]);
    // 🎟️ Nadcházející akce
    $upcomingEvents = Event::query()
        ->whereDate('date', '>=', now())
        ->orderBy('date', 'asc')
        ->take(3)
        ->get()
        ->map(fn($event) => [
            'id' => $event->id,
            'title' => $event->title,
            'date' => optional($event->date)->format('d.m.Y'),
            'time' => $event->time,
            'type' => $event->type,
            'description' => $event->description,
            'cover_image' => $event->cover_image
                ? asset('storage/' . $event->cover_image)
                : asset('images/event-placeholder.jpg'),
        ]);

    return Inertia::render('index', [
        'latestPosts' => $latestPosts,
        'upcomingEvents' => $upcomingEvents,
        'suppliers' => $suppliers,

    ]);
})->name('home');

// 🧾 Blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{blogPost:slug}', [BlogController::class, 'show'])->name('blog.show');

// 🎟️ Akce
Route::get('/akce', [EventController::class, 'index'])->name('events.index');
Route::get('/akce/{event}', [EventController::class, 'show'])->name('events.show');

// ☕ O nás
Route::get('/o-nas', fn() => Inertia::render('about'))->name('about');

// 📞 Kontakt
Route::get('/kontakt', fn() => Inertia::render('contact'))->name('contact');

// 🗓️ Rezervace
Route::get('/rezervace', fn() => Inertia::render('Reservation'))->name('reservation');

// 404 fallback
Route::fallback(fn() => Inertia::render('not_found'));

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
