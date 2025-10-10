<?php

namespace App\Filament\Resources\CafeSettings;

use App\Filament\Resources\CafeSettings\Pages\CreateCafeSetting;
use App\Filament\Resources\CafeSettings\Pages\EditCafeSetting;
use App\Filament\Resources\CafeSettings\Pages\ListCafeSettings;
use App\Filament\Resources\CafeSettings\Schemas\CafeSettingForm;
use App\Filament\Resources\CafeSettings\Tables\CafeSettingsTable;
use App\Models\CafeSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CafeSettingResource extends Resource
{
    protected static ?string $model = CafeSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return CafeSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CafeSettingsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCafeSettings::route('/'),
            'create' => CreateCafeSetting::route('/create'),
            'edit' => EditCafeSetting::route('/{record}/edit'),
        ];
    }
}
