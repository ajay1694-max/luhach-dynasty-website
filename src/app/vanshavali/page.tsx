'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample village data - would normally be loaded from the CSV
const villageData = [
    { state: 'हरियाणा', stateEn: 'Haryana', villages: ['नांधा', 'रिटोली', 'मदीना', 'खेड़ी मेहम', 'भड़ाना', 'गुड़हेड़ी', 'नंगला', 'कांगड़'] },
    { state: 'उत्तर प्रदेश', stateEn: 'Uttar Pradesh', villages: ['सहारनपुर', 'मुजफ्फरनगर', 'बुलंदशहर', 'मेरठ', 'शामली'] },
    { state: 'राजस्थान', stateEn: 'Rajasthan', villages: ['झुंझुनू', 'सीकर', 'जयपुर', 'अलवर'] },
];

// Sample tree data structure
const familyTreePreview = {
    name: 'लाल सिंह लुहाच',
    nameEn: 'Lal Singh Luhach',
    generation: 1,
    children: [
        {
            name: 'रामबीर सिंह',
            generation: 2,
            children: [
                { name: 'सत्यबीर सिंह', generation: 3, children: [] },
                { name: 'धर्मबीर सिंह', generation: 3, children: [] },
            ]
        },
        {
            name: 'सोमबीर सिंह',
            generation: 2,
            children: [
                { name: 'करमबीर सिंह', generation: 3, children: [] },
            ]
        },
    ]
};

export default function VanshavaliPage() {
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white to-blue-50 border-b border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e3a8a] hindi-text">वंशावली (Genealogy)</h1>
                    <p className="text-xl text-slate-600">Trace your roots and explore the Luhach Family tree</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-[#1e3a8a] transition-colors">मुख्य पृष्ठ</Link>
                        <span>›</span>
                        <span className="text-[#1e3a8a] font-medium">वंशावली</span>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#f59e0b]">10,000+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 hindi-text">कुल सदस्य</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#f59e0b]">46</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 hindi-text">गांव</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#f59e0b]">40+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 hindi-text">पीढ़ियां</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#f59e0b]">3</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 hindi-text">राज्य</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Family Tree Section */}
                <div className="w-full">
                    <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-[#1e3a8a] dark:text-white hindi-text">
                                वंश वृक्ष (Family Tree)
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        const iframe = document.querySelector('iframe');
                                        if (iframe) iframe.requestFullscreen();
                                    }}
                                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
                                    title="Fullscreen"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                    Fullscreen
                                </button>
                            </div>
                        </div>

                        {/* Interactive Visualiser App */}
                        <div className="w-full rounded-lg overflow-hidden border border-slate-200 shadow-inner bg-slate-50 relative group" style={{ height: '850px' }}>
                            <iframe
                                src="/visualiser/index.html"
                                className="w-full h-full border-0"
                                title="Luhach Vanshavali Visualiser"
                                allow="fullscreen"
                            />

                            {/* Overlay button for direct access */}
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a
                                    href="/visualiser/index.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#1e3a8a] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Open Full Page
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-slate-500 text-sm">
                                हमारा नया इंटरैक्टिव वंशावली विज़ुअलाइज़र (10,061 प्रविष्टियां) लाइव है। आप इसे ऊपर सीधे इस्तेमाल कर सकते हैं।
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
