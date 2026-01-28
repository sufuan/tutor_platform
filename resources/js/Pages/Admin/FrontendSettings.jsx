import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import { Upload, Image as ImageIcon, X, Check, AlertCircle, Settings, Eye, Sparkles, LayoutDashboard, MapPin, Phone, Mail, Clock, Facebook, Linkedin, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Separator } from '@/Components/ui/separator';

export default function FrontendSettings({ auth, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        hero_image: null,
        promo_banner_image: null,
        show_promo_banner: settings.show_promo_banner || false,
        contact_title: settings.contact_title || '',
        contact_description: settings.contact_description || '',
        contact_address: settings.contact_address || '',
        contact_phone: settings.contact_phone || '',
        contact_email: settings.contact_email || '',
        contact_hours: settings.contact_hours || '',
        social_facebook: settings.social_facebook || '',
        social_linkedin: settings.social_linkedin || '',
        social_twitter: settings.social_twitter || '',
        social_youtube: settings.social_youtube || '',
        social_whatsapp: settings.social_whatsapp || '',
    });

    const [heroPreview, setHeroPreview] = useState(null);
    const [promoPreview, setPromoPreview] = useState(null);

    const handleHeroImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('hero_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeroPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePromoImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('promo_banner_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPromoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.frontend-settings.update'), {
            forceFormData: true,
        });
    };

    const clearHeroPreview = () => {
        setHeroPreview(null);
        setData('hero_image', null);
    };

    const clearPromoPreview = () => {
        setPromoPreview(null);
        setData('promo_banner_image', null);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#0675C1]/10 rounded-xl">
                            <LayoutDashboard className="h-6 w-6 text-[#0675C1]" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900">Frontend Settings</h2>
                            <p className="text-sm text-slate-600 mt-1">Customize your website's appearance and promotional content</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">Live Changes</span>
                    </div>
                </div>
            }
        >
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Info Alert */}
                <Alert className="border-[#0675C1]/30 bg-gradient-to-r from-[#0675C1]/5 to-blue-50/50 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#0675C1]/10 rounded-lg">
                            <Sparkles className="h-5 w-5 text-[#0675C1]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">Website Customization Center</h3>
                            <AlertDescription className="text-slate-600">
                                Upload high-quality images to enhance your homepage hero section and create engaging promotional campaigns. Changes take effect immediately after saving.
                            </AlertDescription>
                        </div>
                    </div>
                </Alert>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Hero Section Image Card */}
                        <Card className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
                            <CardHeader className="bg-gradient-to-br from-[#0675C1] via-[#0675C1]/90 to-[#0675C1]/80 text-white pb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                        <ImageIcon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Hero Section Image</CardTitle>
                                </div>
                                <CardDescription className="text-white/90 text-base">
                                    Main banner image displayed on your homepage (Recommended: 1920x1080px, Max 5MB)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6 bg-gradient-to-b from-slate-50 to-white">
                                {/* Current Image Preview */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            Currently Active
                                        </Label>
                                    </div>
                                    <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 group/img">
                                        <img
                                            src={settings.hero_image}
                                            alt="Current Hero"
                                            className="w-full h-56 object-cover transition-transform duration-300 group-hover/img:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                                        <div className="absolute top-3 right-3">
                                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                <Check className="h-3 w-3" />
                                                Active
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* New Image Upload */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        {heroPreview ? (
                                            <>
                                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                                New Image Preview
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-4 w-4 text-slate-500" />
                                                Upload New Image
                                            </>
                                        )}
                                    </Label>
                                    {heroPreview ? (
                                        <div className="relative rounded-xl overflow-hidden border-2 border-[#0675C1] bg-slate-50 shadow-lg">
                                            <img
                                                src={heroPreview}
                                                alt="Preview"
                                                className="w-full h-56 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0675C1]/20 to-transparent"></div>
                                            <button
                                                type="button"
                                                onClick={clearHeroPreview}
                                                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-xl transition-all hover:scale-110"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="absolute top-3 left-3">
                                                <div className="bg-[#0675C1] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                    <Sparkles className="h-3 w-3" />
                                                    Preview
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="group/upload relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-white hover:bg-slate-50 hover:border-[#0675C1] transition-all duration-300">
                                            <div className="flex flex-col items-center justify-center p-6 text-center">
                                                <div className="p-4 bg-slate-100 rounded-full mb-4 group-hover/upload:bg-[#0675C1]/10 transition-colors">
                                                    <Upload className="w-10 h-10 text-slate-400 group-hover/upload:text-[#0675C1] transition-colors" />
                                                </div>
                                                <p className="mb-2 text-base font-semibold text-slate-700">
                                                    <span className="text-[#0675C1]">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-sm text-slate-500 mb-1">PNG, JPG, or GIF</p>
                                                <p className="text-xs text-slate-400">Maximum file size: 5MB</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleHeroImageChange}
                                            />
                                        </label>
                                    )}
                                    {errors.hero_image && (
                                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <AlertCircle className="h-4 w-4 text-red-600" />
                                            <p className="text-sm text-red-600 font-medium">{errors.hero_image}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Promotional Banner Card */}
                        <Card className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
                            <CardHeader className="bg-gradient-to-br from-purple-600 via-purple-500 to-purple-600/90 text-white pb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Promotional Banner</CardTitle>
                                </div>
                                <CardDescription className="text-white/90 text-base">
                                    Modal popup for special offers and announcements (Recommended: 800x600px, Max 5MB)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6 bg-gradient-to-b from-purple-50/30 to-white">
                                {/* Enable/Disable Toggle */}
                                <div className="relative overflow-hidden rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <Label htmlFor="show-promo" className="text-base font-bold text-slate-900 cursor-pointer flex items-center gap-2 mb-1">
                                                Display Promotional Banner
                                            </Label>
                                            <p className="text-sm text-slate-600">
                                                Toggle to {data.show_promo_banner ? 'hide' : 'show'} the promotional modal on website visits
                                            </p>
                                        </div>
                                        <Switch
                                            id="show-promo"
                                            checked={data.show_promo_banner}
                                            onCheckedChange={(checked) => setData('show_promo_banner', checked)}
                                            className="data-[state=checked]:bg-[#0675C1]"
                                        />
                                    </div>
                                    {data.show_promo_banner && (
                                        <div className="mt-3 pt-3 border-t border-slate-200">
                                            <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                Banner is currently active on your website
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                {/* Current Banner */}
                                {settings.promo_banner_image && (
                                    <>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                                    Current Banner
                                                </Label>
                                            </div>
                                            <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 group/img">
                                                <img
                                                    src={settings.promo_banner_image}
                                                    alt="Current Promo"
                                                    className="w-full h-56 object-cover transition-transform duration-300 group-hover/img:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                                                <div className="absolute top-3 right-3">
                                                    <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                        <Check className="h-3 w-3" />
                                                        Active
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* New Banner Upload */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        {promoPreview ? (
                                            <>
                                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                                New Banner Preview
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-4 w-4 text-slate-500" />
                                                Upload New Banner
                                            </>
                                        )}
                                    </Label>
                                    {promoPreview ? (
                                        <div className="relative rounded-xl overflow-hidden border-2 border-purple-500 bg-slate-50 shadow-lg">
                                            <img
                                                src={promoPreview}
                                                alt="Preview"
                                                className="w-full h-56 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                                            <button
                                                type="button"
                                                onClick={clearPromoPreview}
                                                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-xl transition-all hover:scale-110"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="absolute top-3 left-3">
                                                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                    <Sparkles className="h-3 w-3" />
                                                    Preview
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="group/upload relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-white hover:bg-purple-50/50 hover:border-purple-500 transition-all duration-300">
                                            <div className="flex flex-col items-center justify-center p-6 text-center">
                                                <div className="p-4 bg-slate-100 rounded-full mb-4 group-hover/upload:bg-purple-100 transition-colors">
                                                    <Upload className="w-10 h-10 text-slate-400 group-hover/upload:text-purple-600 transition-colors" />
                                                </div>
                                                <p className="mb-2 text-base font-semibold text-slate-700">
                                                    <span className="text-purple-600">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-sm text-slate-500 mb-1">PNG, JPG, or GIF</p>
                                                <p className="text-xs text-slate-400">Maximum file size: 5MB</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handlePromoImageChange}
                                            />
                                        </label>
                                    )}
                                    {errors.promo_banner_image && (
                                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <AlertCircle className="h-4 w-4 text-red-600" />
                                            <p className="text-sm text-red-600 font-medium">{errors.promo_banner_image}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Footer Information Section */}
                    <Card className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                        <CardHeader className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600/90 text-white pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Footer & Contact Information</CardTitle>
                            </div>
                            <CardDescription className="text-white/90 text-base">
                                Update footer contact details, social media links, and business hours visible on all pages
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-gradient-to-b from-emerald-50/30 to-white">
                            {/* Contact Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Phone className="h-5 w-5 text-emerald-600" />
                                    <h4 className="font-semibold text-slate-900">Contact Information</h4>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contact_title" className="text-sm font-medium text-slate-700 mb-2 block">
                                            Contact Section Title
                                        </Label>
                                        <Input
                                            id="contact_title"
                                            value={data.contact_title}
                                            onChange={(e) => setData('contact_title', e.target.value)}
                                            placeholder="Contact Us"
                                            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {errors.contact_title && (
                                            <p className="text-xs text-red-600 mt-1">{errors.contact_title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_phone" className="text-sm font-medium text-slate-700 mb-2 block">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="contact_phone"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                            placeholder="+880 1818 420012"
                                            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {errors.contact_phone && (
                                            <p className="text-xs text-red-600 mt-1">{errors.contact_phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="contact_description" className="text-sm font-medium text-slate-700 mb-2 block">
                                        Contact Description
                                    </Label>
                                    <Textarea
                                        id="contact_description"
                                        value={data.contact_description}
                                        onChange={(e) => setData('contact_description', e.target.value)}
                                        placeholder="Have any questions or need a tutor? We are here to help!"
                                        rows={2}
                                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {errors.contact_description && (
                                        <p className="text-xs text-red-600 mt-1">{errors.contact_description}</p>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contact_email" className="text-sm font-medium text-slate-700 mb-2 block">
                                            Email Address
                                        </Label>
                                        <Input
                                            id="contact_email"
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            placeholder="tuitionbarta@gmail.com"
                                            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {errors.contact_email && (
                                            <p className="text-xs text-red-600 mt-1">{errors.contact_email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_hours" className="text-sm font-medium text-slate-700 mb-2 block">
                                            Business Hours
                                        </Label>
                                        <Input
                                            id="contact_hours"
                                            value={data.contact_hours}
                                            onChange={(e) => setData('contact_hours', e.target.value)}
                                            placeholder="Sat - Thu, 10:00 AM - 8:00 PM"
                                            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {errors.contact_hours && (
                                            <p className="text-xs text-red-600 mt-1">{errors.contact_hours}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="contact_address" className="text-sm font-medium text-slate-700 mb-2 block">
                                        Address
                                    </Label>
                                    <Textarea
                                        id="contact_address"
                                        value={data.contact_address}
                                        onChange={(e) => setData('contact_address', e.target.value)}
                                        placeholder="Salmanpur, Kotbari, Comilla, Bangladesh"
                                        rows={2}
                                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {errors.contact_address && (
                                        <p className="text-xs text-red-600 mt-1">{errors.contact_address}</p>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Social Media Links */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Facebook className="h-5 w-5 text-emerald-600" />
                                    <h4 className="font-semibold text-slate-900">Social Media Links</h4>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="social_facebook" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                            <Facebook className="h-4 w-4 text-blue-600" />
                                            Facebook URL
                                        </Label>
                                        <Input
                                            id="social_facebook"
                                            type="url"
                                            value={data.social_facebook}
                                            onChange={(e) => setData('social_facebook', e.target.value)}
                                            placeholder="https://facebook.com/tuitionbarta"
                                            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.social_facebook && (
                                            <p className="text-xs text-red-600 mt-1">{errors.social_facebook}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="social_linkedin" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                            <Linkedin className="h-4 w-4 text-blue-700" />
                                            LinkedIn URL
                                        </Label>
                                        <Input
                                            id="social_linkedin"
                                            type="url"
                                            value={data.social_linkedin}
                                            onChange={(e) => setData('social_linkedin', e.target.value)}
                                            placeholder="https://linkedin.com/company/tuitionbarta"
                                            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.social_linkedin && (
                                            <p className="text-xs text-red-600 mt-1">{errors.social_linkedin}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="social_twitter" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                            <Twitter className="h-4 w-4 text-sky-500" />
                                            X (Twitter) URL
                                        </Label>
                                        <Input
                                            id="social_twitter"
                                            type="url"
                                            value={data.social_twitter}
                                            onChange={(e) => setData('social_twitter', e.target.value)}
                                            placeholder="https://x.com/tuitionbarta"
                                            className="border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                        />
                                        {errors.social_twitter && (
                                            <p className="text-xs text-red-600 mt-1">{errors.social_twitter}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="social_youtube" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                            <Youtube className="h-4 w-4 text-red-600" />
                                            YouTube URL
                                        </Label>
                                        <Input
                                            id="social_youtube"
                                            type="url"
                                            value={data.social_youtube}
                                            onChange={(e) => setData('social_youtube', e.target.value)}
                                            placeholder="https://youtube.com/@tuitionbarta"
                                            className="border-slate-300 focus:border-red-500 focus:ring-red-500"
                                        />
                                        {errors.social_youtube && (
                                            <p className="text-xs text-red-600 mt-1">{errors.social_youtube}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="social_whatsapp" className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                            <MessageCircle className="h-4 w-4 text-green-600" />
                                            WhatsApp URL
                                        </Label>
                                        <Input
                                            id="social_whatsapp"
                                            type="url"
                                            value={data.social_whatsapp}
                                            onChange={(e) => setData('social_whatsapp', e.target.value)}
                                            placeholder="https://wa.me/8801818420012"
                                            className="border-slate-300 focus:border-green-500 focus:ring-green-500"
                                        />
                                        {errors.social_whatsapp && (
                                            <p className="text-xs text-red-600 mt-1">{errors.social_whatsapp}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Ready to apply changes?</p>
                                <p className="text-xs text-slate-600">Your updates will be visible immediately on the frontend</p>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={processing}
                            size="lg"
                            className="bg-[#0675C1] hover:bg-[#0675C1]/90 text-white px-10 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Saving Changes...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 h-5 w-5" />
                                    Save All Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

