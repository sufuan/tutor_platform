<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Review;
use App\Models\Booking;
use Carbon\Carbon;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Get completed and active bookings
            $bookings = Booking::whereIn('status', ['completed', 'active'])
                ->with(['guardian.user', 'tutor.user'])
                ->get();

            if ($bookings->count() === 0) {
                $this->command->warn('No completed or active bookings found. Skipping reviews seeding.');
                return;
            }

            // Positive review comments
            $comments5Star = [
                'Excellent tutor! My child has shown remarkable improvement in understanding concepts. Very patient and dedicated. Highly recommended!',
                'Outstanding teaching skills. The tutor is punctual, professional, and genuinely cares about student progress. We are very satisfied.',
                'Amazing experience! My son\'s grades have improved significantly. The tutor explains everything clearly and makes learning enjoyable.',
                'Best tutor we have ever had! Very knowledgeable, patient, and encouraging. Our daughter looks forward to every session.',
                'Exceptional teacher! Uses creative methods to explain difficult topics. My child\'s confidence has grown tremendously.',
                'Highly professional and skilled educator. My child now enjoys studying and has become more confident in the subject.',
                'Wonderful tutor! Very caring and dedicated to helping students succeed. We have seen great improvement in just a few months.',
                'Fantastic teaching approach! The tutor is patient, understanding, and always prepared. Our son\'s performance has improved greatly.',
                'Extremely satisfied with the tutoring sessions. The tutor is knowledgeable, reliable, and has a great rapport with students.',
                'Perfect match for our family! The tutor is professional, punctual, and has helped our child develop a strong foundation.',
            ];

            $comments4Star = [
                'Very good tutor. My child has shown good progress. Sometimes sessions run a bit late, but overall very satisfied.',
                'Good teaching methods and patient approach. My daughter has improved her understanding. Would recommend.',
                'Solid tutor with good subject knowledge. My son is doing better in his exams. Happy with the progress.',
                'Great tutor! Very helpful and explains concepts well. A few scheduling issues, but overall excellent service.',
                'Good experience overall. The tutor is knowledgeable and patient. My child enjoys the sessions.',
                'Pleased with the tutoring. My child\'s grades have improved. The tutor could be more flexible with timings.',
                'Very good tutor! Patient and thorough in explanations. We have noticed positive changes in our child\'s performance.',
                'Satisfied with the teaching quality. The tutor is dedicated and my child has shown improvement.',
            ];

            $comments3Star = [
                'Decent tutor. My child is learning, but progress is slower than expected. Hope to see more improvement soon.',
                'Average experience. The tutor is knowledgeable but could be more engaging. My child finds some sessions boring.',
                'Okay tutor. My son has shown some improvement but we expected faster progress. Will continue for now.',
            ];

            $reviewCount = 0;
            $featuredCount = 0;
            $targetFeatured = 25;

            foreach ($bookings as $booking) {
                if ($reviewCount >= 100) break;

                // Mostly high ratings (3-5 stars, weighted towards 5)
                $ratingRoll = rand(1, 100);
                if ($ratingRoll <= 60) {
                    $rating = 5;
                    $comment = $comments5Star[array_rand($comments5Star)];
                } elseif ($ratingRoll <= 90) {
                    $rating = 4;
                    $comment = $comments4Star[array_rand($comments4Star)];
                } else {
                    $rating = 3;
                    $comment = $comments3Star[array_rand($comments3Star)];
                }

                $isFeatured = ($featuredCount < $targetFeatured && $rating === 5 && rand(1, 2) === 1);
                if ($isFeatured) {
                    $featuredCount++;
                }

                $reviewDate = $booking->status === 'completed' 
                    ? Carbon::parse($booking->end_date)->addDays(rand(1, 14))
                    : Carbon::parse($booking->start_date)->addMonths(rand(1, 3));

                Review::create([
                    'booking_id' => $booking->id,
                    'reviewer_id' => $booking->guardian->user_id,
                    'reviewee_id' => $booking->tutor->user_id,
                    'rating' => $rating,
                    'comment' => $comment,
                    'is_featured' => $isFeatured,
                    'created_at' => $reviewDate,
                    'updated_at' => $reviewDate,
                ]);

                $reviewCount++;
            }
        });

        $this->command->info('Reviews seeded successfully (up to 100 reviews with 25 featured)');
    }
}
