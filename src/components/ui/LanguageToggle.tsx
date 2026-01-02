'use client';

import { useState, useCallback } from 'react';

type Locale = 'hi' | 'en';

interface LanguageToggleProps {
    locale?: Locale;
    onLocaleChange?: (locale: Locale) => void;
}

export function LanguageToggle({ locale: controlledLocale, onLocaleChange }: LanguageToggleProps) {
    const [internalLocale, setInternalLocale] = useState<Locale>('hi');

    const locale = controlledLocale ?? internalLocale;

    const handleToggle = useCallback(() => {
        const newLocale: Locale = locale === 'hi' ? 'en' : 'hi';
        setInternalLocale(newLocale);
        onLocaleChange?.(newLocale);
    }, [locale, onLocaleChange]);

    return (
        <button
            onClick={handleToggle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus-ring text-sm font-medium"
            aria-label={`Switch to ${locale === 'hi' ? 'English' : 'Hindi'}`}
        >
            <span
                className={`px-2 py-0.5 rounded-full transition-colors ${locale === 'hi'
                        ? 'bg-primary text-white'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
            >
                हिं
            </span>
            <span className="text-slate-300 dark:text-slate-500">|</span>
            <span
                className={`px-2 py-0.5 rounded-full transition-colors ${locale === 'en'
                        ? 'bg-primary text-white'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
            >
                EN
            </span>
        </button>
    );
}
