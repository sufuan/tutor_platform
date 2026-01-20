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
    DollarSign,
    Calendar,
    MapPin,
    Info
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import SubjectSelector from '@/Components/SubjectSelector';
import LocationDropdown from '@/Components/LocationDropdown';

export default function CreateJobRequest({ auth, subjects, levels, tutor }) {
    // Ensure tutor subjects is an array
    const tutorSubjects = Array.isArray(tutor?.subjects) ? tutor.subjects : [];
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        subjects: tutorSubjects,
        education_level: '',
        monthly_salary: tutor?.monthly_salary || '',
        available_days: [],
        division: tutor?.division || '',
        district: tutor?.district || '',
        teaching_mode: 'hybrid',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tutor.job-request.store'));
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
            <Head title="Post Job Request" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href={route('tutor.applications')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Applications
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">Post Job Request</h1>
                        <p className="text-gray-600">Advertise your tutoring services to guardians</p>
                    </div>

                    <Alert className="mb-6">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                            Create a job request to showcase your tutoring services. Guardians can browse and contact you directly.
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

                                {/* Education Level */}
                                <div className="space-y-2">
                                    <Label htmlFor="education_level">Education Level</Label>
                                    <Select
                                        value={data.education_level}
                                        onValueChange={(value) => setData('education_level', value)}
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
                                        <DollarSign className="inline mr-2 h-4 w-4" />
                                        Monthly Salary (BDT)
                                    </Label>
                                    <Input
                                        id="monthly_salary"
                                        type="number"
                                        placeholder="e.g., 10000"
                                        value={data.monthly_salary}
                                        onChange={(e) => setData('monthly_salary', e.target.value)}
                                        className={errors.monthly_salary && 'border-red-500'}
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

                                {/* Submit Button */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" asChild>
                                        <Link href={route('tutor.applications')}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        {processing ? 'Posting...' : 'Post Job Request'}
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
