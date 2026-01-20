<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Media;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            $mediaItems = [
                // Hero banners (3)
                [
                    'category' => 'hero_banner',
                    'file_path' => '/assets/images/hero/tutor-student-1.jpg',
                    'alt_text' => 'Tutor teaching student at home in Dhaka',
                ],
                [
                    'category' => 'hero_banner',
                    'file_path' => '/assets/images/hero/online-class-1.jpg',
                    'alt_text' => 'Online tutoring session in progress',
                ],
                [
                    'category' => 'hero_banner',
                    'file_path' => '/assets/images/hero/group-study-1.jpg',
                    'alt_text' => 'Group study session with tutor',
                ],

                // Category icons (13)
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/academic-tutoring.svg',
                    'alt_text' => 'Academic Tutoring',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/language-learning.svg',
                    'alt_text' => 'Language Learning',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/skill-development.svg',
                    'alt_text' => 'Skill Development',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/exam-preparation.svg',
                    'alt_text' => 'Exam Preparation',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/music-lessons.svg',
                    'alt_text' => 'Music Lessons',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/art-lessons.svg',
                    'alt_text' => 'Art Lessons',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/computer-programming.svg',
                    'alt_text' => 'Computer Programming',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/religious-studies.svg',
                    'alt_text' => 'Religious Studies',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/sports-coaching.svg',
                    'alt_text' => 'Sports Coaching',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/special-education.svg',
                    'alt_text' => 'Special Education',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/professional-training.svg',
                    'alt_text' => 'Professional Training',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/test-prep.svg',
                    'alt_text' => 'Test Preparation',
                ],
                [
                    'category' => 'category_icon',
                    'file_path' => '/assets/images/categories/hobby-classes.svg',
                    'alt_text' => 'Hobby Classes',
                ],

                // Testimonial photos (10)
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-1.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-2.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-3.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-4.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-5.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-6.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-7.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-8.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-9.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],
                [
                    'category' => 'testimonial_photo',
                    'file_path' => '/assets/images/testimonials/guardian-10.jpg',
                    'alt_text' => 'Parent testimonial photo',
                ],

                // Partner logos (8)
                [
                    'category' => 'partner_logo',
                    'file_path' => '/assets/images/partners/dhaka-university.png',
                    'alt_text' => 'University of Dhaka',
                ],
                [
                    'category' => 'partner_logo',
                    'file_path' => '/assets/images/partners/buet.png',
                    'alt_text' => 'BUET - Bangladesh University of Engineering and Technology',
                ],
                [
                    'category' => 'partner_logo',
                    'file_path' => '/assets/images/partners/brac-university.png',
                    'alt_text' => 'BRAC University',
                ],
                [
                    'category' => 'partner_logo',
                    'file_path' => '/assets/images/partners/north-south-university.png',
                    'alt_text' => 'North South University',
                ],
                [
                    'category' => 'partner_logo',
                    'file_path' => '/assets/images/partners/independent-university.png',
                    'alt_text' => 'Independent University Bangladesh',
                ],
                [
                    'category' => 'partner_logo',
                    'file_path' => '/assets/images/partners/ahsanullah-university.png',
                    'alt_text' => 'Ahsanullah University of Science and Technology',
                ],
                [
                    'category' => 'partner_logo',
                    'file_path' => '/assets/images/partners/jahangirnagar-university.png',
                    'alt_text' => 'Jahangirnagar University',
                ],
                [
                    'category' => 'partner_logo',
                    'file_path' => '/assets/images/partners/east-west-university.png',
                    'alt_text' => 'East West University',
                ],

                // Media/Press logos (4)
                [
                    'category' => 'media_logo',
                    'file_path' => '/assets/images/media/prothom-alo.png',
                    'alt_text' => 'Prothom Alo - Leading Bangladeshi Newspaper',
                ],
                [
                    'category' => 'media_logo',
                    'file_path' => '/assets/images/media/daily-star.png',
                    'alt_text' => 'The Daily Star - Bangladesh News',
                ],
                [
                    'category' => 'media_logo',
                    'file_path' => '/assets/images/media/bdnews24.png',
                    'alt_text' => 'bdnews24.com - Bangladesh News Portal',
                ],
                [
                    'category' => 'media_logo',
                    'file_path' => '/assets/images/media/bbc-bangla.png',
                    'alt_text' => 'BBC Bangla',
                ],
            ];

            foreach ($mediaItems as $item) {
                Media::create($item);
            }
        });

        $this->command->info('Media assets seeded successfully (38 items)');
    }
}
