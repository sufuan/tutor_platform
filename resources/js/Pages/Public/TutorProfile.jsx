import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { 
    User, Mail, Phone, MapPin, GraduationCap, 
    Briefcase, Clock, CheckCircle2, 
    Star, Calendar, FileText, Award 
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function TutorProfile({ tutor, subjectNames = [] }) {
    return (
        <GuestLayout>
            <Head title={`${tutor.user?.name || 'Tutor'} - Profile`} />

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-white border-b shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                <GraduationCap className="h-8 w-8 text-slate-900" />
                                <span className="text-xl font-bold text-slate-900">TutorHub</span>
                            </Link>
                            <div className="flex gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={route('login')}>Login</Link>
                                </Button>
                                <Button asChild className="bg-slate-900 hover:bg-slate-800">
                                    <Link href={route('register')}>Register</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Sidebar - Tutor Info */}
                        <div className="lg:col-span-1">
                            <Card className="rounded-xl shadow-lg sticky top-6">
                                <CardContent className="p-6">
                                    {/* Profile Photo */}
                                    <div className="text-center mb-6">
                                        {tutor.photo ? (
                                            <img
                                                src={`/storage/${tutor.photo}`}
                                                alt={tutor.user?.name}
                                                className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-slate-200"
                                            />
                                        ) : (
                                            <div className="mx-auto h-32 w-32 rounded-full bg-slate-200 flex items-center justify-center border-4 border-slate-300">
                                                <User className="h-16 w-16 text-slate-400" />
                                            </div>
                                        )}
                                        
                                        <h1 className="mt-4 text-2xl font-bold text-slate-900">
                                            {tutor.user?.name || 'Tutor'}
                                        </h1>
                                        
                                        <div className="flex items-center justify-center gap-1 mt-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="ml-2 text-sm text-slate-600">(0 reviews)</span>
                                        </div>

                                        {tutor.verification_status === 'verified' && (
                                            <Badge className="mt-3 bg-green-100 text-green-800 border-green-200">
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                Verified Tutor
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-4 border-t pt-4">
                                        {tutor.user?.email && (
                                            <div className="flex items-center gap-3">
                                                <Mail className="h-5 w-5 text-slate-500 flex-shrink-0" />
                                                <span className="text-sm break-words">{tutor.user.email}</span>
                                            </div>
                                        )}
                                        
                                        {tutor.phone && (
                                            <div className="flex items-center gap-3">
                                                <Phone className="h-5 w-5 text-slate-500 flex-shrink-0" />
                                                <span className="text-sm">{tutor.phone}</span>
                                            </div>
                                        )}
                                        
                                        {tutor.gender && (
                                            <div className="flex items-center gap-3">
                                                <User className="h-5 w-5 text-slate-500 flex-shrink-0" />
                                                <span className="text-sm capitalize">{tutor.gender}</span>
                                            </div>
                                        )}
                                        
                                        {tutor.location?.city && (
                                            <div className="flex items-center gap-3">
                                                <MapPin className="h-5 w-5 text-slate-500 flex-shrink-0" />
                                                <span className="text-sm">{tutor.location.city}</span>
                                            </div>
                                        )}
                                        
                                        {tutor.hourly_rate && (
                                            <div className="flex items-center gap-3">
                                                <CurrencyBangladeshiIcon size={20} className=" text-slate-500 flex-shrink-0" />
                                                <span className="text-sm font-semibold text-slate-900">
                                                    BDT {tutor.hourly_rate}/month
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-slate-900">
                                                {tutor.experience_years || 0}
                                            </div>
                                            <div className="text-xs text-slate-600">Years Exp.</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-slate-900">
                                                {subjectNames.length}
                                            </div>
                                            <div className="text-xs text-slate-600">Subjects</div>
                                        </div>
                                    </div>

                                    {/* Contact Button */}
                                    <Button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 h-12">
                                        Contact Tutor
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* About */}
                            {tutor.bio && (
                                <Card className="rounded-xl shadow-sm">
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            About Me
                                        </h2>
                                        <p className="text-slate-700 leading-relaxed">{tutor.bio}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Education */}
                            <Card className="rounded-xl shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <GraduationCap className="h-5 w-5" />
                                        Education
                                    </h2>
                                    <div className="space-y-3">
                                        {tutor.institution && (
                                            <div>
                                                <p className="text-sm text-slate-500">Institution</p>
                                                <p className="font-semibold text-slate-900">{tutor.institution}</p>
                                            </div>
                                        )}
                                        {tutor.education_level && (
                                            <div>
                                                <p className="text-sm text-slate-500">Education Level</p>
                                                <p className="font-semibold text-slate-900 capitalize">
                                                    {tutor.education_level.replace('_', ' ')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Experience */}
                            {tutor.experience_details && (
                                <Card className="rounded-xl shadow-sm">
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <Briefcase className="h-5 w-5" />
                                            Teaching Experience
                                        </h2>
                                        <p className="text-slate-700 leading-relaxed">{tutor.experience_details}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Availability */}
                            <Card className="rounded-xl shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Availability
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tutor.available_days && (
                                            <div>
                                                <p className="text-sm text-slate-500 mb-1">Available Days</p>
                                                <p className="text-slate-900 font-medium">{tutor.available_days}</p>
                                            </div>
                                        )}
                                        {tutor.available_time_from && tutor.available_time_to && (
                                            <div>
                                                <p className="text-sm text-slate-500 mb-1">Time Slots</p>
                                                <p className="text-slate-900 font-medium">
                                                    {tutor.available_time_from} - {tutor.available_time_to}
                                                </p>
                                            </div>
                                        )}
                                        {tutor.tutoring_method && (
                                            <div>
                                                <p className="text-sm text-slate-500 mb-1">Teaching Method</p>
                                                <p className="text-slate-900 font-medium capitalize">{tutor.tutoring_method}</p>
                                            </div>
                                        )}
                                        {tutor.place_of_tutoring && (
                                            <div>
                                                <p className="text-sm text-slate-500 mb-1">Place of Tutoring</p>
                                                <p className="text-slate-900 font-medium">{tutor.place_of_tutoring}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Subjects */}
                            {subjectNames.length > 0 && (
                                <Card className="rounded-xl shadow-sm">
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <Award className="h-5 w-5" />
                                            Subjects I Teach
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {subjectNames.map((subjectName, index) => (
                                                <Badge key={index} variant="secondary" className="px-3 py-1">
                                                    {subjectName}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Additional Details */}
                            <Card className="rounded-xl shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Additional Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tutor.tutoring_styles && (
                                            <div>
                                                <p className="text-sm text-slate-500 mb-1">Tutoring Styles</p>
                                                <p className="text-slate-900 font-medium">{tutor.tutoring_styles}</p>
                                            </div>
                                        )}
                                        {tutor.preferred_locations && (
                                            <div>
                                                <p className="text-sm text-slate-500 mb-1">Preferred Locations</p>
                                                <p className="text-slate-900 font-medium">{tutor.preferred_locations}</p>
                                            </div>
                                        )}
                                        {tutor.division && tutor.district && (
                                            <div>
                                                <p className="text-sm text-slate-500 mb-1">Area</p>
                                                <p className="text-slate-900 font-medium">{tutor.district}, {tutor.division}</p>
                                            </div>
                                        )}
                                        {tutor.address && (
                                            <div>
                                                <p className="text-sm text-slate-500 mb-1">Address</p>
                                                <p className="text-slate-900 font-medium">{tutor.address}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}


