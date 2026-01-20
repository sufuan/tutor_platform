import { useState, useEffect } from 'react';
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
import { CheckCircle, Circle } from 'lucide-react';
import LocationDropdown from '@/Components/LocationDropdown';

export default function GuardianProfileComplete({ guardian = {}, locations = [], subjects = [], categories = [] }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [canSubmit, setCanSubmit] = useState(false);
    const totalSteps = 4;

    const { data, setData, post, processing, errors } = useForm({
        first_name: guardian?.first_name || '',
        last_name: guardian?.last_name || '',
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

    const calculateProgress = () => {
        let filledFields = 0;
        if (data.first_name) filledFields++;
        if (data.last_name) filledFields++;
        if (data.phone) filledFields++;
        if (data.division) filledFields++;
        if (data.district) filledFields++;
        if (data.detailed_address) filledFields++;
        if (data.preferred_subjects.length > 0) filledFields++;
        if (data.preferred_class_levels.length > 0) filledFields++;
        return Math.round((filledFields / 8) * 100);
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

    return (
        <AuthenticatedLayout header={<h2 className="font-heading text-xl font-semibold text-gray-800">Complete Your Profile</h2>}>
            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Progress Bar */}
                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <div className="mb-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Profile Completion</span>
                                    <span className="text-sm font-medium text-primary-blue">{calculateProgress()}%</span>
                                </div>
                                <Progress value={calculateProgress()} className="h-3" />
                            </div>
                            <div className="flex justify-between mt-6">
                                {steps.map((step) => (
                                    <div key={step.number} className="flex flex-col items-center">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                                            currentStep >= step.number
                                                ? 'border-primary-blue bg-primary-blue text-white'
                                                : 'border-gray-300 text-gray-400'
                                        }`}>
                                            {currentStep > step.number ? (
                                                <CheckCircle className="h-6 w-6" />
                                            ) : (
                                                <span>{step.number}</span>
                                            )}
                                        </div>
                                        <span className="text-xs mt-2 text-center">{step.title}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
                            <CardDescription>
                                {currentStep === 1 && 'Enter your personal information'}
                                {currentStep === 2 && 'Select your location'}
                                {currentStep === 3 && 'Provide your detailed address'}
                                {currentStep === 4 && 'Set your preferences for tutors'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6" onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                                    e.preventDefault();
                                }
                            }}>
                                {/* Step 1: Personal Info */}
                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="first_name">First Name *</Label>
                                                <Input
                                                    id="first_name"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    className="mt-1"
                                                />
                                                {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="last_name">Last Name *</Label>
                                                <Input
                                                    id="last_name"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    className="mt-1"
                                                />
                                                {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>}
                                            </div>
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
                                        />
                                        {errors.detailed_address && <p className="text-sm text-red-600 mt-1">{errors.detailed_address}</p>}
                                    </div>
                                )}

                                {/* Step 4: Preferences */}
                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <div>
                                            <Label>Preferred Subjects *</Label>
                                            <p className="text-sm text-slate-600 mb-3">Select subjects you prefer tutors for</p>
                                            <div className="flex flex-wrap gap-2">
                                                {subjects && subjects.length > 0 ? subjects.map((subject) => (
                                                    <Badge
                                                        key={subject.id}
                                                        variant={data.preferred_subjects.includes(subject.id) ? "default" : "outline"}
                                                        className="cursor-pointer px-3 py-1.5 transition-colors"
                                                        onClick={() => {
                                                            if (data.preferred_subjects.includes(subject.id)) {
                                                                setData('preferred_subjects', data.preferred_subjects.filter(id => id !== subject.id));
                                                            } else {
                                                                setData('preferred_subjects', [...data.preferred_subjects, subject.id]);
                                                            }
                                                        }}
                                                    >
                                                        {subject.name}
                                                    </Badge>
                                                ))
                                                : <p className="text-sm text-slate-500">No subjects available</p>
                                                }
                                            </div>
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
                                            <Button type="button" variant="outline" onClick={prevStep}>
                                                Previous
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        {currentStep < totalSteps ? (
                                            <Button type="button" onClick={nextStep}>
                                                Next
                                            </Button>
                                        ) : (
                                            <Button 
                                                type="submit" 
                                                disabled={processing} 
                                                className="bg-success hover:bg-success/90"
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
            </div>
        </AuthenticatedLayout>
    );
}
