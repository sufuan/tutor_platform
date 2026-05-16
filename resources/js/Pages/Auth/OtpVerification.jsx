import { useState, useRef, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function OtpVerification({ email }) {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef([]);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: email,
        otp: '',
    });

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    useEffect(() => {
        const fullOtp = otpValues.join('');
        setData('otp', fullOtp);
        if (fullOtp.length === 6) {
            clearErrors();
        }
    }, [otpValues]);

    const handleChange = (index, value) => {
        if (isNaN(Number(value))) return;

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && otpValues[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.some(char => isNaN(Number(char)))) return;

        const newOtpValues = [...otpValues];
        pastedData.forEach((char, i) => {
            if (i < 6) newOtpValues[i] = char;
        });
        setOtpValues(newOtpValues);
        
        const focusIndex = Math.min(pastedData.length, 5);
        inputRefs.current[focusIndex].focus();
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.otp.verify'));
    };

    const resendOtp = () => {
        if (timer > 0 || isResending) return;
        
        setIsResending(true);
        router.post(route('verification.otp.resend'), { email }, {
            preserveScroll: true,
            onSuccess: () => {
                setTimer(60);
                setIsResending(false);
            },
            onError: () => setIsResending(false)
        });
    };

    return (
        <GuestLayout>
            <Head title="Verify Email" />

            <div className="flex items-center justify-center min-h-[80vh] px-4 py-12 relative overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

                <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    
                    <CardHeader className="text-center pb-8 pt-10">
                        <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-blue-100">
                            <ShieldCheck size={32} strokeWidth={1.5} />
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">Verify your email</CardTitle>
                        <CardDescription className="text-base mt-2 text-gray-500">
                            We've sent a 6-digit code to <br />
                            <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1">
                                {email}
                            </span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="flex justify-between gap-2 sm:gap-3 mb-8" onPaste={handlePaste}>
                                {otpValues.map((value, index) => (
                                    <input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        type="text"
                                        maxLength={1}
                                        value={value}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${
                                            value 
                                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.15)]' 
                                            : errors.otp 
                                                ? 'border-red-300 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                                                : 'border-gray-200 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_15px_rgba(37,99,235,0.1)] hover:border-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>

                            {errors.otp && (
                                <div className="text-center text-sm font-medium text-red-500 mb-6 bg-red-50 py-2 rounded-lg border border-red-100">
                                    {errors.otp}
                                </div>
                            )}

                            <Button 
                                type="submit" 
                                className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all duration-300"
                                disabled={processing || data.otp.length !== 6}
                            >
                                {processing ? (
                                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Verify Email <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col border-t border-gray-100 bg-gray-50/50 py-6 text-center">
                        <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
                        <button 
                            type="button"
                            onClick={resendOtp}
                            disabled={timer > 0 || isResending}
                            className={`text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                                timer > 0 || isResending
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-blue-600 hover:text-blue-800'
                            }`}
                        >
                            {isResending ? (
                                <><RefreshCw className="w-4 h-4 animate-spin" /> Sending...</>
                            ) : timer > 0 ? (
                                `Resend code in ${timer}s`
                            ) : (
                                <><Mail className="w-4 h-4" /> Resend Code</>
                            )}
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </GuestLayout>
    );
}
