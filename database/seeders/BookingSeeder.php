<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Booking;
use App\Models\Application;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Get confirmed applications
            $confirmedApplications = Application::where('status', 'confirmed')
                ->with(['job.guardian', 'tutor'])
                ->limit(40)
                ->get();

            if ($confirmedApplications->count() === 0) {
                $this->command->warn('No confirmed applications found. Skipping bookings seeding.');
                return;
            }

            // Distribution: 25 trial, 12 active, 3 completed
            $statusDistribution = [
                'trial' => 25,
                'active' => 12,
                'completed' => 3,
            ];

            $bookingCount = 0;

            foreach ($statusDistribution as $status => $count) {
                for ($i = 0; $i < $count && $bookingCount < $confirmedApplications->count(); $i++) {
                    $application = $confirmedApplications[$bookingCount];
                    
                    $startDate = Carbon::parse($application->status_updated_at)->addDays(rand(1, 7));
                    
                    $endDate = null;
                    if ($status === 'completed') {
                        $endDate = $startDate->copy()->addMonths(rand(2, 6));
                    } elseif ($status === 'active') {
                        // No end date for active
                        $endDate = null;
                    } elseif ($status === 'trial') {
                        // Trial period, might have end date or not
                        $endDate = rand(0, 1) ? $startDate->copy()->addDays(rand(7, 14)) : null;
                    }

                    Booking::create([
                        'job_id' => $application->job_id,
                        'tutor_id' => $application->tutor_id,
                        'guardian_id' => $application->job->guardian_id,
                        'application_id' => $application->id,
                        'status' => $status,
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                        'created_at' => $startDate,
                        'updated_at' => $endDate ?? $startDate,
                    ]);

                    $bookingCount++;
                }
            }
        });

        $this->command->info('40 bookings seeded successfully (25 trial, 12 active, 3 completed)');
    }
}
