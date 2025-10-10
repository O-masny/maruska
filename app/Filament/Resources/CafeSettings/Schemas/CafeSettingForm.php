<?php

namespace App\Filament\Resources\CafeSettings\Schemas;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Checkbox;

class CafeSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Kontaktní informace')
                ->columns(2)
                ->schema([
                    Textarea::make('address')
                        ->label('Adresa')
                        ->rows(3)
                        ->required(),

                    TextInput::make('phone')
                        ->label('Telefon')
                        ->tel()
                        ->required(),

                    TextInput::make('email')
                        ->label('E-mail')
                        ->email()
                        ->required(),
                ]),

            Section::make('Otevírací doba')
                ->collapsible()
                ->schema([

                    Repeater::make('opening_hours')
                        ->label('Dny a časy')
                        ->columns(4)
                        ->schema([
                            TextInput::make('day')
                                ->label('Den')
                                ->placeholder('Pondělí – Pátek')
                                ->required(),

                            Checkbox::make('closed')
                                ->label('Zavřeno')
                                ->reactive(),

                            TimePicker::make('open')
                                ->label('Otevírá')
                                ->seconds(false)
                                ->visible(fn(Get $get) => !$get('closed'))
                                ->required(fn(Get $get) => !$get('closed')),

                            TimePicker::make('close')
                                ->label('Zavírá')
                                ->seconds(false)
                                ->visible(fn(Get $get) => !$get('closed'))
                                ->required(fn(Get $get) => !$get('closed')),
                        ])
                        ->default([
                            ['day' => 'Pondělí – Pátek', 'open' => '07:00', 'close' => '19:00', 'closed' => false],
                            ['day' => 'Sobota', 'open' => '08:00', 'close' => '21:00', 'closed' => false],
                            ['day' => 'Neděle', 'open' => null, 'close' => null, 'closed' => true],
                        ])
                        ->reorderable()
                        ->collapsible()

                ]),
        ]);
    }
}
