<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Illuminate\Support\Str;

class BlogPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Základní informace')
                ->description('Nadpis a autor článku.')
                ->schema([
                    Grid::make(2)->schema([
                        TextInput::make('title')
                            ->label('Název článku')
                            ->required()
                            ->maxLength(160)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $state, callable $set, callable $get) {
                                // automaticky vytvoří slug, ale neukazuje se ve formu
                                if (!$get('slug')) {
                                    $set('slug', Str::slug($state));
                                }
                            }),

                        Select::make('user_id')
                            ->label('Autor')
                            ->relationship('author', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                    ]),

                    DateTimePicker::make('published_at')
                        ->label('Publikováno')
                        ->native(false)
                        ->seconds(false),
                ])
                ->columns(1),

            Section::make('Obsah článku')
                ->description('Perex a hlavní text článku.')
                ->schema([
                    Textarea::make('excerpt')
                        ->label('Perex / Úvod')
                        ->rows(3)
                        ->maxLength(300)
                        ->helperText('Zobrazí se v náhledu článku.'),

                    RichEditor::make('content')
                        ->label('Hlavní obsah')
                        ->toolbarButtons([
                            'bold',
                            'italic',
                            'link',
                            'bulletList',
                            'orderedList',
                            'blockquote',
                            'codeBlock',
                        ])
                        ->required()
                        ->columnSpanFull(),
                ]),

            Section::make('Náhledový obrázek')
                ->schema([
                    FileUpload::make('cover_image')
                        ->label('Obrázek')
                        ->directory('blog')
                        ->disk('public')
                        ->image()
                        ->imagePreviewHeight('200')
                        ->maxSize(4096)
                        ->helperText('Doporučené 16:9, např. 1200×675 px.'),
                ]),
        ]);
    }
}
