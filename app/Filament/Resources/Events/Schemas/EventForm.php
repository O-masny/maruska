<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Select;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Základní údaje')
                ->schema([
                    Grid::make(2)->schema([
                        TextInput::make('title')
                            ->label('Název akce')
                            ->required()
                            ->maxLength(160),

                        Select::make('type')
                            ->label('Typ akce')
                            ->options([
                                'kurz' => 'Kurz',
                                'degustace' => 'Degustace',
                                'kultura' => 'Kultura',
                                'workshop' => 'Workshop',
                            ])
                            ->required(),
                    ]),

                    Grid::make(3)->schema([
                        DatePicker::make('date')
                            ->label('Datum')
                            ->required(),

                        TimePicker::make('time')
                            ->label('Začátek')
                            ->seconds(false)
                            ->required(),

                        TextInput::make('location')
                            ->label('Místo konání')
                            ->placeholder('U Marušky')
                    ]),

                    Grid::make(2)->schema([
                        TextInput::make('capacity')
                            ->label('Kapacita')
                            ->numeric()
                            ->minValue(1)
                            ->suffix('osob'),

                        TextInput::make('price')
                            ->label('Cena')
                            ->numeric()
                            ->minValue(0)
                            ->prefix('Kč'),
                    ]),
                ])
                ->columns(1),

            Section::make('Popis')
                ->schema([
                    Textarea::make('description')
                        ->label('Popis akce')
                        ->rows(5)
                        ->required()
                        ->columnSpanFull(),
                ]),

            Section::make('Obrázek')
                ->schema([
                    FileUpload::make('cover_image')
                        ->label('Náhledový obrázek')
                        ->disk('public') 
                        ->directory('events')
                        ->image()
                        ->imagePreviewHeight('200')
                        ->maxSize(4096)
                        ->helperText('Doporučené 4:3, např. 1200×900 px.'),
                ]),
        ]);
    }
}
