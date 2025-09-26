<?php
namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class GoogleReviewsController
{
    public function index()
    {
        $placeId = env('GOOGLE_PLACE_ID');
        $apiKey = env('GOOGLE_API_KEY');

        $reviews = Cache::remember('google_reviews', 43200, function () use ($placeId, $apiKey) {
            $response = Http::get("https://maps.googleapis.com/maps/api/place/details/json", [
                'place_id' => $placeId,
                'fields' => 'reviews',
                'key' => $apiKey,
                'language' => 'cs',
            ]);

            return $response->json('result.reviews', []);
        });

        return response()->json($reviews);
    }
}
