import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/ui/accordion';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import {
    Search,
    MapPin,
    Briefcase,
    Users,
    TrendingUp,
    Heart,
    CheckCircle2,
    Clock,
    DollarSign,
    Star,
    Shield,
    Calendar,
    Award,
    BookOpen,
    GraduationCap,
    Target,
    MessageCircle,
    FileCheck,
    UserCheck,
    Sparkles,
    ArrowRight,
    Mail,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{count.toLocaleString()}{suffix}</span>;
};

export default function Welcome({ 
    auth, 
    featuredJobs = [], 
    categories = [], 
    stats = {}, 
    testimonials = [],
    locations = [],
    subjects = []
}) {
    const [searchLocation, setSearchLocation] = useState('');
    const [searchSubject, setSearchSubject] = useState('');
    const [email, setEmail] = useState('');

    const defaultStats = {
        totalJobs: 1250,
        activeTutors: 850,
        successRate: 95,
        happyGuardians: 2400
    };

    const displayStats = { ...defaultStats, ...stats };

    const defaultCategories = [
        { name: 'Mathematics', icon: '📐', count: 145 },
        { name: 'English', icon: '📚', count: 132 },
        { name: 'Science', icon: '🔬', count: 98 },
        { name: 'Computer Science', icon: '💻', count: 87 },
        { name: 'Languages', icon: '🌍', count: 76 },
        { name: 'Music', icon: '🎵', count: 54 },
        { name: 'Arts', icon: '🎨', count: 43 },
        { name: 'Business', icon: '💼', count: 65 },
        { name: 'History', icon: '📜', count: 49 },
        { name: 'Geography', icon: '🗺️', count: 38 },
        { name: 'Physical Education', icon: '⚽', count: 52 },
        { name: 'Chemistry', icon: '⚗️', count: 71 },
        { name: 'Physics', icon: '⚛️', count: 68 },
    ];

    const displayCategories = categories.length > 0 ? categories : defaultCategories;

    const defaultTestimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Parent',
            rating: 5,
            comment: 'Found an amazing tutor for my daughter. Her grades improved dramatically within just 3 months!',
            avatar: null
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Tutor',
            rating: 5,
            comment: 'Great platform to connect with students. The booking system is seamless and payments are always on time.',
            avatar: null
        },
        {
            id: 3,
            name: 'Emma Williams',
            role: 'Parent',
            rating: 5,
            comment: 'Very professional tutors. The verification process gives me peace of mind about who is teaching my children.',
            avatar: null
        }
    ];

    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

    const faqs = [
        {
            question: 'How do I find a tutor?',
            answer: 'Simply use our search feature to filter by location and subject. Browse tutor profiles, read reviews, and book a session with your preferred tutor.'
        },
        {
            question: 'Are all tutors verified?',
            answer: 'Yes! All tutors undergo a thorough verification process including background checks, qualification verification, and reference checks to ensure quality and safety.'
        },
        {
            question: 'What subjects are available?',
            answer: 'We offer tutors for a wide range of subjects including Mathematics, English, Sciences, Languages, Music, Arts, and more. You can browse all categories on our platform.'
        },
        {
            question: 'How does payment work?',
            answer: 'Payment is made securely through our platform. You can pay per session or purchase packages. Payments are held securely and released to tutors after successful completion of sessions.'
        },
        {
            question: 'Can I get a refund?',
            answer: 'Yes, we have a satisfaction guarantee. If you\'re not satisfied with a session, contact us within 24 hours and we\'ll work to resolve the issue or provide a refund.'
        },
        {
            question: 'How do I become a tutor?',
            answer: 'Click on "Become a Tutor" and complete the registration process. You\'ll need to provide your qualifications, experience, and undergo our verification process.'
        }
    ];

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchLocation) params.append('location', searchLocation);
        if (searchSubject) params.append('subject', searchSubject);
        window.location.href = `/jobs?${params.toString()}`;
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
        alert('Thank you for subscribing!');
    };

    return (
        <PublicLayout title="Welcome">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#1F3C88] via-[#2A5298] to-[#1F3C88] text-white overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-[#F7C600] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative container mx-auto px-4 py-20 lg:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                            Find Your Perfect Tutor Today
                        </h1>
                        <p className="text-xl md:text-2xl mb-12 text-blue-100">
                            Connect with verified, experienced tutors for personalized learning
                        </p>

                        {/* Search Bar */}
                        <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6 mb-12">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                                    <MapPin className="text-gray-400 h-5 w-5 flex-shrink-0" />
                                    <Input
                                        type="text"
                                        placeholder="Enter location..."
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                        className="border-0 bg-transparent focus-visible:ring-0 text-gray-900"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Select value={searchSubject} onValueChange={setSearchSubject}>
                                        <SelectTrigger className="h-full bg-gray-50 border-0 text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="text-gray-400 h-5 w-5" />
                                                <SelectValue placeholder="Select subject..." />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {displayCategories.map((cat, idx) => (
                                                <SelectItem key={idx} value={cat.name.toLowerCase()}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button 
                                    onClick={handleSearch}
                                    size="lg" 
                                    className="bg-[#F7C600] hover:bg-[#E0B500] text-[#1F3C88] font-semibold"
                                >
                                    <Search className="mr-2 h-5 w-5" />
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Button asChild size="lg" className="bg-[#F7C600] hover:bg-[#E0B500] text-[#1F3C88] font-semibold text-lg px-8">
                                <Link href="/jobs">
                                    Find a Tutor
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="bg-white text-[#1F3C88] hover:bg-gray-100 font-semibold text-lg px-8 border-2">
                                <Link href="/register?role=tutor">
                                    Become a Tutor
                                    <GraduationCap className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        {/* Stats Overlay */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#F7C600] mb-2">
                                    <AnimatedCounter end={displayStats.totalJobs} suffix="+" />
                                </div>
                                <div className="text-sm md:text-base text-blue-100">Jobs Posted</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#F7C600] mb-2">
                                    <AnimatedCounter end={displayStats.activeTutors} suffix="+" />
                                </div>
                                <div className="text-sm md:text-base text-blue-100">Active Tutors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#F7C600] mb-2">
                                    <AnimatedCounter end={displayStats.successRate} suffix="%" />
                                </div>
                                <div className="text-sm md:text-base text-blue-100">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#F7C600] mb-2">
                                    <AnimatedCounter end={displayStats.happyGuardians} suffix="+" />
                                </div>
                                <div className="text-sm md:text-base text-blue-100">Happy Families</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-t-4 border-t-[#1F3C88] hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Total Jobs Posted
                                </CardTitle>
                                <Briefcase className="h-5 w-5 text-[#1F3C88]" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-[#1F3C88]">
                                    <AnimatedCounter end={displayStats.totalJobs} suffix="+" />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    <TrendingUp className="inline h-3 w-3 mr-1" />
                                    Growing daily
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-[#F7C600] hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Active Tutors
                                </CardTitle>
                                <Users className="h-5 w-5 text-[#F7C600]" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-[#1F3C88]">
                                    <AnimatedCounter end={displayStats.activeTutors} suffix="+" />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    <CheckCircle2 className="inline h-3 w-3 mr-1" />
                                    All verified
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Success Rate
                                </CardTitle>
                                <Target className="h-5 w-5 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-[#1F3C88]">
                                    <AnimatedCounter end={displayStats.successRate} suffix="%" />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    <Award className="inline h-3 w-3 mr-1" />
                                    Student satisfaction
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-pink-500 hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Happy Guardians
                                </CardTitle>
                                <Heart className="h-5 w-5 text-pink-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-[#1F3C88]">
                                    <AnimatedCounter end={displayStats.happyGuardians} suffix="+" />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    <Star className="inline h-3 w-3 mr-1 fill-current" />
                                    5-star reviews
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Featured Jobs Section */}
            {featuredJobs.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1F3C88] mb-4">
                                Featured Opportunities
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Explore the latest tutoring opportunities from families in your area
                            </p>
                        </div>

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000 }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="pb-12"
                        >
                            {featuredJobs.map((job) => (
                                <SwiperSlide key={job.id}>
                                    <Card className="h-full hover:shadow-xl transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between mb-2">
                                                <Badge className="bg-[#F7C600] text-[#1F3C88] hover:bg-[#E0B500]">
                                                    Featured
                                                </Badge>
                                                <Badge variant="outline" className="text-green-600 border-green-600">
                                                    {job.status || 'Active'}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-xl text-[#1F3C88] line-clamp-2">
                                                {job.title}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-2">
                                                <MapPin className="h-4 w-4" />
                                                {job.location?.name || 'Location'}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <DollarSign className="h-4 w-4 text-gray-500" />
                                                    <span className="font-semibold text-[#1F3C88]">
                                                        ${job.hourly_rate}/hour
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span className="line-clamp-1">
                                                        {job.subjects?.map(s => s.name).join(', ') || 'Various subjects'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{job.sessions_per_week || 2} sessions/week</span>
                                                </div>
                                                <Button asChild className="w-full bg-[#1F3C88] hover:bg-[#2A5298] mt-4">
                                                    <Link href={`/jobs/${job.id}`}>
                                                        Apply Now
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="text-center mt-8">
                            <Button asChild size="lg" variant="outline" className="border-[#1F3C88] text-[#1F3C88] hover:bg-[#1F3C88] hover:text-white">
                                <Link href="/jobs">
                                    View All Jobs
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3C88] mb-4">
                            Browse by Subject
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Find expert tutors in your desired subject area
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {displayCategories.map((category, index) => (
                            <Link 
                                key={index} 
                                href={`/jobs?subject=${category.name.toLowerCase()}`}
                                className="group"
                            >
                                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-[#F7C600]">
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                            {category.icon}
                                        </div>
                                        <h3 className="font-semibold text-[#1F3C88] mb-1">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {category.count || 0} tutors
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3C88] mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Getting started is simple and straightforward
                        </p>
                    </div>

                    <Tabs defaultValue="guardians" className="max-w-5xl mx-auto">
                        <TabsList className="grid w-full grid-cols-2 mb-12">
                            <TabsTrigger value="guardians" className="text-lg">
                                For Guardians
                            </TabsTrigger>
                            <TabsTrigger value="tutors" className="text-lg">
                                For Tutors
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="guardians">
                            <div className="grid md:grid-cols-4 gap-6">
                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 bg-[#1F3C88] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Search className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1F3C88] mb-2">
                                            1. Search
                                        </h3>
                                        <p className="text-gray-600">
                                            Browse tutors by subject, location, and availability
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 bg-[#F7C600] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <UserCheck className="h-8 w-8 text-[#1F3C88]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1F3C88] mb-2">
                                            2. Review
                                        </h3>
                                        <p className="text-gray-600">
                                            Check profiles, qualifications, and reviews
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 bg-[#1F3C88] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <MessageCircle className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1F3C88] mb-2">
                                            3. Connect
                                        </h3>
                                        <p className="text-gray-600">
                                            Message tutors and schedule a trial session
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 bg-[#F7C600] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Sparkles className="h-8 w-8 text-[#1F3C88]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1F3C88] mb-2">
                                            4. Learn
                                        </h3>
                                        <p className="text-gray-600">
                                            Start learning and track progress together
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="tutors">
                            <div className="grid md:grid-cols-4 gap-6">
                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 bg-[#1F3C88] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FileCheck className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1F3C88] mb-2">
                                            1. Register
                                        </h3>
                                        <p className="text-gray-600">
                                            Create your profile and showcase qualifications
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 bg-[#F7C600] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Shield className="h-8 w-8 text-[#1F3C88]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1F3C88] mb-2">
                                            2. Verify
                                        </h3>
                                        <p className="text-gray-600">
                                            Complete verification process for credibility
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 bg-[#1F3C88] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Briefcase className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1F3C88] mb-2">
                                            3. Apply
                                        </h3>
                                        <p className="text-gray-600">
                                            Browse and apply to tutoring opportunities
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="text-center hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 bg-[#F7C600] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <DollarSign className="h-8 w-8 text-[#1F3C88]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1F3C88] mb-2">
                                            4. Earn
                                        </h3>
                                        <p className="text-gray-600">
                                            Teach students and receive secure payments
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3C88] mb-4">
                            What Our Community Says
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Real experiences from parents and tutors on our platform
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 6000 }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="pb-12"
                        >
                            {displayTestimonials.map((testimonial) => (
                                <SwiperSlide key={testimonial.id}>
                                    <Card className="h-full">
                                        <CardContent className="pt-6">
                                            <div className="flex mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-5 w-5 ${
                                                            i < testimonial.rating
                                                                ? 'text-[#F7C600] fill-current'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 mb-6 min-h-[100px]">
                                                "{testimonial.comment}"
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-[#1F3C88] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-[#1F3C88]">
                                                        {testimonial.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {testimonial.role}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-[#1F3C88] text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why Choose CareTutors?
                        </h2>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                            We're committed to providing the best tutoring experience
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                            <CardContent className="pt-8 text-center">
                                <div className="w-20 h-20 bg-[#F7C600] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="h-10 w-10 text-[#1F3C88]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Verified Tutors</h3>
                                <p className="text-blue-100">
                                    All tutors undergo thorough background checks, qualification verification, 
                                    and reference validation to ensure quality and safety.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                            <CardContent className="pt-8 text-center">
                                <div className="w-20 h-20 bg-[#F7C600] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Calendar className="h-10 w-10 text-[#1F3C88]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Flexible Scheduling</h3>
                                <p className="text-blue-100">
                                    Book sessions that work for your schedule. Whether you need 
                                    weekday evenings or weekend lessons, we've got you covered.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
                            <CardContent className="pt-8 text-center">
                                <div className="w-20 h-20 bg-[#F7C600] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <DollarSign className="h-10 w-10 text-[#1F3C88]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Affordable Rates</h3>
                                <p className="text-blue-100">
                                    Competitive pricing without compromising quality. Find tutors 
                                    that fit your budget with transparent, upfront pricing.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#F7C600] to-[#FFD700]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1F3C88] mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-[#1F3C88]/80 mb-10 max-w-2xl mx-auto">
                        Join thousands of students and tutors already learning and earning on our platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#1F3C88] hover:bg-[#2A5298] text-white text-lg px-10">
                            <Link href="/register?role=guardian">
                                Find a Tutor Now
                                <Search className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-white text-[#1F3C88] hover:bg-gray-100 border-2 border-[#1F3C88] text-lg px-10">
                            <Link href="/register?role=tutor">
                                Start Teaching Today
                                <GraduationCap className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <Card className="max-w-3xl mx-auto border-2 border-[#1F3C88]">
                        <CardContent className="pt-8">
                            <div className="text-center mb-6">
                                <Mail className="h-12 w-12 text-[#1F3C88] mx-auto mb-4" />
                                <h3 className="text-2xl md:text-3xl font-bold text-[#1F3C88] mb-3">
                                    Stay Updated
                                </h3>
                                <p className="text-gray-600">
                                    Subscribe to our newsletter for the latest tutoring tips, 
                                    educational resources, and platform updates.
                                </p>
                            </div>
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1"
                                />
                                <Button type="submit" className="bg-[#1F3C88] hover:bg-[#2A5298]">
                                    Subscribe
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                            <p className="text-xs text-gray-500 text-center mt-4">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3C88] mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Got questions? We've got answers
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem 
                                    key={index} 
                                    value={`item-${index}`}
                                    className="bg-white border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        <span className="font-semibold text-[#1F3C88]">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <div className="text-center mt-8">
                            <p className="text-gray-600 mb-4">
                                Still have questions?
                            </p>
                            <Button asChild variant="outline" className="border-[#1F3C88] text-[#1F3C88] hover:bg-[#1F3C88] hover:text-white">
                                <Link href="/contact">
                                    Contact Support
                                    <MessageCircle className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Animation Styles */}
            <style>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </PublicLayout>
    );
}
