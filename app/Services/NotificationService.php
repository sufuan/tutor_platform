<?php

namespace App\Services;

use App\Models\{User, Notification};

class NotificationService
{
    public static function notify(User $user, string $type, string $title, string $message, array $data = []): void
    {
        Notification::create([
            'user_id' => $user->id,
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'data' => $data,
        ]);
        
        // TODO: Add email notification functionality here when needed
    }
}
