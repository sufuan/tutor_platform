import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import LocationDropdown from '@/Components/LocationDropdown';
import SubjectSelector from '@/Components/SubjectSelector';
import { cn } from '@/lib/utils';
import { CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Briefcase, Clock, FileText, User, AlertCircle, Eye, ArrowLeft, MapPin } from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function PostJob({ auth, locations = [], subjects = [], students = [] }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const totalSteps = 4;

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        division: '',
        district: '',
        subjects: [],
        class_level: '',
        education_medium: '',
        tutor_gender_preference: 'any',
        tuition_type: 'home',
        sessions_per_week: '',
        session_duration: '',
        salary: '',
    });

    const classLevels = [
        'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
        'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
        'O-Level', 'A-Level', 'HSC', 'Undergraduate', 'Graduate'
    ];

    const tuitionTypes = [
        { value: 'home', label: 'Home Tuition' },
        { value: 'online', label: 'Online Tuition' },
        { value: 'group', label: 'Group Tuition' },
    ];

    const genderPreferences = [
        { value: 'any', label: 'Any' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ];

    const steps = [
        { number: 1, title: 'Job Details', icon: FileText },
        { number: 2, title: 'Requirements', icon: Briefcase },
        { number: 3, title: 'Schedule & Pay', icon: Clock },
        { number: 4, title: 'Review', icon: CheckCircle2 },
    ];

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!data.title || !data.description || !data.division || !data.district || data.subjects.length === 0) {
                    return false;
                }
                return true;
            case 2:
                if (!data.class_level || !data.education_medium) {
                    return false;
                }
                return true;
            case 3:
                if (!data.tuition_type || !data.sessions_per_week || !data.session_duration || !data.salary) {
                    return false;
                }
                return true;
            default:
                return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('guardian.jobs.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    if (showPreview) {
        return (
            <AuthenticatedLayout>
                <Head title="Preview Job Post" />
                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl">Preview Your Job Post</CardTitle>
                                        <CardDescription>Review before publishing</CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowPreview(false)}
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Edit
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">{data.title}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-xs text-gray-500">Class Level</p>
                                        <p className="font-semibold">{data.class_level}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Education Medium</p>
                                        <p className="font-semibold capitalize">{data.education_medium.replace('_', ' ')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Tuition Type</p>
                                        <p className="font-semibold capitalize">{data.tuition_type}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Preferred Tutor Gender</p>
                                        <p className="font-semibold capitalize">{data.tutor_gender_preference}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Sessions per Week</p>
                                        <p className="font-semibold">{data.sessions_per_week} days</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Session Duration</p>
                                        <p className="font-semibold">{data.session_duration} minutes</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-500">Monthly Salary</p>
                                        <p className="font-semibold text-green-600 text-lg">{data.salary}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Subjects Required</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {data.subjects.map(subId => {
                                            const subject = subjects.find(s => s.id === parseInt(subId));
                                            return subject ? (
                                                <Badge key={subId}>{subject.name}</Badge>
                                            ) : null;
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Description</h4>
                                    <p className="text-gray-600 whitespace-pre-wrap">{data.description}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Location
                                    </h4>
                                    <p className="text-gray-600">
                                        {data.district && data.division 
                                            ? `${data.district}, ${data.division}` 
                                            : 'Not specified'}
                                    </p>
                                </div>

                                {data.special_requirements && (
                                    <div>
                                        <h4 className="font-semibold mb-2">Special Requirements</h4>
                                        <p className="text-gray-600 whitespace-pre-wrap">{data.special_requirements}</p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={processing}
                                        className="flex-1"
                                    >
                                        {processing ? 'Publishing...' : 'Publish Job'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowPreview(false)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Post a Job" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Error/Success Messages */}
                    {auth.flash?.error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{auth.flash.error}</AlertDescription>
                        </Alert>
                    )}
                    {auth.flash?.success && (
                        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertDescription>{auth.flash.success}</AlertDescription>
                        </Alert>
                    )}
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <Briefcase className="h-6 w-6" />
                                Post a New Tuition Job
                            </CardTitle>
                            <CardDescription>
                                Fill in the details to find the perfect tutor for your student
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Job Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Job Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Math and Science Tutor for Class 8"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">{errors.title}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Job Description *</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe what you're looking for in a tutor..."
                                        rows={5}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                {/* Subjects */}
                                <div className="space-y-2">
                                    <SubjectSelector
                                        subjects={subjects}
                                        selectedSubjects={data.subjects}
                                        onSubjectsChange={(selected) => setData('subjects', selected)}
                                        label="Subjects Required *"
                                        placeholder="Search subjects..."
                                    />
                                    {errors.subjects && (
                                        <p className="text-sm text-red-500">{errors.subjects}</p>
                                    )}
                                </div>

                                {/* Class Level and Medium */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="class_level">Class Level *</Label>
                                        <Select
                                            value={data.class_level}
                                            onValueChange={(value) => setData('class_level', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classLevels.map(level => (
                                                    <SelectItem key={level} value={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.class_level && (
                                            <p className="text-sm text-red-500">{errors.class_level}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="education_medium">Education Medium *</Label>
                                        <Select
                                            value={data.education_medium}
                                            onValueChange={(value) => setData('education_medium', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="bangla">Bangla Medium</SelectItem>
                                                <SelectItem value="english">English Medium</SelectItem>
                                                <SelectItem value="english_version">English Version</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.education_medium && (
                                            <p className="text-sm text-red-500">{errors.education_medium}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Tuition Type and Gender Preference */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tuition_type">Tuition Type *</Label>
                                        <Select
                                            value={data.tuition_type}
                                            onValueChange={(value) => setData('tuition_type', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tuitionTypes.map(type => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.tuition_type && (
                                            <p className="text-sm text-red-500">{errors.tuition_type}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tutor_gender_preference">Preferred Tutor Gender</Label>
                                        <Select
                                            value={data.tutor_gender_preference}
                                            onValueChange={(value) => setData('tutor_gender_preference', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {genderPreferences.map(pref => (
                                                    <SelectItem key={pref.value} value={pref.value}>
                                                        {pref.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Schedule */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="sessions_per_week">Days per Week *</Label>
                                        <Input
                                            id="sessions_per_week"
                                            type="number"
                                            min="1"
                                            max="7"
                                            placeholder="e.g., 3"
                                            value={data.sessions_per_week}
                                            onChange={(e) => setData('sessions_per_week', e.target.value)}
                                        />
                                        {errors.sessions_per_week && (
                                            <p className="text-sm text-red-500">{errors.sessions_per_week}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="session_duration">Duration per Session (minutes) *</Label>
                                        <Input
                                            id="session_duration"
                                            type="number"
                                            min="30"
                                            max="180"
                                            placeholder="e.g., 60"
                                            value={data.session_duration}
                                            onChange={(e) => setData('session_duration', e.target.value)}
                                        />
                                        {errors.session_duration && (
                                            <p className="text-sm text-red-500">{errors.session_duration}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Salary */}
                                <div className="space-y-2">
                                    <Label htmlFor="salary">Monthly Salary (BDT) *</Label>
                                    <Input
                                        id="salary"
                                        type="number"
                                        min="0"
                                        step="100"
                                        placeholder="e.g., 5000"
                                        value={data.salary}
                                        onChange={(e) => setData('salary', e.target.value)}
                                    />
                                    {errors.salary && (
                                        <p className="text-sm text-red-500">{errors.salary}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label>Area *</Label>
                                    <LocationDropdown
                                        divisionValue={data.division}
                                        districtValue={data.district}
                                        onDivisionChange={(division) => setData('division', division)}
                                        onDistrictChange={(district) => setData('district', district)}
                                    />
                                    {(errors.division || errors.district) && (
                                        <p className="text-sm text-red-500">{errors.division || errors.district}</p>
                                    )}
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowPreview(true)}
                                        className="flex-1"
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        Preview
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1"
                                    >
                                        {processing ? 'Publishing...' : 'Publish Job'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


