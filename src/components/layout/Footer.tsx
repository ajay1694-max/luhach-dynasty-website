import Link from 'next/link';

interface FooterProps {
    locale?: 'hi' | 'en';
}

export function Footer({ locale = 'hi' }: FooterProps) {
    return (
        <footer className="bg-[#1e3a8a] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white p-2 rounded-full">
                                <svg className="w-6 h-6 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold hindi-text">लुहाच परिवार</h3>
                        </div>
                        <p className="text-blue-200 text-sm mb-4 leading-relaxed hindi-text">
                            {locale === 'hi'
                                ? 'समाज को एक सूत्र में पिरोने और अपनी संस्कृति को संरक्षित करने का एक विनम्र प्रयास।'
                                : 'A humble effort to unite the community and preserve our culture.'}
                        </p>
                        <div className="flex space-x-3">
                            <a
                                className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center hover:bg-[#f59e0b] transition-colors"
                                href="#"
                                aria-label="Twitter"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center hover:bg-[#f59e0b] transition-colors"
                                href="#"
                                aria-label="Facebook"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center hover:bg-[#f59e0b] transition-colors"
                                href="#"
                                aria-label="Instagram"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2 inline-block hindi-text">
                            {locale === 'hi' ? 'महत्वपूर्ण लिंक' : 'Important Links'}
                        </h4>
                        <ul className="space-y-2 text-sm text-blue-200">
                            <li>
                                <Link className="hover:text-white transition-colors flex items-center" href="/">
                                    <span className="text-[#f59e0b] mr-2">›</span>
                                    {locale === 'hi' ? 'मुख्य पृष्ठ (Home)' : 'Home'}
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors flex items-center" href="/about">
                                    <span className="text-[#f59e0b] mr-2">›</span>
                                    {locale === 'hi' ? 'हमारे बारे में (About)' : 'About Us'}
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors flex items-center" href="/vanshavali">
                                    <span className="text-[#f59e0b] mr-2">›</span>
                                    {locale === 'hi' ? 'वंशावली (Genealogy)' : 'Genealogy'}
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors flex items-center" href="/gallery">
                                    <span className="text-[#f59e0b] mr-2">›</span>
                                    {locale === 'hi' ? 'गैलरी (Gallery)' : 'Gallery'}
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors flex items-center" href="/achievers">
                                    <span className="text-[#f59e0b] mr-2">›</span>
                                    {locale === 'hi' ? 'गौरव (Achievers)' : 'Achievers'}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2 inline-block hindi-text">
                            {locale === 'hi' ? 'संपर्क सूत्र' : 'Contact Information'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-200">
                            <div className="flex items-start">
                                <svg className="w-4 h-4 mt-1 mr-3 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <span className="block text-white font-medium">
                                        {locale === 'hi' ? 'हेल्पलाइन नंबर' : 'Helpline Number'}
                                    </span>
                                    <a className="block hover:text-white" href="tel:+919354890524">+91 9354890524</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg className="w-4 h-4 mt-1 mr-3 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <span className="block text-white font-medium">
                                        {locale === 'hi' ? 'वैकल्पिक नंबर' : 'Alternate Number'}
                                    </span>
                                    <a className="block hover:text-white" href="tel:+917053839972">+91 7053839972</a>
                                </div>
                            </div>
                            <div className="flex items-start sm:col-span-2">
                                <svg className="w-4 h-4 mt-1 mr-3 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <span className="block text-white font-medium">
                                        {locale === 'hi' ? 'ईमेल' : 'Email'}
                                    </span>
                                    <a className="block hover:text-white" href="mailto:info@luhachparivar.com">info@luhachparivar.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-blue-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
                    <p>© {new Date().getFullYear()} {locale === 'hi' ? 'लुहाच परिवार' : 'Luhach Parivar'}. All Rights Reserved.</p>
                    <div className="mt-2 md:mt-0">
                        <span className="mr-2">Designed with ❤️ for the Community</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
