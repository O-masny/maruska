<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                DatePicker::make('date')
                    ->required(),
                TextInput::make('time')
                    ->required(),
                TextInput::make('type'),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('capacity')
                    ->numeric(),
                FileUpload::make('cover_image')
                    ->image(),
            ]);
    }
}
