'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface SearchItem {
    title: string;
    titleEn?: string;
    type: 'page' | 'city' | 'achiever';
    url: string;
    description?: string;
}

// Static search data - combined from all pages
const searchData: SearchItem[] = [
    // Main pages
    { title: 'मुख्य पृष्ठ', titleEn: 'Home', type: 'page', url: '/', description: 'Homepage' },
    { title: 'इतिहास', titleEn: 'History', type: 'page', url: '/history', description: 'लुहाच वंश का इतिहास' },
    { title: 'वंशावली', titleEn: 'Genealogy', type: 'page', url: '/vanshavali', description: 'Family tree' },
    { title: 'गौरव', titleEn: 'Achievers', type: 'page', url: '/achievers', description: 'Notable members' },
    { title: 'गैलरी', titleEn: 'Gallery', type: 'page', url: '/gallery', description: 'Photo gallery' },
    { title: 'हमारे बारे में', titleEn: 'About', type: 'page', url: '/about', description: 'About us' },

    // Cities
    { title: 'नाँधा', titleEn: 'Nandha', type: 'city', url: '/city/%E0%A4%A8%E0%A4%BE%E0%A4%A8%E0%A5%8D%E0%A4%A7%E0%A4%BE', description: 'हरियाणा - चरखी दादरी' },
    { title: 'गिरावड़', titleEn: 'Giraavad', type: 'city', url: '/city/%E0%A4%97%E0%A4%BF%E0%A4%B0%E0%A4%BE%E0%A4%B5%E0%A5%9C', description: 'हरियाणा - रोहतक' },
    { title: 'मोहला', titleEn: 'Mohla', type: 'city', url: '/city/%E0%A4%AE%E0%A5%8B%E0%A4%B9%E0%A4%B2%E0%A4%BE', description: 'हरियाणा - हिसार' },
    { title: 'भड़तज़पुर', titleEn: 'Bhadtazpur', type: 'city', url: '/city/%E0%A4%AD%E0%A4%A1%E0%A4%82%E0%A5%9A%E0%A4%AA%E0%A5%81%E0%A4%B0', description: 'उत्तर प्रदेश' },
    { title: 'नीमली', titleEn: 'Neemli', type: 'city', url: '/city/%E0%A4%A8%E0%A5%80%E0%A4%AE%E0%A4%B2%E0%A5%80', description: 'राजस्थान' },
    { title: 'गुगाहेड़ी', titleEn: 'Gugahedi', type: 'city', url: '/city/%E0%A4%97%E0%A5%81%E0%A4%97%E0%A4%BE%E0%A4%B9%E0%A5%87%E0%A5%9C%E0%A5%80', description: 'हरियाणा' },
    { title: 'मारोत', titleEn: 'Marot', type: 'city', url: '/city/%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A5%8B%E0%A4%A4', description: 'राजस्थान' },
    { title: 'नंगला उग्रसैन', titleEn: 'Nangla Ugrasain', type: 'city', url: '/city/%E0%A4%A8%E0%A4%82%E0%A4%97%E0%A4%B2%E0%A4%BE%20%E0%A4%89%E0%A4%97%E0%A4%B0%E0%A4%B8%E0%A5%88%E0%A4%A8', description: 'उत्तर प्रदेश - मुजफ्फरनगर' },
    { title: 'भंडोली', titleEn: 'Bhandoli', type: 'city', url: '/city/%E0%A4%AD%E0%A4%82%E0%A4%A1%E0%A5%8B%E0%A4%B2%E0%A5%80', description: 'उत्तर प्रदेश' },
    { title: 'नली हुसैनपुर', titleEn: 'Nali Husainpur', type: 'city', url: '/city/%E0%A4%A8%E0%A4%B2%E0%A5%80%20%E0%A4%B9%E0%A5%81%E0%A4%B8%E0%A5%88%E0%A4%A8%E0%A4%AA%E0%A5%81%E0%A4%B0', description: 'उत्तर प्रदेश' },
    { title: 'ज्ञानपुर', titleEn: 'Gyanpur', type: 'city', url: '/city/%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A4%AA%E0%A5%81%E0%A4%B0', description: 'उत्तर प्रदेश' },

    // Achievers
    { title: 'Col. Karmabir Singh Luhach', type: 'achiever', url: '/achievers?q=Karmabir', description: 'Retired Colonel, Indian Army' },
    { title: 'Dr. Vijay Kumar Luhach', type: 'achiever', url: '/achievers?q=Vijay', description: 'Senior Surgeon' },
    { title: 'Prof. Sunil Luhach', type: 'achiever', url: '/achievers?q=Sunil', description: 'Professor, IIT Delhi' },
];

// Fuse options
const fuseOptions = {
    includeScore: true,
    threshold: 0.4,
    keys: ['title', 'titleEn', 'description'],
};

export default function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const fuse = useRef(new Fuse(searchData, fuseOptions));

    // Handle search
    const handleSearch = useCallback((searchQuery: string) => {
        setQuery(searchQuery);
        if (searchQuery.trim().length > 0) {
            const searchResults = fuse.current.search(searchQuery);
            setResults(searchResults.map(r => r.item).slice(0, 8));
        } else {
            setResults([]);
        }
    }, []);

    // Keyboard shortcut (Ctrl/Cmd + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const closeModal = () => {
        setIsOpen(false);
        setQuery('');
        setResults([]);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'page': return '📄';
            case 'city': return '🏘️';
            case 'achiever': return '🏆';
            default: return '📌';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'page': return 'पृष्ठ';
            case 'city': return 'गांव';
            case 'achiever': return 'सदस्य';
            default: return 'Other';
        }
    };

    return (
        <>
            {/* Search Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
                aria-label="Search"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">खोजें...</span>
                <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white dark:bg-slate-600 rounded border border-slate-200 dark:border-slate-500">
                    ⌘K
                </kbd>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="max-w-2xl mx-auto mt-20 bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="खोजें... (Search pages, villages, members)"
                                className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder-slate-400 text-lg"
                            />
                            <button onClick={closeModal} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-96 overflow-y-auto">
                            {results.length > 0 ? (
                                <div className="p-2">
                                    {results.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.url}
                                            onClick={closeModal}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            <span className="text-xl">{getTypeIcon(item.type)}</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-slate-800 dark:text-white truncate hindi-text">
                                                    {item.title}
                                                    {item.titleEn && (
                                                        <span className="text-slate-400 text-sm ml-2">({item.titleEn})</span>
                                                    )}
                                                </div>
                                                {item.description && (
                                                    <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                        {item.description}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-600 rounded text-slate-500 dark:text-slate-400">
                                                {getTypeLabel(item.type)}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            ) : query.length > 0 ? (
                                <div className="p-8 text-center text-slate-500">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p>&quot;{query}&quot; के लिए कोई परिणाम नहीं</p>
                                    <p className="text-sm mt-1">No results found. Try a different search.</p>
                                </div>
                            ) : (
                                <div className="p-4 text-sm text-slate-500 dark:text-slate-400">
                                    <p className="mb-2">कुछ सुझाव (Suggestions):</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['नाँधा', 'History', 'गौरव', 'वंशावली'].map(term => (
                                            <button
                                                key={term}
                                                onClick={() => handleSearch(term)}
                                                className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 flex items-center justify-between">
                            <span>↵ Select • esc Close</span>
                            <span>Powered by Fuse.js</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
