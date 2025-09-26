<?php

namespace App\Filament\Resources\BlogPosts\Tables;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class BlogPostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('Obrázek')
                    ->circular()
                    ->size(48),

                TextColumn::make('title')
                    ->label('Název')
                    ->limit(40)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('author.name')
                    ->label('Autor')
                    ->sortable(),

                BadgeColumn::make('published_at')
                    ->label('Publikace')
                    ->date('d.m.Y H:i')
                    ->sortable()
                    ->color(fn($record) => $record->published_at ? 'success' : 'secondary')
                    ->formatStateUsing(fn($state) => $state ? 'Publikováno' : 'Koncept'),
            ])
            ->defaultSort('published_at', 'desc')
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
