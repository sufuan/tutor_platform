import PublicLayout from '@/Layouts/PublicLayout';
import { CheckCircle, Shield, AlertCircle, Clock } from 'lucide-react';

export default function Terms() {
    return (
        <PublicLayout title="Terms and Conditions">
       

            {/* Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    {/* Section 1: Membership Eligibility */}
                    <div className="mb-12 bg-slate-50 rounded-2xl p-8 border border-slate-200">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#0675C1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                    ১. সদস্যপদ যোগ্যতা
                                </h2>
                                <p className="text-lg text-slate-600 font-semibold">
                                    Membership Eligibility
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none" style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                আমাদের প্ল্যাটফর্ম ব্যবহার করতে হলে আপনাকে অবশ্যই নিচের শর্তগুলো মেনে চলতে হবে:
                            </p>

                            <div className="space-y-4 mt-6">
                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">বয়সসীমা:</h3>
                                        <p className="text-slate-700">
                                            ১৮ বছরের কম বয়সী কেউ সরাসরি অ্যাকাউন্ট খুলতে বা লেনদেন করতে পারবে না। ১৮ বছরের ঊর্ধ্বে কেউ এটি ব্যবহার করতে পারবেন।
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">অভিভাবকের ভূমিকা:</h3>
                                        <p className="text-slate-700">
                                            ১৮ বছরের নিচে কোনো শিক্ষার্থীর জন্য তার বাবা-মা বা আইনগত অভিভাবক অ্যাকাউন্ট খুলতে এবং পরিচালনা করতে পারবেন।
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">তথ্যের সঠিকতা:</h3>
                                        <p className="text-slate-700">
                                            রেজিস্ট্রেশনের সময় আপনাকে অবশ্যই সঠিক, বর্তমান এবং পূর্ণাঙ্গ তথ্য প্রদান করতে হবে।
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">নিরাপত্তা:</h3>
                                        <p className="text-slate-700">
                                            আপনার অ্যাকাউন্টের পাসওয়ার্ড এবং গোপনীয়তা রক্ষার দায়িত্ব সম্পূর্ণ আপনার। তথ্যের কোনো পরিবর্তন হলে তা দ্রুত আপডেট করতে হবে।
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">দায়বদ্ধতা:</h3>
                                        <p className="text-slate-700">
                                            প্ল্যাটফর্মটি ব্যবহারের মাধ্যমে আপনি নিশ্চিত করছেন যে, আমাদের সকল নিয়ম ও শর্তাবলী মেনে চলবেন।
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Applicable Charges */}
                    <div className="mb-12 bg-gradient-to-br from-[#0675C1]/5 to-white rounded-2xl p-8 border border-[#0675C1]/20">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#0675C1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl text-white font-bold">৳</span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                    ২. টিউটরদের জন্য চার্জসমূহ
                                </h2>
                                <p className="text-lg text-slate-600 font-semibold">
                                    Applicable Charges for Tutors
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none" style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                'টিউশন বার্তা'-তে টিউটর অ্যাকাউন্ট খোলা সম্পূর্ণ ফ্রি। তবে সেবার মান এবং নিরাপত্তা নিশ্চিত করতে নিচের চার্জগুলো প্রযোজ্য হবে:
                            </p>

                            <div className="space-y-6 mt-6">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Shield className="h-6 w-6 text-[#0675C1]" />
                                        <h3 className="font-bold text-slate-900 text-xl">ভেরিফিকেশন ফি (একবারই)</h3>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        টিউটর প্রোফাইল যাচাই প্রশ্নিকার জন্য <span className="font-bold text-[#0675C1]">১০০ টাকা</span> একবারী ফি প্রদান করতে হবে। এই ফি অফেরতযোগ্য (Non-refundable)। এটি টিউটরের নির্ভরযোগ্যতা নিশ্চিত করে।
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <AlertCircle className="h-6 w-6 text-[#0675C1]" />
                                        <h3 className="font-bold text-slate-900 text-xl">প্ল্যাটফর্ম চার্জ</h3>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed mb-3">
                                        টিউশন সফলভাবে নিশ্চিত হওয়ার পর, প্রথম মাসের বেতনের <span className="font-bold text-[#0675C1]">৪০% যুক্ত ৫০% পর্যন্ত</span> একবারী প্ল্যাটফর্ম চার্জ প্রদান করতে হবে।
                                    </p>
                                    <div className="bg-[#0675C1]/10 rounded-lg p-4 mt-4">
                                        <div className="flex items-start gap-2">
                                            <Clock className="h-5 w-5 text-[#0675C1] mt-0.5" />
                                            <p className="text-slate-700 text-sm">
                                                এই পেমেন্টটি টিউশন নিশ্চিত হওয়ার <span className="font-bold">৭ দিনের মধ্যে</span> সম্পন্ন করতে হবে। নির্দিষ্ট সময়ের মধ্যে চার্জ পরিশোধ না করলে অ্যাকাউন্ট সাময়িকভাবে বন্ধ (Block) হয়ে যেতে পারে। তবে, ভেরিফাইড টিউটরদের ক্ষেত্রে সময়সীমার বিষয়ে কিছুটা শিথিলতা থাকবে।
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Refund Policy */}
                    <div className="mb-12 bg-slate-50 rounded-2xl p-8 border border-slate-200">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#0675C1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl text-white font-bold">↻</span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                    ৩. রিফান্ড পলিসি
                                </h2>
                                <p className="text-lg text-slate-600 font-semibold">
                                    Refund Policy
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none" style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                অনাকাঙ্ক্ষিত পরিস্থিতিতে টিউটররা নিচের শর্তসাপেক্ষে রিফান্ড বা অর্থ ফেরতের আবেদন করতে পারবেন:
                            </p>

                            <div className="space-y-4 mt-6">
                                <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">১ মাসের মধ্যে বাতিল (বেতন পাওয়ার আগে)</h3>
                                    <p className="text-slate-700">
                                        বেতন পাওয়ার আগে যদি অভিভাবক টিউশন বাতিল করেন, তবে পরিশোধকৃত প্ল্যাটফর্ম চার্জ থেকে <span className="font-bold text-[#0675C1]">৫% সার্ভিস চার্জ</span> কেটে বাকি টাকা ফেরত দেওয়া হবে।
                                    </p>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6">
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">১ মাস পড়ানোর পর বাতিল</h3>
                                    <p className="text-slate-700">
                                        অভিভাবক ঠিক ১ মাস পড়ানোর পর টিউশন বাতিল করলে, প্ল্যাটফর্ম চার্জের <span className="font-bold text-[#0675C1]">৩০% কেটে</span> বাকি টাকা ফেরত দেওয়া হবে।
                                    </p>
                                </div>

                                <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6">
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">২ মাস পড়ানোর পর বাতিল</h3>
                                    <p className="text-slate-700">
                                        যদি ২ মাস পড়ানোর পর টিউশন বাতিল হয়, তবে প্ল্যাটফর্ম চার্জের <span className="font-bold text-[#0675C1]">৭৫% কেটে</span> বাকি টাকা ফেরত দেওয়া হবে।
                                    </p>
                                </div>

                                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">৩ মাস বা তার বেশি</h3>
                                    <p className="text-slate-700">
                                        ৩ মাস বা তার বেশি সময় পড়ানোর পর টিউশন বাতিল হলে <span className="font-bold text-red-600">কোনো রিফান্ড প্রযোজ্য হবে না।</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0675C1] text-white rounded-xl p-6 mt-6">
                                <h3 className="font-bold text-xl mb-4">আবেদনের নিয়ম:</h3>
                                <ol className="space-y-2 list-decimal list-inside">
                                    <li>টিউশন বাতিল হওয়ার <span className="font-bold">৩ দিনের মধ্যেই</span> ই-মেইলের মাধ্যমে আবেদন করতে হবে।</li>
                                    <li>আবেদনের সাথে অভিভাবকের সাথে চ্যাট স্ক্রিনশট বা কল রেকর্ডের স্পষ্ট প্রমাণ সংযুক্ত করতে হবে।</li>
                                    <li>টিউটরের অবহেলা বা অপেশাদার আচরণের কারণে টিউশন বাতিল হলে কোনো রিফান্ড দেওয়া হবে না।</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Guardian's Responsibility */}
                    <div className="mb-12 bg-gradient-to-br from-[#0675C1]/5 to-white rounded-2xl p-8 border border-[#0675C1]/20">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#0675C1] rounded-xl flex items-center justify-center flex-shrink-0">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                    ৪. অভিভাবকদের দায়িত্ব
                                </h2>
                                <p className="text-lg text-slate-600 font-semibold">
                                    Guardian's Responsibility
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none" style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                            <div className="space-y-4 mt-6">
                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">তথ্য যাচাইকরণ:</h3>
                                        <p className="text-slate-700">
                                            চূড়ান্ত নিয়োগের আগে টিউটরের পরিচয়পত্র (NID) এবং শিক্ষাগত যোগ্যতার সনদ নিজ দায়িত্বে যাচাই করে নিন।
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">নিরাপত্তা:</h3>
                                        <p className="text-slate-700">
                                            শিক্ষকের নিরাপত্তা ও সম্মান নিশ্চিত করা অভিভাবকের দায়িত্ব। নারী শিক্ষকদের ক্ষেত্রে পরিবারের সদস্যদের উপস্থিতি বাঞ্ছনীয়।
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">সঠিক তথ্য:</h3>
                                        <p className="text-slate-700">
                                            টিউশন পোস্ট করার সময় স্যালারি, দিন এবং সময় সম্পর্কে সঠিক তথ্য প্রদান করুন।
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">বেতন ও লেনদেন:</h3>
                                        <p className="text-slate-700">
                                            বেতন সরাসরি শিক্ষককে প্রদান করবেন। বেতন সংক্রান্ত জটিলতায় প্ল্যাটফর্ম কর্তৃপক্ষ কোনো দায়দায়ী গ্রহণ করবে না।
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <span className="text-[#0675C1] font-bold text-xl">•</span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">অসদাচরণ:</h3>
                                        <p className="text-slate-700">
                                            শিক্ষকের সাথে কোনো প্রকার অপেশাদার আচরণ বা দুর্ব্যবহার করা যাবে না। অভিযোগ থাকলে আমাদের সরাসরি জানান।
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Box */}
                    <div className="bg-gradient-to-r from-[#0675C1] to-[#0675C1]/80 text-white rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">প্রশ্ন বা সহায়তা প্রয়োজন?</h3>
                        <p className="mb-6 text-white/90">
                            আমাদের সাথে যোগাযোগ করুন এবং আমরা আপনাকে সাহায্য করতে পারব
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="mailto:tuitionbarta@gmail.com" className="text-white hover:text-yellow-300 transition">
                                tuitionbarta@gmail.com
                            </a>
                            <span className="hidden sm:inline">|</span>
                            <a href="tel:+8801818420012" className="text-white hover:text-yellow-300 transition">
                                +880 1818 420012
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

