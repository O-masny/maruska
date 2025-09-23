<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser, HasName
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin', // přidáme sloupec pro admin flag
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }
    public function canAccessPanel(Panel $panel): bool
    {
        return true;
    }
    /**
     * Povolit přístup do adminu jen adminům
     */
    public function canAccessFilament(): bool
    {
        return $this->is_admin === true;
    }

    /**
     * Zobrazované jméno ve Filamentu (např. v headeru)
     */
    public function getFilamentName(): string
    {
        return $this->name;
    }

    // Pokud bys chtěl i avatar:
    // public function getFilamentAvatarUrl(): ?string
    // {
    //     return 'https://www.gravatar.com/avatar/' . md5(strtolower(trim($this->email)));
    // }
}
