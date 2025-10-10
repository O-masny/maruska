<?php

namespace App\Filament\Resources\CafeSettings\Pages;

use App\Filament\Resources\CafeSettings\CafeSettingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCafeSettings extends ListRecords
{
    protected static string $resource = CafeSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
