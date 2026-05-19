import { Link, usePage } from '@inertiajs/react';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();
    const { footerSettings } = usePage().props;

    const socialLinks = [
        { icon: Facebook, href: footerSettings?.social_facebook || 'https://facebook.com/tuitionbarta', label: 'Facebook' },
        { icon: Linkedin, href: footerSettings?.social_linkedin || 'https://linkedin.com/company/tuitionbarta', label: 'LinkedIn' },
        { icon: Twitter, href: footerSettings?.social_twitter || 'https://x.com/tuitionbarta', label: 'X (Twitter)' },
        { icon: Youtube, href: footerSettings?.social_youtube || 'https://youtube.com/@tuitionbarta', label: 'YouTube' },
        { icon: MessageCircle, href: footerSettings?.social_whatsapp || 'https://wa.me/8801818420012', label: 'WhatsApp' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                {/* Top Section: Logo & Story on left, Links & Contact on right */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
                    {/* Our Story Column - Takes more space on larger screens */}
                    <div className="xl:col-span-6 flex flex-col">
                        {/* Logo */}
                        <Link href="/" className="inline-block mb-4 sm:mb-6">
                            <img
                                src="/assets/logo_white.png"
                                alt="Tuition Barta Logo"
                                className="h-14 sm:h-16 lg:h-20 w-auto"
                            />
                        </Link>

                        {/* Story Box */}
                        <div className="flex-1 bg-gray-800/60 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-l-4 border-l-[#0F48A1]">
                            <h3 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                                <span className="inline-block w-1 sm:w-1.5 h-4 sm:h-5 bg-[#0F48A1] rounded-full"></span>
                                Our Story
                            </h3>
                            <p
                                className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300 mb-2 sm:mb-3"
                                style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}
                            >
                                'টিউশন বার্তা' হলো সমগ্র বাংলাদেশব্যাপী নির্ভরযোগ্য শিক্ষক খোঁজার একটি আধুনিক প্ল্যাটফর্ম। কুমিল্লা বিশ্ববিদ্যালয়ের (কুবি) দুইজন উদ্যোমী ছাত্রের হাত ধরে ২০২৫ সালে এটি প্রতিষ্ঠিত হয়। আমাদের মূল লক্ষ্য হলো ছাত্র-ছাত্রীদের জন্য দক্ষ ও অভিজ্ঞ শিক্ষক নিশ্চিত করা এবং যোগ্য শিক্ষকদের কাছে সহজে টিউশন পৌঁছে দেওয়া।
                            </p>
                            <p
                                className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-400"
                                style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}
                            >
                                ২০২৫ সাল থেকে সততা, নিষ্ঠা এবং বিশ্বাসের সাথে সেবা প্রদান করে ‘টিউশন বার্তা’ আজ শিক্ষার্থী ও অভিভাবকদের আস্থার এক অনন্য নাম। আমরা বিশ্বাস করি, সঠিক শিক্ষকের নির্দেশনাই পারে একজন শিক্ষার্থীর মেধার পূর্ণ বিকাশ ঘটাতে।
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Links & Contact in responsive grid */}
                    <div className="xl:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        {/* Useful Links Column */}
                        <div>
                            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">Useful Links</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li>
                                    <Link href="/terms" className="text-sm hover:text-[#0F48A1] transition-colors inline-flex items-center gap-1 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#0F48A1] transition-all duration-200"></span>
                                        Terms and Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/tutor/signup" className="text-sm hover:text-[#0F48A1] transition-colors inline-flex items-center gap-1 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#0F48A1] transition-all duration-200"></span>
                                        Become a Tutor
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/jobs" className="text-sm hover:text-[#0F48A1] transition-colors inline-flex items-center gap-1 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#0F48A1] transition-all duration-200"></span>
                                        Hire a Tutor
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-sm hover:text-[#0F48A1] transition-colors inline-flex items-center gap-1 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-[#0F48A1] transition-all duration-200"></span>
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Information Column */}
                        <div>
                            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">{footerSettings?.contact_title || 'Contact Us'}</h3>
                            <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-200">
                                {footerSettings?.contact_description || 'Have any questions or need a tutor? We are here to help!'}
                            </p>
                            <div className="space-y-2.5 sm:space-y-3">
                                <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F48A1] mt-0.5 flex-shrink-0" />
                                    <span className="break-words">{footerSettings?.contact_address || 'Salmanpur, Kotbari, Comilla, Bangladesh'}</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F48A1] flex-shrink-0" />
                                    <a href={`tel:${footerSettings?.contact_phone?.replace(/\s/g, '') || '+8801818420012'}`} className="hover:text-[#0F48A1] transition-colors">
                                        {footerSettings?.contact_phone || '+880 1818 420012'}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F48A1] flex-shrink-0" />
                                    <a href={`mailto:${footerSettings?.contact_email || 'tuitionbarta@gmail.com'}`} className="hover:text-[#0F48A1] transition-colors break-all">
                                        {footerSettings?.contact_email || 'tuitionbarta@gmail.com'}
                                    </a>
                                </div>
                                <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F48A1] mt-0.5 flex-shrink-0" />
                                    <span>{footerSettings?.contact_hours || 'Sat - Thu, 10:00 AM - 8:00 PM'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links & Copyright */}
                <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                        <p className="text-xs sm:text-sm text-gray-400 order-2 sm:order-1">
                            © {currentYear} Tuition Barta. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 sm:p-2.5 rounded-full bg-gray-800 hover:bg-[#0F48A1] transition-all duration-200 hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

