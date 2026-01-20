<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\SiteSetting;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            $settings = [
                [
                    'key' => 'hero_title',
                    'value' => 'Find Your Perfect Tutor in Bangladesh',
                ],
                [
                    'key' => 'hero_subtitle',
                    'value' => 'Connect with qualified tutors for personalized home and online tuition across Dhaka and beyond',
                ],
                [
                    'key' => 'featured_jobs_count',
                    'value' => '40',
                ],
                [
                    'key' => 'total_tutors_count',
                    'value' => '100',
                ],
                [
                    'key' => 'total_guardians_count',
                    'value' => '50',
                ],
                [
                    'key' => 'total_jobs_posted',
                    'value' => '120',
                ],
                [
                    'key' => 'success_rate',
                    'value' => '95',
                ],
                [
                    'key' => 'contact_email',
                    'value' => 'info@tutorbd.com',
                ],
                [
                    'key' => 'contact_phone',
                    'value' => '+880 1712-345678',
                ],
                [
                    'key' => 'contact_phone_alt',
                    'value' => '+880 1812-345678',
                ],
                [
                    'key' => 'address',
                    'value' => 'House 42, Road 12, Dhanmondi, Dhaka 1209, Bangladesh',
                ],
                [
                    'key' => 'facebook_url',
                    'value' => 'https://facebook.com/tutorbd',
                ],
                [
                    'key' => 'twitter_url',
                    'value' => 'https://twitter.com/tutorbd',
                ],
                [
                    'key' => 'linkedin_url',
                    'value' => 'https://linkedin.com/company/tutorbd',
                ],
                [
                    'key' => 'youtube_url',
                    'value' => 'https://youtube.com/@tutorbd',
                ],
                [
                    'key' => 'instagram_url',
                    'value' => 'https://instagram.com/tutorbd',
                ],
                [
                    'key' => 'about_us_text',
                    'value' => 'We are Bangladesh\'s leading online tutoring platform, connecting students with qualified tutors for home and online tuition. Our mission is to make quality education accessible to every student across the country. With a network of verified, experienced tutors and a user-friendly platform, we help parents find the perfect tutor for their children\'s academic needs. Whether you need help with school subjects, competitive exam preparation, or skill development, our tutors are here to help students achieve their full potential.',
                ],
                [
                    'key' => 'terms_text',
                    'value' => 'Welcome to our tutoring platform. By using our services, you agree to these terms and conditions. Tutors must provide accurate information and maintain professional conduct. Guardians are responsible for payment terms and session scheduling. Both parties must treat each other with respect. We reserve the right to terminate accounts that violate our policies. Refund policies apply according to our guidelines. All content on this platform is protected by copyright. Users must not misuse the platform or engage in fraudulent activities. We are not liable for disputes between tutors and guardians but will mediate when necessary.',
                ],
                [
                    'key' => 'privacy_text',
                    'value' => 'We value your privacy and are committed to protecting your personal information. We collect data necessary for providing our tutoring services, including names, contact information, and educational details. Your information is used solely for matching tutors with students and improving our services. We do not sell or share your personal data with third parties without consent. All payment information is processed securely. You have the right to access, modify, or delete your data at any time. We use cookies to enhance your browsing experience. By using our platform, you consent to our privacy practices. For questions, please contact our support team.',
                ],
                [
                    'key' => 'site_name',
                    'value' => 'TutorBD',
                ],
                [
                    'key' => 'site_tagline',
                    'value' => 'Your Trusted Tutoring Partner',
                ],
                [
                    'key' => 'meta_description',
                    'value' => 'Find qualified home tutors and online tutors in Bangladesh. Connect with experienced educators for personalized tuition in all subjects and levels.',
                ],
                [
                    'key' => 'meta_keywords',
                    'value' => 'tutor bangladesh, home tutor dhaka, online tuition, private tutor, tutoring jobs, find tutor',
                ],
                [
                    'key' => 'commission_rate',
                    'value' => '10',
                ],
                [
                    'key' => 'platform_fee',
                    'value' => '500',
                ],
                [
                    'key' => 'support_hours',
                    'value' => 'Saturday - Thursday: 9 AM - 6 PM',
                ],
                [
                    'key' => 'whatsapp_number',
                    'value' => '+8801712345678',
                ],
                [
                    'key' => 'show_job_count',
                    'value' => 'true',
                ],
                [
                    'key' => 'show_tutor_count',
                    'value' => 'true',
                ],
                [
                    'key' => 'enable_online_payment',
                    'value' => 'true',
                ],
                [
                    'key' => 'enable_tutor_verification',
                    'value' => 'true',
                ],
            ];

            foreach ($settings as $setting) {
                SiteSetting::create($setting);
            }
        });

        $this->command->info('Site settings seeded successfully');
    }
}
