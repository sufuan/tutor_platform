<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subjects')->delete();

        // Get category IDs
        $academicTutoring = Category::where('slug', 'academic-tutoring')->first()->id;
        $englishMedium = Category::where('slug', 'english-medium-tutoring')->first()->id;
        $banglaMedium = Category::where('slug', 'bangla-medium-tutoring')->first()->id;
        $specialNeeds = Category::where('slug', 'special-needs-support')->first()->id;
        $musicLessons = Category::where('slug', 'music-lessons')->first()->id;
        $artDrawing = Category::where('slug', 'art-drawing')->first()->id;
        $languageLearning = Category::where('slug', 'language-learning')->first()->id;
        $scienceLabs = Category::where('slug', 'science-labs')->first()->id;
        $computerCoding = Category::where('slug', 'computer-coding')->first()->id;
        $sportsCoaching = Category::where('slug', 'sports-coaching')->first()->id;
        $religiousStudies = Category::where('slug', 'religious-studies')->first()->id;
        $examPreparation = Category::where('slug', 'exam-preparation')->first()->id;
        $universitySubjects = Category::where('slug', 'university-subjects')->first()->id;

        $subjects = [
            // Academic Tutoring (30 subjects)
            ['name' => 'Mathematics', 'slug' => 'mathematics', 'category_id' => $academicTutoring],
            ['name' => 'Physics', 'slug' => 'physics', 'category_id' => $academicTutoring],
            ['name' => 'Chemistry', 'slug' => 'chemistry', 'category_id' => $academicTutoring],
            ['name' => 'Biology', 'slug' => 'biology', 'category_id' => $academicTutoring],
            ['name' => 'English', 'slug' => 'english', 'category_id' => $academicTutoring],
            ['name' => 'Bangla', 'slug' => 'bangla', 'category_id' => $academicTutoring],
            ['name' => 'General Science', 'slug' => 'general-science', 'category_id' => $academicTutoring],
            ['name' => 'Social Science', 'slug' => 'social-science', 'category_id' => $academicTutoring],
            ['name' => 'History', 'slug' => 'history', 'category_id' => $academicTutoring],
            ['name' => 'Geography', 'slug' => 'geography', 'category_id' => $academicTutoring],
            ['name' => 'Economics', 'slug' => 'economics', 'category_id' => $academicTutoring],
            ['name' => 'Accounting', 'slug' => 'accounting', 'category_id' => $academicTutoring],
            ['name' => 'Business Studies', 'slug' => 'business-studies', 'category_id' => $academicTutoring],
            ['name' => 'ICT', 'slug' => 'ict', 'category_id' => $academicTutoring],
            ['name' => 'Statistics', 'slug' => 'statistics', 'category_id' => $academicTutoring],
            ['name' => 'Civics', 'slug' => 'civics', 'category_id' => $academicTutoring],
            ['name' => 'Agriculture', 'slug' => 'agriculture', 'category_id' => $academicTutoring],
            ['name' => 'Home Economics', 'slug' => 'home-economics', 'category_id' => $academicTutoring],
            ['name' => 'Physical Education', 'slug' => 'physical-education', 'category_id' => $academicTutoring],
            ['name' => 'Algebra', 'slug' => 'algebra', 'category_id' => $academicTutoring],
            ['name' => 'Geometry', 'slug' => 'geometry', 'category_id' => $academicTutoring],
            ['name' => 'Trigonometry', 'slug' => 'trigonometry', 'category_id' => $academicTutoring],
            ['name' => 'Calculus', 'slug' => 'calculus', 'category_id' => $academicTutoring],
            ['name' => 'General Knowledge', 'slug' => 'general-knowledge', 'category_id' => $academicTutoring],
            ['name' => 'Environmental Science', 'slug' => 'environmental-science', 'category_id' => $academicTutoring],
            ['name' => 'Psychology', 'slug' => 'psychology', 'category_id' => $academicTutoring],
            ['name' => 'Sociology', 'slug' => 'sociology', 'category_id' => $academicTutoring],
            ['name' => 'Political Science', 'slug' => 'political-science', 'category_id' => $academicTutoring],
            ['name' => 'Philosophy', 'slug' => 'philosophy', 'category_id' => $academicTutoring],
            ['name' => 'Logic', 'slug' => 'logic', 'category_id' => $academicTutoring],

            // English Medium Tutoring (12 subjects)
            ['name' => 'Cambridge IGCSE', 'slug' => 'cambridge-igcse', 'category_id' => $englishMedium],
            ['name' => 'Cambridge O Level', 'slug' => 'cambridge-o-level', 'category_id' => $englishMedium],
            ['name' => 'Cambridge A Level', 'slug' => 'cambridge-a-level', 'category_id' => $englishMedium],
            ['name' => 'Edexcel IGCSE', 'slug' => 'edexcel-igcse', 'category_id' => $englishMedium],
            ['name' => 'Edexcel A Level', 'slug' => 'edexcel-a-level', 'category_id' => $englishMedium],
            ['name' => 'IB Diploma', 'slug' => 'ib-diploma', 'category_id' => $englishMedium],
            ['name' => 'SAT Preparation', 'slug' => 'sat-preparation', 'category_id' => $englishMedium],
            ['name' => 'IELTS Preparation', 'slug' => 'ielts-preparation', 'category_id' => $englishMedium],
            ['name' => 'TOEFL Preparation', 'slug' => 'toefl-preparation', 'category_id' => $englishMedium],
            ['name' => 'GRE Preparation', 'slug' => 'gre-preparation', 'category_id' => $englishMedium],
            ['name' => 'GMAT Preparation', 'slug' => 'gmat-preparation', 'category_id' => $englishMedium],
            ['name' => 'English Literature', 'slug' => 'english-literature', 'category_id' => $englishMedium],

            // Bangla Medium Tutoring (8 subjects)
            ['name' => 'Class 1-5 All Subjects', 'slug' => 'class-1-5-all-subjects', 'category_id' => $banglaMedium],
            ['name' => 'Class 6-8 All Subjects', 'slug' => 'class-6-8-all-subjects', 'category_id' => $banglaMedium],
            ['name' => 'Class 9-10 Science', 'slug' => 'class-9-10-science', 'category_id' => $banglaMedium],
            ['name' => 'Class 9-10 Business', 'slug' => 'class-9-10-business', 'category_id' => $banglaMedium],
            ['name' => 'Class 9-10 Arts', 'slug' => 'class-9-10-arts', 'category_id' => $banglaMedium],
            ['name' => 'HSC Science', 'slug' => 'hsc-science', 'category_id' => $banglaMedium],
            ['name' => 'HSC Business', 'slug' => 'hsc-business', 'category_id' => $banglaMedium],
            ['name' => 'HSC Arts', 'slug' => 'hsc-arts', 'category_id' => $banglaMedium],

            // Special Needs Support (5 subjects)
            ['name' => 'Autism Support', 'slug' => 'autism-support', 'category_id' => $specialNeeds],
            ['name' => 'Dyslexia Support', 'slug' => 'dyslexia-support', 'category_id' => $specialNeeds],
            ['name' => 'ADHD Support', 'slug' => 'adhd-support', 'category_id' => $specialNeeds],
            ['name' => 'Speech Therapy', 'slug' => 'speech-therapy', 'category_id' => $specialNeeds],
            ['name' => 'Behavioral Therapy', 'slug' => 'behavioral-therapy', 'category_id' => $specialNeeds],

            // Music Lessons (10 subjects)
            ['name' => 'Piano', 'slug' => 'piano', 'category_id' => $musicLessons],
            ['name' => 'Guitar', 'slug' => 'guitar', 'category_id' => $musicLessons],
            ['name' => 'Keyboard', 'slug' => 'keyboard', 'category_id' => $musicLessons],
            ['name' => 'Tabla', 'slug' => 'tabla', 'category_id' => $musicLessons],
            ['name' => 'Violin', 'slug' => 'violin', 'category_id' => $musicLessons],
            ['name' => 'Flute', 'slug' => 'flute', 'category_id' => $musicLessons],
            ['name' => 'Drums', 'slug' => 'drums', 'category_id' => $musicLessons],
            ['name' => 'Vocal Training', 'slug' => 'vocal-training', 'category_id' => $musicLessons],
            ['name' => 'Classical Music', 'slug' => 'classical-music', 'category_id' => $musicLessons],
            ['name' => 'Music Theory', 'slug' => 'music-theory', 'category_id' => $musicLessons],

            // Art & Drawing (8 subjects)
            ['name' => 'Pencil Drawing', 'slug' => 'pencil-drawing', 'category_id' => $artDrawing],
            ['name' => 'Painting', 'slug' => 'painting', 'category_id' => $artDrawing],
            ['name' => 'Watercolor', 'slug' => 'watercolor', 'category_id' => $artDrawing],
            ['name' => 'Oil Painting', 'slug' => 'oil-painting', 'category_id' => $artDrawing],
            ['name' => 'Sketching', 'slug' => 'sketching', 'category_id' => $artDrawing],
            ['name' => 'Calligraphy', 'slug' => 'calligraphy', 'category_id' => $artDrawing],
            ['name' => 'Digital Art', 'slug' => 'digital-art', 'category_id' => $artDrawing],
            ['name' => 'Craft & Handicraft', 'slug' => 'craft-handicraft', 'category_id' => $artDrawing],

            // Language Learning (12 subjects)
            ['name' => 'Arabic', 'slug' => 'arabic', 'category_id' => $languageLearning],
            ['name' => 'French', 'slug' => 'french', 'category_id' => $languageLearning],
            ['name' => 'Spanish', 'slug' => 'spanish', 'category_id' => $languageLearning],
            ['name' => 'German', 'slug' => 'german', 'category_id' => $languageLearning],
            ['name' => 'Japanese', 'slug' => 'japanese', 'category_id' => $languageLearning],
            ['name' => 'Korean', 'slug' => 'korean', 'category_id' => $languageLearning],
            ['name' => 'Mandarin Chinese', 'slug' => 'mandarin-chinese', 'category_id' => $languageLearning],
            ['name' => 'Hindi', 'slug' => 'hindi', 'category_id' => $languageLearning],
            ['name' => 'Urdu', 'slug' => 'urdu', 'category_id' => $languageLearning],
            ['name' => 'Italian', 'slug' => 'italian', 'category_id' => $languageLearning],
            ['name' => 'Russian', 'slug' => 'russian', 'category_id' => $languageLearning],
            ['name' => 'Turkish', 'slug' => 'turkish', 'category_id' => $languageLearning],

            // Science Labs (6 subjects)
            ['name' => 'Physics Lab', 'slug' => 'physics-lab', 'category_id' => $scienceLabs],
            ['name' => 'Chemistry Lab', 'slug' => 'chemistry-lab', 'category_id' => $scienceLabs],
            ['name' => 'Biology Lab', 'slug' => 'biology-lab', 'category_id' => $scienceLabs],
            ['name' => 'Robotics', 'slug' => 'robotics', 'category_id' => $scienceLabs],
            ['name' => 'Electronics', 'slug' => 'electronics', 'category_id' => $scienceLabs],
            ['name' => 'Science Projects', 'slug' => 'science-projects', 'category_id' => $scienceLabs],

            // Computer Coding (12 subjects)
            ['name' => 'Python Programming', 'slug' => 'python-programming', 'category_id' => $computerCoding],
            ['name' => 'Java Programming', 'slug' => 'java-programming', 'category_id' => $computerCoding],
            ['name' => 'C++ Programming', 'slug' => 'cpp-programming', 'category_id' => $computerCoding],
            ['name' => 'Web Development', 'slug' => 'web-development', 'category_id' => $computerCoding],
            ['name' => 'HTML & CSS', 'slug' => 'html-css', 'category_id' => $computerCoding],
            ['name' => 'JavaScript', 'slug' => 'javascript', 'category_id' => $computerCoding],
            ['name' => 'React JS', 'slug' => 'react-js', 'category_id' => $computerCoding],
            ['name' => 'Node JS', 'slug' => 'node-js', 'category_id' => $computerCoding],
            ['name' => 'Mobile App Development', 'slug' => 'mobile-app-development', 'category_id' => $computerCoding],
            ['name' => 'Game Development', 'slug' => 'game-development', 'category_id' => $computerCoding],
            ['name' => 'Data Structures', 'slug' => 'data-structures', 'category_id' => $computerCoding],
            ['name' => 'Algorithms', 'slug' => 'algorithms', 'category_id' => $computerCoding],

            // Sports Coaching (10 subjects)
            ['name' => 'Cricket Coaching', 'slug' => 'cricket-coaching', 'category_id' => $sportsCoaching],
            ['name' => 'Football Coaching', 'slug' => 'football-coaching', 'category_id' => $sportsCoaching],
            ['name' => 'Swimming', 'slug' => 'swimming', 'category_id' => $sportsCoaching],
            ['name' => 'Badminton', 'slug' => 'badminton', 'category_id' => $sportsCoaching],
            ['name' => 'Tennis', 'slug' => 'tennis', 'category_id' => $sportsCoaching],
            ['name' => 'Basketball', 'slug' => 'basketball', 'category_id' => $sportsCoaching],
            ['name' => 'Volleyball', 'slug' => 'volleyball', 'category_id' => $sportsCoaching],
            ['name' => 'Karate', 'slug' => 'karate', 'category_id' => $sportsCoaching],
            ['name' => 'Yoga', 'slug' => 'yoga', 'category_id' => $sportsCoaching],
            ['name' => 'Gym Training', 'slug' => 'gym-training', 'category_id' => $sportsCoaching],

            // Religious Studies (6 subjects)
            ['name' => 'Quran Recitation', 'slug' => 'quran-recitation', 'category_id' => $religiousStudies],
            ['name' => 'Tajweed', 'slug' => 'tajweed', 'category_id' => $religiousStudies],
            ['name' => 'Islamic Studies', 'slug' => 'islamic-studies', 'category_id' => $religiousStudies],
            ['name' => 'Hadith', 'slug' => 'hadith', 'category_id' => $religiousStudies],
            ['name' => 'Fiqh', 'slug' => 'fiqh', 'category_id' => $religiousStudies],
            ['name' => 'Arabic for Quran', 'slug' => 'arabic-for-quran', 'category_id' => $religiousStudies],

            // Exam Preparation (8 subjects)
            ['name' => 'SSC Preparation', 'slug' => 'ssc-preparation', 'category_id' => $examPreparation],
            ['name' => 'HSC Preparation', 'slug' => 'hsc-preparation', 'category_id' => $examPreparation],
            ['name' => 'University Admission', 'slug' => 'university-admission', 'category_id' => $examPreparation],
            ['name' => 'BCS Preparation', 'slug' => 'bcs-preparation', 'category_id' => $examPreparation],
            ['name' => 'Bank Job Preparation', 'slug' => 'bank-job-preparation', 'category_id' => $examPreparation],
            ['name' => 'Medical Admission', 'slug' => 'medical-admission', 'category_id' => $examPreparation],
            ['name' => 'Engineering Admission', 'slug' => 'engineering-admission', 'category_id' => $examPreparation],
            ['name' => 'Competitive Exams', 'slug' => 'competitive-exams', 'category_id' => $examPreparation],

            // University Subjects (15 subjects)
            ['name' => 'Computer Science', 'slug' => 'computer-science', 'category_id' => $universitySubjects],
            ['name' => 'Engineering Mathematics', 'slug' => 'engineering-mathematics', 'category_id' => $universitySubjects],
            ['name' => 'Electrical Engineering', 'slug' => 'electrical-engineering', 'category_id' => $universitySubjects],
            ['name' => 'Mechanical Engineering', 'slug' => 'mechanical-engineering', 'category_id' => $universitySubjects],
            ['name' => 'Civil Engineering', 'slug' => 'civil-engineering', 'category_id' => $universitySubjects],
            ['name' => 'Finance', 'slug' => 'finance', 'category_id' => $universitySubjects],
            ['name' => 'Marketing', 'slug' => 'marketing', 'category_id' => $universitySubjects],
            ['name' => 'Management', 'slug' => 'management', 'category_id' => $universitySubjects],
            ['name' => 'Law', 'slug' => 'law', 'category_id' => $universitySubjects],
            ['name' => 'Medicine', 'slug' => 'medicine', 'category_id' => $universitySubjects],
            ['name' => 'Pharmacy', 'slug' => 'pharmacy', 'category_id' => $universitySubjects],
            ['name' => 'Biochemistry', 'slug' => 'biochemistry', 'category_id' => $universitySubjects],
            ['name' => 'Microbiology', 'slug' => 'microbiology', 'category_id' => $universitySubjects],
            ['name' => 'Architecture', 'slug' => 'architecture', 'category_id' => $universitySubjects],
            ['name' => 'Data Science', 'slug' => 'data-science', 'category_id' => $universitySubjects],
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }

        $this->command->info('142 subjects seeded successfully!');
    }
}
