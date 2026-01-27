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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Our Story Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <img 
                                src="/assets/logo.png" 
                                alt="Tuition Barta Logo" 
                                className="h-20 w-auto"
                            />
                        </Link>
                        <h3 className="text-white font-bold text-xl mb-4">Our Story</h3>
                        <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                            'টিউশন বার্তা' হলো সমগ্র বাংলাদেশব্যাপী নির্ভরযোগ্য শিক্ষক খোঁজার একটি আধুনিক প্ল্যাটফর্ম। কুমিল্লা বিশ্ববিদ্যালয়ের (কুবি) দুইজন উদ্যোমী ছাত্রের হাত ধরে ২০২৪ সালে এটি প্রতিষ্ঠিত হয়। আমাদের মূল লক্ষ্য হলো ছাত্র-ছাত্রীদের জন্য দক্ষ ও অভিজ্ঞ শিক্ষক নিশ্চিত করা এবং যোগ্য শিক্ষকদের কাছে সহজে টিউশন পৌঁছে দেওয়া।
                        </p>
                        <p className="text-sm leading-relaxed">
                            বিগত এক বছর ধরে সততা, নিষ্ঠা এবং বিশ্বাসের সাথে সেবা প্রদান করে 'টিউশন বার্তা' আজ শিক্ষার্থী ও অভিভাবকদের আস্থার এক অনন্য নাম। আমরা বিশ্বাস করি, সঠিক শিক্ষকের নির্দেশনাই পারে একজন শিক্ষার্থীর মেধার পূর্ণ বিকাশ ঘটাতে।
                        </p>
                    </div>

                    {/* Useful Links Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Useful Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terms" className="text-sm hover:text-[#0675C1] transition-colors">
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutor/signup" className="text-sm hover:text-[#0675C1] transition-colors">
                                    Become a Tutor
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" className="text-sm hover:text-[#0675C1] transition-colors">
                                    Hire a Tutor
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm hover:text-[#0675C1] transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">{footerSettings?.contact_title || 'Contact Us'}</h3>
                        <p className="text-sm mb-4 text-white">
                            {footerSettings?.contact_description || 'Have any questions or need a tutor? We are here to help!'}
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-2 text-sm">
                                <MapPin className="h-5 w-5 text-[#0675C1] mt-0.5 flex-shrink-0" />
                                <span>{footerSettings?.contact_address || 'Salmanpur, Kotbari, Comilla, Bangladesh'}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-5 w-5 text-[#0675C1]" />
                                <a href={`tel:${footerSettings?.contact_phone?.replace(/\s/g, '') || '+8801818420012'}`} className="hover:text-[#0675C1] transition-colors">
                                    {footerSettings?.contact_phone || '+880 1818 420012'}
                                </a>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-5 w-5 text-[#0675C1]" />
                                <a href={`mailto:${footerSettings?.contact_email || 'tuitionbarta@gmail.com'}`} className="hover:text-[#0675C1] transition-colors">
                                    {footerSettings?.contact_email || 'tuitionbarta@gmail.com'}
                                </a>
                            </div>
                            <div className="flex items-start space-x-2 text-sm">
                                <Clock className="h-5 w-5 text-[#0675C1] mt-0.5" />
                                <span>{footerSettings?.contact_hours || 'Sat - Thu, 10:00 AM - 8:00 PM'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links & Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm">
                            © {currentYear} Tuition Barta. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-800 hover:bg-[#0675C1] transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
