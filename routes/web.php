<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', function () {
    return Inertia::render('Index');
})->name('home');

// Blog
Route::get('/blog', function () {
    return Inertia::render('blog');
})->name('blog.index');

// Akce
Route::get('/akce', function () {
    return Inertia::render('events');
})->name('events.index');

// O nás
Route::get('/o-nas', function () {
    return Inertia::render('About');
})->name('about');

// Kontakt
Route::get('/kontakt', function () {
    return Inertia::render('Contact');
})->name('contact');

// Rezervace
Route::get('/rezervace', function () {
    return Inertia::render('Reservation');
})->name('reservation');

// 404 fallback
Route::fallback(function () {
    return Inertia::render('not_found');
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
