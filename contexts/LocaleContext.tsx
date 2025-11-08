
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { STRINGS } from '../constants';

type Locale = 'en' | 'hi';

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    strings: typeof STRINGS.en;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Locale>('en');

    const strings = useMemo(() => STRINGS[locale], [locale]);

    return (
        <LocaleContext.Provider value={{ locale, setLocale, strings }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = () => {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
};
