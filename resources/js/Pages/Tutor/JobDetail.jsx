import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { 
    MapPin, Calendar, Clock, BookOpen, 
    User, Mail, Phone, Send, ArrowLeft, FileText, 
    ExternalLink, CheckCircle2 
} from 'lucide-react';
import { CurrencyBangladeshiIcon } from '@/Components/icons/heroicons-currency-bangladeshi';

export default function JobDetail({ auth, job }) {
    const [showApplyModal, setShowApplyModal] = useState(false);
    const tutor = auth.tutor;
    const tutorCv = tutor?.cv_path;
    const verificationStatus = tutor?.verification_status;
    const { toast } = useToast();

    const { data, setData, post, processing, reset, errors } = useForm({
        cover_letter: '',
        cv_path: null,
    });

    const handleApply = () => {
        if (verificationStatus !== 'verified') {
            toast({
                variant: "destructive",
                title: "Verification Required",
                description: "You must be verified before applying to jobs. Please complete the verification process.",
            });
            return;
        }
        setShowApplyModal(true);
    };

    const submitApplication = (e) => {
        e.preventDefault();
        post(route('tutor.jobs.apply', job.id), {
            onSuccess: () => {
                setShowApplyModal(false);
                reset();
                toast({
                    title: "Application Submitted",
                    description: "Your application has been successfully submitted.",
                });
            },
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={job.title} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Button 
                        variant="ghost" 
                        className="mb-4"
                        onClick={() => router.visit(route('tutor.jobs'))}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Jobs
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Job Header */}
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                                            <CardDescription>
                                                Posted on {new Date(job.created_at).toLocaleDateString()}
                                            </CardDescription>
                                        </div>
                                        {job.has_applied && (
                                            <Badge className="bg-green-100 text-green-800">
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                Applied
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-2">
                                            <CurrencyBangladeshiIcon size={20} className=" text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Salary</p>
                                                <p className="font-semibold text-green-600">{job.salary}/month</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Days per Week</p>
                                                <p className="font-semibold">{job.days_per_week} days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Session Duration</p>
                                                <p className="font-semibold">{job.duration_per_session} mins</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-slate-500" />
                                            <div>
                                                <p className="text-xs text-slate-500">Location</p>
                                                <p className="font-semibold">{job.location?.city}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Job Details */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">Description</h3>
                                            <p className="text-slate-700 leading-relaxed">{job.description}</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2">Required Subjects</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.isArray(job.subject_names) && job.subject_names.map((subject, idx) => (
                                                    <Badge key={idx} variant="secondary">
                                                        {subject}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2">Additional Details</h3>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-slate-500">Class Level</p>
                                                    <p className="font-medium">{job.class_level}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Education Medium</p>
                                                    <p className="font-medium">{job.education_medium}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Tuition Type</p>
                                                    <p className="font-medium">{job.tuition_type}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500">Gender Preference</p>
                                                    <p className="font-medium capitalize">{job.preferred_tutor_gender || 'Any'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {job.additional_requirements && (
                                            <div>
                                                <h3 className="font-semibold mb-2">Additional Requirements</h3>
                                                <p className="text-slate-700">{job.additional_requirements}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <CardTitle>Guardian Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                                            <User className="h-6 w-6 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{job.guardian?.first_name} {job.guardian?.last_name}</p>
                                            <p className="text-sm text-slate-500">Guardian</p>
                                        </div>
                                    </div>

                                    {job.guardian?.phone && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-slate-500" />
                                            <span>{job.guardian.phone}</span>
                                        </div>
                                    )}

                                    {job.guardian?.address && (
                                        <div className="flex items-start gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                                            <span>{job.guardian.address}</span>
                                        </div>
                                    )}

                                    {!job.has_applied ? (
                                        <Button 
                                            className="w-full mt-4" 
                                            onClick={handleApply}
                                            disabled={verificationStatus !== 'verified'}
                                        >
                                            <Send className="mr-2 h-4 w-4" />
                                            Apply for this Job
                                        </Button>
                                    ) : (
                                        <Alert className="mt-4 bg-green-50 border-green-200">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                            <AlertDescription className="text-green-800">
                                                You have already applied for this job
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {verificationStatus !== 'verified' && (
                                        <p className="text-xs text-amber-600 mt-2">
                                            * Verification required to apply
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Apply for Job</DialogTitle>
                        <DialogDescription>
                            {job.title}
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


