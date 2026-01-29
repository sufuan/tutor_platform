<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use App\Models\Subject;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminFrontendSettingsController extends Controller
{
    public function index()
    {
        $settings = [
            'hero_image' => SiteSetting::get('hero_image', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'),
            'promo_banner_image' => SiteSetting::get('promo_banner_image', ''),
            'show_promo_banner' => SiteSetting::get('show_promo_banner', '0') === '1',
            'hero_title' => SiteSetting::get('hero_title', 'Find the Perfect Tutor'),
            'hero_subtitle' => SiteSetting::get('hero_subtitle', 'Connect with Bangladesh\'s finest verified tutors. Transform your learning journey with personalized education tailored to your needs.'),
            'stats_tutors' => SiteSetting::get('stats_tutors', '850'),
            'stats_jobs' => SiteSetting::get('stats_jobs', '1250'),
            'stats_success_rate' => SiteSetting::get('stats_success_rate', '95'),
            'stats_students' => SiteSetting::get('stats_students', '2400'),
            'tuition_types' => SiteSetting::get('tuition_types', json_encode([
                ['title' => 'Home Tutoring', 'description' => 'Home tutoring allows students to learn various subjects in their own home.', 'icon' => 'Home'],
                ['title' => 'Group Tutoring', 'description' => 'Group tutoring allows students to learn together and solve problems at an affordable cost.', 'icon' => 'UsersRound'],
                ['title' => 'Online Tutoring', 'description' => 'Hire the best tutors from anywhere and take online classes by using tools such as Google Meet, Zoom and more.', 'icon' => 'Monitor'],
                ['title' => 'Package Tutoring', 'description' => 'Package tutoring helps students to complete their studies within a specific time frame.', 'icon' => 'Package'],
            ])),
            'serving_categories' => SiteSetting::get('serving_categories', json_encode([
                ['name' => 'Bangla Medium', 'icon' => 'Languages'],
                ['name' => 'English Version', 'icon' => 'BookOpen'],
                ['name' => 'English Medium', 'icon' => 'GraduationCap'],
                ['name' => 'Madrasa Medium', 'icon' => 'BookOpen'],
                ['name' => 'Quran and Islamic Studies', 'icon' => 'BookOpen'],
                ['name' => 'Admission Preparation', 'icon' => 'Target'],
                ['name' => 'Skill Development', 'icon' => 'TrendingUp'],
                ['name' => 'Pre-school Education', 'icon' => 'Baby'],
                ['name' => 'Arts and Crafts', 'icon' => 'Palette'],
            ])),
            'how_it_works' => SiteSetting::get('how_it_works', json_encode([
                ['title' => 'Search', 'description' => 'Browse verified tutors by subject & location', 'icon' => 'Target'],
                ['title' => 'Compare', 'description' => 'Review profiles, ratings & experience', 'icon' => 'Users'],
                ['title' => 'Connect', 'description' => 'Book trial session instantly', 'icon' => 'CheckCircle'],
                ['title' => 'Excel', 'description' => 'Achieve your academic goals', 'icon' => 'Award'],
            ])),
            'contact_title' => SiteSetting::get('contact_title', 'Contact Us'),
            'contact_description' => SiteSetting::get('contact_description', 'Have any questions or need a tutor? We are here to help!'),
            'contact_address' => SiteSetting::get('contact_address', 'Salmanpur, Kotbari, Comilla, Bangladesh'),
            'contact_phone' => SiteSetting::get('contact_phone', '+880 1818 420012'),
            'contact_email' => SiteSetting::get('contact_email', 'tuitionbarta@gmail.com'),
            'contact_hours' => SiteSetting::get('contact_hours', 'Sat - Thu, 10:00 AM - 8:00 PM'),
            'social_facebook' => SiteSetting::get('social_facebook', 'https://facebook.com/tuitionbarta'),
            'social_linkedin' => SiteSetting::get('social_linkedin', 'https://linkedin.com/company/tuitionbarta'),
            'social_twitter' => SiteSetting::get('social_twitter', 'https://x.com/tuitionbarta'),
            'social_youtube' => SiteSetting::get('social_youtube', 'https://youtube.com/@tuitionbarta'),
            'social_whatsapp' => SiteSetting::get('social_whatsapp', 'https://wa.me/8801818420012'),
        ];

        $subjects = Subject::with('category')->orderBy('name')->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Admin/FrontendSettings', [
            'settings' => $settings,
            'subjects' => $subjects,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'promo_banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'show_promo_banner' => 'nullable|boolean',
            'hero_title' => 'nullable|string',
            'hero_subtitle' => 'nullable|string',
            'stats_tutors' => 'nullable|string|max:50',
            'stats_jobs' => 'nullable|string|max:50',
            'stats_success_rate' => 'nullable|string|max:50',
            'stats_students' => 'nullable|string|max:50',
            'tuition_types' => 'nullable|json',
            'serving_categories' => 'nullable|json',
            'how_it_works' => 'nullable|json',
            'contact_title' => 'nullable|string|max:255',
            'contact_description' => 'nullable|string',
            'contact_address' => 'nullable|string',
            'contact_phone' => 'nullable|string|max:50',
            'contact_email' => 'nullable|email|max:255',
            'contact_hours' => 'nullable|string|max:255',
            'social_facebook' => 'nullable|url|max:500',
            'social_linkedin' => 'nullable|url|max:500',
            'social_twitter' => 'nullable|url|max:500',
            'social_youtube' => 'nullable|url|max:500',
            'social_whatsapp' => 'nullable|url|max:500',
        ]);

        // Handle hero image upload
        if ($request->hasFile('hero_image')) {
            $oldHeroImage = SiteSetting::get('hero_image');
            
            // Delete old image if it exists and is not the default URL
            if ($oldHeroImage && !str_starts_with($oldHeroImage, 'http')) {
                Storage::disk('public')->delete($oldHeroImage);
            }

            $heroImagePath = $request->file('hero_image')->store('frontend', 'public');
            SiteSetting::set('hero_image', '/storage/' . $heroImagePath);
        }

        // Handle promo banner image upload
        if ($request->hasFile('promo_banner_image')) {
            $oldPromoImage = SiteSetting::get('promo_banner_image');
            
            // Delete old image if it exists
            if ($oldPromoImage && !str_starts_with($oldPromoImage, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $oldPromoImage));
            }

            $promoImagePath = $request->file('promo_banner_image')->store('frontend', 'public');
            SiteSetting::set('promo_banner_image', '/storage/' . $promoImagePath);
        }

        // Handle show promo banner toggle
        if ($request->has('show_promo_banner')) {
            SiteSetting::set('show_promo_banner', $request->show_promo_banner ? '1' : '0');
        }

        // Handle footer information updates
        $footerFields = [
            'hero_title', 'hero_subtitle',
            'stats_tutors', 'stats_jobs', 'stats_success_rate', 'stats_students',
            'tuition_types', 'serving_categories', 'how_it_works',
            'contact_title', 'contact_description', 'contact_address',
            'contact_phone', 'contact_email', 'contact_hours',
            'social_facebook', 'social_linkedin', 'social_twitter',
            'social_youtube', 'social_whatsapp'
        ];

        foreach ($footerFields as $field) {
            if ($request->has($field)) {
                SiteSetting::set($field, $request->$field);
            }
        }

        return back()->with('success', 'Frontend settings updated successfully!');
    }

    public function storeSubject(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:subjects,name',
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Subject::create($validated);

        return back()->with('success', 'Subject created successfully!');
    }

    public function updateSubject(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:subjects,name,' . $subject->id,
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $subject->update($validated);

        return back()->with('success', 'Subject updated successfully!');
    }

    public function deleteSubject(Subject $subject)
    {
        $subject->delete();

        return back()->with('success', 'Subject deleted successfully!');
    }
}
