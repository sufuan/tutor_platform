import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Upload, FileText, CheckCircle, Clock, XCircle, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Verification({ auth, tutor, verificationStatus, verificationNotes, rejectionReason }) {
    const { data, setData, post, processing, errors } = useForm({
        documents: null,
        notes: '',
    });

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const { toast } = useToast();
    const MAX_FILES = 3;

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);

        // Get existing files
        const existingFiles = data.documents ? Array.from(data.documents) : [];

        // Combine existing and new files
        const allFiles = [...existingFiles, ...newFiles];

        // Check if total files exceed max limit
        if (allFiles.length > MAX_FILES) {
            toast({
                title: "Too many files",
                description: `You can only upload a maximum of ${MAX_FILES} files. You currently have ${existingFiles.length} file(s).`,
                variant: "destructive",
            });
            e.target.value = ''; // Reset input
            return;
        }

        // Validate file types for new files only
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        const invalidFiles = newFiles.filter(file => !validTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            toast({
                title: "Invalid file type",
                description: "Only PDF, JPG, JPEG, and PNG files are allowed.",
                variant: "destructive",
            });
            e.target.value = ''; // Reset input
            return;
        }

        // Update with all files
        setData('documents', allFiles);
        setUploadedFiles(allFiles.map(f => ({ name: f.name, size: f.size })));

        // Reset input so same file can be selected again if needed
        e.target.value = '';
    };

    const removeFile = (index) => {
        const newFiles = Array.from(data.documents).filter((_, i) => i !== index);
        setData('documents', newFiles.length > 0 ? newFiles : null);
        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
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
                                            Please upload clear, readable copies of your documents. Maximum {MAX_FILES} files. Supported formats: PDF, JPG, JPEG, PNG (Max 5MB each)
                                        </AlertDescription>
                                    </Alert>

                                    <div className="space-y-2">
                                        <Label htmlFor="documents">
                                            Upload Documents *
                                            <span className="text-xs text-gray-500 ml-2">
                                                ({uploadedFiles.length}/{MAX_FILES} files)
                                            </span>
                                        </Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                            <Input
                                                id="documents"
                                                type="file"
                                                multiple
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                disabled={uploadedFiles.length >= MAX_FILES}
                                            />
                                            <label
                                                htmlFor="documents"
                                                className={`cursor-pointer ${uploadedFiles.length >= MAX_FILES ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-sm text-gray-600 mb-1">
                                                    {uploadedFiles.length >= MAX_FILES
                                                        ? `Maximum ${MAX_FILES} files reached`
                                                        : 'Click to upload or drag and drop'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PDF, JPG, JPEG, PNG up to 5MB each
                                                </p>
                                            </label>
                                        </div>
                                        {uploadedFiles.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {uploadedFiles.map((file, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                        <div className="flex items-center space-x-3 flex-1">
                                                            <FileText className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm text-gray-700 font-medium truncate">{file.name}</p>
                                                                <p className="text-xs text-gray-500">
                                                                    {(file.size / 1024).toFixed(2)} KB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFile(idx)}
                                                            className="ml-2 p-1 hover:bg-red-100 rounded-full transition-colors"
                                                            title="Remove file"
                                                        >
                                                            <X className="h-4 w-4 text-red-600" />
                                                        </button>
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

