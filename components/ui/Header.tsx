import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocale } from '../../contexts/LocaleContext';
import Button from './Button';
import Logo from './Logo';
import { Page } from '../../App';

interface HeaderProps {
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const { locale, setLocale, strings } = useLocale();

    const toggleLocale = () => {
        setLocale(locale === 'en' ? 'hi' : 'en');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div onClick={() => onNavigate('home')} className="cursor-pointer">
                        <Logo />
                    </div>
                    <nav className="flex items-center space-x-2 md:space-x-4">
                        <button onClick={() => onNavigate('browseGigs')} className="text-sm font-medium text-gray-600 hover:text-primary-600">Browse Gigs</button>
                        <button onClick={() => onNavigate('browseJobs')} className="text-sm font-medium text-gray-600 hover:text-primary-600">Browse Jobs</button>
                         <div className="border-l h-6 border-gray-300 mx-2"></div>
                        <Button variant="secondary" size="sm" onClick={toggleLocale}>
                            {locale === 'en' ? 'हिंदी' : 'English'}
                        </Button>
                        {isAuthenticated && user ? (
                            <>
                                <Button size="sm" onClick={() => onNavigate('dashboard')}>{strings.dashboard}</Button>
                                <Button variant="secondary" size="sm" onClick={logout}>{strings.logout}</Button>
                            </>
                        ) : (
                            <Button size="sm" onClick={() => onNavigate('login')}>{strings.login}</Button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;