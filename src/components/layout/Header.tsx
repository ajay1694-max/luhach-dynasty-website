'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import GlobalSearch from '@/components/ui/GlobalSearch';

interface NavItem {
    href: string;
    labelHi: string;
    labelEn: string;
}

const navItems: NavItem[] = [
    { href: '/', labelHi: 'मुख्य पृष्ठ', labelEn: 'Home' },
    { href: '/about', labelHi: 'हमारे बारे में', labelEn: 'About' },
    { href: '/vanshavali', labelHi: 'वंशावली', labelEn: 'Genealogy' },
    { href: '/city', labelHi: 'गांव', labelEn: 'Villages' },
    { href: '/history', labelHi: 'इतिहास', labelEn: 'History' },
    { href: '/achievers', labelHi: 'गौरव', labelEn: 'Achievers' },
    { href: '/gallery', labelHi: 'गैलरी', labelEn: 'Gallery' },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [locale, setLocale] = useState<'hi' | 'en'>('hi');

    return (
        <>
            {/* Top Bar */}
            <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs md:text-sm py-2 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="flex items-center space-x-4">
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">
                            {locale === 'hi' ? 'हेल्पलाइन नंबर:' : 'Helpline:'}
                        </span>
                        <a className="hover:text-[#1e3a8a] dark:hover:text-[#f59e0b] transition-colors" href="tel:+919354890524">
                            +91 9354890524
                        </a>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <a className="hover:text-[#1e3a8a] dark:hover:text-[#f59e0b] transition-colors" href="tel:+917053839972">
                            +91 7053839972
                        </a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <a className="text-slate-500 hover:text-[#1DA1F2] dark:text-slate-400 transition-colors" href="#" aria-label="Twitter">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a className="text-slate-500 hover:text-[#4267B2] dark:text-slate-400 transition-colors" href="#" aria-label="Facebook">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a className="text-slate-500 hover:text-[#E1306C] dark:text-slate-400 transition-colors" href="#" aria-label="Instagram">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a className="text-slate-500 hover:text-[#FF0000] dark:text-slate-400 transition-colors" href="#" aria-label="YouTube">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white dark:bg-[#1e293b] shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center gap-3">
                            <div className="bg-[#f59e0b]/10 p-2 rounded-full">
                                <svg className="w-8 h-8 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-[#1e3a8a] dark:text-white leading-none hindi-text">
                                    लुहाच परिवार
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 tracking-wider">
                                    Luhach Family
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${index === 0
                                        ? 'bg-[#1e3a8a] text-white'
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {locale === 'hi' ? item.labelHi : item.labelEn}
                                </Link>
                            ))}
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-3">
                            <GlobalSearch />
                            <LanguageToggle locale={locale} onLocaleChange={setLocale} />
                            <ThemeToggle />

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden text-slate-600 dark:text-slate-200 hover:text-[#1e3a8a] focus:outline-none p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-700">
                        <div className="px-4 py-3 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {locale === 'hi' ? item.labelHi : item.labelEn}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* News Ticker */}
            <div className="bg-[#1e3a8a] text-white py-2 border-b-4 border-[#f59e0b] overflow-hidden relative">
                <div className="max-w-7xl mx-auto flex items-center">
                    <div className="bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded ml-2 z-10 whitespace-nowrap shadow-lg">
                        {locale === 'hi' ? 'ताज़ा खबर' : 'News'}
                    </div>
                    <div className="news-ticker-container flex-1 ml-4 text-sm font-medium">
                        <div className="news-ticker-content">
                            <span className="mx-4">🛑 {locale === 'hi' ? 'वंशावली अपडेट: कृपया सभी सदस्य अपनी जानकारी जल्द जमा करें।' : 'Genealogy Update: Please submit your information soon.'}</span>
                            <span className="mx-4">🛑 {locale === 'hi' ? 'शहीद दादा बरदेशराम का इतिहास पढ़ने के लिए यहाँ क्लिक करें।' : 'Click here to read about Martyr Dada Bardeshram.'}</span>
                            <span className="mx-4">🛑 {locale === 'hi' ? 'लुहाच परिवार मिलन समारोह की तस्वीरें गैलरी में देखें।' : 'View Luhach Family reunion photos in the gallery.'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
