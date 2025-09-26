<?php
// routes/api.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GoogleReviewsController;

Route::get('/google-reviews', [GoogleReviewsController::class, 'index']);
