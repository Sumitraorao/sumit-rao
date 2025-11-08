
import React from 'react';
import { useLocale } from '../../contexts/LocaleContext';
import Logo from './Logo';

const Footer: React.FC = () => {
    const { strings } = useLocale();
    const footerLinks = {
        'For Clients': ['How to Hire', 'Post a Job', 'Talent Marketplace'],
        'For Freelancers': ['How to Earn Money', 'Find a Job', 'Create a Gig'],
        'Company': ['About Us', 'Careers', 'Contact Us'],
    }
    
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-semibold mb-4">{title}</h4>
                            <ul className="space-y-2">
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-4 sm:mb-0">
                         <Logo />
                    </div>
                    <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} {strings.appName}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
