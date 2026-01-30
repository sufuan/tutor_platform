import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Badge } from '@/Components/ui/badge';
import {
    User,
    Save,
    MapPin,
    GraduationCap,
    Briefcase,
    CheckCircle2,
    Download,
    Eye,
    FileText,
    Camera
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import LocationDropdown from '@/Components/LocationDropdown';
import SubjectSelector from '@/Components/SubjectSelector';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Profile({ auth, tutor, subjects, locations, flash, cvUrl, photoUrl }) {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('tuition');



    const { data, setData, post, processing, errors } = useForm({
        name: tutor.user?.name || '',
        phone: tutor.phone || '',
        gender: tutor.gender || '',
        address: tutor.address || '',
        institution: tutor.institution || '',
        education_level: tutor.education_level || '',
        department: tutor.department || '',
        cgpa: tutor.cgpa || '',
        subjects: tutor.subjects || [],
        experience_years: tutor.experience_years || '',
        experience_details: tutor.experience_details || '',
        hourly_rate: tutor.hourly_rate || '',
        bio: tutor.bio || '',
        location_id: tutor.location_id || '',
        available_days: tutor.available_days || [],
        available_time_from: tutor.available_time_from || '',
        available_time_to: tutor.available_time_to || '',
        preferred_locations: tutor.preferred_locations || '',
        tutoring_styles: tutor.tutoring_styles || '',
        tutoring_method: tutor.tutoring_method || '',
        place_of_tutoring: tutor.place_of_tutoring || '',
        division: tutor.division || '',
        district: tutor.district || '',
        photo: null,
        cv_path: null,
    });

    const [photoPreview, setPhotoPreview] = useState(
        photoUrl || null
    );
    const [photoFile, setPhotoFile] = useState(null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    // Sync form data when tutor prop changes (after save) or when entering edit mode
    useEffect(() => {
        if (isEditing) {
            console.log('Syncing form data with tutor.subjects:', tutor.subjects);
            setData('subjects', tutor.subjects || []);
        }
    }, [isEditing, tutor.subjects]);

    // Update photo preview when photoUrl prop changes (after upload)
    useEffect(() => {
        if (photoUrl) {
            setPhotoPreview(photoUrl);
        }
    }, [photoUrl]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoUpload = () => {
        if (!photoFile) return;

        setUploadingPhoto(true);

        // Use Inertia router to post with file and required gender field
        router.post(route('tutor.profile.update'), {
            photo: photoFile,
            gender: tutor.gender, // Required field
        }, {
            preserveScroll: true,
            onSuccess: (page) => {
                toast({
                    title: "Success",
                    description: "Profile photo updated successfully",
                });
                setPhotoFile(null);
                setUploadingPhoto(false);
            },
            onError: (errors) => {
                console.error('Upload errors:', errors);
                toast({
                    title: "Error",
                    description: Object.values(errors).join(', '),
                    variant: "destructive",
                });
                setUploadingPhoto(false);
            },
        });
    };

    const toggleSubject = (subjectId) => {
        if (data.subjects.includes(subjectId)) {
            setData('subjects', data.subjects.filter(id => id !== subjectId));
        } else {
            setData('subjects', [...data.subjects, subjectId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Transform data to ensure arrays are properly formatted
        const formData = {
            ...data,
            subjects: data.subjects || [],
        };

        post(route('tutor.profile.update'), {
            data: formData,
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                });
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                toast({
                    title: "Error",
                    description: Object.values(errors).join(', '),
                    variant: "destructive",
                });
            },
            forceFormData: true,
        });
    };

    const profileCompletion = tutor.profile_completion_percentage || 0;

    return (
        <AuthenticatedLayout>
            <Head title="My Profile" />

            <div className="p-4 md:p-8">
                {/* Profile Completion Warning */}
                {profileCompletion < 70 && (
                    <Alert className="mb-6 border-orange-200 bg-orange-50">
                        <AlertDescription className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <svg className="h-5 w-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-orange-900">Complete Your Profile to Unlock All Features</p>
                                <p className="text-sm text-orange-800 mt-1">
                                    Your profile is currently {profileCompletion}% complete. You need at least 70% completion to access dashboard, browse jobs, and apply for positions. Please fill in the required information below.
                                </p>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* PROFILE CARD - Responsive: Full width on mobile, 4 cols on desktop */}
                    <div className="col-span-1 lg:col-span-4 order-1">
                        <Card className="rounded-xl border shadow-sm">
                            <CardContent className="p-6 text-center">
                                {/* Photo with Camera Icon Overlay */}
                                <div className="relative inline-block">
                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt="Profile"
                                            className="mx-auto h-24 w-24 rounded-full object-cover bg-slate-200"
                                        />
                                    ) : (
                                        <div className="mx-auto h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center">
                                            <User className="h-12 w-12 text-slate-400" />
                                        </div>
                                    )}
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('photo-upload').click()}
                                            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-white shadow-lg transition-colors"
                                            title="Upload profile photo"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                {/* Hidden file input */}
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoChange}
                                />

                                {/* Save Photo Button - appears when photo is selected */}
                                {photoFile && isEditing && (
                                    <div className="mt-4 space-y-2">
                                        <Button
                                            type="button"
                                            onClick={handlePhotoUpload}
                                            disabled={uploadingPhoto}
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            size="sm"
                                        >
                                            {uploadingPhoto ? 'Uploading...' : 'Save Photo'}
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                setPhotoFile(null);
                                                setPhotoPreview(photoUrl || null);
                                            }}
                                            variant="outline"
                                            className="w-full"
                                            size="sm"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}

                                <h3 className="mt-4 text-lg font-semibold">{tutor.user?.name || `${tutor.first_name || ''} ${tutor.last_name || ''}`.trim() || 'No Name'}</h3>
                                <p className="text-sm text-slate-500">Tutor ID: TUT-{String(tutor.id).padStart(5, '0')}</p>
                                <p className="text-sm text-slate-500">Rating: 0 / 5.0</p>

                                <div className={`mt-3 inline-block rounded-full px-3 py-1 text-xs ${profileCompletion === 100 ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
                                    Profile Completed: {profileCompletion}%
                                </div>
                            </CardContent>

                            <div className="px-6 pb-6 space-y-3">
                                <Button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="w-full rounded-md bg-slate-900 hover:bg-slate-800 text-white"
                                >
                                    {isEditing ? 'View Profile' : 'Edit Profile'}
                                </Button>

                                {/* Contact Info */}
                                <div className="text-sm space-y-3 border-t pt-3">

                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">Email</p>
                                        <p className="font-medium break-words">{tutor.user?.email || 'Not Given'}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">Phone Number</p>
                                        <p className="font-medium">{tutor.phone || <span className="text-rose-500">Not Given</span>}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">Address</p>
                                        <p className="font-medium">{tutor.address || <span className="text-rose-500">Not Given</span>}</p>
                                    </div>
                                </div>

                                {/* Verification */}
                                <div className="border-t pt-4 text-sm">
                                    <p className="font-medium">Verification Status</p>
                                    <Badge
                                        variant={tutor.verification_status === 'verified' ? 'default' : 'secondary'}
                                        className="mt-1"
                                    >
                                        {tutor.verification_status || 'Not Verified'}
                                    </Badge>
                                </div>

                                {/* Actions */}
                                <div className="space-y-2">
                                    {cvUrl && (
                                        <Button
                                            variant="default"
                                            className="w-full rounded-md bg-slate-900 text-white"
                                            asChild
                                        >
                                            <a href={cvUrl} download>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download CV
                                            </a>
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-md border-slate-300"
                                        asChild
                                    >
                                        <a href={route('tutors.show', tutor.id)} target="_blank">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View as Guardian/Student
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT CONTENT - Responsive: Full width on mobile, 8 cols on desktop */}
                    <div className="col-span-1 lg:col-span-8 order-2">
                        {flash?.success && (
                            <Alert className="mb-6 bg-green-50 border-green-200">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    {flash.success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {!isEditing ? (
                            /* VIEW MODE */
                            <div className="space-y-6">
                                {/* Availability Card */}
                                <Card className="rounded-xl border shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">Availability Information</h3>
                                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                                            <p className="text-slate-500">Available Days</p>
                                            <p>{tutor.available_days || <span className="text-rose-500">Not Given</span>}</p>

                                            <p className="text-slate-500">Time</p>
                                            <p>
                                                {tutor.available_time_from && tutor.available_time_to
                                                    ? `${tutor.available_time_from} - ${tutor.available_time_to}`
                                                    : <span className="text-rose-500">Not Given</span>
                                                }
                                            </p>

                                            <p className="text-slate-500">Place of Tutoring (District)</p>
                                            <p>
                                                {tutor.division && tutor.district
                                                    ? `${tutor.district}, ${tutor.division}`
                                                    : <span className="text-rose-500">Not Given</span>
                                                }
                                            </p>

                                            <p className="text-slate-500">Preferred Locations</p>
                                            <p>{tutor.preferred_locations || <span className="text-rose-500">Not Given</span>}</p>

                                            <p className="text-slate-500">Expected Salary (Monthly)</p>
                                            <p>{tutor.hourly_rate ? `${tutor.hourly_rate}/month` : <span className="text-rose-500">Not Given</span>}</p>

                                            <p className="text-slate-500">Tutoring Styles</p>
                                            <p>{tutor.tutoring_styles || <span className="text-rose-500">Not Given</span>}</p>

                                            <p className="text-slate-500">Tutoring Method</p>
                                            <p>{tutor.tutoring_method || <span className="text-rose-500">Not Given</span>}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Other Information Card */}
                                <Card className="rounded-xl border shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">Educational Information</h3>
                                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                                            <p className="text-slate-500">Institution</p>
                                            <p>{tutor.institution || <span className="text-rose-500">Not Given</span>}</p>

                                            <p className="text-slate-500">Education Level</p>
                                            <p>{tutor.education_level ? tutor.education_level.replace('_', ' ').charAt(0).toUpperCase() + tutor.education_level.replace('_', ' ').slice(1) : <span className="text-rose-500">Not Given</span>}</p>

                                            <p className="text-slate-500 col-span-2 mt-2">Subjects I Teach</p>
                                            <p className="col-span-2">
                                                {tutor.subjects && Array.isArray(tutor.subjects) && tutor.subjects.length > 0 ? (
                                                    <span className="flex flex-wrap gap-1">
                                                        {subjects.filter(s => tutor.subjects.map(id => parseInt(id)).includes(s.id)).map(subject => (
                                                            <Badge key={subject.id} variant="secondary" className="text-xs">
                                                                {subject.name}
                                                            </Badge>
                                                        ))}
                                                    </span>
                                                ) : <span className="text-rose-500">Not Given</span>}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Experience Card */}
                                <Card className="rounded-xl border shadow-sm">
                                    <CardContent className="p-6">
                                        <h3 className="mb-4 font-semibold">Experience Information</h3>
                                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                                            <p className="text-slate-500">Total Experience</p>
                                            <p>{tutor.experience_years ? `${tutor.experience_years} years` : <span className="text-rose-500">Not Given</span>}</p>

                                            <p className="text-slate-500">Experience Details</p>
                                            <p className="col-span-2">{tutor.experience_details || <span className="text-rose-500">Not Given</span>}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            /* EDIT MODE WITH TABS AS CARDS */
                            <form onSubmit={handleSubmit}>
                                {/* Tab Navigation Cards */}
                                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-3">
                                    {[
                                        { id: 'personal', label: 'Personal', icon: User },
                                        { id: 'education', label: 'Educational', icon: GraduationCap },
                                        { id: 'tuition', label: 'Tuition Related', icon: Briefcase },
                                        { id: 'credential', label: 'Credential', icon: FileText },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex-shrink-0 rounded-lg border-2 px-3 py-2 text-center transition-all lg:rounded-xl lg:p-4 lg:block ${activeTab === tab.id
                                                ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:shadow'
                                                }`}
                                        >
                                            <tab.icon className="h-4 w-4 mx-auto mb-0 lg:h-5 lg:w-5 lg:mb-2" />
                                            <p className="text-xs font-medium whitespace-nowrap">{tab.label}</p>
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content Card */}
                                <Card className="rounded-xl border shadow-sm">
                                    <div className="p-4 md:p-6">
                                        {/* TUITION TAB */}
                                        {activeTab === 'tuition' && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-3 border-b flex items-center">
                                                    <Briefcase className="h-5 w-5 mr-2 text-slate-700" />
                                                    Tuition Related Information
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-sm">Available Days</Label>
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
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="hourly_rate" className="text-sm">Expected Salary (Monthly)</Label>
                                                        <Input
                                                            id="hourly_rate"
                                                            type="number"
                                                            className="rounded-md"
                                                            placeholder="Expected Monthly Salary in BDT"
                                                            value={data.hourly_rate}
                                                            onChange={(e) => setData('hourly_rate', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="available_time_from" className="text-sm">Time From</Label>
                                                        <Input
                                                            id="available_time_from"
                                                            type="time"
                                                            className="rounded-md"
                                                            value={data.available_time_from}
                                                            onChange={(e) => setData('available_time_from', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="available_time_to" className="text-sm">Time To</Label>
                                                        <Input
                                                            id="available_time_to"
                                                            type="time"
                                                            className="rounded-md"
                                                            value={data.available_time_to}
                                                            onChange={(e) => setData('available_time_to', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="tutoring_styles" className="text-sm">Tutoring Styles</Label>
                                                        <Input
                                                            id="tutoring_styles"
                                                            className="rounded-md"
                                                            placeholder="Tutoring Styles"
                                                            value={data.tutoring_styles}
                                                            onChange={(e) => setData('tutoring_styles', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="tutoring_method" className="text-sm">Tutoring Method</Label>
                                                        <Select
                                                            value={data.tutoring_method}
                                                            onValueChange={(value) => setData('tutoring_method', value)}
                                                        >
                                                            <SelectTrigger className="rounded-md">
                                                                <SelectValue placeholder="Select method" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="online">Online</SelectItem>
                                                                <SelectItem value="in-person">In-Person</SelectItem>
                                                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="md:col-span-2 space-y-4 p-4 border rounded-lg bg-slate-50">
                                                        <h4 className="text-sm font-semibold text-slate-700">Location Preferences</h4>
                                                        <div>
                                                            <Label className="text-sm">Place of Tutoring (Division & District)</Label>
                                                            <LocationDropdown
                                                                divisionValue={data.division}
                                                                districtValue={data.district}
                                                                onDivisionChange={(value) => setData('division', value)}
                                                                onDistrictChange={(value) => setData('district', value)}
                                                                divisionLabel="Division"
                                                                districtLabel="District"
                                                                showLabels={true}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="preferred_locations" className="text-sm">Preferred Locations/Areas</Label>
                                                            <Input
                                                                id="preferred_locations"
                                                                className="rounded-md bg-white"
                                                                placeholder="e.g., Gulshan, Banani, Dhanmondi"
                                                                value={data.preferred_locations}
                                                                onChange={(e) => setData('preferred_locations', e.target.value)}
                                                            />
                                                            <p className="text-xs text-slate-500 mt-1">Specify specific areas within the selected district</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* EDUCATION TAB */}
                                        {activeTab === 'education' && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-3 border-b flex items-center">
                                                    <GraduationCap className="h-5 w-5 mr-2 text-slate-700" />
                                                    Educational Information
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="institution" className="text-sm">Institution/University</Label>
                                                        <Input
                                                            id="institution"
                                                            className="rounded-md"
                                                            placeholder="e.g., LUMS, NUST, IBA"
                                                            value={data.institution}
                                                            onChange={(e) => setData('institution', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="education_level" className="text-sm">Education Level</Label>
                                                        <Select
                                                            value={data.education_level}
                                                            onValueChange={(value) => setData('education_level', value)}
                                                        >
                                                            <SelectTrigger className="rounded-md">
                                                                <SelectValue placeholder="Select level" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="high_school">High School</SelectItem>
                                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                                <SelectItem value="bachelors">Bachelor's</SelectItem>
                                                                <SelectItem value="masters">Master's</SelectItem>
                                                                <SelectItem value="phd">PhD</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="department" className="text-sm">Department</Label>
                                                        <Input
                                                            id="department"
                                                            className="rounded-md"
                                                            placeholder="e.g., Computer Science, Mathematics"
                                                            value={data.department}
                                                            onChange={(e) => setData('department', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="cgpa" className="text-sm">Result (CGPA) <span className="text-gray-400 text-xs">(Optional)</span></Label>
                                                        <Input
                                                            id="cgpa"
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            max="4"
                                                            className="rounded-md"
                                                            placeholder="e.g., 3.75"
                                                            value={data.cgpa}
                                                            onChange={(e) => setData('cgpa', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <SubjectSelector
                                                            subjects={subjects}
                                                            selectedSubjects={data.subjects}
                                                            onSubjectsChange={(selected) => setData('subjects', selected)}
                                                            label="Subjects I Teach"
                                                            placeholder="Search subjects..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* PERSONAL TAB */}
                                        {activeTab === 'personal' && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-3 border-b flex items-center">
                                                    <User className="h-5 w-5 mr-2 text-slate-700" />
                                                    Personal Information
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="name" className="text-sm">Full Name</Label>
                                                        <Input
                                                            id="name"
                                                            className="rounded-md"
                                                            placeholder={tutor.user?.name || 'Enter your full name'}
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                                                        <Input
                                                            id="phone"
                                                            className="rounded-md"
                                                            placeholder="03001234567"
                                                            value={data.phone}
                                                            onChange={(e) => setData('phone', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="gender" className="text-sm">Gender <span className="text-red-500">*</span></Label>
                                                        <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                                            <SelectTrigger className="rounded-md">
                                                                <SelectValue placeholder="Select gender" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="male">Male</SelectItem>
                                                                <SelectItem value="female">Female</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.gender && (
                                                            <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                                                        )}
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="address" className="text-sm">Address</Label>
                                                        <Textarea
                                                            id="address"
                                                            rows={3}
                                                            className="rounded-md"
                                                            placeholder="Your complete address"
                                                            value={data.address}
                                                            onChange={(e) => setData('address', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="bio" className="text-sm">About Me</Label>
                                                        <Textarea
                                                            id="bio"
                                                            rows={4}
                                                            className="rounded-md"
                                                            placeholder="Tell guardians about yourself..."
                                                            value={data.bio}
                                                            onChange={(e) => setData('bio', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="experience_years" className="text-sm">Years of Experience</Label>
                                                        <Input
                                                            id="experience_years"
                                                            type="number"
                                                            className="rounded-md"
                                                            placeholder="3"
                                                            value={data.experience_years}
                                                            onChange={(e) => setData('experience_years', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="experience_details" className="text-sm">Experience Details</Label>
                                                        <Textarea
                                                            id="experience_details"
                                                            rows={4}
                                                            className="rounded-md"
                                                            placeholder="Describe your teaching experience..."
                                                            value={data.experience_details}
                                                            onChange={(e) => setData('experience_details', e.target.value)}
                                                        />
                                                    </div>
                                                </div>                                        </div>)}

                                        {/* CREDENTIAL TAB */}
                                        {activeTab === 'credential' && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-3 border-b flex items-center">
                                                    <FileText className="h-5 w-5 mr-2 text-slate-700" />
                                                    Credential Information
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="col-span-1 md:col-span-2">
                                                        <Label htmlFor="cv_path" className="text-sm">
                                                            <FileText className="inline h-4 w-4" /> Upload CV
                                                        </Label>
                                                        {cvUrl && (
                                                            <p className="text-xs text-slate-500 mb-2">
                                                                <a href={cvUrl} target="_blank" className="text-blue-600 underline">
                                                                    View Current CV
                                                                </a>
                                                            </p>
                                                        )}
                                                        <Input
                                                            id="cv_path"
                                                            type="file"
                                                            accept=".pdf"
                                                            className="rounded-md"
                                                            onChange={(e) => setData('cv_path', e.target.files[0])}
                                                        />
                                                        <p className="text-xs text-slate-500 mt-1">PDF only - Max 5MB</p>
                                                    </div>
                                                    <Alert className="bg-slate-50 col-span-1 md:col-span-2">
                                                        <AlertDescription className="text-sm text-slate-600">
                                                            A well-formatted CV increases your chances of getting hired. Include your education, certifications, and teaching experience.
                                                        </AlertDescription>
                                                    </Alert>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>

                                {/* Save Buttons Card */}
                                <Card className="rounded-xl border shadow-sm mt-6">
                                    <CardContent className="p-4 md:p-6">
                                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsEditing(false)}
                                                disabled={processing}
                                                className="rounded-md flex-1 sm:flex-none"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="rounded-md bg-slate-900 hover:bg-slate-800 flex-1 sm:flex-none"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                {processing ? 'Saving...' : 'Save Profile'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


