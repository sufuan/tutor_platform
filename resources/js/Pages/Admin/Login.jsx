import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Checkbox } from '@/Components/ui/checkbox';
import { Head, useForm } from '@inertiajs/react';
import { Shield, ArrowRight } from 'lucide-react';

export default function AdminLogin({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.store'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Admin Login" />
            
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="w-full max-w-md p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="h-16 w-16 bg-red-600 rounded-xl flex items-center justify-center shadow-xl">
                                <Shield className="h-10 w-10 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
                        <p className="mt-2 text-gray-400">Secure access for administrators only</p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-4 bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    {/* Login Form */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                                    Admin Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@Tuition Barta.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="h-12 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500"
                                    required
                                />
                                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="h-12 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500"
                                    required
                                />
                                {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked)}
                                    className="border-slate-600"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                                    Keep me signed in
                                </label>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing} 
                                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold"
                            >
                                {processing ? 'Signing in...' : 'Sign in to Admin Panel'}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </form>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            🔒 This is a secure area. All activities are logged.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}


