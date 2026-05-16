import { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Upload, FileText, CheckCircle, Clock, XCircle, AlertCircle, X, ShieldCheck, GraduationCap, IdCard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Verification({ auth, tutor, verificationStatus, verificationNotes, rejectionReason }) {
    const { data, setData, post, processing, errors } = useForm({
        nid_card_front: null,
        nid_card_back: null,
        student_id_front: null,
        certificate: null,
        notes: '',
    });

    const [previews, setPreviews] = useState({
        nid_card_front: null,
        nid_card_back: null,
        student_id_front: null,
        certificate: null,
    });

    const { toast } = useToast();

    // Clean up object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            Object.values(previews).forEach(preview => {
                if (preview?.url) URL.revokeObjectURL(preview.url);
            });
        };
    }, [previews]);

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            toast({
                title: "Invalid file type",
                description: "Only PDF, JPG, JPEG, and PNG files are allowed.",
                variant: "destructive",
            });
            e.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast({
                title: "File too large",
                description: "Maximum file size is 5MB.",
                variant: "destructive",
            });
            e.target.value = '';
            return;
        }

        // Update form data
        setData(field, file);

        // Generate preview
        const isImage = file.type.startsWith('image/');
        const url = URL.createObjectURL(file);
        
        setPreviews(prev => ({
            ...prev,
            [field]: {
                name: file.name,
                size: (file.size / 1024).toFixed(2) + ' KB',
                isImage,
                url
            }
        }));
    };

    const removeFile = (field) => {
        setData(field, null);
        
        setPreviews(prev => {
            const newPreviews = { ...prev };
            if (newPreviews[field]?.url) {
                URL.revokeObjectURL(newPreviews[field].url);
            }
            newPreviews[field] = null;
            return newPreviews;
        });
        
        // Reset the input element if it exists
        const input = document.getElementById(field);
        if (input) input.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if all required files are present
        if (!data.nid_card_front || !data.nid_card_back || !data.student_id_front || !data.certificate) {
            toast({
                title: "Missing documents",
                description: "Please upload all required documents before submitting.",
                variant: "destructive",
            });
            return;
        }

        post(route('tutor.verification.submit'));
    };

    const getStatusConfig = () => {
        const configs = {
            unverified: {
                icon: ShieldCheck,
                title: 'Get Verified & Build Trust',
                description: 'Complete your profile verification to unlock premium jobs and increase your chances of being hired by 3x.',
                color: 'text-[#0F48A1]',
                bgColor: 'bg-blue-50',
                borderColor: 'border-[#0F48A1]/20',
                gradient: 'from-[#0F48A1]/10 to-blue-500/10'
            },
            pending: {
                icon: Clock,
                title: 'Verification in Progress',
                description: 'Our team is carefully reviewing your submitted documents. This usually takes 1-2 business days.',
                color: 'text-amber-600',
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200',
                gradient: 'from-amber-500/10 to-orange-500/10'
            },
            verified: {
                icon: CheckCircle,
                title: 'Officially Verified Tutor',
                description: 'Your identity and credentials have been verified. You now have full access to all platform features.',
                color: 'text-emerald-600',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                gradient: 'from-emerald-500/10 to-teal-500/10'
            },
            rejected: {
                icon: XCircle,
                title: 'Verification Requires Attention',
                description: 'We could not verify your profile. Please review the feedback below and upload valid documents.',
                color: 'text-rose-600',
                bgColor: 'bg-rose-50',
                borderColor: 'border-rose-200',
                gradient: 'from-rose-500/10 to-red-500/10'
            },
        };

        return configs[verificationStatus] || configs.unverified;
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    // Custom File Upload Component
    const DocumentUpload = ({ id, label, icon: UploadIcon, description, preview, error }) => (
        <div className="relative flex flex-col group">
            <Label className="text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <UploadIcon className="h-4 w-4 text-[#0F48A1]" />
                    {label} <span className="text-rose-500">*</span>
                </span>
                {preview && <span className="text-xs font-medium text-emerald-600 flex items-center gap-1"><Check className="h-3 w-3"/> Uploaded</span>}
            </Label>
            
            {!preview ? (
                <div className={`
                    relative flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl transition-all duration-300
                    ${error ? 'border-rose-300 bg-rose-50' : 'border-slate-200 bg-slate-50/50 hover:border-[#0F48A1]/50 hover:bg-blue-50/30'}
                `}>
                    <Input
                        id={id}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, id)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-5 w-5 text-slate-400 group-hover:text-[#0F48A1] transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-slate-700 text-center">{description}</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                </div>
            ) : (
                <div className="relative flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white group/preview shadow-sm hover:shadow-md transition-shadow">
                    {preview.isImage ? (
                        <div className="absolute inset-0 bg-slate-100">
                            <img src={preview.url} alt={label} className="w-full h-full object-cover opacity-90 transition-opacity" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50">
                            <FileText className="h-12 w-12 text-blue-500 mb-2" />
                            <span className="text-xs font-medium text-slate-600 px-4 truncate w-full text-center">{preview.name}</span>
                        </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm z-20">
                        <button
                            type="button"
                            onClick={() => removeFile(id)}
                            className="bg-white/20 hover:bg-rose-500 text-white p-3 rounded-full backdrop-blur-md transition-colors shadow-lg"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <p className="text-white text-xs font-medium mt-3">{preview.size}</p>
                    </div>
                </div>
            )}
            {error && <p className="text-xs text-rose-500 mt-1.5 font-medium">{error}</p>}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Identity Verification
                </h2>
            }
        >
            <Head title="Tutor Verification" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Status Banner */}
                    <div className={`relative overflow-hidden rounded-3xl border ${config.borderColor} bg-white shadow-sm`}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-50`} />
                        <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                            <div className={`w-16 h-16 shrink-0 rounded-2xl ${config.bgColor} flex items-center justify-center shadow-inner`}>
                                <Icon className={`h-8 w-8 ${config.color}`} />
                            </div>
                            <div className="text-center sm:text-left flex-1">
                                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{config.title}</h3>
                                <p className="text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
                                    {config.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Feedback */}
                    {(rejectionReason || (verificationStatus === 'verified' && verificationNotes)) && (
                        <Alert className={`${verificationStatus === 'rejected' ? 'border-rose-200 bg-rose-50/50' : 'border-emerald-200 bg-emerald-50/50'} rounded-2xl`}>
                            <AlertCircle className={`h-5 w-5 ${verificationStatus === 'rejected' ? 'text-rose-600' : 'text-emerald-600'}`} />
                            <AlertDescription className="ml-2">
                                <div className="space-y-1">
                                    <p className={`font-bold ${verificationStatus === 'rejected' ? 'text-rose-800' : 'text-emerald-800'}`}>
                                        {verificationStatus === 'rejected' ? 'Action Required:' : 'Reviewer Note:'}
                                    </p>
                                    <p className={`text-sm ${verificationStatus === 'rejected' ? 'text-rose-700' : 'text-emerald-700'} leading-relaxed`}>
                                        {verificationStatus === 'rejected' ? rejectionReason : verificationNotes}
                                    </p>
                                </div>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Verification Form */}
                    {verificationStatus !== 'verified' && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="border-b border-slate-100 p-6 sm:p-8">
                                <h3 className="text-xl font-bold text-slate-800">Required Documents</h3>
                                <p className="text-slate-500 mt-1 text-sm">Please provide high-quality, readable images or PDFs for all 4 items below.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                                
                                {/* Document Upload Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">
                                    
                                    <DocumentUpload 
                                        id="nid_card_front" 
                                        label="NID (Front)" 
                                        icon={IdCard}
                                        description="Front side of NID"
                                        preview={previews.nid_card_front}
                                        error={errors.nid_card_front}
                                    />

                                    <DocumentUpload 
                                        id="nid_card_back" 
                                        label="NID (Back)" 
                                        icon={IdCard}
                                        description="Back side of NID"
                                        preview={previews.nid_card_back}
                                        error={errors.nid_card_back}
                                    />

                                    <DocumentUpload 
                                        id="student_id_front" 
                                        label="Student ID" 
                                        icon={IdCard}
                                        description="University ID Card"
                                        preview={previews.student_id_front}
                                        error={errors.student_id_front}
                                    />

                                    <DocumentUpload 
                                        id="certificate" 
                                        label="Latest Certificate" 
                                        icon={GraduationCap}
                                        description="SSC / HSC / Undergrad cert."
                                        preview={previews.certificate}
                                        error={errors.certificate}
                                    />

                                </div>

                                {/* Additional Notes */}
                                <div className="pt-4 border-t border-slate-100">
                                    <Label htmlFor="notes" className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Additional Context (Optional)
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="E.g., My student ID is expired because I recently graduated, I've attached my provisional certificate..."
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        rows={3}
                                        className="resize-none rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                                    />
                                </div>

                                {/* Submit Section */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                                    <p className="text-sm text-slate-500 flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                        Your documents are securely stored and encrypted.
                                    </p>
                                    <Button 
                                        type="submit" 
                                        disabled={processing || !data.nid_card_front || !data.nid_card_back || !data.student_id_front || !data.certificate}
                                        className="w-full sm:w-auto bg-[#0F48A1] hover:bg-[#0F48A1]/90 text-white px-8 py-6 rounded-xl font-bold text-base shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                                    >
                                        {processing ? 'Uploading Documents...' : verificationStatus === 'rejected' ? 'Resubmit For Review' : 'Submit Application'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
