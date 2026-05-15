import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Star, GraduationCap, User } from 'lucide-react';
import { useState } from 'react';

export default function FeedbackCreate({ tutorInstitution, tutorPhotoUrl }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const { flash, auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        feedback: '',
        rating: 5,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tutor.feedback.store'));
    };

    const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    return (
        <AuthenticatedLayout>
            <Head title="Submit Feedback" />

            <div className="py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">

                        {/* Header */}
                        <div className="bg-gradient-to-br from-[#0F48A1] to-blue-500 px-8 py-10 text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Star className="h-8 w-8 text-yellow-300 fill-yellow-300" />
                            </div>
                            <h1 className="text-3xl font-black text-white">Share Your Experience</h1>
                            <p className="text-blue-100 mt-2 text-sm">
                                Your feedback will appear on our landing page after admin approval
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-7">

                            {/* Read-only Profile Preview */}
                            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                                {/* Avatar */}
                                {tutorPhotoUrl ? (
                                    <img
                                        src={tutorPhotoUrl}
                                        alt="Your photo"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-[#0F48A1]/30 shrink-0"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F48A1] to-blue-400 flex items-center justify-center text-white text-2xl font-black shrink-0">
                                        <User className="h-7 w-7" />
                                    </div>
                                )}

                                {/* Name + Institution */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-800 truncate">{auth?.name}</p>
                                    {tutorInstitution ? (
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <GraduationCap className="h-3.5 w-3.5 text-[#0F48A1] shrink-0" />
                                            <p className="text-sm text-slate-500 truncate">{tutorInstitution}</p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                                            <GraduationCap className="h-3 w-3" />
                                            No institution set — add it in your{' '}
                                            <a href="/tutor/profile" className="underline font-medium">profile</a>
                                        </p>
                                    )}
                                </div>

                                {/* Lock badge */}
                                <span className="text-[10px] text-slate-400 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5 shrink-0">
                                    From profile
                                </span>
                            </div>

                            {/* Blocked state — no institution */}
                            {!tutorInstitution && (
                                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center space-y-3">
                                    <GraduationCap className="h-10 w-10 text-amber-400 mx-auto" />
                                    <p className="font-semibold text-amber-800 text-sm">
                                        You need to set your Institution / University in your profile before submitting feedback.
                                    </p>
                                    <a
                                        href="/tutor/profile"
                                        className="inline-flex items-center gap-2 bg-[#0F48A1] hover:bg-[#0F48A1]/90 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
                                    >
                                        Go to Profile →
                                    </a>
                                </div>
                            )}

                            {/* Star Rating — hidden when blocked */}
                            {tutorInstitution && (
                            <div>
                                <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                                    Rate Your Experience
                                </Label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setData('rating', star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transition-transform hover:scale-125"
                                        >
                                            <Star
                                                className={`h-9 w-9 transition-colors ${
                                                    star <= (hoveredRating || data.rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-slate-200 fill-slate-200'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-3 text-base font-bold text-[#0F48A1]">
                                        {ratingLabels[hoveredRating || data.rating]}
                                    </span>
                                </div>
                                {errors.rating && (
                                    <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                                )}
                            </div>
                            )}

                            {/* Feedback Text — hidden when blocked */}
                            {tutorInstitution && (
                            <div>
                                <Label htmlFor="feedback" className="text-sm font-semibold text-slate-700 mb-2 block">
                                    Your Feedback
                                </Label>
                                <Textarea
                                    id="feedback"
                                    value={data.feedback}
                                    onChange={(e) => setData('feedback', e.target.value)}
                                    placeholder="Tell us about your experience as a tutor on our platform..."
                                    rows={5}
                                    className="resize-none rounded-xl"
                                    maxLength={1000}
                                />
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-slate-400">{data.feedback.length}/1000</span>
                                    {errors.feedback && (
                                        <p className="text-red-500 text-xs">{errors.feedback}</p>
                                    )}
                                </div>
                            </div>
                            )}

                            {tutorInstitution && (
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-600">
                                <strong className="text-[#0F48A1]">Note:</strong> Your name, institution, and photo are
                                pulled from your profile and will be displayed alongside your feedback on the site.
                            </div>
                            )}

                            {tutorInstitution && (
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#0F48A1] hover:bg-[#0F48A1]/90 text-white py-6 text-base font-bold rounded-xl"
                            >
                                {processing ? 'Submitting...' : 'Submit Feedback'}
                            </Button>
                            )}
                        </form>
                    </div>

                    {flash?.success && (
                        <div className="mt-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl">
                            <p className="font-semibold">✓ {flash.success}</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
