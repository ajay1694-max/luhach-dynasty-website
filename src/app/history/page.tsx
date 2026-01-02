import { getMarkdownContent } from '@/lib/contentLoader';

import Link from 'next/link';

export default async function HistoryPage() {
    const { content } = await getMarkdownContent('history.md');

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-slate-50 border-b border-slate-200 py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e3a8a] hindi-text">इतिहास (History)</h1>
                    <p className="text-xl text-slate-600">The Glorious Legacy of Luhach Dynasty</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-[#1e3a8a] transition-colors">मुख्य पृष्ठ</Link>
                        <span>›</span>
                        <span className="text-[#1e3a8a] font-medium">इतिहास</span>
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

                {/* Related Links */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <a
                        href="/vanshavali"
                        className="p-6 bg-white dark:bg-[#1e293b] rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="text-3xl mb-3">🌳</div>
                        <h3 className="font-bold text-lg text-[#1e3a8a] dark:text-white mb-2 hindi-text">वंशावली</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">View the complete family tree</p>
                    </a>

                    <a
                        href="/kuldevi"
                        className="p-6 bg-white dark:bg-[#1e293b] rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="text-3xl mb-3">🙏</div>
                        <h3 className="font-bold text-lg text-[#1e3a8a] dark:text-white mb-2 hindi-text">कुलदेवी</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Learn about our Kuldevi</p>
                    </a>

                    <a
                        href="/shaheed"
                        className="p-6 bg-white dark:bg-[#1e293b] rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="text-3xl mb-3">🎖️</div>
                        <h3 className="font-bold text-lg text-[#1e3a8a] dark:text-white mb-2 hindi-text">शहीद</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Our martyrs and their sacrifice</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
