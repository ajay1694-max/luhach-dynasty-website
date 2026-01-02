import Link from 'next/link';
import { getAllCities, getCitiesGroupedByState } from '@/lib/cityParser';

export default function CitiesPage() {
    const groups = getCitiesGroupedByState();
    const totalCities = groups.reduce((acc, g) => acc + g.cities.length, 0);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white to-blue-50 border-b border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e3a8a] hindi-text">गांव (Our Villages)</h1>
                    <p className="text-xl text-slate-600">The 46 Villages of Luhach Vansh Across 3 States</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-[#1e3a8a] transition-colors">मुख्य पृष्ठ</Link>
                        <span>›</span>
                        <span className="text-[#1e3a8a] font-medium">गांव सूची</span>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-[#f59e0b]">{totalCities}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 hindi-text">कुल गांव</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#f59e0b]">3</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 hindi-text">राज्य</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#f59e0b]">10,000+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 hindi-text">परिवार</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* City Listing */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {groups.map((group) => (
                    <div key={group.state} className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-[#1e3a8a] dark:text-white hindi-text">
                                {group.state}
                            </h2>
                            <span className="text-sm text-slate-500">({group.stateEn})</span>
                            <span className="px-3 py-1 bg-[#f59e0b]/20 text-[#f59e0b] rounded-full text-sm font-medium">
                                {group.cities.length} गांव
                            </span>
                            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {group.cities.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/city/${city.slug}`}
                                    className="p-4 bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#1e3a8a] dark:hover:border-[#f59e0b] hover:shadow-lg transition-all group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#1e3a8a]/10 dark:bg-[#f59e0b]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#1e3a8a]/20 transition-colors">
                                            <span className="text-xl">🏘️</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <h3 className="font-semibold text-slate-800 dark:text-white truncate hindi-text group-hover:text-[#1e3a8a] dark:group-hover:text-[#f59e0b] transition-colors">
                                                {city.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                View Details →
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
