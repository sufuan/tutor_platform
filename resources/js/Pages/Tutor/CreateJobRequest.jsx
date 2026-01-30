import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { 
    ArrowLeft, 
    Upload,
    Briefcase,
    Calendar,
    MapPin,
    Info
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import SubjectSelector from '@/Components/SubjectSelector';
import LocationDropdown from '@/Components/LocationDropdown';

export default function CreateJobRequest({ auth, subjects, levels, tutor, jobRequest }) {
    // Ensure tutor subjects is an array
    const tutorSubjects = Array.isArray(tutor?.subjects) ? tutor.subjects : [];
    const isEditing = !!jobRequest;
    
    const { data, setData, post, put, processing, errors } = useForm({
        title: jobRequest?.title || '',
        description: jobRequest?.description || '',
        subjects: jobRequest?.subjects || tutorSubjects,
        education_level: jobRequest?.education_level || '',
        class_level: jobRequest?.class_level || '',
        education_medium: jobRequest?.education_medium || '',
        tuition_type: jobRequest?.tuition_type || 'home',
        tutor_gender_preference: jobRequest?.tutor_gender_preference || 'any',
        monthly_salary: jobRequest?.monthly_salary || tutor?.monthly_salary || '',
        available_days: jobRequest?.available_days || [],
        division: jobRequest?.division || tutor?.division || '',
        district: jobRequest?.district || tutor?.district || '',
        teaching_mode: jobRequest?.teaching_mode || 'hybrid',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('tutor.job-request.update', jobRequest.id));
        } else {
            post(route('tutor.job-request.store'));
        }
    };

    const toggleSubject = (subjectId) => {
        if (data.subjects.includes(subjectId)) {
            setData('subjects', data.subjects.filter(id => id !== subjectId));
        } else {
            setData('subjects', [...data.subjects, subjectId]);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? "Edit Job Request" : "Post Job Request"} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href={route('tutor.job-requests')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Job Requests
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEditing ? 'Edit Job Request' : 'Post Job Request'}
                        </h1>
                        <p className="text-gray-600">
                            {isEditing ? 'Update your tutoring service details' : 'Advertise your tutoring services to guardians'}
                        </p>
                    </div>

                    <Alert className="mb-6">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                            {isEditing 
                                ? 'After updating, your job request will be submitted for admin review again.'
                                : 'Create a job request to showcase your tutoring services. Guardians can browse and contact you directly.'}
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Service Details</CardTitle>
                                <CardDescription>Describe the tutoring services you offer</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">
                                        <Briefcase className="inline mr-2 h-4 w-4" />
                                        Service Title
                                    </Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Experienced Math & Science Tutor Available"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className={errors.title && 'border-red-500'}
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        rows={6}
                                        placeholder="Describe your teaching style, experience, qualifications, and what makes you a great tutor..."
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description && 'border-red-500'}
                                        required
                                    />
                                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Subjects */}
                                <div className="space-y-2">
                                    <SubjectSelector
                                        subjects={subjects}
                                        selectedSubjects={data.subjects}
                                        onSubjectsChange={(selected) => setData('subjects', selected)}
                                        label="Subjects I Can Teach"
                                        placeholder="Search subjects..."
                                    />
                                    {errors.subjects && <p className="text-sm text-red-600">{errors.subjects}</p>}
                                </div>

                                {/* Class Level and Medium */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="class_level">Class Level</Label>
                                        <Select
                                            value={data.class_level}
                                            onValueChange={(value) => setData('class_level', value)}
                                        >
                                            <SelectTrigger className={errors.class_level && 'border-red-500'}>
                                                <SelectValue placeholder="Select class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Class 1">Class 1</SelectItem>
                                                <SelectItem value="Class 2">Class 2</SelectItem>
                                                <SelectItem value="Class 3">Class 3</SelectItem>
                                                <SelectItem value="Class 4">Class 4</SelectItem>
                                                <SelectItem value="Class 5">Class 5</SelectItem>
                                                <SelectItem value="Class 6">Class 6</SelectItem>
                                                <SelectItem value="Class 7">Class 7</SelectItem>
                                                <SelectItem value="Class 8">Class 8</SelectItem>
                                                <SelectItem value="Class 9">Class 9</SelectItem>
                                                <SelectItem value="Class 10">Class 10</SelectItem>
                                                <SelectItem value="O-Level">O-Level</SelectItem>
                                                <SelectItem value="A-Level">A-Level</SelectItem>
                                                <SelectItem value="HSC">HSC</SelectItem>
                                                <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                                                <SelectItem value="Graduate">Graduate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.class_level && <p className="text-sm text-red-600">{errors.class_level}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="education_medium">Education Medium</Label>
                                        <Select
                                            value={data.education_medium}
                                            onValueChange={(value) => setData('education_medium', value)}
                                        >
                                            <SelectTrigger className={errors.education_medium && 'border-red-500'}>
                                                <SelectValue placeholder="Select medium" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="bangla">Bangla Medium</SelectItem>
                                                <SelectItem value="english">English Medium</SelectItem>
                                                <SelectItem value="english_version">English Version</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.education_medium && <p className="text-sm text-red-600">{errors.education_medium}</p>}
                                    </div>
                                </div>

                                {/* Education Level */}
                                <div className="space-y-2">
                                    <Label htmlFor="education_level">Education Level</Label>
                                    <Select
                                        value={data.education_level}
                                        onValueChange={(value) => setData('education_level', value)}
                                        required
                                    >
                                        <SelectTrigger className={errors.education_level && 'border-red-500'}>
                                            <SelectValue placeholder="Select education level you can teach" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {levels.map((level) => (
                                                <SelectItem key={level.id} value={level.id.toString()}>
                                                    {level.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.education_level && <p className="text-sm text-red-600">{errors.education_level}</p>}
                                </div>

                                {/* Monthly Salary */}
                                <div className="space-y-2">
                                    <Label htmlFor="monthly_salary">
                                        <CurrencyBangladeshiIcon size={16} className="inline mr-2 " />
                                        Monthly Salary (BDT)
                                    </Label>
                                    <Input
                                        id="monthly_salary"
                                        type="number"
                                        placeholder="e.g., 10000"
                                        value={data.monthly_salary}
                                        onChange={(e) => setData('monthly_salary', e.target.value)}
                                        className={errors.monthly_salary && 'border-red-500'}
                                        required
                                        min="1"
                                    />
                                    {errors.monthly_salary && <p className="text-sm text-red-600">{errors.monthly_salary}</p>}
                                </div>

                                {/* Available Days */}
                                <div className="space-y-2">
                                    <Label>
                                        <Calendar className="inline mr-2 h-4 w-4" />
                                        Available Days
                                    </Label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                                            <Button
                                                key={day}
                                                type="button"
                                                variant={data.available_days.includes(day) ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => {
                                                    if (data.available_days.includes(day)) {
                                                        setData('available_days', data.available_days.filter(d => d !== day));
                                                    } else {
                                                        setData('available_days', [...data.available_days, day]);
                                                    }
                                                }}
                                            >
                                                {day.substring(0, 3)}
                                            </Button>
                                        ))}
                                    </div>
                                    {errors.available_days && <p className="text-sm text-red-600">{errors.available_days}</p>}
                                </div>

                                {/* Preferred Location */}
                                <div className="space-y-2">
                                    <Label>
                                        <MapPin className="inline mr-2 h-4 w-4" />
                                        Preferred Location/Area
                                    </Label>
                                    <LocationDropdown
                                        divisionValue={data.division}
                                        districtValue={data.district}
                                        onDivisionChange={(value) => setData('division', value)}
                                        onDistrictChange={(value) => setData('district', value)}
                                        divisionError={errors.division}
                                        districtError={errors.district}
                                    />
                                </div>

                                {/* Teaching Mode */}
                                <div className="space-y-2">
                                    <Label htmlFor="teaching_mode">Teaching Mode</Label>
                                    <Select
                                        value={data.teaching_mode}
                                        onValueChange={(value) => setData('teaching_mode', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="online">Online Only</SelectItem>
                                            <SelectItem value="in-person">In-Person Only</SelectItem>
                                            <SelectItem value="hybrid">Hybrid (Both)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.teaching_mode && <p className="text-sm text-red-600">{errors.teaching_mode}</p>}
                                </div>

                                {/* Tuition Type and Preferred Tutor Gender */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tuition_type">Tuition Type</Label>
                                        <Select
                                            value={data.tuition_type}
                                            onValueChange={(value) => setData('tuition_type', value)}
                                        >
                                            <SelectTrigger className={errors.tuition_type && 'border-red-500'}>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="home">Home Tuition</SelectItem>
                                                <SelectItem value="online">Online Tuition</SelectItem>
                                                <SelectItem value="group">Group Tuition</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.tuition_type && <p className="text-sm text-red-600">{errors.tuition_type}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tutor_gender_preference">Preferred Tutor Gender</Label>
                                        <Select
                                            value={data.tutor_gender_preference}
                                            onValueChange={(value) => setData('tutor_gender_preference', value)}
                                        >
                                            <SelectTrigger className={errors.tutor_gender_preference && 'border-red-500'}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="any">Any</SelectItem>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.tutor_gender_preference && <p className="text-sm text-red-600">{errors.tutor_gender_preference}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" asChild>
                                        <Link href={route('tutor.job-requests')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        {processing 
                                            ? (isEditing ? 'Updating...' : 'Posting...') 
                                            : (isEditing ? 'Update Job Request' : 'Post Job Request')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}



