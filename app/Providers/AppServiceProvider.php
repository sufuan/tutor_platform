<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\{Guardian, Tutor, Job};
use App\Observers\{GuardianObserver, TutorObserver, JobObserver};

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        Guardian::observe(GuardianObserver::class);
        Tutor::observe(TutorObserver::class);
        Job::observe(JobObserver::class);
    }
}
