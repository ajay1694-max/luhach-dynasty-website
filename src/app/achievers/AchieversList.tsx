'use client';

import { useState, useMemo } from 'react';

interface Achiever {
    srNo: string;
    name: string;
    fatherName: string;
    profession: string;
    achievement: string;
    village: string;
    district: string;
    state: string;
}

interface AchieversListProps {
    initialAchievers: Achiever[];
}

const professionCategories = [
    { key: 'all', labelHi: 'सभी', labelEn: 'All' },
    { key: 'Professor', labelHi: 'प्रोफेसर', labelEn: 'Professor' },
    { key: 'Doctor', labelHi: 'डॉक्टर', labelEn: 'Doctor' },
    { key: 'Engineer', labelHi: 'इंजीनियर', labelEn: 'Engineer' },
    { key: 'Lawyer', labelHi: 'वकील', labelEn: 'Lawyer' },
    { key: 'CA', labelHi: 'सी.ए.', labelEn: "CA" },
    { key: 'Military', labelHi: 'सैनिक', labelEn: 'Military' },
    { key: 'Civil Services', labelHi: 'सिविल सेवा', labelEn: 'Civil Services' },
    { key: 'Corporates', labelHi: 'कॉर्पोरेट', labelEn: 'Corporates' },
    { key: 'Sports', labelHi: 'खेल', labelEn: 'Sports' },
    { key: 'Goverment Servant', labelHi: 'सरकारी', labelEn: 'Govt. Servant' },
];

export function AchieversList({ initialAchievers }: AchieversListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProfession, setSelectedProfession] = useState('all');

    const filteredAchievers = useMemo(() => {
        return initialAchievers.filter(achiever => {
            const matchesSearch =
                achiever.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                achiever.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
                achiever.achievement.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesProfession =
                selectedProfession === 'all' ||
                achiever.profession.toLowerCase().includes(selectedProfession.toLowerCase());

            return matchesSearch && matchesProfession;
        });
    }, [searchQuery, selectedProfession, initialAchievers]);

    return (
        <div className="max-w-7xl mx-auto px-4 pb-12">
            {/* Filters Section */}
            <div className="py-8">
                <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <label htmlFor="search" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                खोजें (Search)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="नाम, गांव, या उपलब्धि से खोजें..."
                                    className="w-full px-4 py-2 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                                />
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Profession Filter */}
                        <div className="md:w-64">
                            <label htmlFor="profession" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                व्यवसाय (Profession)
                            </label>
                            <select
                                id="profession"
                                value={selectedProfession}
                                onChange={(e) => setSelectedProfession(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                            >
                                {professionCategories.map(cat => (
                                    <option key={cat.key} value={cat.key}>
                                        {cat.labelHi} ({cat.labelEn})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4 text-slate-600 dark:text-slate-400">
                {filteredAchievers.length} {filteredAchievers.length === 1 ? 'result' : 'results'} found
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">क्र. सं.</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">नाम (Name)</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">पिता का नाम</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">व्यवसाय</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">उपलब्धि</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">गांव</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">राज्य</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {filteredAchievers.map((achiever, index) => (
                                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{achiever.srNo}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-[#1e3a8a] dark:text-blue-400">{achiever.name}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{achiever.fatherName}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium bg-[#f59e0b]/10 text-[#f59e0b] rounded-full">
                                            {achiever.profession}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{achiever.achievement}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 hindi-text">{achiever.village}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 hindi-text">{achiever.state}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredAchievers.length === 0 && (
                    <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                        <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium">कोई परिणाम नहीं मिला</p>
                        <p className="text-sm mt-1">No results found. Try a different search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
