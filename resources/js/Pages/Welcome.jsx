import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import PromotionalModal from '@/Components/PromotionalModal';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/Components/ui/carousel';
import {
    Star,
    TrendingUp,
    Award,
    Users,
    Target,
    Shield,
    Clock,
    ArrowRight,
    ChevronRight,
    CheckCircle,
    Home,
    UsersRound,
    Monitor,
    Package,
    BookOpen,
    GraduationCap,
    Languages,
    Baby,
    Palette,
    Quote,
} from 'lucide-react';

export default function Welcome({
    auth,
    featuredJobs = [],
    categories = [],
    stats = {},
    guardianTestimonials = [],
    tutorTestimonials = [],
    heroImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    promoBannerImage = '',
    showPromoBanner = false,
    heroTitle = 'Find the Perfect Tutor',
    heroSubtitle = 'Connect with Bangladesh\'s finest verified tutors. Transform your learning journey with personalized education tailored to your needs.',
    statsTutors = '850',
    statsJobs = '1250',
    statsSuccessRate = '95',
    statsStudents = '2400',
    tuitionTypes = [],
    servingCategories = [],
    howItWorks = [],
}) {

    const displayStats = {
        totalJobs: statsJobs || stats.totalJobs || '1250',
        activeTutors: statsTutors || stats.activeTutors || '850',
        successRate: statsSuccessRate || stats.successRate || '95',
        happyGuardians: statsStudents || stats.happyGuardians || '2400'
    };

    const iconMap = {
        Home, UsersRound, Monitor, Package, BookOpen, GraduationCap,
        Languages, Baby, Palette, Target, Users, CheckCircle, Award, TrendingUp
    };

    const defaultTuitionTypes = [
        { title: 'Home Tutoring', description: 'Home tutoring allows students to learn various subjects in their own home.', icon: 'Home' },
        { title: 'Group Tutoring', description: 'Group tutoring allows students to learn together and solve problems at an affordable cost.', icon: 'UsersRound' },
        { title: 'Online Tutoring', description: 'Hire the best tutors from anywhere and take online classes by using tools such as Google Meet, Zoom and more.', icon: 'Monitor' },
        { title: 'Package Tutoring', description: 'Package tutoring helps students to complete their studies within a specific time frame.', icon: 'Package' },
    ];

    const defaultServingCategories = [
        { name: 'Bangla Medium', icon: 'Languages' },
        { name: 'English Version', icon: 'BookOpen' },
        { name: 'English Medium', icon: 'GraduationCap' },
        { name: 'Madrasa Medium', icon: 'BookOpen' },
        { name: 'Quran and Islamic Studies', icon: 'BookOpen' },
        { name: 'Admission Preparation', icon: 'Target' },
        { name: 'Skill Development', icon: 'TrendingUp' },
        { name: 'Pre-school Education', icon: 'Baby' },
        { name: 'Arts and Crafts', icon: 'Palette' },
    ];

    const defaultHowItWorks = [
        { title: 'Search', description: 'Browse verified tutors by subject & location', icon: 'Target' },
        { title: 'Compare', description: 'Review profiles, ratings & experience', icon: 'Users' },
        { title: 'Connect', description: 'Book trial session instantly', icon: 'CheckCircle' },
        { title: 'Excel', description: 'Achieve your academic goals', icon: 'Award' },
    ];

    const displayTuitionTypes = tuitionTypes.length > 0 ? tuitionTypes : defaultTuitionTypes;
    const displayServingCategories = servingCategories.length > 0 ? servingCategories : defaultServingCategories;
    const displayHowItWorks = howItWorks.length > 0 ? howItWorks : defaultHowItWorks;

    const defaultCategories = [
        { name: 'Mathematics', icon: '📐', count: 145, color: 'from-blue-500 to-cyan-500' },
        { name: 'English', icon: '📚', count: 132, color: 'from-purple-500 to-pink-500' },
        { name: 'Science', icon: '🔬', count: 98, color: 'from-green-500 to-emerald-500' },
        { name: 'Computer', icon: '💻', count: 87, color: 'from-orange-500 to-red-500' },
        { name: 'Languages', icon: '🌍', count: 76, color: 'from-indigo-500 to-blue-500' },
        { name: 'Music', icon: '🎵', count: 54, color: 'from-pink-500 to-rose-500' },
    ];

    const displayCategories = categories.length > 0 ? categories : defaultCategories;

    const handleSearch = () => {
        window.location.href = searchLocation ? `/jobs?location=${searchLocation}` : '/jobs';
    };

    return (
        <PublicLayout title="Welcome">
            {/* Promotional Modal */}
            <PromotionalModal
                imageUrl={promoBannerImage}
                enabled={showPromoBanner}
            />

            {/* Hero Section - Simplified */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-[#0F48A1]/5">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F48A1]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F48A1]/5 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight whitespace-pre-line">
                                {heroTitle}
                            </h1>

                            <p className="text-xl text-slate-600 leading-relaxed">
                                {heroSubtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="bg-[#0F48A1] hover:bg-[#0F48A1]/90 text-white px-8 rounded-xl">
                                    <Link href="/jobs">
                                        Find a Tutor
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="border-2 border-[#0F48A1] text-[#0F48A1] hover:bg-[#0F48A1] hover:text-white px-8 rounded-xl">
                                    <Link href="/tutor/signup">
                                        Become a Tutor
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#0F48A1] rounded-3xl rotate-3"></div>
                            <img
                                src={heroImage}
                                alt="Students Learning"
                                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                            />
                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#0F48A1] rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-600">Verified Tutors</div>
                                        <div className="text-xl font-bold text-slate-900">100% Safe</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Separate with proper padding */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#0F48A1] mb-2">{displayStats.activeTutors}+</div>
                            <div className="text-lg text-slate-600">Expert Tutors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#0F48A1] mb-2">{displayStats.totalJobs}+</div>
                            <div className="text-lg text-slate-600">Active Jobs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#0F48A1] mb-2">{displayStats.successRate}%</div>
                            <div className="text-lg text-slate-600">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#0F48A1] mb-2">{displayStats.happyGuardians}+</div>
                            <div className="text-lg text-slate-600">Happy Students</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tuition Types Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            Tuition Types
                        </h2>
                        <p className="text-xl text-slate-600">
                            Choose the learning method that suits you best
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayTuitionTypes.map((type, index) => {
                            const IconComponent = iconMap[type.icon] || Package;
                            return (
                                <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-200 group">
                                    <div className="w-16 h-16 bg-[#0F48A1]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0F48A1] transition-colors">
                                        <IconComponent className="h-8 w-8 text-[#0F48A1] group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{type.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {type.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Serving Categories Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            Serving Categories
                        </h2>
                        <p className="text-xl text-slate-600">
                            Comprehensive education solutions for every learner
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {displayServingCategories.map((category, index) => {
                            const IconComponent = iconMap[category.icon] || BookOpen;
                            return (
                                <Link
                                    key={index}
                                    href={`/jobs?category=${category.name.toLowerCase()}`}
                                >
                                    <div className="group relative overflow-hidden rounded-2xl bg-slate-50 p-6 hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:scale-105">
                                        <div className="absolute inset-0 bg-[#0F48A1] opacity-0 group-hover:opacity-5 transition-opacity"></div>
                                        <div className="relative flex items-center gap-4">
                                            <IconComponent className="h-8 w-8 text-[#0F48A1]" />
                                            <h3 className="font-bold text-slate-900">{category.name}</h3>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works - Modern Timeline */}
            <section className="py-20 bg-[#0F48A1] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-white/80">
                            Simple steps to find your perfect tutor
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {displayHowItWorks.map((step, idx) => {
                            const IconComponent = iconMap[step.icon] || Target;
                            return (
                                <div key={idx} className="relative">
                                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                                            <IconComponent className="h-8 w-8 text-[#0F48A1]" />
                                        </div>
                                        <div className="text-lg font-bold mb-2">
                                            <span className="text-3xl font-black text-white/40 mr-2">{idx + 1}</span>
                                            {step.title}
                                        </div>
                                        <p className="text-white/80">{step.description}</p>
                                    </div>
                                    {idx < displayHowItWorks.length - 1 && (
                                        <ChevronRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 h-8 w-8 text-white/40" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Guardian Feedback Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            Guardian Feedback
                        </h2>
                        <p className="text-xl text-slate-600">
                            What parents and students say about us
                        </p>
                    </div>

                    <Carousel
                        className="w-full max-w-6xl mx-auto"
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {guardianTestimonials.map((testimonial, idx) => (
                                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-2">
                                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 h-full">
                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                            <Quote className="h-8 w-8 text-[#0F48A1]/20 mb-4" />
                                            <p className="text-slate-700 leading-relaxed mb-6 italic">
                                                "{testimonial.feedback}"
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-[#0F48A1] rounded-full flex items-center justify-center text-white font-bold">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                                                    <div className="text-sm text-slate-600">Guardian</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-12 bg-[#0F48A1] text-white hover:bg-[#0F48A1]/90" />
                        <CarouselNext className="-right-12 bg-[#0F48A1] text-white hover:bg-[#0F48A1]/90" />
                    </Carousel>
                </div>
            </section>

            {/* Tutor Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            What Some Awesome Tutors Say About Us
                        </h2>
                        <p className="text-xl text-slate-600">
                            Become a tutor and start earning!
                        </p>
                    </div>

                    <Carousel
                        className="w-full max-w-6xl mx-auto"
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {tutorTestimonials.map((testimonial, idx) => (
                                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-2">
                                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-shadow h-full">
                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                            <Quote className="h-8 w-8 text-[#0F48A1]/20 mb-4" />
                                            <p className="text-slate-700 leading-relaxed mb-6 italic">
                                                "{testimonial.feedback}"
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-[#0F48A1] rounded-full flex items-center justify-center text-white font-bold">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                                                    <div className="text-sm text-slate-600">Tutor</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-12 bg-[#0F48A1] text-white hover:bg-[#0F48A1]/90" />
                        <CarouselNext className="-right-12 bg-[#0F48A1] text-white hover:bg-[#0F48A1]/90" />
                    </Carousel>

                    <div className="text-center mt-12">
                        <Button asChild size="lg" className="bg-[#0F48A1] hover:bg-[#0F48A1]/90 text-white px-10 rounded-xl">
                            <Link href="/tutor/signup">
                                Join as a Tutor
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section - Modern */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[#0F48A1]"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                        Ready to Transform Your Learning?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Join thousands of students already achieving their academic dreams
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-white text-[#0F48A1] hover:bg-slate-100 text-lg px-10 h-14 rounded-full shadow-2xl">
                            <Link href="/jobs">
                                Find a Tutor
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F48A1] text-lg px-10 h-14 rounded-full">
                            <Link href="/tutor/signup">
                                Become a Tutor
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}



