import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { useToast } from "@/hooks/use-toast";
import LocationDropdown from '@/Components/LocationDropdown';
import { useState } from 'react';
import { 
    Briefcase, 
    MapPin, 
    Calendar, 
    DollarSign, 
    Clock,
    BookOpen,
    Search,
    Filter,
    Eye,
    Send,
    AlertCircle,
    FileText,
    ExternalLink
} from 'lucide-react';

export default function BrowseJobs({ auth, jobs, locations, subjects, verificationStatus, tutorCv }) {
    const [search, setSearch] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');
    const [districtFilter, setDistrictFilter] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('all');
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const { toast } = useToast();

    const { data, setData, post, processing, reset, errors } = useForm({
        cover_letter: '',
        cv_path: null,
    });

    const handleApply = (job) => {
        if (verificationStatus !== 'verified') {
            toast({
                variant: "destructive",
                title: "Verification Required",
                description: "You must be verified before applying to jobs. Please complete the verification process.",
            });
            return;
        }
        setSelectedJob(job);
        setShowApplyModal(true);
    };

    const submitApplication = (e) => {
        e.preventDefault();
        post(route('tutor.jobs.apply', selectedJob.id), {
            onSuccess: () => {
                setShowApplyModal(false);
                setSelectedJob(null);
                reset();
            },
            forceFormData: true,
        });
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                            job.description.toLowerCase().includes(search.toLowerCase());
        const matchesDivision = !divisionFilter || job.division === divisionFilter;
        const matchesDistrict = !districtFilter || job.district === districtFilter;
        const matchesSubject = subjectFilter === 'all' || 
                              (job.subjects && job.subjects.includes(subjectFilter));
        return matchesSearch && matchesDivision && matchesDistrict && matchesSubject;
    });

    const JobCard = ({ job }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <CardDescription>
                            Posted by {job.guardian?.first_name} {job.guardian?.last_name}
                        </CardDescription>
                    </div>
                    {job.has_applied && (
                        <Badge variant="secondary">Applied</Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-green-600">৳{job.salary}/month</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{job.days_per_week} days/week</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{job.duration_per_session} mins</span>
                    </div>
                </div>

                <div>
                    <div className="text-xs text-gray-500 mb-2">Subjects Required:</div>
                    <div className="flex flex-wrap gap-1">
                        {Array.isArray(job.subject_names) && job.subject_names.slice(0, 4).map((subject, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                                {subject}
                            </Badge>
                        ))}
                        {Array.isArray(job.subject_names) && job.subject_names.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                                +{job.subject_names.length - 4} more
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 items-center text-xs text-gray-500">
                    <Badge variant="outline">{job.education_medium}</Badge>
                    <Badge variant="outline">{job.tuition_type}</Badge>
                    <Badge variant="outline">{job.class_level}</Badge>
                </div>

                <div className="flex gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => router.visit(route('jobs.show', job.id))}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Button>
                    {!job.has_applied && (
                        <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleApply(job)}
                        >
                            <Send className="mr-2 h-4 w-4" />
                            Apply Now
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Browse Jobs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Available Jobs</h1>
                        <p className="text-gray-600">Find the perfect tutoring opportunity</p>
                    </div>

                    {/* Verification Status Warning */}
                    {auth.tutor?.verification_status !== 'verified' && (
                        <Card className="mb-6 border-yellow-200 bg-yellow-50">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                            <BookOpen className="h-5 w-5 text-yellow-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-yellow-900">Verification Pending</h3>
                                        <p className="text-sm text-yellow-800 mt-1">
                                            Your profile is currently under verification. You can browse jobs but may have limited application capabilities until verified.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Search and Filters */}
                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search jobs by title or description..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <LocationDropdown
                                        divisionValue={divisionFilter}
                                        districtValue={districtFilter}
                                        onDivisionChange={setDivisionFilter}
                                        onDistrictChange={setDistrictFilter}
                                        divisionLabel="Filter by Division"
                                        districtLabel="Filter by District"
                                        showLabels={true}
                                    />
                                    <div className="space-y-2">
                                        <Label>Subject</Label>
                                        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Subjects</SelectItem>
                                                {subjects.map(subject => (
                                                    <SelectItem key={subject.id} value={subject.name}>
                                                        {subject.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results Count */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
                        </p>
                    </div>

                    {/* Jobs Grid */}
                    {filteredJobs.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6 text-center py-12">
                                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                                <p className="text-gray-600">
                                    Try adjusting your search criteria
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {filteredJobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Apply Modal */}
            <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Apply for Job</DialogTitle>
                        <DialogDescription>
                            {selectedJob?.title}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitApplication} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cover_letter">Cover Letter *</Label>
                            <Textarea
                                id="cover_letter"
                                placeholder="Write a brief introduction about yourself and why you're a good fit for this position..."
                                rows={6}
                                value={data.cover_letter}
                                onChange={(e) => setData('cover_letter', e.target.value)}
                                required
                            />
                            {errors.cover_letter && (
                                <p className="text-sm text-red-500">{errors.cover_letter}</p>
                            )}
                            <p className="text-xs text-gray-500">
                                Tip: Mention your relevant experience and qualifications for this specific job
                            </p>
                        </div>

                        {/* CV Section */}
                        <div className="space-y-2">
                            <Label>Curriculum Vitae (CV)</Label>
                            {tutorCv ? (
                                <div className="border rounded-lg p-4 bg-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-slate-600" />
                                            <div>
                                                <p className="text-sm font-medium">Your CV from Profile</p>
                                                <p className="text-xs text-slate-500">This CV will be attached to your application</p>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => window.open(`/storage/${tutorCv}`, '_blank')}
                                        >
                                            <ExternalLink className="h-4 w-4 mr-1" />
                                            View CV
                                        </Button>
                                    </div>
                                    
                                    <div className="mt-3 pt-3 border-t">
                                        <Label htmlFor="cv_upload" className="text-sm text-slate-600">
                                            Or upload a different CV (PDF only, max 5MB)
                                        </Label>
                                        <Input
                                            id="cv_upload"
                                            type="file"
                                            accept=".pdf"
                                            className="mt-2"
                                            onChange={(e) => setData('cv_path', e.target.files[0])}
                                        />
                                        {data.cv_path && (
                                            <p className="text-xs text-green-600 mt-1">
                                                New CV selected: {data.cv_path.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Input
                                        id="cv_upload"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setData('cv_path', e.target.files[0])}
                                        required
                                    />
                                    <p className="text-xs text-red-500 mt-1">
                                        You haven't uploaded a CV in your profile. Please upload one here (PDF only, max 5MB)
                                    </p>
                                </div>
                            )}
                            {errors.cv_path && (
                                <p className="text-sm text-red-500">{errors.cv_path}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowApplyModal(false);
                                    setSelectedJob(null);
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit Application'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
