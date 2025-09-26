<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('date', 'asc')
            ->get()
            ->map(fn($event) => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'date' => optional($event->date)->toDateString(),
                'time' => $event->time,
                'location' => $event->location ?? 'U Marušky',
                'capacity' => $event->capacity,
                'registered' => $event->registered,
                'price' => $event->price,
                'category' => $event->type ?? 'Ostatní',
                'featured' => $event->featured ?? false,
                'cover_image' => $event->cover_image
                    ? asset('storage/' . $event->cover_image)
                    : asset('images/event-placeholder.jpg'),
            ]);

        return Inertia::render('events/Index', [
            'events' => $events,
        ]);
    }

    public function show(Event $event)
    {
        $event = [
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'date' => optional($event->date)->toDateString(),
            'time' => $event->time,
            'location' => $event->location ?? 'U Marušky',
            'capacity' => $event->capacity,
            'registered' => $event->registered,
            'price' => $event->price,
            'category' => $event->type ?? 'Ostatní',
            'featured' => $event->featured ?? false,
            'cover_image' => $event->cover_image
                ? asset('storage/' . $event->cover_image)
                : asset('images/event-placeholder.jpg'),
        ];

        return Inertia::render('events/Show', [
            'event' => $event,
        ]);
    }
}
