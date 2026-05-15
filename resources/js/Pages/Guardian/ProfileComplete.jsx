import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Checkbox } from '@/Components/ui/checkbox';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import { CheckCircle } from 'lucide-react';
import LocationDropdown from '@/Components/LocationDropdown';
import SubjectSelector from '@/Components/SubjectSelector';

export default function GuardianProfileComplete({ auth, guardian = {}, locations = [], subjects = [], categories = [] }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [canSubmit, setCanSubmit] = useState(false);
    const totalSteps = 4;
    const profileCompletion = guardian?.profile_completion_percentage ?? auth?.guardian?.profile_completion_percentage ?? 0;
    const isProfileComplete = profileCompletion >= 100;

    const { data, setData, post, processing, errors } = useForm({
        name: auth?.name || '',
        phone: guardian?.phone || '',
        division: guardian?.division || '',
        district: guardian?.district || '',
        detailed_address: guardian?.detailed_address || '',
        preferred_subjects: guardian?.preferred_subjects || [],
        preferred_class_levels: guardian?.preferred_class_levels || [],
    });

    const classLevels = [
        'Play', 'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
        'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'SSC', 'HSC', 'A Level', 'O Level'
    ];

    const isStepValid = (step) => {
        switch (step) {
            case 1:
                return data.name && data.phone;
            case 2:
                return data.division && data.district;
            case 3:
                return data.detailed_address;
            case 4:
                return data.preferred_subjects.length > 0 && data.preferred_class_levels.length > 0;
            default:
                return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Only submit if explicitly allowed (Complete Profile button clicked)
        if (!canSubmit) {
            console.log('Form submission blocked - Complete Profile button not clicked');
            return;
        }
        
        console.log('Form submitted with data:', data);
        post(route('guardian.profile.complete.store'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Profile completed successfully');
            },
            onError: (errors) => {
                console.log('Form errors:', errors);
                setCanSubmit(false); // Reset after error
            }
        });
    };

    const handleCompleteProfile = (e) => {
        setCanSubmit(true);
        // Let the form submit handler take over
    };

    const nextStep = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const steps = [
        { number: 1, title: 'Personal Info' },
        { number: 2, title: 'Location' },
        { number: 3, title: 'Address' },
        { number: 4, title: 'Preferences' },
    ];

    useEffect(() => {
        if (isProfileComplete) {
            setCurrentStep(totalSteps);
        }
    }, [isProfileComplete, totalSteps]);

    const stepProgress = isProfileComplete ? 100 : Math.round((currentStep / totalSteps) * 100);
    const currentStepMeta = steps[currentStep - 1];

    return (
        <AuthenticatedLayout header={<h2 className="font-heading text-xl font-semibold text-gray-800">Complete Your Profile</h2>}>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <Card className="overflow-hidden border-0 bg-gradient-to-br from-[#275AAA] via-[#1F4A92] to-[#183B73] text-white shadow-2xl">
                        <CardContent className="p-8 lg:p-10">
                            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-2xl space-y-4">
                                    <Badge className="w-fit border border-white/20 bg-white/10 text-white hover:bg-white/10">
                                        Guardian onboarding
                                    </Badge>
                                    <div>
                                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
                                            Finish your guardian profile
                                        </h1>
                                        <p className="mt-4 text-white/80 text-base lg:text-lg leading-7">
                                            Complete these four steps to unlock guardian features and keep your dashboard clean once your profile reaches 100%.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 min-w-[240px]">
                                    <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-sm">
                                        <div className="text-2xl font-bold">{profileCompletion}%</div>
                                        <div className="text-xs uppercase tracking-[0.2em] text-white/70">Profile completion</div>
                                    </div>
                                    <div className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-sm">
                                        <div className="text-2xl font-bold">{currentStep}/{totalSteps}</div>
                                        <div className="text-xs uppercase tracking-[0.2em] text-white/70">Form step</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-8 lg:grid-cols-[1.65fr_0.95fr] items-start">
                        <div className="space-y-8">
                            {/* Progress Bar */}
                            <Card className="border-slate-200 shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="mb-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-slate-700">Step Progress</span>
                                            <span className="text-sm font-semibold text-[#275AAA]">{stepProgress}%</span>
                                        </div>
                                        <Progress value={stepProgress} className="h-3" />
                                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                            <span>Step {currentStep} of {totalSteps}</span>
                                            <span>{currentStepMeta?.title}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                        {steps.map((step) => {
                                            const isActive = currentStep === step.number;
                                            const isComplete = currentStep > step.number;

                                            return (
                                                <div
                                                    key={step.number}
                                                    className={`rounded-2xl border p-4 transition-all ${
                                                        isComplete
                                                            ? 'border-[#275AAA]/20 bg-[#275AAA]/5'
                                                            : isActive
                                                                ? 'border-[#275AAA] bg-[#275AAA] text-white shadow-lg'
                                                                : 'border-slate-200 bg-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                                                            isComplete
                                                                ? 'border-[#275AAA] bg-[#275AAA] text-white'
                                                                : isActive
                                                                    ? 'border-white/30 bg-white/15 text-white'
                                                                    : 'border-slate-300 text-slate-400'
                                                        }`}>
                                                            {isComplete ? <CheckCircle className="h-5 w-5" /> : step.number}
                                                        </div>
                                                        <span className={`text-[10px] uppercase tracking-[0.2em] ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                                                            Step
                                                        </span>
                                                    </div>
                                                    <div className={`mt-4 text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                                                        {step.title}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Form */}
                            <Card className="border-slate-200 shadow-xl">
                                <CardHeader className="border-b border-slate-100 bg-slate-50/80">
                                    <CardTitle className="text-2xl text-slate-900">
                                        Step {currentStep}: {currentStepMeta?.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {currentStep === 1 && 'Enter your personal information'}
                                        {currentStep === 2 && 'Select your location'}
                                        {currentStep === 3 && 'Provide your detailed address'}
                                        {currentStep === 4 && 'Set your preferences for tutors'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6" onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                                    e.preventDefault();
                                }
                            }}>
                                {/* Step 1: Personal Info */}
                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                placeholder={auth?.name || "Enter your full name"}
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="mt-1"
                                                required
                                            />
                                            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">Phone Number *</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="01XXXXXXXXX"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="mt-1"
                                                required
                                            />
                                            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Location */}
                                {currentStep === 2 && (
                                    <div>
                                        <Label>Location *</Label>
                                        <LocationDropdown
                                            divisionValue={data.division}
                                            districtValue={data.district}
                                            onDivisionChange={(value) => setData('division', value)}
                                            onDistrictChange={(value) => setData('district', value)}
                                            divisionError={errors.division}
                                            districtError={errors.district}
                                        />
                                    </div>
                                )}

                                {/* Step 3: Address */}
                                {currentStep === 3 && (
                                    <div>
                                        <Label htmlFor="detailed_address">Detailed Address *</Label>
                                        <Textarea
                                            id="detailed_address"
                                            placeholder="House no, Road no, Area..."
                                            value={data.detailed_address}
                                            onChange={(e) => setData('detailed_address', e.target.value)}
                                            rows={4}
                                            className="mt-1"
                                            required
                                        />
                                        {errors.detailed_address && <p className="text-sm text-red-600 mt-1">{errors.detailed_address}</p>}
                                    </div>
                                )}

                                {/* Step 4: Preferences */}
                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <div>
                                            <SubjectSelector
                                                subjects={subjects}
                                                selectedSubjects={data.preferred_subjects}
                                                onSubjectsChange={(selected) => setData('preferred_subjects', selected)}
                                                label="Preferred Subjects *"
                                                placeholder="Search and select subjects you prefer tutors for..."
                                            />
                                            {errors.preferred_subjects && <p className="text-sm text-red-600 mt-1">{errors.preferred_subjects}</p>}
                                        </div>

                                        <div>
                                            <Label>Preferred Class Levels *</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                                                {classLevels.map((level) => (
                                                    <div key={level} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`level-${level}`}
                                                            checked={data.preferred_class_levels.includes(level)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    setData('preferred_class_levels', [...data.preferred_class_levels, level]);
                                                                } else {
                                                                    setData('preferred_class_levels', data.preferred_class_levels.filter(l => l !== level));
                                                                }
                                                            }}
                                                        />
                                                        <Label htmlFor={`level-${level}`} className="text-sm font-normal cursor-pointer">
                                                            {level}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.preferred_class_levels && <p className="text-sm text-red-600 mt-1">{errors.preferred_class_levels}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between pt-6 border-t">
                                    <div>
                                        {currentStep > 1 && (
                                            <Button type="button" variant="outline" onClick={prevStep} className="border-slate-300 hover:bg-slate-50">
                                                Previous
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        {currentStep < totalSteps ? (
                                            <Button 
                                                type="button" 
                                                onClick={nextStep}
                                                disabled={!isStepValid(currentStep)}
                                                className="bg-[#275AAA] hover:bg-[#1F4A92] text-white"
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <Button 
                                                type="submit" 
                                                disabled={processing || !isStepValid(currentStep)} 
                                                className="bg-[#275AAA] hover:bg-[#1F4A92] text-white"
                                                onClick={handleCompleteProfile}
                                            >
                                                {processing ? 'Saving...' : 'Complete Profile'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-slate-200 shadow-xl sticky top-6">
                            <CardHeader className="bg-white">
                                <CardTitle className="text-xl text-slate-900">Profile status</CardTitle>
                                <CardDescription>
                                    {isProfileComplete
                                        ? 'Your profile is fully completed and your dashboard prompt is hidden.'
                                        : 'Complete the flow to get a clean dashboard and full access.'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500">Current completion</p>
                                            <p className="text-3xl font-black text-slate-900">{profileCompletion}%</p>
                                        </div>
                                        <div className={`rounded-full px-3 py-1 text-xs font-semibold ${isProfileComplete ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {isProfileComplete ? 'Completed' : 'In progress'}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Progress value={profileCompletion} className="h-3" />
                                    </div>
                                </div>

                                {[
                                    'A cleaner dashboard with the completion prompt removed at 100%',
                                    'Direct access to tutor browsing and guardian actions',
                                    'Better tutor matching with your subjects and class levels',
                                    'A profile that looks complete and trustworthy to tutors',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                        <CheckCircle className="mt-0.5 h-5 w-5 text-[#275AAA]" />
                                        <p className="text-sm text-slate-700 leading-6">{item}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


