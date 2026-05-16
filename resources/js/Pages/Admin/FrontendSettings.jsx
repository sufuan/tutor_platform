import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import { Upload, Image as ImageIcon, X, Check, AlertCircle, Settings, Eye, Sparkles, LayoutDashboard, MapPin, Phone, Mail, Clock, Facebook, Linkedin, Twitter, Youtube, MessageCircle, BookOpen, Plus, Edit, Trash2, Search, Package, Home, UsersRound, Monitor, Languages, GraduationCap, Target, TrendingUp, Baby, Palette, Users, CheckCircle, Award, BarChart3, GripVertical, Briefcase, Info, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Separator } from '@/Components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

export default function FrontendSettings({ auth, settings, subjects, categories }) {
    // Forms setup remains identical
    const heroForm = useForm({
        hero_title: settings.hero_title || 'Find the Perfect Tutor',
        hero_subtitle: settings.hero_subtitle || 'Connect with Bangladesh\'s finest verified tutors. Transform your learning journey with personalized education tailored to your needs.',
    });

    const statsForm = useForm({
        stats_tutors: settings.stats_tutors || '850',
        stats_jobs: settings.stats_jobs || '1250',
        stats_success_rate: settings.stats_success_rate || '95',
        stats_students: settings.stats_students || '2400',
    });

    const imagesForm = useForm({
        hero_image: null,
        promo_banner_image: null,
        show_promo_banner: settings.show_promo_banner || false,
    });

    const tuitionTypesForm = useForm({
        tuition_types: settings.tuition_types ? JSON.parse(settings.tuition_types) : [],
    });

    const servingCategoriesForm = useForm({
        serving_categories: settings.serving_categories ? JSON.parse(settings.serving_categories) : [],
    });

    const howItWorksForm = useForm({
        how_it_works: settings.how_it_works ? JSON.parse(settings.how_it_works) : [],
    });

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

    const subjectForm = useForm({
        name: '',
        category_id: '',
    });

    // State
    const [heroPreview, setHeroPreview] = useState(null);
    const [promoPreview, setPromoPreview] = useState(null);
    const [showSubjectDialog, setShowSubjectDialog] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategories, setExpandedCategories] = useState({});
    const [activeTab, setActiveTab] = useState('general');
    
    const { toast } = useToast();

    // Handlers
    const handleHeroImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            imagesForm.setData('hero_image', file);
            const reader = new FileReader();
            reader.onloadend = () => setHeroPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handlePromoImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            imagesForm.setData('promo_banner_image', file);
            const reader = new FileReader();
            reader.onloadend = () => setPromoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleHeroSubmit = (e) => {
        e.preventDefault();
        heroForm.post(route('admin.frontend-settings.update'), {
            onSuccess: () => toast({ title: "Success", description: "Hero text updated successfully!" }),
        });
    };

    const handleStatsSubmit = (e) => {
        e.preventDefault();
        statsForm.post(route('admin.frontend-settings.update'), {
            onSuccess: () => toast({ title: "Success", description: "Statistics updated successfully!" }),
        });
    };

    const handleImagesSubmit = (e) => {
        e.preventDefault();
        imagesForm.post(route('admin.frontend-settings.update'), {
            forceFormData: true,
            onSuccess: () => {
                setHeroPreview(null);
                setPromoPreview(null);
                toast({ title: "Success", description: "Media assets updated successfully!" });
            },
        });
    };

    const handleTuitionTypesSubmit = (e) => {
        e.preventDefault();
        tuitionTypesForm.post(route('admin.frontend-settings.update'), {
            data: { tuition_types: JSON.stringify(tuitionTypesForm.data.tuition_types) },
            onSuccess: () => toast({ title: "Success", description: "Tuition types updated successfully!" }),
        });
    };

    const handleServingCategoriesSubmit = (e) => {
        e.preventDefault();
        servingCategoriesForm.post(route('admin.frontend-settings.update'), {
            data: { serving_categories: JSON.stringify(servingCategoriesForm.data.serving_categories) },
            onSuccess: () => toast({ title: "Success", description: "Categories updated successfully!" }),
        });
    };

    const handleHowItWorksSubmit = (e) => {
        e.preventDefault();
        howItWorksForm.post(route('admin.frontend-settings.update'), {
            data: { how_it_works: JSON.stringify(howItWorksForm.data.how_it_works) },
            onSuccess: () => toast({ title: "Success", description: "Instructions updated successfully!" }),
        });
    };

    const handleFooterSubmit = (e) => {
        e.preventDefault();
        footerForm.post(route('admin.frontend-settings.update'), {
            onSuccess: () => toast({ title: "Success", description: "Contact information updated successfully!" }),
        });
    };

    const clearHeroPreview = () => { setHeroPreview(null); imagesForm.setData('hero_image', null); };
    const clearPromoPreview = () => { setPromoPreview(null); imagesForm.setData('promo_banner_image', null); };

    const openSubjectDialog = (subject = null) => {
        if (subject) {
            setEditingSubject(subject);
            subjectForm.setData({ name: subject.name, category_id: subject.category_id.toString() });
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
        const action = editingSubject ? subjectForm.put(route('admin.subjects.update', editingSubject.id)) : subjectForm.post(route('admin.subjects.store'));
        action.then(() => {
            closeSubjectDialog();
            toast({ title: "Success", description: `Subject ${editingSubject ? 'updated' : 'created'} successfully!` });
        });
    };

    const handleDeleteSubject = (subject) => {
        if (confirm(`Are you sure you want to delete "${subject.name}"?`)) {
            subjectForm.delete(route('admin.subjects.delete', subject.id), {
                onSuccess: () => toast({ title: "Success", description: "Subject deleted successfully!" }),
            });
        }
    };

    const toggleCategory = (categoryId) => setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));

    const filteredSubjects = subjects.filter(subject => {
        const matchesCategory = categoryFilter === 'all' || subject.category_id.toString() === categoryFilter;
        const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
        const categoryName = subject.category?.name || 'Uncategorized';
        if (!acc[categoryName]) acc[categoryName] = [];
        acc[categoryName].push(subject);
        return acc;
    }, {});

    // Utility components for clean UI
    const SaveButton = ({ processing, label = "Save Changes" }) => (
        <Button type="submit" disabled={processing} className="bg-[#0F48A1] hover:bg-[#0F48A1]/90 text-white px-8 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
            {processing ? (
                <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>Saving...</>
            ) : (
                <><Check className="mr-2 h-4 w-4" />{label}</>
            )}
        </Button>
    );

    const FormCard = ({ title, description, icon: Icon, children, footer }) => (
        <Card className="border-slate-200 shadow-sm overflow-hidden rounded-2xl bg-white">
            <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-[#0F48A1]">
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold text-slate-800">{title}</CardTitle>
                        {description && <CardDescription className="text-sm mt-1">{description}</CardDescription>}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {children}
            </CardContent>
            {footer && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                    {footer}
                </div>
            )}
        </Card>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#0F48A1]/10 rounded-xl">
                            <LayoutDashboard className="h-6 w-6 text-[#0F48A1]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Website Customizer</h2>
                            <p className="text-sm text-slate-500 mt-0.5 font-medium">Manage your landing page content, assets, and branding.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-semibold">Changes are live instantly</span>
                    </div>
                </div>
            }
        >
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    
                    {/* Horizontal Navigation */}
                    <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
                        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm min-w-max inline-flex w-full">
                            <TabsList className="flex flex-row h-auto bg-transparent p-0 w-full gap-2">
                                <TabsTrigger value="general" className="flex-1 justify-center gap-2 rounded-xl px-5 py-3 data-[state=active]:bg-[#0F48A1]/5 data-[state=active]:text-[#0F48A1] data-[state=active]:shadow-none text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
                                    <Settings className="h-4 w-4" /> General & Hero
                                </TabsTrigger>
                                <TabsTrigger value="stats" className="flex-1 justify-center gap-2 rounded-xl px-5 py-3 data-[state=active]:bg-[#0F48A1]/5 data-[state=active]:text-[#0F48A1] data-[state=active]:shadow-none text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
                                    <BarChart3 className="h-4 w-4" /> Homepage Stats
                                </TabsTrigger>
                                <TabsTrigger value="services" className="flex-1 justify-center gap-2 rounded-xl px-5 py-3 data-[state=active]:bg-[#0F48A1]/5 data-[state=active]:text-[#0F48A1] data-[state=active]:shadow-none text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
                                    <Briefcase className="h-4 w-4" /> Platform Services
                                </TabsTrigger>
                                <TabsTrigger value="instructions" className="flex-1 justify-center gap-2 rounded-xl px-5 py-3 data-[state=active]:bg-[#0F48A1]/5 data-[state=active]:text-[#0F48A1] data-[state=active]:shadow-none text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
                                    <Info className="h-4 w-4" /> How It Works
                                </TabsTrigger>
                                <TabsTrigger value="footer" className="flex-1 justify-center gap-2 rounded-xl px-5 py-3 data-[state=active]:bg-[#0F48A1]/5 data-[state=active]:text-[#0F48A1] data-[state=active]:shadow-none text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
                                    <Mail className="h-4 w-4" /> Contact & Socials
                                </TabsTrigger>
                                <Separator orientation="vertical" className="h-8 my-auto mx-1" />
                                <TabsTrigger value="subjects" className="flex-1 justify-center gap-2 rounded-xl px-5 py-3 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-none text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
                                    <BookOpen className="h-4 w-4" /> Subject Database
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0">
                        
                        {/* 1. GENERAL & HERO TAB */}
                        <TabsContent value="general" className="space-y-6 mt-0">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">General & Hero Settings</h3>
                                <p className="text-slate-500 text-sm mb-6">Manage your main landing page headline and visual assets.</p>
                            </div>

                            <form onSubmit={handleHeroSubmit}>
                                <FormCard 
                                    title="Hero Text Content" 
                                    icon={MessageSquare}
                                    footer={<SaveButton processing={heroForm.processing} label="Save Text Content" />}
                                >
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="hero_title" className="text-sm font-bold text-slate-700">Main Headline</Label>
                                            <Input
                                                id="hero_title"
                                                value={heroForm.data.hero_title}
                                                onChange={(e) => heroForm.setData('hero_title', e.target.value)}
                                                className="font-bold text-lg h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="hero_subtitle" className="text-sm font-bold text-slate-700">Supporting Subtitle</Label>
                                            <Textarea
                                                id="hero_subtitle"
                                                value={heroForm.data.hero_subtitle}
                                                onChange={(e) => heroForm.setData('hero_subtitle', e.target.value)}
                                                rows={3}
                                                className="resize-none"
                                            />
                                        </div>
                                    </div>
                                </FormCard>
                            </form>

                            <form onSubmit={handleImagesSubmit}>
                                <FormCard 
                                    title="Media Assets" 
                                    icon={ImageIcon}
                                    footer={<SaveButton processing={imagesForm.processing} label="Save Media Assets" />}
                                >
                                    <div className="space-y-8">
                                        {/* Hero Image */}
                                        <div className="space-y-4">
                                            <Label className="text-sm font-bold text-slate-700 block">Hero Background Image</Label>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                                                    <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] uppercase font-bold px-2 py-1 rounded backdrop-blur-md z-10">Current</div>
                                                    <img src={settings.hero_image} className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="Current Hero" />
                                                </div>
                                                <div className="relative">
                                                    {heroPreview ? (
                                                        <div className="rounded-xl overflow-hidden border-2 border-[#0F48A1] shadow-md h-48 relative">
                                                            <div className="absolute top-2 left-2 bg-[#0F48A1] text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm z-10">New Upload</div>
                                                            <img src={heroPreview} className="w-full h-full object-cover" alt="Preview" />
                                                            <button type="button" onClick={clearHeroPreview} className="absolute top-2 right-2 bg-white text-rose-500 hover:bg-rose-50 p-1.5 rounded-full shadow-md z-10"><X className="h-4 w-4"/></button>
                                                        </div>
                                                    ) : (
                                                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-[#0F48A1] transition-all">
                                                            <Upload className="h-8 w-8 text-slate-400 mb-2" />
                                                            <span className="text-sm font-semibold text-slate-700">Upload New Image</span>
                                                            <span className="text-xs text-slate-500 mt-1">1920x1080px (Max 5MB)</span>
                                                            <input type="file" className="hidden" accept="image/*" onChange={handleHeroImageChange} />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Promo Banner */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label className="text-sm font-bold text-slate-700 block mb-1">Promotional Modal Popup</Label>
                                                    <p className="text-xs text-slate-500">Show a popup banner to visitors when they land on the site.</p>
                                                </div>
                                                <Switch 
                                                    checked={imagesForm.data.show_promo_banner} 
                                                    onCheckedChange={(checked) => imagesForm.setData('show_promo_banner', checked)} 
                                                    className="data-[state=checked]:bg-[#0F48A1]"
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                {settings.promo_banner_image ? (
                                                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                                                        <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] uppercase font-bold px-2 py-1 rounded backdrop-blur-md z-10">Current</div>
                                                        <img src={settings.promo_banner_image} className="w-full h-48 object-cover opacity-90" alt="Promo Banner" />
                                                    </div>
                                                ) : (
                                                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 h-48 flex items-center justify-center text-slate-400 text-sm">No promo banner currently uploaded</div>
                                                )}
                                                
                                                <div className="relative">
                                                    {promoPreview ? (
                                                        <div className="rounded-xl overflow-hidden border-2 border-[#0F48A1] shadow-md h-48 relative">
                                                            <div className="absolute top-2 left-2 bg-[#0F48A1] text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm z-10">New Upload</div>
                                                            <img src={promoPreview} className="w-full h-full object-cover" alt="Preview" />
                                                            <button type="button" onClick={clearPromoPreview} className="absolute top-2 right-2 bg-white text-rose-500 hover:bg-rose-50 p-1.5 rounded-full shadow-md z-10"><X className="h-4 w-4"/></button>
                                                        </div>
                                                    ) : (
                                                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-[#0F48A1] transition-all">
                                                            <Upload className="h-8 w-8 text-slate-400 mb-2" />
                                                            <span className="text-sm font-semibold text-slate-700">Upload Promo Banner</span>
                                                            <span className="text-xs text-slate-500 mt-1">800x600px (Max 5MB)</span>
                                                            <input type="file" className="hidden" accept="image/*" onChange={handlePromoImageChange} />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FormCard>
                            </form>
                        </TabsContent>

                        {/* 2. STATISTICS TAB */}
                        <TabsContent value="stats" className="space-y-6 mt-0">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">Homepage Statistics</h3>
                                <p className="text-slate-500 text-sm mb-6">Update the numerical figures that display success metrics.</p>
                            </div>
                            
                            <form onSubmit={handleStatsSubmit}>
                                <FormCard 
                                    title="Performance Numbers" 
                                    icon={BarChart3}
                                    footer={<SaveButton processing={statsForm.processing} label="Save Statistics" />}
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700">Expert Tutors</Label>
                                            <Input value={statsForm.data.stats_tutors} onChange={e => statsForm.setData('stats_tutors', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700">Active Jobs</Label>
                                            <Input value={statsForm.data.stats_jobs} onChange={e => statsForm.setData('stats_jobs', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700">Success Rate (%)</Label>
                                            <Input value={statsForm.data.stats_success_rate} onChange={e => statsForm.setData('stats_success_rate', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700">Happy Students</Label>
                                            <Input value={statsForm.data.stats_students} onChange={e => statsForm.setData('stats_students', e.target.value)} />
                                        </div>
                                    </div>
                                </FormCard>
                            </form>
                        </TabsContent>

                        {/* 3. PLATFORM SERVICES TAB */}
                        <TabsContent value="services" className="space-y-6 mt-0">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">Platform Services</h3>
                                <p className="text-slate-500 text-sm mb-6">Manage Tuition Types and Serving Categories.</p>
                            </div>

                            {/* Tuition Types */}
                            <form onSubmit={handleTuitionTypesSubmit}>
                                <FormCard 
                                    title="Tuition Types" 
                                    icon={Package}
                                    footer={<SaveButton processing={tuitionTypesForm.processing} label="Save Tuition Types" />}
                                >
                                    <div className="space-y-4">
                                        {tuitionTypesForm.data.tuition_types.map((type, index) => (
                                            <div key={index} className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl relative group">
                                                <div className="mt-2 text-slate-400"><GripVertical className="h-5 w-5"/></div>
                                                <div className="flex-1 grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2 md:col-span-1">
                                                        <Label className="text-xs font-bold text-slate-500 uppercase">Title</Label>
                                                        <Input value={type.title} onChange={e => {
                                                            const newTypes = [...tuitionTypesForm.data.tuition_types];
                                                            newTypes[index].title = e.target.value;
                                                            tuitionTypesForm.setData('tuition_types', newTypes);
                                                        }} />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-1">
                                                        <Label className="text-xs font-bold text-slate-500 uppercase">Lucide Icon</Label>
                                                        <Input value={type.icon} onChange={e => {
                                                            const newTypes = [...tuitionTypesForm.data.tuition_types];
                                                            newTypes[index].icon = e.target.value;
                                                            tuitionTypesForm.setData('tuition_types', newTypes);
                                                        }} placeholder="e.g. Home, Monitor"/>
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label className="text-xs font-bold text-slate-500 uppercase">Description</Label>
                                                        <Textarea value={type.description} rows={2} onChange={e => {
                                                            const newTypes = [...tuitionTypesForm.data.tuition_types];
                                                            newTypes[index].description = e.target.value;
                                                            tuitionTypesForm.setData('tuition_types', newTypes);
                                                        }} />
                                                    </div>
                                                </div>
                                                <Button type="button" variant="ghost" size="icon" className="text-rose-400 hover:text-rose-600 hover:bg-rose-50" onClick={() => {
                                                    const newTypes = [...tuitionTypesForm.data.tuition_types];
                                                    newTypes.splice(index, 1);
                                                    tuitionTypesForm.setData('tuition_types', newTypes);
                                                }}><Trash2 className="h-4 w-4"/></Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" className="w-full border-dashed" onClick={() => {
                                            tuitionTypesForm.setData('tuition_types', [...tuitionTypesForm.data.tuition_types, { title: '', description: '', icon: 'Package' }]);
                                        }}><Plus className="mr-2 h-4 w-4"/> Add Tuition Type</Button>
                                    </div>
                                </FormCard>
                            </form>

                            {/* Serving Categories */}
                            <form onSubmit={handleServingCategoriesSubmit}>
                                <FormCard 
                                    title="Serving Categories" 
                                    icon={GraduationCap}
                                    footer={<SaveButton processing={servingCategoriesForm.processing} label="Save Categories" />}
                                >
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {servingCategoriesForm.data.serving_categories.map((category, index) => (
                                            <div key={index} className="flex gap-3 items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                                <div className="flex-1 space-y-2">
                                                    <Input value={category.name} placeholder="Category Name" onChange={e => {
                                                        const newCat = [...servingCategoriesForm.data.serving_categories];
                                                        newCat[index].name = e.target.value;
                                                        servingCategoriesForm.setData('serving_categories', newCat);
                                                    }} />
                                                    <Input value={category.icon} placeholder="Lucide Icon" className="text-sm" onChange={e => {
                                                        const newCat = [...servingCategoriesForm.data.serving_categories];
                                                        newCat[index].icon = e.target.value;
                                                        servingCategoriesForm.setData('serving_categories', newCat);
                                                    }} />
                                                </div>
                                                <Button type="button" variant="ghost" size="icon" className="text-rose-400 hover:text-rose-600" onClick={() => {
                                                    const newCat = [...servingCategoriesForm.data.serving_categories];
                                                    newCat.splice(index, 1);
                                                    servingCategoriesForm.setData('serving_categories', newCat);
                                                }}><Trash2 className="h-4 w-4"/></Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" className="h-full min-h-[100px] border-dashed" onClick={() => {
                                            servingCategoriesForm.setData('serving_categories', [...servingCategoriesForm.data.serving_categories, { name: '', icon: 'BookOpen' }]);
                                        }}><Plus className="mr-2 h-4 w-4"/> Add Category</Button>
                                    </div>
                                </FormCard>
                            </form>
                        </TabsContent>

                        {/* 4. INSTRUCTIONS TAB */}
                        <TabsContent value="instructions" className="space-y-6 mt-0">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">How It Works</h3>
                                <p className="text-slate-500 text-sm mb-6">Manage the step-by-step instructions for visitors.</p>
                            </div>

                            <form onSubmit={handleHowItWorksSubmit}>
                                <FormCard 
                                    title="Step-by-Step Guide" 
                                    icon={Target}
                                    footer={<SaveButton processing={howItWorksForm.processing} label="Save Steps" />}
                                >
                                    <div className="space-y-4">
                                        {howItWorksForm.data.how_it_works.map((step, index) => (
                                            <div key={index} className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                                <div className="h-8 w-8 rounded-full bg-[#0F48A1] text-white flex items-center justify-center font-bold shrink-0 mt-1">{index + 1}</div>
                                                <div className="flex-1 grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2 md:col-span-1">
                                                        <Label className="text-xs font-bold text-slate-500 uppercase">Title</Label>
                                                        <Input value={step.title} onChange={e => {
                                                            const newSteps = [...howItWorksForm.data.how_it_works];
                                                            newSteps[index].title = e.target.value;
                                                            howItWorksForm.setData('how_it_works', newSteps);
                                                        }} />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-1">
                                                        <Label className="text-xs font-bold text-slate-500 uppercase">Lucide Icon</Label>
                                                        <Input value={step.icon} onChange={e => {
                                                            const newSteps = [...howItWorksForm.data.how_it_works];
                                                            newSteps[index].icon = e.target.value;
                                                            howItWorksForm.setData('how_it_works', newSteps);
                                                        }} />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label className="text-xs font-bold text-slate-500 uppercase">Description</Label>
                                                        <Textarea value={step.description} rows={2} onChange={e => {
                                                            const newSteps = [...howItWorksForm.data.how_it_works];
                                                            newSteps[index].description = e.target.value;
                                                            howItWorksForm.setData('how_it_works', newSteps);
                                                        }} />
                                                    </div>
                                                </div>
                                                <Button type="button" variant="ghost" size="icon" className="text-rose-400 hover:text-rose-600" onClick={() => {
                                                    const newSteps = [...howItWorksForm.data.how_it_works];
                                                    newSteps.splice(index, 1);
                                                    howItWorksForm.setData('how_it_works', newSteps);
                                                }}><Trash2 className="h-4 w-4"/></Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" className="w-full border-dashed" onClick={() => {
                                            howItWorksForm.setData('how_it_works', [...howItWorksForm.data.how_it_works, { title: '', description: '', icon: 'Target' }]);
                                        }}><Plus className="mr-2 h-4 w-4"/> Add Step</Button>
                                    </div>
                                </FormCard>
                            </form>
                        </TabsContent>

                        {/* 5. CONTACT & SOCIALS TAB */}
                        <TabsContent value="footer" className="space-y-6 mt-0">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">Contact & Socials</h3>
                                <p className="text-slate-500 text-sm mb-6">Global footer information and social media routing.</p>
                            </div>

                            <form onSubmit={handleFooterSubmit}>
                                <div className="space-y-6">
                                    <FormCard title="Business Contact Info" icon={Phone}>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2 md:col-span-2">
                                                <Label className="text-sm font-bold text-slate-700">Section Title</Label>
                                                <Input value={footerForm.data.contact_title} onChange={e => footerForm.setData('contact_title', e.target.value)} />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <Label className="text-sm font-bold text-slate-700">Short Description</Label>
                                                <Textarea value={footerForm.data.contact_description} rows={2} onChange={e => footerForm.setData('contact_description', e.target.value)} />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <Label className="text-sm font-bold text-slate-700">Physical Address</Label>
                                                <Input value={footerForm.data.contact_address} onChange={e => footerForm.setData('contact_address', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700">Phone Number</Label>
                                                <Input value={footerForm.data.contact_phone} onChange={e => footerForm.setData('contact_phone', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700">Email Address</Label>
                                                <Input type="email" value={footerForm.data.contact_email} onChange={e => footerForm.setData('contact_email', e.target.value)} />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <Label className="text-sm font-bold text-slate-700">Business Hours</Label>
                                                <Input value={footerForm.data.contact_hours} onChange={e => footerForm.setData('contact_hours', e.target.value)} />
                                            </div>
                                        </div>
                                    </FormCard>

                                    <FormCard 
                                        title="Social Media Links" 
                                        icon={Facebook}
                                        footer={<SaveButton processing={footerForm.processing} label="Save Contact & Social Info" />}
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Facebook className="h-4 w-4 text-blue-600"/> Facebook URL</Label>
                                                <Input type="url" value={footerForm.data.social_facebook} onChange={e => footerForm.setData('social_facebook', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Linkedin className="h-4 w-4 text-blue-700"/> LinkedIn URL</Label>
                                                <Input type="url" value={footerForm.data.social_linkedin} onChange={e => footerForm.setData('social_linkedin', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Twitter className="h-4 w-4 text-sky-500"/> X (Twitter) URL</Label>
                                                <Input type="url" value={footerForm.data.social_twitter} onChange={e => footerForm.setData('social_twitter', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Youtube className="h-4 w-4 text-red-600"/> YouTube URL</Label>
                                                <Input type="url" value={footerForm.data.social_youtube} onChange={e => footerForm.setData('social_youtube', e.target.value)} />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <Label className="text-sm font-bold text-slate-700 flex items-center gap-2"><MessageCircle className="h-4 w-4 text-green-600"/> WhatsApp URL</Label>
                                                <Input type="url" value={footerForm.data.social_whatsapp} onChange={e => footerForm.setData('social_whatsapp', e.target.value)} />
                                            </div>
                                        </div>
                                    </FormCard>
                                </div>
                            </form>
                        </TabsContent>

                        {/* 6. SUBJECTS TAB */}
                        <TabsContent value="subjects" className="space-y-6 mt-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-1">Subject Database</h3>
                                    <p className="text-slate-500 text-sm">Manage all academic subjects categorized by medium/level.</p>
                                </div>
                                <Button onClick={() => openSubjectDialog()} className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                                    <Plus className="mr-2 h-4 w-4" /> Add Subject
                                </Button>
                            </div>

                            <Card className="border-slate-200 shadow-sm overflow-hidden">
                                <CardContent className="p-6 space-y-6">
                                    {/* Subject Filters */}
                                    <div className="flex flex-col md:flex-row gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="flex-1 space-y-1">
                                            <Label className="text-xs font-bold text-slate-500 uppercase">Filter by Category</Label>
                                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="All Categories" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Categories</SelectItem>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <Label className="text-xs font-bold text-slate-500 uppercase">Search</Label>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input placeholder="Search subjects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject List */}
                                    <div className="space-y-6">
                                        {Object.keys(groupedSubjects).length === 0 ? (
                                            <div className="text-center py-12 text-slate-500">
                                                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                                <p className="font-medium text-slate-600">No subjects found</p>
                                                <p className="text-sm">Try adjusting your filters or create a new one.</p>
                                            </div>
                                        ) : (
                                            Object.entries(groupedSubjects).map(([categoryName, categorySubjects]) => {
                                                const categoryId = categorySubjects[0]?.category?.id;
                                                const isExpanded = expandedCategories[categoryId] !== false; // Default true visually
                                                
                                                return (
                                                    <div key={categoryName} className="space-y-3">
                                                        <div className="flex items-center justify-between px-4 py-3 bg-purple-50/50 rounded-xl border border-purple-100">
                                                            <div className="flex items-center gap-3">
                                                                <h3 className="text-base font-bold text-slate-800">{categoryName}</h3>
                                                                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">{categorySubjects.length}</Badge>
                                                            </div>
                                                            <Button variant="ghost" size="sm" onClick={() => toggleCategory(categoryId)} className="text-purple-600 hover:text-purple-800 hover:bg-purple-100">
                                                                {isExpanded ? 'Collapse' : 'Expand'}
                                                            </Button>
                                                        </div>
                                                        {isExpanded && (
                                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                                {categorySubjects.map((subject) => (
                                                                    <div key={subject.id} className="group flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-sm transition-all">
                                                                        <div className="min-w-0 pr-3">
                                                                            <p className="font-semibold text-slate-800 truncate text-sm">{subject.name}</p>
                                                                        </div>
                                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-purple-600 hover:bg-purple-50" onClick={() => openSubjectDialog(subject)}>
                                                                                <Edit className="h-3.5 w-3.5" />
                                                                            </Button>
                                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-rose-600 hover:bg-rose-50" onClick={() => handleDeleteSubject(subject)}>
                                                                                <Trash2 className="h-3.5 w-3.5" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
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
                        </TabsContent>
                    </div>
                </Tabs>

                {/* Subject Dialog (Remains Same conceptually, updated UI) */}
                <Dialog open={showSubjectDialog} onOpenChange={setShowSubjectDialog}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">{editingSubject ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
                            <DialogDescription>
                                {editingSubject ? 'Update the details for this academic subject.' : 'Create a new subject to be listed under a category.'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubjectSubmit} className="space-y-6 pt-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-slate-700">Subject Name</Label>
                                <Input value={subjectForm.data.name} onChange={(e) => subjectForm.setData('name', e.target.value)} placeholder="e.g., Higher Math" />
                                {subjectForm.errors.name && <p className="text-xs text-rose-500">{subjectForm.errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-slate-700">Category</Label>
                                <Select value={subjectForm.data.category_id} onValueChange={(value) => subjectForm.setData('category_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {subjectForm.errors.category_id && <p className="text-xs text-rose-500">{subjectForm.errors.category_id}</p>}
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={closeSubjectDialog}>Cancel</Button>
                                <Button type="submit" disabled={subjectForm.processing} className="bg-purple-600 hover:bg-purple-700 text-white">
                                    {subjectForm.processing ? 'Saving...' : 'Save Subject'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
        </AuthenticatedLayout>
    );
}
