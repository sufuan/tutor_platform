import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Upload, FileText, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function Verification({ auth, tutor, verificationStatus, verificationNotes, rejectionReason }) {
    const { data, setData, post, processing, errors } = useForm({
        documents: null,
        notes: '',
    });

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData('documents', files);
        setUploadedFiles(files.map(f => f.name));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tutor.verification.submit'));
    };

    const getStatusConfig = () => {
        const configs = {
            unverified: {
                icon: AlertCircle,
                title: 'Complete Verification',
                description: 'Submit your documents to get verified and start applying for jobs.',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
            },
            pending: {
                icon: Clock,
                title: 'Verification Pending',
                description: 'Your documents are under review. We\'ll notify you once the verification is complete.',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
            },
            verified: {
                icon: CheckCircle,
                title: 'Verified',
                description: 'Congratulations! Your profile has been verified. You can now apply for jobs.',
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
            },
            rejected: {
                icon: XCircle,
                title: 'Verification Rejected',
                description: 'Your verification was rejected. Please review the feedback and resubmit your documents.',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
            },
        };

        return configs[verificationStatus] || configs.unverified;
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tutor Verification
                </h2>
            }
        >
            <Head title="Tutor Verification" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Current Status */}
                    <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <div className={`p-3 ${config.bgColor} rounded-lg`}>
                                    <Icon className={`h-6 w-6 ${config.color}`} />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{config.title}</CardTitle>
                                    <CardDescription className="text-gray-600 mt-1">
                                        {config.description}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Admin Feedback */}
                    {(rejectionReason || (verificationStatus === 'verified' && verificationNotes)) && (
                        <Alert className={verificationStatus === 'rejected' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                <div className="space-y-2">
                                    <p className="font-semibold">
                                        {verificationStatus === 'rejected' ? 'Rejection Reason:' : 'Admin Notes:'}
                                    </p>
                                    <p className="text-sm">{verificationStatus === 'rejected' ? rejectionReason : verificationNotes}</p>
                                </div>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Verification Form */}
                    {verificationStatus !== 'verified' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Submit Verification Documents</CardTitle>
                                <CardDescription>
                                    Upload your educational certificates, ID proof, and other relevant documents
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Please upload clear, readable copies of your documents. Supported formats: PDF, JPG, PNG (Max 5MB each)
                                        </AlertDescription>
                                    </Alert>

                                    <div className="space-y-2">
                                        <Label htmlFor="documents">Upload Documents *</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                            <Input
                                                id="documents"
                                                type="file"
                                                multiple
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <label htmlFor="documents" className="cursor-pointer">
                                                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PDF, JPG, PNG up to 5MB
                                                </p>
                                            </label>
                                        </div>
                                        {uploadedFiles.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {uploadedFiles.map((file, idx) => (
                                                    <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                                        <FileText className="h-4 w-4 text-blue-600" />
                                                        <span className="text-sm text-gray-700">{file}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {errors.documents && (
                                            <p className="text-sm text-red-600">{errors.documents}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Add any additional information that might help with verification..."
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={4}
                                        />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={processing || !data.documents}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? 'Submitting...' : verificationStatus === 'rejected' ? 'Resubmit Documents' : 'Submit for Verification'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Requirements */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Verification Requirements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Valid government-issued ID (National ID, Passport, or Driving License)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Educational certificates (Degree, Diploma, or relevant qualifications)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Recent photograph (passport size)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Any teaching certifications (if applicable)</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

