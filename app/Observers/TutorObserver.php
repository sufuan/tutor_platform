<?php

namespace App\Observers;

use App\Models\Tutor;

class TutorObserver
{
    public function created(Tutor $tutor): void
    {
        $tutor->update([
            'tutor_code' => 'TUT-' . str_pad($tutor->id, 5, '0', STR_PAD_LEFT)
        ]);
    }
}
