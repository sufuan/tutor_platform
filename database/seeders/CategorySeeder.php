<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->delete();

        $categories = [
            [
                'name' => 'Academic Tutoring',
                'slug' => 'academic-tutoring',
                'icon_path' => 'academic.svg',
                'description' => 'Professional tutoring for school and college level academic subjects including Math, Science, and Languages'
            ],
            [
                'name' => 'English Medium Tutoring',
                'slug' => 'english-medium-tutoring',
                'icon_path' => 'english-medium.svg',
                'description' => 'Specialized tutoring for English medium curriculum including Cambridge, Edexcel, and IB programs'
            ],
            [
                'name' => 'Bangla Medium Tutoring',
                'slug' => 'bangla-medium-tutoring',
                'icon_path' => 'bangla-medium.svg',
                'description' => 'Comprehensive tutoring for Bangla medium curriculum following National Curriculum and Textbook Board'
            ],
            [
                'name' => 'Special Needs Support',
                'slug' => 'special-needs-support',
                'icon_path' => 'special-needs.svg',
                'description' => 'Personalized tutoring and support for students with special educational needs and learning disabilities'
            ],
            [
                'name' => 'Music Lessons',
                'slug' => 'music-lessons',
                'icon_path' => 'music.svg',
                'description' => 'Learn to play instruments, vocal training, and music theory from experienced instructors'
            ],
            [
                'name' => 'Art & Drawing',
                'slug' => 'art-drawing',
                'icon_path' => 'art.svg',
                'description' => 'Creative art classes including drawing, painting, sketching, and various art techniques'
            ],
            [
                'name' => 'Language Learning',
                'slug' => 'language-learning',
                'icon_path' => 'language.svg',
                'description' => 'Master new languages with native speakers and certified language instructors'
            ],
            [
                'name' => 'Science Labs',
                'slug' => 'science-labs',
                'icon_path' => 'science.svg',
                'description' => 'Practical science experiments and hands-on laboratory training for students'
            ],
            [
                'name' => 'Computer Coding',
                'slug' => 'computer-coding',
                'icon_path' => 'coding.svg',
                'description' => 'Programming and coding classes for beginners to advanced students in various languages'
            ],
            [
                'name' => 'Sports Coaching',
                'slug' => 'sports-coaching',
                'icon_path' => 'sports.svg',
                'description' => 'Professional coaching for various sports including cricket, football, swimming, and more'
            ],
            [
                'name' => 'Religious Studies',
                'slug' => 'religious-studies',
                'icon_path' => 'religion.svg',
                'description' => 'Islamic studies, Quran recitation, Arabic, and religious education from qualified teachers'
            ],
            [
                'name' => 'Exam Preparation',
                'slug' => 'exam-preparation',
                'icon_path' => 'exam.svg',
                'description' => 'Intensive preparation for competitive exams like SSC, HSC, University Admission, BCS, and more'
            ],
            [
                'name' => 'University Subjects',
                'slug' => 'university-subjects',
                'icon_path' => 'university.svg',
                'description' => 'Advanced tutoring for university-level subjects across Engineering, Business, Arts, and Science'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        $this->command->info('13 categories seeded successfully!');
    }
}
