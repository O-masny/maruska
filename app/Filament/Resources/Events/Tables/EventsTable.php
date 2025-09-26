<?php

namespace App\Filament\Resources\Events\Tables;

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

class EventsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('Obrázek')
                    ->size(48)
                    ->circular(),

                TextColumn::make('title')
                    ->label('Název akce')
                    ->limit(40)
                    ->searchable()
                    ->sortable(),

                BadgeColumn::make('type')
                    ->label('Typ')
                    ->color('info'),

                TextColumn::make('date')
                    ->label('Datum')
                    ->date('d.m.Y')
                    ->sortable(),

                TextColumn::make('capacity')
                    ->label('Kapacita')
                    ->getStateUsing(fn($record) => "{$record->capacity} míst"),
            ])
            ->defaultSort('date', 'desc')
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
