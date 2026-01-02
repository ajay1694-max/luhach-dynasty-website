'use client';

import { useState } from 'react';
import Link from 'next/link';

// Actual gallery data from assets
const galleryItems = [
    { id: 1, title: 'लुहाच मिलन समारोह 2021', titleEn: 'Luhach Reunion 2021', category: 'events', year: '2021', image: '/images/asset_1767152786130_245.jpeg' },
    { id: 2, title: 'कुलदेवी मंदिर', titleEn: 'Kuldevi Temple', category: 'religious', year: '2020', image: '/images/asset_1767153109876_694.jpg' },
    { id: 3, title: 'नांधा गांव स्वागत द्वार', titleEn: 'Nandha Village Entrance', category: 'villages', year: '2022', image: '/images/asset_1767152820785_802.jpg' },
    { id: 4, title: 'समारोह हवन', titleEn: 'Reunion Yagya', category: 'events', year: '2021', image: '/images/asset_1767152834079_208.jpg' },
    { id: 5, title: 'धार्मिक शोभा यात्रा', titleEn: 'Religious Procession', category: 'religious', year: '2021', image: '/images/asset_1767152868080_152.jpg' },
    { id: 6, title: 'परिवार सम्मेलन', titleEn: 'Family Gathering', category: 'family', year: '2022', image: '/images/asset_1767153116591_824.jpg' },
    { id: 7, title: 'गाँव का पुराना दृश्य', titleEn: 'Old Village View', category: 'villages', year: '1990', image: '/images/asset_1767152837585_51.jpg' },
    { id: 8, title: 'सम्मान समारोह', titleEn: 'Award Ceremony', category: 'events', year: '2023', image: '/images/asset_1767153199168_290.jpg' },
    { id: 9, title: 'मंदिर निर्माण', titleEn: 'Temple Construction', category: 'religious', year: '2019', image: '/images/asset_1767152878512_391.jpg' },
];

const categories = [
    { key: 'all', labelHi: 'सभी', labelEn: 'All' },
    { key: 'events', labelHi: 'कार्यक्रम', labelEn: 'Events' },
    { key: 'religious', labelHi: 'धार्मिक', labelEn: 'Religious' },
    { key: 'villages', labelHi: 'गांव', labelEn: 'Villages' },
    { key: 'family', labelHi: 'परिवार', labelEn: 'Family' },
];

export default function GalleryPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredItems = galleryItems.filter(
        item => selectedCategory === 'all' || item.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white to-blue-50 border-b border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e3a8a] hindi-text">गैलरी (Gallery)</h1>
                    <p className="text-xl text-slate-600">Capturing the Moments &amp; Heritage of Luhach Family</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-[#1e3a8a] transition-colors">मुख्य पृष्ठ</Link>
                        <span>›</span>
                        <span className="text-[#1e3a8a] font-medium">गैलरी</span>
                    </div>
                </div>
            </div>

            {/* Category Filters */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat.key}
                            onClick={() => setSelectedCategory(cat.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat.key
                                ? 'bg-[#1e3a8a] text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'
                                }`}
                        >
                            {cat.labelHi} ({cat.labelEn})
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.titleEn}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2 text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">
                                    <span>{item.category}</span>
                                    <span>{item.year}</span>
                                </div>
                                <h3 className="font-bold text-lg text-[#1e3a8a] dark:text-white mb-1 hindi-text leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {item.titleEn}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-slate-500 dark:text-slate-400">इस श्रेणी में कोई फोटो नहीं है</p>
                        <p className="text-sm text-slate-400">No photos in this category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
