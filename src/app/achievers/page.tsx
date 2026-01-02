import Link from 'next/link';
import { parseAchieversFromMarkdown } from '@/lib/parseAchievers';
import { AchieversList } from './AchieversList';

export default async function AchieversPage() {
    const achievers = parseAchieversFromMarkdown();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white to-blue-50 border-b border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e3a8a] hindi-text">हमारे गौरव (Our Achievers)</h1>
                    <p className="text-xl text-slate-600">Celebrating the Success &amp; Excellence of Luhach Vansh</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-[#1e3a8a] transition-colors">मुख्य पृष्ठ</Link>
                        <span>›</span>
                        <span className="text-[#1e3a8a] font-medium">गौरव</span>
                    </div>
                </div>
            </div>

            {/* Client-side List with Filters */}
            <AchieversList initialAchievers={achievers} />
        </div>
    );
}
