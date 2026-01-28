import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Separator } from '@/Components/ui/separator';
import { 
    User, Mail, Phone, MapPin, GraduationCap, 
    Briefcase, DollarSign, Clock, CheckCircle2, 
    Star, Calendar, FileText, Award, ArrowLeft,
    Building, BookOpen, Target, Home, Globe, Download, Eye
} from 'lucide-react';

export default function TutorProfile({ auth, tutor, subjectNames = [], documents = [] }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            verified: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
            unverified: 'bg-gray-100 text-gray-800 border-gray-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`${tutor.user?.name || 'Tutor'} - Tutor Profile`} />

            <div className="p-4 md:p-8">
                {/* Header */}
                <div className="mb-6">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.tutors.verifications')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Verifications
                        </Link>
                    </Button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Tutor Profile</h1>
                            <p className="text-slate-600 mt-1">Detailed information about {tutor.user?.name || 'this tutor'}</p>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(tutor.verification_status)} text-sm px-4 py-2`}>
                            {tutor.verification_status?.toUpperCase()}
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardContent className="pt-6">
                                {/* Profile Photo */}
                                <div className="text-center mb-6">
                                    <Avatar className="h-32 w-32 mx-auto mb-4">
                                        {tutor.photo ? (
                                            <AvatarImage src={`/storage/${tutor.photo}`} />
                                        ) : null}
                                        <AvatarFallback className="text-2xl">
                                            {tutor.user?.name?.[0] || 'T'}
                                        </AvatarFallback>
                                    </Avatar>
                                    
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {tutor.user?.name || 'N/A'}
                                    </h2>
                                    <p className="text-sm text-slate-600 mt-1">{tutor.tutor_code}</p>

                                    {tutor.verification_status === 'verified' && tutor.verified_at && (
                                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                            <span className="text-xs text-green-700">Verified on {new Date(tutor.verified_at).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                <Separator className="my-4" />

                                {/* Contact Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-sm text-slate-900">Contact Information</h3>
                                    
                                    {tutor.user?.email && (
                                        <div className="flex items-start gap-3">
                                            <Mail className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-xs text-slate-500">Email</p>
                                                <p className="text-sm text-slate-900 break-words">{tutor.user.email}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {tutor.phone && (
                                        <div className="flex items-start gap-3">
                                            <Phone className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-xs text-slate-500">Phone</p>
                                                <p className="text-sm text-slate-900">{tutor.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {tutor.location?.city && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-xs text-slate-500">Location</p>
                                                <p className="text-sm text-slate-900">{tutor.location.city}</p>
                                            </div>
                                        </div>
                                    )}

                                    {tutor.address && (
                                        <div className="flex items-start gap-3">
                                            <Home className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-xs text-slate-500">Address</p>
                                                <p className="text-sm text-slate-900">{tutor.address}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Separator className="my-4" />

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                                        <div className="text-2xl font-bold text-slate-900">
                                            {tutor.experience_years || 0}
                                        </div>
                                        <div className="text-xs text-slate-600 mt-1">Years Exp.</div>
                                    </div>
                                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                                        <div className="text-2xl font-bold text-slate-900">
                                            {tutor.profile_completion_percentage || 0}%
                                        </div>
                                        <div className="text-xs text-slate-600 mt-1">Profile Complete</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        {tutor.bio && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        About
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{tutor.bio}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Education Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {tutor.institution && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                            <Building className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Institution</p>
                                                <p className="font-semibold text-slate-900">{tutor.institution}</p>
                                            </div>
                                        </div>
                                    )}
                                    {tutor.education_level && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                            <Award className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Education Level</p>
                                                <p className="font-semibold text-slate-900 capitalize">
                                                    {tutor.education_level.replace('_', ' ')}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Subjects */}
                                {subjectNames.length > 0 && (
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" />
                                            Subjects I Teach ({subjectNames.length})
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {subjectNames.map((subjectName, index) => (
                                                <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm">
                                                    {subjectName}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Teaching Experience */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Teaching Experience
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                    <Calendar className="h-5 w-5 text-slate-500" />
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Total Experience</p>
                                        <p className="font-semibold text-slate-900">
                                            {tutor.experience_years ? `${tutor.experience_years} years` : 'Not specified'}
                                        </p>
                                    </div>
                                </div>
                                
                                {tutor.experience_details && (
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 mb-2">Experience Details</p>
                                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{tutor.experience_details}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Teaching Details & Availability */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Teaching Details & Availability
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {tutor.hourly_rate && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                            <DollarSign className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Expected Salary</p>
                                                <p className="font-semibold text-slate-900">BDT {tutor.hourly_rate}/month</p>
                                            </div>
                                        </div>
                                    )}

                                    {tutor.available_days && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                            <Calendar className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Available Days</p>
                                                <p className="font-semibold text-slate-900">{tutor.available_days}</p>
                                            </div>
                                        </div>
                                    )}

                                    {tutor.available_time_from && tutor.available_time_to && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                            <Clock className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Time Slots</p>
                                                <p className="font-semibold text-slate-900">
                                                    {tutor.available_time_from} - {tutor.available_time_to}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {tutor.tutoring_method && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                            <Globe className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Teaching Method</p>
                                                <p className="font-semibold text-slate-900 capitalize">{tutor.tutoring_method}</p>
                                            </div>
                                        </div>
                                    )}

                                    {tutor.place_of_tutoring && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg col-span-2">
                                            <Home className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Place of Tutoring</p>
                                                <p className="font-semibold text-slate-900">{tutor.place_of_tutoring}</p>
                                            </div>
                                        </div>
                                    )}

                                    {tutor.preferred_locations && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg col-span-2">
                                            <MapPin className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Preferred Locations</p>
                                                <p className="font-semibold text-slate-900">{tutor.preferred_locations}</p>
                                            </div>
                                        </div>
                                    )}

                                    {tutor.tutoring_styles && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg col-span-2">
                                            <Target className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Tutoring Styles</p>
                                                <p className="font-semibold text-slate-900">{tutor.tutoring_styles}</p>
                                            </div>
                                        </div>
                                    )}

                                    {tutor.division && tutor.district && (
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg col-span-2">
                                            <MapPin className="h-5 w-5 text-slate-500 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Area</p>
                                                <p className="font-semibold text-slate-900">{tutor.district}, {tutor.division}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Verification Documents */}
                        {documents && documents.length > 0 && (
                            <Card className="border-purple-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-purple-600" />
                                        Verification Documents
                                    </CardTitle>
                                    <CardDescription>
                                        Documents submitted by the tutor for verification
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {documents.map((doc, index) => {
                                            const docTypeLabels = {
                                                'id_card': 'ID Card / NID / Passport',
                                                'certificate': 'Certificate / Credential',
                                                'photo': 'Photo / Image'
                                            };
                                            
                                            const isPdf = doc.file_path.toLowerCase().endsWith('.pdf');
                                            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(doc.file_path);
                                            
                                            return (
                                                <div 
                                                    key={doc.id || index} 
                                                    className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 bg-purple-50 rounded-lg">
                                                                <FileText className="h-5 w-5 text-purple-600" />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-sm text-slate-900">
                                                                    {docTypeLabels[doc.type] || 'Document'}
                                                                </p>
                                                                <p className="text-xs text-slate-500">
                                                                    {new Date(doc.created_at).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {doc.verified && (
                                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                                Verified
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Document Preview */}
                                                    {isImage && (
                                                        <div className="mb-3 rounded-lg overflow-hidden bg-gray-50">
                                                            <img 
                                                                src={doc.document_url} 
                                                                alt={docTypeLabels[doc.type]}
                                                                className="w-full h-32 object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    
                                                    {isPdf && (
                                                        <div className="mb-3 p-4 rounded-lg bg-red-50 flex items-center justify-center">
                                                            <FileText className="h-12 w-12 text-red-400" />
                                                        </div>
                                                    )}
                                                    
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1"
                                                            asChild
                                                        >
                                                            <a 
                                                                href={doc.document_url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Eye className="h-4 w-4 mr-1" />
                                                                View
                                                            </a>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1"
                                                            asChild
                                                        >
                                                            <a 
                                                                href={doc.document_url} 
                                                                download
                                                            >
                                                                <Download className="h-4 w-4 mr-1" />
                                                                Download
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Admin Notes */}
                        {tutor.verification_notes && (
                            <Card className="border-blue-200 bg-blue-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-blue-900">
                                        <FileText className="h-5 w-5" />
                                        Admin Notes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-blue-800 whitespace-pre-wrap">{tutor.verification_notes}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
