<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminFrontendSettingsController extends Controller
{
    public function index()
    {
        $settings = [
            'hero_image' => SiteSetting::get('hero_image', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'),
            'promo_banner_image' => SiteSetting::get('promo_banner_image', ''),
            'show_promo_banner' => SiteSetting::get('show_promo_banner', '0') === '1',
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

        return Inertia::render('Admin/FrontendSettings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'promo_banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'show_promo_banner' => 'nullable|boolean',
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
}
