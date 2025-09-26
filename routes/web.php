<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');


Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/akce', [EventController::class, 'index'])->name('events.index');
Route::get('/akce/{event}', [EventController::class, 'show'])->name('events.show');
// O nás
Route::get('/o-nas', function () {
    return Inertia::render('About');
})->name('about');

// Kontakt
Route::get('/kontakt', function () {
    return Inertia::render('contact');
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
