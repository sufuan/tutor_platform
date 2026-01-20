import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        'For Guardians': [
            { name: 'Post a Job', href: '/guardian/post-job' },
            { name: 'Find Tutors', href: '/tutors' },
            { name: 'How It Works', href: '/how-it-works#guardians' },
            { name: 'Pricing', href: '/pricing' },
        ],
        'For Tutors': [
            { name: 'Find Jobs', href: '/jobs' },
            { name: 'Create Profile', href: '/register?role=tutor' },
            { name: 'How It Works', href: '/how-it-works#tutors' },
            { name: 'Success Stories', href: '/success-stories' },
        ],
        Company: [
            { name: 'About Us', href: '/about' },
            { name: 'Contact', href: '/contact' },
            { name: 'Blog', href: '/blog' },
            { name: 'Careers', href: '/careers' },
        ],
        Legal: [
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Cookie Policy', href: '/cookies' },
            { name: 'Refund Policy', href: '/refund' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com/caretutors', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com/caretutors', label: 'Twitter' },
        { icon: Linkedin, href: 'https://linkedin.com/company/caretutors', label: 'LinkedIn' },
        { icon: Youtube, href: 'https://youtube.com/caretutors', label: 'YouTube' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="bg-primary-blue rounded-lg p-2">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold font-heading text-white">CareTutors</span>
                        </Link>
                        <p className="text-sm mb-4">
                            Bangladesh's most trusted platform connecting guardians with qualified tutors. Quality education starts here.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4 text-accent-yellow" />
                                <span>info@caretutors.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-4 w-4 text-accent-yellow" />
                                <span>+880 1XXX-XXXXXX</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-accent-yellow" />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-white font-semibold mb-4">{category}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm hover:text-accent-yellow transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm">
                            © {currentYear} CareTutors. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-gray-800 hover:bg-primary-blue transition-colors"
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
