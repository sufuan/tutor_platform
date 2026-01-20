<?php

namespace App\Observers;

use App\Models\Guardian;

class GuardianObserver
{
    public function created(Guardian $guardian): void
    {
        $guardian->update([
            'guardian_code' => 'GRD-' . str_pad($guardian->id, 5, '0', STR_PAD_LEFT)
        ]);
    }
}
