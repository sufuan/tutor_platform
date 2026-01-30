import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { MapPin, Search, BookOpen, GraduationCap, Star, CheckCircle, ChevronLeft, ChevronRight,} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function Tutors({ tutors, locations, subjects, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedLocation, setSelectedLocation] = useState(filters.location || '');
    const [selectedSubject, setSelectedSubject] = useState(filters.subject || '');

    const handleFilter = () => {
        router.get('/tutors', {
            search: searchTerm,
            location: selectedLocation,
            subject: selectedSubject,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedLocation('');
        setSelectedSubject('');
        router.get('/tutors');
    };

    const getTutorInitials = (tutor) => {
        if (tutor.first_name && tutor.last_name) {
            return `${tutor.first_name[0]}${tutor.last_name[0]}`.toUpperCase();
        }
        if (tutor.user?.name) {
            const nameParts = tutor.user.name.split(' ');
            return nameParts.length > 1 
                ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
                : tutor.user.name.substring(0, 2).toUpperCase();
        }
        return 'T';
    };

    return (
        <PublicLayout>
            <Head title="Browse Tutors" />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                            Find Qualified Tutors
                        </h1>
                        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                            Browse verified tutors and find the perfect match for your child's educational needs
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white shadow-md sticky top-16 z-40 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search tutors by name or bio..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map((location) => (
                                    <SelectItem key={location.id} value={location.id.toString()}>
                                        {location.city}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Subjects" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((subject) => (
                                    <SelectItem key={subject.id} value={subject.name}>
                                        {subject.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-600">
                            Showing {tutors.data.length} of {tutors.total} verified tutors
                        </p>
                        <div className="flex gap-2">
                            <Button onClick={clearFilters} variant="outline" size="sm">
                                Clear Filters
                            </Button>
                            <Button onClick={handleFilter} size="sm">
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tutors Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {tutors.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tutors.data.map((tutor) => (
                                <Card key={tutor.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                    <CardHeader className="text-center">
                                        <div className="flex justify-center mb-4">
                                            <Avatar className="h-24 w-24">
                                                <AvatarImage src={tutor.photo} alt={`${tutor.first_name} ${tutor.last_name}`} />
                                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl">
                                                    {getTutorInitials(tutor)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <CardTitle className="text-xl">
                                                {tutor.first_name && tutor.last_name 
                                                    ? `${tutor.first_name} ${tutor.last_name}` 
                                                    : tutor.user?.name || 'Tutor'}
                                            </CardTitle>
                                            {tutor.verification_status === 'verified' && (
                                                <CheckCircle className="h-5 w-5 text-green-500" title="Verified Tutor" />
                                            )}
                                        </div>
                                        
                                        {tutor.rating > 0 && (
                                            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                <span className="font-semibold">{tutor.rating.toFixed(1)}</span>
                                                <span>({tutor.reviews_count} reviews)</span>
                                            </div>
                                        )}

                                        {tutor.bio && (
                                            <CardDescription className="line-clamp-3 mt-2">
                                                {tutor.bio}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    
                                    <CardContent className="flex-grow space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 mr-2 text-primary-blue" />
                                            <span>{tutor.location?.city || tutor.district || 'Location not specified'}</span>
                                        </div>

                                        {Array.isArray(tutor.subjects) && tutor.subjects.length > 0 && (
                                            <div className="flex items-start text-sm text-gray-600">
                                                <BookOpen className="h-4 w-4 mr-2 text-primary-blue mt-0.5 flex-shrink-0" />
                                                <div className="flex flex-wrap gap-1">
                                                    {tutor.subjects.slice(0, 4).map((subject, idx) => (
                                                        <Badge key={idx} variant="secondary" className="text-xs">
                                                            {subject}
                                                        </Badge>
                                                    ))}
                                                    {tutor.subjects.length > 4 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            +{tutor.subjects.length - 4}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {Array.isArray(tutor.class_levels) && tutor.class_levels.length > 0 && (
                                            <div className="flex items-start text-sm text-gray-600">
                                                <GraduationCap className="h-4 w-4 mr-2 text-primary-blue mt-0.5 flex-shrink-0" />
                                                <div className="flex flex-wrap gap-1">
                                                    {tutor.class_levels.slice(0, 3).map((level, idx) => (
                                                        <Badge key={idx} variant="outline" className="text-xs">
                                                            {level}
                                                        </Badge>
                                                    ))}
                                                    {tutor.class_levels.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{tutor.class_levels.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {tutor.hourly_rate && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <CurrencyBangladeshiIcon size={16} className=" mr-2 text-green-600" />
                                                <span className="font-semibold text-green-600">
                                                    ৳{tutor.hourly_rate}/month
                                                </span>
                                            </div>
                                        )}

                                        {tutor.experience_years && (
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">{tutor.experience_years} years</span> of teaching experience
                                            </div>
                                        )}

                                        <Link href={`/tutors/${tutor.id}`} className="block mt-4">
                                            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                                                View Profile
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {tutors.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={tutors.current_page === 1}
                                    onClick={() => router.get(tutors.prev_page_url)}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: tutors.last_page }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === tutors.last_page ||
                                            (page >= tutors.current_page - 1 && page <= tutors.current_page + 1)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant={page === tutors.current_page ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => router.get(`/tutors?page=${page}`)}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (
                                            page === tutors.current_page - 2 ||
                                            page === tutors.current_page + 2
                                        ) {
                                            return <span key={page} className="px-2">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={tutors.current_page === tutors.last_page}
                                    onClick={() => router.get(tutors.next_page_url)}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tutors Found</h3>
                        <p className="text-gray-500 mb-6">
                            Try adjusting your filters to find qualified tutors in your area
                        </p>
                        <Button onClick={clearFilters} variant="outline">
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}



