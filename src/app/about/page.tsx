import Link from 'next/link';
import { getMarkdownContent } from '@/lib/contentLoader';

export default async function AboutPage() {
    const { content } = await getMarkdownContent('about.md');

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white to-blue-50 border-b border-slate-200 py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e3a8a] hindi-text">हमारे बारे में</h1>
                    <p className="text-xl text-slate-600">About Luhach Parivar</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-[#1e3a8a] transition-colors">मुख्य पृष्ठ</Link>
                        <span>›</span>
                        <span className="text-[#1e3a8a] font-medium">हमारे बारे में</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="bg-surface rounded-xl shadow-lg p-8 border border-border">
                    <div
                        className="prose prose-lg max-w-none dark:prose-invert hindi-text"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        </div>
    );
}
