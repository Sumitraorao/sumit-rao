
import React from 'react';
import { useLocale } from '../../contexts/LocaleContext';

const Logo: React.FC = () => {
    const { strings } = useLocale();
    return (
        <a href="#" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">{strings.appName}</span>
        </a>
    );
};

export default Logo;
