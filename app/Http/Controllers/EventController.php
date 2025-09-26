<?php
namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('date', 'asc')->get();

        return Inertia::render('events/Index', [
            'events' => $events,
        ]);
    }

    public function show(Event $event)
    {
        return Inertia::render('events/Show', [
            'event' => $event,
        ]);
    }
}
