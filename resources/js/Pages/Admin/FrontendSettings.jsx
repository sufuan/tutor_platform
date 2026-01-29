import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import { Upload, Image as ImageIcon, X, Check, AlertCircle, Settings, Eye, Sparkles, LayoutDashboard, MapPin, Phone, Mail, Clock, Facebook, Linkedin, Twitter, Youtube, MessageCircle, BookOpen, Plus, Edit, Trash2, Search, Package, Home, UsersRound, Monitor, Languages, GraduationCap, Target, TrendingUp, Baby, Palette, Users, CheckCircle, Award } from 'lucide-react';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Separator } from '@/Components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

export default function FrontendSettings({ auth, settings, subjects, categories }) {
    // Hero & Content Form
    const heroForm = useForm({
        hero_title: settings.hero_title || 'Find the Perfect Tutor',
        hero_subtitle: settings.hero_subtitle || 'Connect with Bangladesh\'s finest verified tutors. Transform your learning journey with personalized education tailored to your needs.',
    });

    // Stats Form
    const statsForm = useForm({
        stats_tutors: settings.stats_tutors || '850',
        stats_jobs: settings.stats_jobs || '1250',
        stats_success_rate: settings.stats_success_rate || '95',
        stats_students: settings.stats_students || '2400',
    });

    // Images Form
    const imagesForm = useForm({
        hero_image: null,
        promo_banner_image: null,
        show_promo_banner: settings.show_promo_banner || false,
    });

    // Tuition Types Form
    const tuitionTypesForm = useForm({
        tuition_types: settings.tuition_types ? JSON.parse(settings.tuition_types) : [
            { title: 'Home Tutoring', description: 'Home tutoring allows students to learn various subjects in their own home.', icon: 'Home' },
            { title: 'Group Tutoring', description: 'Group tutoring allows students to learn together and solve problems at an affordable cost.', icon: 'UsersRound' },
            { title: 'Online Tutoring', description: 'Hire the best tutors from anywhere and take online classes by using tools such as Google Meet, Zoom and more.', icon: 'Monitor' },
            { title: 'Package Tutoring', description: 'Package tutoring helps students to complete their studies within a specific time frame.', icon: 'Package' },
        ],
    });

    // Serving Categories Form
    const servingCategoriesForm = useForm({
        serving_categories: settings.serving_categories ? JSON.parse(settings.serving_categories) : [
            { name: 'Bangla Medium', icon: 'Languages' },
            { name: 'English Version', icon: 'BookOpen' },
            { name: 'English Medium', icon: 'GraduationCap' },
            { name: 'Madrasa Medium', icon: 'BookOpen' },
            { name: 'Quran and Islamic Studies', icon: 'BookOpen' },
            { name: 'Admission Preparation', icon: 'Target' },
            { name: 'Skill Development', icon: 'TrendingUp' },
            { name: 'Pre-school Education', icon: 'Baby' },
            { name: 'Arts and Crafts', icon: 'Palette' },
        ],
    });

    // How It Works Form
    const howItWorksForm = useForm({
        how_it_works: settings.how_it_works ? JSON.parse(settings.how_it_works) : [
            { title: 'Search', description: 'Browse verified tutors by subject & location', icon: 'Target' },
            { title: 'Compare', description: 'Review profiles, ratings & experience', icon: 'Users' },
            { title: 'Connect', description: 'Book trial session instantly', icon: 'CheckCircle' },
            { title: 'Excel', description: 'Achieve your academic goals', icon: 'Award' },
        ],
    });

    // Footer Form
    const footerForm = useForm({
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
    const [showSubjectDialog, setShowSubjectDialog] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategories, setExpandedCategories] = useState({});
    const { toast } = useToast();

    const subjectForm = useForm({
        name: '',
        category_id: '',
    });

    // Handler for Hero Image
    const handleHeroImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            imagesForm.setData('hero_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeroPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handler for Promo Image
    const handlePromoImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            imagesForm.setData('promo_banner_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPromoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Submit handlers for each section
    const handleHeroSubmit = (e) => {
        e.preventDefault();
        heroForm.post(route('admin.frontend-settings.update'), {
            onSuccess: () => {
                toast({ title: "Success", description: "Hero section updated successfully!" });
            },
        });
    };

    const handleStatsSubmit = (e) => {
        e.preventDefault();
        statsForm.post(route('admin.frontend-settings.update'), {
            onSuccess: () => {
                toast({ title: "Success", description: "Stats section updated successfully!" });
            },
        });
    };

    const handleImagesSubmit = (e) => {
        e.preventDefault();
        imagesForm.post(route('admin.frontend-settings.update'), {
            forceFormData: true,
            onSuccess: () => {
                setHeroPreview(null);
                setPromoPreview(null);
                toast({ title: "Success", description: "Images updated successfully!" });
            },
        });
    };

    const handleTuitionTypesSubmit = (e) => {
        e.preventDefault();
        tuitionTypesForm.post(route('admin.frontend-settings.update'), {
            data: {
                tuition_types: JSON.stringify(tuitionTypesForm.data.tuition_types)
            },
            onSuccess: () => {
                toast({ title: "Success", description: "Tuition types updated successfully!" });
            },
        });
    };

    const handleServingCategoriesSubmit = (e) => {
        e.preventDefault();
        servingCategoriesForm.post(route('admin.frontend-settings.update'), {
            data: {
                serving_categories: JSON.stringify(servingCategoriesForm.data.serving_categories)
            },
            onSuccess: () => {
                toast({ title: "Success", description: "Serving categories updated successfully!" });
            },
        });
    };

    const handleHowItWorksSubmit = (e) => {
        e.preventDefault();
        howItWorksForm.post(route('admin.frontend-settings.update'), {
            data: {
                how_it_works: JSON.stringify(howItWorksForm.data.how_it_works)
            },
            onSuccess: () => {
                toast({ title: "Success", description: "How It Works section updated successfully!" });
            },
        });
    };

    const handleFooterSubmit = (e) => {
        e.preventDefault();
        footerForm.post(route('admin.frontend-settings.update'), {
            onSuccess: () => {
                toast({ title: "Success", description: "Footer information updated successfully!" });
            },
        });
    };

    const clearHeroPreview = () => {
        setHeroPreview(null);
        imagesForm.setData('hero_image', null);
    };

    const clearPromoPreview = () => {
        setPromoPreview(null);
        imagesForm.setData('promo_banner_image', null);
    };

    const openSubjectDialog = (subject = null) => {
        if (subject) {
            setEditingSubject(subject);
            subjectForm.setData({
                name: subject.name,
                category_id: subject.category_id.toString(),
            });
        } else {
            setEditingSubject(null);
            subjectForm.reset();
        }
        setShowSubjectDialog(true);
    };

    const closeSubjectDialog = () => {
        setShowSubjectDialog(false);
        setEditingSubject(null);
        subjectForm.reset();
    };

    const handleSubjectSubmit = (e) => {
        e.preventDefault();
        if (editingSubject) {
            subjectForm.put(route('admin.subjects.update', editingSubject.id), {
                onSuccess: () => {
                    closeSubjectDialog();
                    toast({
                        title: "Success",
                        description: "Subject updated successfully!",
                    });
                },
            });
        } else {
            subjectForm.post(route('admin.subjects.store'), {
                onSuccess: () => {
                    closeSubjectDialog();
                    toast({
                        title: "Success",
                        description: "Subject created successfully!",
                    });
                },
            });
        }
    };

    const handleDeleteSubject = (subject) => {
        if (confirm(`Are you sure you want to delete "${subject.name}"?`)) {
            subjectForm.delete(route('admin.subjects.delete', subject.id), {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Subject deleted successfully!",
                    });
                },
            });
        }
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const filteredSubjects = subjects.filter(subject => {
        const matchesCategory = categoryFilter === 'all' || subject.category_id.toString() === categoryFilter;
        const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
        const categoryName = subject.category?.name || 'Uncategorized';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(subject);
        return acc;
    }, {});

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

                {/* Tabs for different sections */}
                <Tabs defaultValue="hero-banner" className="space-y-6">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-slate-100 p-1 rounded-xl shadow-sm">
                        <TabsTrigger 
                            value="hero-banner" 
                            className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg font-semibold text-sm flex items-center gap-2"
                        >
                            <Settings className="h-4 w-4" />
                            Business Settings
                        </TabsTrigger>
                        <TabsTrigger 
                            value="subjects" 
                            className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg font-semibold text-sm flex items-center gap-2"
                        >
                            <BookOpen className="h-4 w-4" />
                            Subject Management
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Business Settings */}
                    <TabsContent value="hero-banner" className="space-y-8">
                    {/* Hero Section Text */}
                    <form onSubmit={handleHeroSubmit}>
                    <Card className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                        <CardHeader className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-600/90 text-white pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <Settings className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Hero Section Content</CardTitle>
                            </div>
                            <CardDescription className="text-white/90 text-base">
                                Customize the main headline and subtitle on your homepage
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-gradient-to-b from-indigo-50/30 to-white">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="hero_title" className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Hero Title
                                    </Label>
                                    <Textarea
                                        id="hero_title"
                                        value={heroForm.data.hero_title}
                                        onChange={(e) => heroForm.setData('hero_title', e.target.value)}
                                        placeholder="Find the Perfect Tutor"
                                        rows={2}
                                        className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-lg font-semibold"
                                    />
                                    {heroForm.errors.hero_title && (
                                        <p className="text-xs text-red-600 mt-1">{heroForm.errors.hero_title}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="hero_subtitle" className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Hero Subtitle
                                    </Label>
                                    <Textarea
                                        id="hero_subtitle"
                                        value={heroForm.data.hero_subtitle}
                                        onChange={(e) => heroForm.setData('hero_subtitle', e.target.value)}
                                        placeholder="Connect with Bangladesh's finest verified tutors..."
                                        rows={3}
                                        className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {heroForm.errors.hero_subtitle && (
                                        <p className="text-xs text-red-600 mt-1">{heroForm.errors.hero_subtitle}</p>
                                    )}
                                </div>
                            </div>
                            
                            {/* Save Button for Hero Section */}
                            <div className="flex justify-end pt-4 border-t">
                                <Button
                                    type="submit"
                                    disabled={heroForm.processing}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 shadow-lg"
                                >
                                    {heroForm.processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="mr-2 h-4 w-4" />
                                            Save Hero Section
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    </form>

                    {/* Stats Section */}
                    <form onSubmit={handleStatsSubmit}>
                    <Card className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                        <CardHeader className="bg-gradient-to-br from-teal-600 via-teal-500 to-teal-600/90 text-white pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <Settings className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Statistics Section</CardTitle>
                            </div>
                            <CardDescription className="text-white/90 text-base">
                                Update the numbers displayed in the stats section
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-gradient-to-b from-teal-50/30 to-white">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="stats_tutors" className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Expert Tutors
                                    </Label>
                                    <Input
                                        id="stats_tutors"
                                        value={statsForm.data.stats_tutors}
                                        onChange={(e) => statsForm.setData('stats_tutors', e.target.value)}
                                        placeholder="850"
                                        className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                    {statsForm.errors.stats_tutors && (
                                        <p className="text-xs text-red-600 mt-1">{statsForm.errors.stats_tutors}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="stats_jobs" className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Active Jobs
                                    </Label>
                                    <Input
                                        id="stats_jobs"
                                        value={statsForm.data.stats_jobs}
                                        onChange={(e) => statsForm.setData('stats_jobs', e.target.value)}
                                        placeholder="1250"
                                        className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                    {statsForm.errors.stats_jobs && (
                                        <p className="text-xs text-red-600 mt-1">{statsForm.errors.stats_jobs}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="stats_success_rate" className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Success Rate (%)
                                    </Label>
                                    <Input
                                        id="stats_success_rate"
                                        value={statsForm.data.stats_success_rate}
                                        onChange={(e) => statsForm.setData('stats_success_rate', e.target.value)}
                                        placeholder="95"
                                        className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                    {statsForm.errors.stats_success_rate && (
                                        <p className="text-xs text-red-600 mt-1">{statsForm.errors.stats_success_rate}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="stats_students" className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Happy Students
                                    </Label>
                                    <Input
                                        id="stats_students"
                                        value={statsForm.data.stats_students}
                                        onChange={(e) => statsForm.setData('stats_students', e.target.value)}
                                        placeholder="2400"
                                        className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                                    />
                                    {statsForm.errors.stats_students && (
                                        <p className="text-xs text-red-600 mt-1">{statsForm.errors.stats_students}</p>
                                    )}
                                </div>
                            </div>

                            {/* Save Button for Stats Section */}
                            <div className="flex justify-end pt-4 border-t">
                                <Button
                                    type="submit"
                                    disabled={statsForm.processing}
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 shadow-lg"
                                >
                                    {statsForm.processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="mr-2 h-4 w-4" />
                                            Save Statistics
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    </form>

                    {/* Images Section */}
                    <form onSubmit={handleImagesSubmit}>
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
                                    {imagesForm.errors.hero_image && (
                                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <AlertCircle className="h-4 w-4 text-red-600" />
                                            <p className="text-sm text-red-600 font-medium">{imagesForm.errors.hero_image}</p>
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
                                                Toggle to {imagesForm.data.show_promo_banner ? 'hide' : 'show'} the promotional modal on website visits
                                            </p>
                                        </div>
                                        <Switch
                                            id="show-promo"
                                            checked={imagesForm.data.show_promo_banner}
                                            onCheckedChange={(checked) => imagesForm.setData('show_promo_banner', checked)}
                                            className="data-[state=checked]:bg-[#0675C1]"
                                        />
                                    </div>
                                    {imagesForm.data.show_promo_banner && (
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
                                    {imagesForm.errors.promo_banner_image && (
                                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <AlertCircle className="h-4 w-4 text-red-600" />
                                            <p className="text-sm text-red-600 font-medium">{imagesForm.errors.promo_banner_image}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Save Button for Images Section */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={imagesForm.processing}
                            className="bg-[#0675C1] hover:bg-[#0675C1]/90 text-white px-8 shadow-lg"
                        >
                            {imagesForm.processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Save Images
                                </>
                            )}
                        </Button>
                    </div>
                    </form>

                    {/* Tuition Types Section */}
                    <form onSubmit={handleTuitionTypesSubmit}>
                    <Card className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                        <CardHeader className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600/90 text-white pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <Package className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Tuition Types Section</CardTitle>
                            </div>
                            <CardDescription className="text-white/90 text-base">
                                Manage the tuition types displayed on your homepage
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-gradient-to-b from-orange-50/30 to-white">
                            <div className="space-y-4">
                                {tuitionTypesForm.data.tuition_types.map((type, index) => (
                                    <Card key={index} className="border-2 border-orange-200">
                                        <CardContent className="p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-bold text-slate-900">Type #{index + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newTypes = [...tuitionTypesForm.data.tuition_types];
                                                        newTypes.splice(index, 1);
                                                        tuitionTypesForm.setData('tuition_types', newTypes);
                                                    }}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-semibold text-slate-700">Title</Label>
                                                <Input
                                                    value={type.title}
                                                    onChange={(e) => {
                                                        const newTypes = [...tuitionTypesForm.data.tuition_types];
                                                        newTypes[index].title = e.target.value;
                                                        tuitionTypesForm.setData('tuition_types', newTypes);
                                                    }}
                                                    placeholder="e.g., Home Tutoring"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-sm font-semibold text-slate-700">Description</Label>
                                                <Textarea
                                                    value={type.description}
                                                    onChange={(e) => {
                                                        const newTypes = [...tuitionTypesForm.data.tuition_types];
                                                        newTypes[index].description = e.target.value;
                                                        tuitionTypesForm.setData('tuition_types', newTypes);
                                                    }}
                                                    placeholder="Describe this tuition type..."
                                                    rows={2}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-sm font-semibold text-slate-700">Icon Name</Label>
                                                <Input
                                                    value={type.icon}
                                                    onChange={(e) => {
                                                        const newTypes = [...tuitionTypesForm.data.tuition_types];
                                                        newTypes[index].icon = e.target.value;
                                                        tuitionTypesForm.setData('tuition_types', newTypes);
                                                    }}
                                                    placeholder="e.g., Home, Package, Monitor"
                                                    className="mt-1"
                                                />
                                                <p className="text-xs text-slate-500 mt-1">Use: Home, UsersRound, Monitor, Package, BookOpen, etc.</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        tuitionTypesForm.setData('tuition_types', [
                                            ...tuitionTypesForm.data.tuition_types,
                                            { title: '', description: '', icon: 'Package' }
                                        ]);
                                    }}
                                    className="w-full border-2 border-dashed border-orange-300 hover:border-orange-500 hover:bg-orange-50"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Tuition Type
                                </Button>
                            </div>

                            {/* Save Button for Tuition Types */}
                            <div className="flex justify-end pt-4 border-t">
                                <Button
                                    type="submit"
                                    disabled={tuitionTypesForm.processing}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 shadow-lg"
                                >
                                    {tuitionTypesForm.processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="mr-2 h-4 w-4" />
                                            Save Tuition Types
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    </form>

                    {/* Serving Categories Section */}
                    <form onSubmit={handleServingCategoriesSubmit}>
                    <Card className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                        <CardHeader className="bg-gradient-to-br from-pink-600 via-pink-500 to-pink-600/90 text-white pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Serving Categories Section</CardTitle>
                            </div>
                            <CardDescription className="text-white/90 text-base">
                                Manage the education categories shown on your homepage
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-gradient-to-b from-pink-50/30 to-white">
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {servingCategoriesForm.data.serving_categories.map((category, index) => (
                                        <Card key={index} className="border-2 border-pink-200">
                                            <CardContent className="p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-sm font-bold text-slate-900">Category #{index + 1}</Label>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            const newCategories = [...servingCategoriesForm.data.serving_categories];
                                                            newCategories.splice(index, 1);
                                                            servingCategoriesForm.setData('serving_categories', newCategories);
                                                        }}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-semibold text-slate-700">Name</Label>
                                                    <Input
                                                        value={category.name}
                                                        onChange={(e) => {
                                                            const newCategories = [...servingCategoriesForm.data.serving_categories];
                                                            newCategories[index].name = e.target.value;
                                                            servingCategoriesForm.setData('serving_categories', newCategories);
                                                        }}
                                                        placeholder="e.g., Bangla Medium"
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-semibold text-slate-700">Icon Name</Label>
                                                    <Input
                                                        value={category.icon}
                                                        onChange={(e) => {
                                                            const newCategories = [...servingCategoriesForm.data.serving_categories];
                                                            newCategories[index].icon = e.target.value;
                                                            servingCategoriesForm.setData('serving_categories', newCategories);
                                                        }}
                                                        placeholder="e.g., Languages, BookOpen"
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        servingCategoriesForm.setData('serving_categories', [
                                            ...servingCategoriesForm.data.serving_categories,
                                            { name: '', icon: 'BookOpen' }
                                        ]);
                                    }}
                                    className="w-full border-2 border-dashed border-pink-300 hover:border-pink-500 hover:bg-pink-50"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Category
                                </Button>
                            </div>

                            {/* Save Button for Serving Categories */}
                            <div className="flex justify-end pt-4 border-t">
                                <Button
                                    type="submit"
                                    disabled={servingCategoriesForm.processing}
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-8 shadow-lg"
                                >
                                    {servingCategoriesForm.processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="mr-2 h-4 w-4" />
                                            Save Categories
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    </form>

                    {/* How It Works Section */}
                    <form onSubmit={handleHowItWorksSubmit}>
                    <Card className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                        <CardHeader className="bg-gradient-to-br from-cyan-600 via-cyan-500 to-cyan-600/90 text-white pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                    <Target className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-2xl font-bold">How It Works Section</CardTitle>
                            </div>
                            <CardDescription className="text-white/90 text-base">
                                Manage the steps shown in the How It Works section (Recommended: 4 steps)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-gradient-to-b from-cyan-50/30 to-white">
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {howItWorksForm.data.how_it_works.map((step, index) => (
                                        <Card key={index} className="border-2 border-cyan-200">
                                            <CardContent className="p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-sm font-bold text-slate-900">Step #{index + 1}</Label>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            const newSteps = [...howItWorksForm.data.how_it_works];
                                                            newSteps.splice(index, 1);
                                                            howItWorksForm.setData('how_it_works', newSteps);
                                                        }}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-semibold text-slate-700">Title</Label>
                                                    <Input
                                                        value={step.title}
                                                        onChange={(e) => {
                                                            const newSteps = [...howItWorksForm.data.how_it_works];
                                                            newSteps[index].title = e.target.value;
                                                            howItWorksForm.setData('how_it_works', newSteps);
                                                        }}
                                                        placeholder="e.g., Search"
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-semibold text-slate-700">Description</Label>
                                                    <Textarea
                                                        value={step.description}
                                                        onChange={(e) => {
                                                            const newSteps = [...howItWorksForm.data.how_it_works];
                                                            newSteps[index].description = e.target.value;
                                                            howItWorksForm.setData('how_it_works', newSteps);
                                                        }}
                                                        placeholder="Describe this step..."
                                                        rows={2}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-semibold text-slate-700">Icon Name</Label>
                                                    <Input
                                                        value={step.icon}
                                                        onChange={(e) => {
                                                            const newSteps = [...howItWorksForm.data.how_it_works];
                                                            newSteps[index].icon = e.target.value;
                                                            howItWorksForm.setData('how_it_works', newSteps);
                                                        }}
                                                        placeholder="e.g., Target, Users, CheckCircle"
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        howItWorksForm.setData('how_it_works', [
                                            ...howItWorksForm.data.how_it_works,
                                            { title: '', description: '', icon: 'Target' }
                                        ]);
                                    }}
                                    className="w-full border-2 border-dashed border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Step
                                </Button>
                            </div>

                            {/* Save Button for How It Works */}
                            <div className="flex justify-end pt-4 border-t">
                                <Button
                                    type="submit"
                                    disabled={howItWorksForm.processing}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 shadow-lg"
                                >
                                    {howItWorksForm.processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="mr-2 h-4 w-4" />
                                            Save Steps
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    </form>

                    {/* Footer Information Section */}
                    <form onSubmit={handleFooterSubmit}>
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
                                            value={footerForm.data.contact_title}
                                            onChange={(e) => footerForm.setData('contact_title', e.target.value)}
                                            placeholder="Contact Us"
                                            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {footerForm.errors.contact_title && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.contact_title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_phone" className="text-sm font-medium text-slate-700 mb-2 block">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="contact_phone"
                                            value={footerForm.data.contact_phone}
                                            onChange={(e) => footerForm.setData('contact_phone', e.target.value)}
                                            placeholder="+880 1818 420012"
                                            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {footerForm.errors.contact_phone && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.contact_phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="contact_description" className="text-sm font-medium text-slate-700 mb-2 block">
                                        Contact Description
                                    </Label>
                                    <Textarea
                                        id="contact_description"
                                        value={footerForm.data.contact_description}
                                        onChange={(e) => footerForm.setData('contact_description', e.target.value)}
                                        placeholder="Have any questions or need a tutor? We are here to help!"
                                        rows={2}
                                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {footerForm.errors.contact_description && (
                                        <p className="text-xs text-red-600 mt-1">{footerForm.errors.contact_description}</p>
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
                                            value={footerForm.data.contact_email}
                                            onChange={(e) => footerForm.setData('contact_email', e.target.value)}
                                            placeholder="tuitionbarta@gmail.com"
                                            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {footerForm.errors.contact_email && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.contact_email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_hours" className="text-sm font-medium text-slate-700 mb-2 block">
                                            Business Hours
                                        </Label>
                                        <Input
                                            id="contact_hours"
                                            value={footerForm.data.contact_hours}
                                            onChange={(e) => footerForm.setData('contact_hours', e.target.value)}
                                            placeholder="Sat - Thu, 10:00 AM - 8:00 PM"
                                            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {footerForm.errors.contact_hours && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.contact_hours}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="contact_address" className="text-sm font-medium text-slate-700 mb-2 block">
                                        Address
                                    </Label>
                                    <Textarea
                                        id="contact_address"
                                        value={footerForm.data.contact_address}
                                        onChange={(e) => footerForm.setData('contact_address', e.target.value)}
                                        placeholder="Salmanpur, Kotbari, Comilla, Bangladesh"
                                        rows={2}
                                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {footerForm.errors.contact_address && (
                                        <p className="text-xs text-red-600 mt-1">{footerForm.errors.contact_address}</p>
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
                                            value={footerForm.data.social_facebook}
                                            onChange={(e) => footerForm.setData('social_facebook', e.target.value)}
                                            placeholder="https://facebook.com/tuitionbarta"
                                            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {footerForm.errors.social_facebook && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.social_facebook}</p>
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
                                            value={footerForm.data.social_linkedin}
                                            onChange={(e) => footerForm.setData('social_linkedin', e.target.value)}
                                            placeholder="https://linkedin.com/company/tuitionbarta"
                                            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {footerForm.errors.social_linkedin && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.social_linkedin}</p>
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
                                            value={footerForm.data.social_twitter}
                                            onChange={(e) => footerForm.setData('social_twitter', e.target.value)}
                                            placeholder="https://x.com/tuitionbarta"
                                            className="border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                        />
                                        {footerForm.errors.social_twitter && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.social_twitter}</p>
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
                                            value={footerForm.data.social_youtube}
                                            onChange={(e) => footerForm.setData('social_youtube', e.target.value)}
                                            placeholder="https://youtube.com/@tuitionbarta"
                                            className="border-slate-300 focus:border-red-500 focus:ring-red-500"
                                        />
                                        {footerForm.errors.social_youtube && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.social_youtube}</p>
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
                                            value={footerForm.data.social_whatsapp}
                                            onChange={(e) => footerForm.setData('social_whatsapp', e.target.value)}
                                            placeholder="https://wa.me/8801818420012"
                                            className="border-slate-300 focus:border-green-500 focus:ring-green-500"
                                        />
                                        {footerForm.errors.social_whatsapp && (
                                            <p className="text-xs text-red-600 mt-1">{footerForm.errors.social_whatsapp}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button for Footer Section */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={footerForm.processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 shadow-lg"
                        >
                            {footerForm.processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Save Footer Info
                                </>
                            )}
                        </Button>
                    </div>
                    </form>
                    </TabsContent>

                    {/* Tab 2: Subject Management */}
                    <TabsContent value="subjects" className="space-y-6">
                {/* Subject Management Section */}
                <div>
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Subject Management</h2>
                                <p className="text-sm text-slate-600">Manage all tutoring subjects organized by categories</p>
                            </div>
                        </div>
                    </div>

                <Card className="border-purple-200 shadow-lg hover:shadow-xl transition-all">
                            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                                            <BookOpen className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-bold text-gray-900">Subject Database</CardTitle>
                                            <CardDescription className="text-slate-600">Add, edit, or remove tutoring subjects</CardDescription>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() => openSubjectDialog()}
                                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Subject
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {/* Filters */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold">Filter by Category</Label>
                                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                            <SelectTrigger className="border-purple-200 focus:ring-purple-500">
                                                <SelectValue placeholder="All Categories" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Categories</SelectItem>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold">Search Subjects</Label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder="Search by name..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 border-purple-200 focus:ring-purple-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Bar */}
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-purple-600" />
                                        <p className="text-sm font-medium text-purple-900">
                                            Showing {filteredSubjects.length} of {subjects.length} subjects
                                        </p>
                                    </div>
                                    {categoryFilter !== 'all' && (
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => setCategoryFilter('all')}
                                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                                        >
                                            <X className="h-3 w-3 mr-1" />
                                            Clear Filter
                                        </Button>
                                    )}
                                </div>

                                {/* Subjects List */}
                                <div className="space-y-6">
                                    {Object.keys(groupedSubjects).length === 0 ? (
                                        <div className="text-center py-12 text-gray-500">
                                            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p className="font-medium">No subjects found</p>
                                            <p className="text-sm mt-1">Try adjusting your filters or add a new subject</p>
                                        </div>
                                    ) : (
                                        Object.entries(groupedSubjects).map(([categoryName, categorySubjects]) => {
                                            const categoryId = categorySubjects[0]?.category.id;
                                            const isExpanded = expandedCategories[categoryId];
                                            
                                            return (
                                                <div key={categoryName} className="space-y-3">
                                                    <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-purple-50 to-purple-100/30 rounded-lg border-l-4 border-purple-500">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-lg font-bold text-gray-900">{categoryName}</h3>
                                                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 font-semibold">
                                                                {categorySubjects.length}
                                                            </Badge>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => toggleCategory(categoryId)}
                                                            className="hover:bg-purple-100 text-purple-600 font-medium"
                                                        >
                                                            {isExpanded ? 'Hide' : 'View All'}
                                                        </Button>
                                                    </div>
                                                    {isExpanded && (
                                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                            {categorySubjects.map((subject) => (
                                                                <Card key={subject.id} className="group hover:shadow-md transition-all hover:border-purple-300">
                                                                    <CardContent className="p-4">
                                                                        <div className="flex items-start justify-between gap-2">
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="font-semibold text-gray-900 truncate">{subject.name}</p>
                                                                                <p className="text-xs text-purple-600 mt-0.5">{subject.category?.name}</p>
                                                                            </div>
                                                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <Button
                                                                                    type="button"
                                                                                    size="sm"
                                                                                    variant="ghost"
                                                                                    onClick={() => openSubjectDialog(subject)}
                                                                                    className="h-8 w-8 p-0 hover:bg-purple-50 hover:text-purple-700"
                                                                                >
                                                                                    <Edit className="h-3.5 w-3.5" />
                                                                                </Button>
                                                                                <Button
                                                                                    type="button"
                                                                                    size="sm"
                                                                                    variant="ghost"
                                                                                    onClick={() => handleDeleteSubject(subject)}
                                                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                                >
                                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                </div>
                    </TabsContent>
                </Tabs>

                {/* Subject Dialog */}
                <Dialog open={showSubjectDialog} onOpenChange={setShowSubjectDialog}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader className="pb-4 border-b border-purple-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                                    <BookOpen className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl font-bold">{editingSubject ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
                                    <DialogDescription className="text-sm">
                                        {editingSubject ? 'Update the subject details below' : 'Enter the details for the new subject'}
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                        <form onSubmit={handleSubjectSubmit} className="space-y-5 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="subject-name" className="text-sm font-semibold">Subject Name *</Label>
                                <Input
                                    id="subject-name"
                                    value={subjectForm.data.name}
                                    onChange={(e) => subjectForm.setData('name', e.target.value)}
                                    placeholder="e.g., Mathematics, Physics"
                                    className="border-purple-200 focus:ring-purple-500"
                                    required
                                />
                                {subjectForm.errors.name && (
                                    <p className="text-sm text-red-600">{subjectForm.errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject-category" className="text-sm font-semibold">Category *</Label>
                                <Select
                                    value={subjectForm.data.category_id}
                                    onValueChange={(value) => subjectForm.setData('category_id', value)}
                                    required
                                >
                                    <SelectTrigger id="subject-category" className="border-purple-200 focus:ring-purple-500">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {subjectForm.errors.category_id && (
                                    <p className="text-sm text-red-600">{subjectForm.errors.category_id}</p>
                                )}
                            </div>

                            <DialogFooter className="gap-2 pt-4 border-t border-purple-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={closeSubjectDialog}
                                    disabled={subjectForm.processing}
                                    className="border-purple-200 hover:bg-purple-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={subjectForm.processing}
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md"
                                >
                                    {subjectForm.processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="mr-2 h-4 w-4" />
                                            {editingSubject ? 'Update Subject' : 'Create Subject'}
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AuthenticatedLayout>    );
}
