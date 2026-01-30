import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Star } from 'lucide-react';
import { useState } from 'react';

export default function FeedbackCreate({ auth }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const { flash } = usePage().props;
    
    const { data, setData, post, processing, errors } = useForm({
        feedback: '',
        rating: 5,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tutor.feedback.store'), {
            onSuccess: () => {
                // Form will be reset automatically by Inertia
            },
        });
    };

    const handleRatingClick = (rating) => {
        setData('rating', rating);
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Submit Feedback" />

            <div className="py-6">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-[#0F48A1] to-blue-600 px-6 py-8">
                            <h1 className="text-3xl font-bold text-white">Share Your Experience</h1>
                            <p className="text-blue-100 mt-2">
                                Your feedback helps us improve our platform and helps other tutors join our community
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <Label htmlFor="rating" className="text-lg font-semibold text-gray-900">
                                    Rate Your Experience
                                </Label>
                                <div className="flex items-center gap-2 mt-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRatingClick(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`h-10 w-10 transition-colors ${
                                                    star <= (hoveredRating || data.rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-4 text-xl font-semibold text-[#0F48A1]">
                                        {data.rating} / 5
                                    </span>
                                </div>
                                {errors.rating && (
                                    <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="feedback" className="text-lg font-semibold text-gray-900">
                                    Your Feedback
                                </Label>
                                <Textarea
                                    id="feedback"
                                    value={data.feedback}
                                    onChange={(e) => setData('feedback', e.target.value)}
                                    placeholder="Tell us about your experience as a tutor on our platform. What do you like? What could we improve?"
                                    rows={6}
                                    className="mt-3 resize-none"
                                    maxLength={1000}
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-sm text-gray-500">
                                        {data.feedback.length} / 1000 characters
                                    </p>
                                    {errors.feedback && (
                                        <p className="text-red-500 text-sm">{errors.feedback}</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-[#0F48A1] p-4 rounded">
                                <p className="text-sm text-gray-700">
                                    <strong>Note:</strong> Your feedback will be reviewed by our admin team before being published on the website. This helps us maintain quality and authenticity.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-[#0F48A1] hover:bg-blue-700 text-lg py-6"
                                >
                                    {processing ? 'Submitting...' : 'Submit Feedback'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Success Message */}
                    {flash?.success && (
                        <div className="mt-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg">
                            <p className="font-semibold">✓ {flash.success}</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


