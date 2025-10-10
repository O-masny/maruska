<?php

namespace App\Filament\Resources\CafeSettings\Pages;

use App\Filament\Resources\CafeSettings\CafeSettingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCafeSetting extends EditRecord
{
    protected static string $resource = CafeSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
