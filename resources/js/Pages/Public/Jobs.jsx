import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { MapPin, Search, Clock, BookOpen, GraduationCap, Calendar, ChevronLeft, ChevronRight, User, X, Building2 } from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function Jobs({ jobs, divisions, subjects, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedDivision, setSelectedDivision] = useState(filters.division || '');
    const [selectedDistrict, setSelectedDistrict] = useState(filters.location || '');
    const [selectedSubject, setSelectedSubject] = useState(filters.subject || '');

    // All districts flat list (for when no division is selected)
    const allDistricts = useMemo(() => {
        return Object.values(divisions).flat().sort();
    }, [divisions]);

    // Districts shown in the district dropdown — filtered by division if one is picked
    const availableDistricts = useMemo(() => {
        if (selectedDivision && selectedDivision !== 'all') {
            return divisions[selectedDivision] || [];
        }
        return allDistricts;
    }, [selectedDivision, divisions, allDistricts]);

    // When division changes, clear district if it doesn't belong to the new division
    const handleDivisionChange = (val) => {
        setSelectedDivision(val);
        const div = val === 'all' ? null : val;
        if (div && selectedDistrict) {
            const districtsForDiv = divisions[div] || [];
            if (!districtsForDiv.includes(selectedDistrict)) {
                setSelectedDistrict('');
            }
        }
    };

    // Debounced apply — fires whenever any filter changes
    useEffect(() => {
        const timer = setTimeout(() => applyFilters(), 500);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedDivision, selectedDistrict, selectedSubject]);

    const applyFilters = () => {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (selectedSubject && selectedSubject !== 'all') params.subject = selectedSubject;

        if (selectedDistrict && selectedDistrict !== 'all') {
            // Specific district selected — filter by it directly
            params.location = selectedDistrict;
        } else if (selectedDivision && selectedDivision !== 'all') {
            // Division selected but no specific district — pass all districts of that division
            params.districts = (divisions[selectedDivision] || []).join(',');
        }

        router.get('/jobs', params, { preserveState: true, preserveScroll: true });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedDivision('');
        setSelectedDistrict('');
        setSelectedSubject('');
    };

    const hasActiveFilters = searchTerm
        || (selectedDivision && selectedDivision !== 'all')
        || (selectedDistrict && selectedDistrict !== 'all')
        || (selectedSubject && selectedSubject !== 'all');

    const getJobTypeColor = (type) => {
        const colors = {
            'one-time': 'bg-blue-100 text-blue-800',
            'regular': 'bg-green-100 text-green-800',
            'both': 'bg-purple-100 text-purple-800',
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <PublicLayout 
            title="Browse Tutoring Jobs" 
            description="Browse available tutoring opportunities in Bangladesh and connect with families looking for qualified home and online tutors."
        >

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-blue to-indigo-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                            Find Tutoring Jobs
                        </h1>
                        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                            Browse available tutoring opportunities and connect with families looking for qualified tutors
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white shadow-md sticky top-16 z-40 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    {/* Row 1: Search + Subject */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Search */}
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search jobs by title or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Subject */}
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Subjects" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Subjects</SelectItem>
                                {subjects.map((subject) => (
                                    <SelectItem key={subject.id} value={subject.name}>
                                        {subject.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Row 2: Division + District (dependent) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Division */}
                        <div>
                            <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                                <SelectTrigger>
                                    <Building2 className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                                    <SelectValue placeholder="All Divisions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Divisions</SelectItem>
                                    {Object.keys(divisions).map((div) => (
                                        <SelectItem key={div} value={div}>
                                            {div}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* District — shows all 64 or filtered by division */}
                        <div>
                            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                                <SelectTrigger>
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                                    <SelectValue placeholder={
                                        selectedDivision && selectedDivision !== 'all'
                                            ? `All ${selectedDivision} Districts`
                                            : 'All Districts'
                                    } />
                                </SelectTrigger>
                                <SelectContent className="max-h-72">
                                    <SelectItem value="all">
                                        {selectedDivision && selectedDivision !== 'all'
                                            ? `All ${selectedDivision} Districts`
                                            : 'All Districts'}
                                    </SelectItem>
                                    {/* If a division is selected, show flat list */}
                                    {selectedDivision && selectedDivision !== 'all' ? (
                                        availableDistricts.map((district) => (
                                            <SelectItem key={district} value={district}>
                                                {district}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        /* Otherwise show grouped by division */
                                        Object.entries(divisions).map(([div, dists]) => (
                                            <SelectGroup key={div}>
                                                <SelectLabel className="text-xs font-bold text-primary-blue">
                                                    {div} Division
                                                </SelectLabel>
                                                {dists.map((district) => (
                                                    <SelectItem key={district} value={district}>
                                                        {district}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Active filter tags + count */}
                    <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
                        <div className="flex flex-wrap gap-2 items-center">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold">{jobs.data.length}</span> of <span className="font-semibold">{jobs.total}</span> jobs
                            </p>
                            {selectedDivision && selectedDivision !== 'all' && (
                                <Badge variant="secondary" className="text-xs">
                                    Division: {selectedDivision}
                                    <button onClick={() => handleDivisionChange('all')} className="ml-1 hover:text-red-500">×</button>
                                </Badge>
                            )}
                            {selectedDistrict && selectedDistrict !== 'all' && (
                                <Badge variant="secondary" className="text-xs">
                                    District: {selectedDistrict}
                                    <button onClick={() => setSelectedDistrict('')} className="ml-1 hover:text-red-500">×</button>
                                </Badge>
                            )}
                            {selectedSubject && selectedSubject !== 'all' && (
                                <Badge variant="secondary" className="text-xs">
                                    Subject: {selectedSubject}
                                    <button onClick={() => setSelectedSubject('')} className="ml-1 hover:text-red-500">×</button>
                                </Badge>
                            )}
                        </div>
                        {hasActiveFilters && (
                            <Button onClick={clearFilters} variant="outline" size="sm">
                                <X className="h-4 w-4 mr-1" />
                                Clear All
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {jobs.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.data.map((job) => (
                                <Card key={`${job.job_type}-${job.id}`} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-2">
                                            <Badge className={job.job_type === 'tutor' ? 'bg-blue-100 text-blue-800' : getJobTypeColor(job.tuition_type)}>
                                                {job.job_type === 'tutor' ? 'TUTOR REQUEST' : (job.tuition_type ? job.tuition_type.replace('-', ' ').toUpperCase() : 'N/A')}
                                            </Badge>
                                            <Badge variant="outline" className="capitalize">
                                                {job.status === 'active' ? 'open' : job.status}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl line-clamp-2">{job.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {job.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 mr-2 text-primary-blue" />
                                            <span>
                                                {job.preferred_location && job.district
                                                    ? `${job.preferred_location}, ${job.district}`
                                                    : job.district
                                                        ? job.district
                                                        : 'N/A'}
                                            </span>
                                        </div>

                                        <div className="flex items-start text-sm text-gray-600">
                                            <BookOpen className="h-4 w-4 mr-2 text-primary-blue mt-0.5" />
                                            <div className="flex flex-wrap gap-1">
                                                {(() => {
                                                    const subs = job.subject_names || [];
                                                    return subs.slice(0, 3).map((subject, idx) => (
                                                        <Badge key={idx} variant="secondary" className="text-xs">
                                                            {subject}
                                                        </Badge>
                                                    ));
                                                })()}
                                                {(() => {
                                                    const subs = job.subject_names || [];
                                                    return subs.length > 3 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            +{subs.length - 3}
                                                        </Badge>
                                                    );
                                                })()}
                                            </div>
                                        </div>

                                        {job.job_type === 'guardian' && Array.isArray(job.class_levels) && job.class_levels.length > 0 && (
                                            <div className="flex items-start text-sm text-gray-600">
                                                <GraduationCap className="h-4 w-4 mr-2 text-primary-blue mt-0.5" />
                                                <div className="flex flex-wrap gap-1">
                                                    {job.class_levels.slice(0, 2).map((level, idx) => (
                                                        <Badge key={idx} variant="outline" className="text-xs">{level}</Badge>
                                                    ))}
                                                    {job.class_levels.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">+{job.class_levels.length - 2}</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {job.job_type === 'tutor' && job.preferred_gender && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <User className="h-4 w-4 mr-2 text-primary-blue" />
                                                <Badge variant="outline" className="text-xs capitalize">{job.preferred_gender} tutor</Badge>
                                            </div>
                                        )}

                                        {job.job_type === 'guardian' && job.preferred_tutor_gender && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <User className="h-4 w-4 mr-2 text-primary-blue" />
                                                <Badge variant="outline" className="text-xs capitalize">{job.preferred_tutor_gender} tutor</Badge>
                                            </div>
                                        )}

                                        <div className="flex items-center text-sm text-gray-600">
                                            <CurrencyBangladeshiIcon size={16} className="mr-2 text-green-600" />
                                            <span className="font-semibold text-green-600">
                                                {job.job_type === 'tutor'
                                                    ? `৳${parseInt(job.monthly_salary).toLocaleString()}/month`
                                                    : `৳${parseInt(job.salary).toLocaleString()}/month`}
                                            </span>
                                        </div>

                                        {job.job_type === 'guardian' && job.days_per_week && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Clock className="h-4 w-4 mr-2 text-primary-blue" />
                                                <span>{job.days_per_week} days/week • {job.duration_per_session} mins/session</span>
                                            </div>
                                        )}

                                        {job.job_type === 'tutor' && job.available_days && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="h-4 w-4 mr-2 text-primary-blue" />
                                                <span>{Array.isArray(job.available_days) ? job.available_days.join(', ') : job.available_days}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                                        </div>

                                        {job.has_applied ? (
                                            <Badge className="w-full justify-center py-2 mt-4 bg-green-100 text-green-800 hover:bg-green-100">
                                                ✓ Applied
                                            </Badge>
                                        ) : (
                                            <Button
                                                className="w-full bg-primary-blue hover:bg-primary-blue/90 mt-4"
                                                onClick={() => {
                                                    window.location.href = job.job_type === 'tutor'
                                                        ? `/tutor-jobs/${job.id}`
                                                        : `/jobs/${job.id}`;
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {jobs.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <Button
                                    variant="outline" size="icon"
                                    disabled={jobs.current_page === 1}
                                    onClick={() => router.get(jobs.prev_page_url)}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: jobs.last_page }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === jobs.last_page ||
                                            (page >= jobs.current_page - 1 && page <= jobs.current_page + 1)
                                        ) {
                                            return (
                                                <Button
                                                    key={page}
                                                    variant={page === jobs.current_page ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => router.get(`/jobs?page=${page}`)}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        } else if (page === jobs.current_page - 2 || page === jobs.current_page + 2) {
                                            return <span key={page} className="px-2">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <Button
                                    variant="outline" size="icon"
                                    disabled={jobs.current_page === jobs.last_page}
                                    onClick={() => router.get(jobs.next_page_url)}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
                        <p className="text-gray-500 mb-6">
                            Try adjusting your filters or check back later for new opportunities
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
