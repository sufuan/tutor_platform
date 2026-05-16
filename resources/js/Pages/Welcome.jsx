import { Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
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

    const CountUp = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);
        const countRef = useRef(null);
        const [hasStarted, setHasStarted] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !hasStarted) {
                        setHasStarted(true);
                    }
                },
                { threshold: 0.1 }
            );

            if (countRef.current) {
                observer.observe(countRef.current);
            }

            return () => observer.disconnect();
        }, [hasStarted]);

        useEffect(() => {
            if (!hasStarted) return;

            let startTime;
            const endValue = parseInt(end);

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                setCount(Math.floor(progress * endValue));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [hasStarted, end, duration]);

        return <span ref={countRef}>{count}</span>;
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
        <PublicLayout 
            title="Home - Find the Perfect Tutor" 
            description={heroSubtitle}
        >
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

                <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-24 lg:pt-30 lg:pb-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 leading-tight whitespace-pre-line">
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

            {/* Stats & Quick Actions Section */}
            <section className="relative mt-20 z-20 pb-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-[#0F48A1] rounded-[2rem] shadow-2xl overflow-hidden border border-white/10">
                        {/* Main Stats Row */}
                        <div className="px-4 py-8 md:px-12 lg:px-16">
                            <div className="flex flex-row items-center justify-between gap-2 md:gap-6 lg:gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                                {/* Active Tutors */}
                                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                                    <div className="shrink-0">
                                        <img src="https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/landing_page/total_apply.png" alt="Tutors" className="w-8 h-8 md:w-16 md:h-16 object-contain" />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-sm md:text-2xl font-bold leading-none">
                                            <CountUp end={displayStats.activeTutors} />+
                                        </p>
                                        <p className="text-[10px] md:text-sm text-white/70 mt-1 uppercase tracking-tight md:tracking-wider font-semibold whitespace-nowrap">Tutors</p>
                                    </div>
                                </div>

                                {/* Live Jobs */}
                                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                                    <div className="shrink-0">
                                        <img src="https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/landing_page/total_jobs.png" alt="Jobs" className="w-8 h-8 md:w-16 md:h-16 object-contain" />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-sm md:text-2xl font-bold leading-none">
                                            <CountUp end={displayStats.totalJobs} />+
                                        </p>
                                        <p className="text-[10px] md:text-sm text-white/70 mt-1 uppercase tracking-tight md:tracking-wider font-semibold whitespace-nowrap">Live Jobs</p>
                                    </div>
                                </div>

                                {/* Happy Students */}
                                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                                    <div className="shrink-0">
                                        <img src="https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/landing_page/total_happy.png" alt="Students" className="w-8 h-8 md:w-16 md:h-16 object-contain" />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-sm md:text-2xl font-bold leading-none">
                                            <CountUp end={displayStats.happyGuardians} />+
                                        </p>
                                        <p className="text-[10px] md:text-sm text-white/70 mt-1 uppercase tracking-tight md:tracking-wider font-semibold whitespace-nowrap">Students</p>
                                    </div>
                                </div>

                                {/* Success Rate */}
                                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                                    <div className="shrink-0">
                                        <img src="https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/landing_page/total_rating.png" alt="Rating" className="w-8 h-8 md:w-16 md:h-16 object-contain" />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-sm md:text-2xl font-bold leading-none">
                                            <CountUp end={displayStats.successRate} />%
                                        </p>
                                        <p className="text-[10px] md:text-sm text-white/70 mt-1 uppercase tracking-tight md:tracking-wider font-semibold whitespace-nowrap">Success</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Quick Links Carousel */}
                        <div className="bg-white/5 border-t border-white/10 px-5 py-5">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="shrink-0 text-white/80 font-bold text-sm uppercase tracking-widest hidden lg:block">
                                    Quick Search:
                                </div>
                                <div className="w-full overflow-hidden">
                                    <Carousel
                                        opts={{
                                            align: "start",
                                            loop: true,
                                            dragFree: true,
                                        }}
                                        plugins={[
                                            Autoplay({
                                                delay: 1200,
                                                stopOnInteraction: false,
                                                stopOnMouseEnter: true,
                                            }),
                                        ]}
                                        className="w-full"
                                    >
                                        <CarouselContent className="-ml-2">
                                            {[
                                                // Dhaka Division
                                                'Dhaka','Faridpur','Gazipur','Gopalganj','Kishoreganj','Madaripur','Manikganj','Munshiganj','Narayanganj','Narsingdi','Rajbari','Shariatpur','Tangail',
                                                // Chittagong Division
                                                'Bandarban','Brahmanbaria','Chandpur','Chittagong','Comilla',"Cox's Bazar",'Feni','Khagrachhari','Lakshmipur','Noakhali','Rangamati',
                                                // Rajshahi Division
                                                'Bogra','Chapainawabganj','Joypurhat','Naogaon','Natore','Pabna','Rajshahi','Sirajganj',
                                                // Khulna Division
                                                'Bagerhat','Chuadanga','Jessore','Jhenaidah','Khulna','Kushtia','Magura','Meherpur','Narail','Satkhira',
                                                // Barisal Division
                                                'Barguna','Barisal','Bhola','Jhalokati','Patuakhali','Pirojpur',
                                                // Sylhet Division
                                                'Habiganj','Moulvibazar','Sunamganj','Sylhet',
                                                // Rangpur Division
                                                'Dinajpur','Gaibandha','Kurigram','Lalmonirhat','Nilphamari','Panchagarh','Rangpur','Thakurgaon',
                                                // Mymensingh Division
                                                'Jamalpur','Mymensingh','Netrokona','Sherpur',
                                            ].map((district, index) => (
                                                <CarouselItem key={index} className="pl-2 basis-auto">
                                                    <Link
                                                        href={`/jobs?location=${encodeURIComponent(district)}`}
                                                        className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-[#0F48A1] rounded-full text-xs font-bold transition-all duration-300 border border-white/20 whitespace-nowrap"
                                                    >
                                                        {district}
                                                    </Link>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tuition Types Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            Tuition Types
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Find the perfect learning format that fits your schedule and goals
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {displayTuitionTypes.map((type, index) => {
                            // Map existing titles to the specific SVG icons provided in the reference
                            const iconUrls = {
                                'Home Tutoring': 'https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/landing_page/hometutor.svg',
                                'Group Tutoring': 'https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/landing_page/groupclass.svg',
                                'Online Tutoring': 'https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/landing_page/onlinetutor.svg',
                                'Package Tutoring': 'https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/landing_page/package.svg'
                            };

                            const iconUrl = iconUrls[type.title] || 'https://cdn-caretutors.sgp1.cdn.digitaloceanspaces.com/assets/img/icon/shadow_tutoring.svg';

                            return (
                                <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl border border-slate-200 hover:border-[#0F48A1] hover:bg-slate-50/50 transition-all duration-300 group">
                                    <div className="shrink-0">
                                        <img src={iconUrl} alt={type.title} className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-2xl font-bold text-[#0F48A1] mb-3">{type.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                            {type.description}
                                        </p>
                                    </div>
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
            {/* <section className="py-20 bg-[#0F48A1] text-white">
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
            </section> */}

            {/* Guardian Feedback Section - Premium */}
            <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-visible">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F48A1]/3 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Header with premium styling */}
                    <div className="text-center mb-20">
                        <span className="inline-block bg-[#0F48A1]/10 text-[#0F48A1] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                            ⭐ Guardian Reviews
                        </span>
                        <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                            Parents Trust Our Platform
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                            Discover why thousands of parents and students choose CareTutors for quality education
                        </p>
                        <Link href={auth?.user ? route('guardian.feedback.create') : route('login')} className="inline-block">
                            <Button className="bg-[#0F48A1] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                Share Your Experience
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Testimonials Carousel */}
                    {guardianTestimonials.length > 0 ? (
                        <Carousel
                            className="w-full overflow-visible"
                            opts={{ align: 'start', loop: true }}
                            plugins={[Autoplay({ delay: 4000 })]}
                        >
                            <CarouselContent className="-ml-4">
                                {guardianTestimonials.map((testimonial, idx) => (
                                    <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3 overflow-visible">
                                        <div className="h-full">
                                            {/* Premium Testimonial Card */}
                                            <div className="relative h-full group">
                                                {/* Glow effect */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#0F48A1]/20 via-transparent to-blue-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl"></div>

                                                {/* Card */}
                                                <div className="relative h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-[#0F48A1]/30 flex flex-col backdrop-blur-sm">
                                                    {/* Rating Stars - Premium */}
                                                    <div className="flex items-center justify-between mb-5">
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-5 w-5 transition-all ${
                                                                        i < (testimonial.rating || 5)
                                                                            ? 'text-yellow-400 fill-yellow-400'
                                                                            : 'text-gray-300'
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm font-bold text-[#0F48A1] bg-[#0F48A1]/10 px-3 py-1 rounded-full">
                                                            {testimonial.rating}/5
                                                        </span>
                                                    </div>

                                                    {/* Quote Icon */}
                                                    <svg className="h-8 w-8 text-[#0F48A1]/15 mb-4" fill="currentColor" viewBox="0 0 512 512">
                                                        <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                                                    </svg>

                                                    {/* Feedback Text */}
                                                    <p className="text-slate-700 leading-relaxed mb-8 flex-1 text-sm font-medium line-clamp-4 hover:line-clamp-none transition-all">
                                                        "{testimonial.feedback}"
                                                    </p>

                                                    {/* Divider */}
                                                    <div className="h-px bg-gradient-to-r from-transparent via-[#0F48A1]/20 to-transparent mb-5"></div>

                                                    {/* Guardian Info - Premium */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-[#0F48A1] to-blue-600 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-all"></div>
                                                            <div className="relative w-14 h-14 bg-gradient-to-br from-[#0F48A1] to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                                {testimonial.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-bold text-slate-900 text-base truncate">
                                                                {testimonial.name}
                                                            </div>
                                                            <div className="text-xs text-[#0F48A1] font-semibold">
                                                                Verified Guardian
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="-left-4 lg:-left-16 bg-[#0F48A1] text-white hover:bg-blue-700 border-0 shadow-lg h-12 w-12 transition-all duration-300 hover:scale-110" />
                            <CarouselNext className="-right-4 lg:-right-16 bg-[#0F48A1] text-white hover:bg-blue-700 border-0 shadow-lg h-12 w-12 transition-all duration-300 hover:scale-110" />
                        </Carousel>
                    ) : (
                        <div className="text-center py-12 bg-slate-100 rounded-2xl">
                            <p className="text-slate-600 text-lg">No reviews yet. Be the first to share your experience!</p>
                        </div>
                    )}

                    {/* Stats below testimonials */}
                    {guardianTestimonials.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-8 mt-20">
                            <div className="text-center">
                                <div className="text-4xl font-black text-[#0F48A1] mb-2">
                                    {guardianTestimonials.length}+
                                </div>
                                <p className="text-slate-600">Happy Families</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-[#0F48A1] mb-2">
                                    {(guardianTestimonials.reduce((sum, t) => sum + t.rating, 0) / guardianTestimonials.length).toFixed(1)}
                                </div>
                                <p className="text-slate-600">Average Rating</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-[#0F48A1] mb-2">
                                    100%
                                </div>
                                <p className="text-slate-600">Verified Reviews</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Tutor Testimonials Section */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white overflow-visible">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="inline-block bg-[#0F48A1]/10 text-[#0F48A1] text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                            Tutor Stories
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            What Our Tutors Say
                        </h2>
                        <p className="text-lg text-slate-500 max-w-xl mx-auto">
                            Join thousands of tutors who are building their careers with us
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-6">
                            <Link
                                href="/tutor/signup"
                                className="inline-flex items-center gap-2 bg-[#0F48A1] hover:bg-[#0F48A1]/90 text-white font-bold px-7 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Become a Tutor
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Carousel */}
                    <Carousel
                        className="w-full overflow-visible"
                        opts={{ align: 'start', loop: true }}
                        plugins={[Autoplay({ delay: 3500 })]}
                    >
                        <CarouselContent className="-ml-4">
                            {tutorTestimonials.map((testimonial, idx) => (
                                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3 overflow-visible">
                                    {/* Card with floating avatar */}
                                    <div className="relative pt-14 pb-2 px-2 overflow-visible">
                                        {/* Floating Avatar */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                                            {testimonial.photo_url ? (
                                                <img
                                                    src={testimonial.photo_url}
                                                    alt={testimonial.name}
                                                    className="w-[5.5rem] h-[5.5rem] rounded-full object-cover border-4 border-white shadow-xl outline outline-[3px] outline-[#0F48A1]"
                                                />
                                            ) : (
                                                <div className="w-[5.5rem] h-[5.5rem] rounded-full bg-gradient-to-br from-[#0F48A1] to-blue-400 border-4 border-white shadow-xl outline outline-[3px] outline-[#0F48A1] flex items-center justify-center text-white text-3xl font-black">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Body */}
                                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 pt-12 pb-6 px-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[280px] flex flex-col overflow-visible">
                                            {/* Name & Institution */}
                                            <div className="text-center mb-4">
                                                <h3 className="text-base font-bold text-[#0F48A1]">{testimonial.name}</h3>
                                                {testimonial.institution && (
                                                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{testimonial.institution}</p>
                                                )}
                                                {/* Stars */}
                                                <div className="flex items-center justify-center gap-0.5 mt-2">
                                                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                        <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Divider */}
                                            <div className="w-8 h-0.5 bg-[#0F48A1]/20 mx-auto mb-4" />

                                            {/* Quote Icon + Feedback */}
                                            <div className="flex items-start gap-3 flex-1">
                                                <svg className="shrink-0 w-7 h-7 text-[#0F48A1]/25 mt-0.5" fill="currentColor" viewBox="0 0 512 512">
                                                    <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                                                </svg>
                                                <p className="text-slate-600 text-sm leading-relaxed text-justify line-clamp-5">
                                                    {testimonial.feedback}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-4 lg:-left-12 bg-[#0F48A1] text-white hover:bg-[#0F48A1]/90 border-0 shadow-lg" />
                        <CarouselNext className="-right-4 lg:-right-12 bg-[#0F48A1] text-white hover:bg-[#0F48A1]/90 border-0 shadow-lg" />
                    </Carousel>
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



