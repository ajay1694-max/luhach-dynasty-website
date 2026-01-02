import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCitySlugs } from '@/lib/cityParser';
import { remark } from 'remark';
import html from 'remark-html';

// Generate static params for all cities
export async function generateStaticParams() {
    const slugs = getAllCitySlugs();
    return slugs.map((slug) => ({ slug }));
}

async function markdownToHtml(markdown: string): Promise<string> {
    const result = await remark().use(html, { sanitize: false }).process(markdown);
    return result.toString();
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const city = getCityBySlug(slug);

    if (!city) {
        notFound();
    }

    const htmlContent = await markdownToHtml(city.content);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-slate-50 border-b border-slate-200 py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e3a8a] hindi-text">{city.name}</h1>
                    <p className="text-xl text-slate-600">Village History &amp; Details</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-[#1e3a8a] transition-colors">मुख्य पृष्ठ</Link>
                        <span>›</span>
                        <Link href="/city" className="hover:text-[#1e3a8a] transition-colors">गांव</Link>
                        <span>›</span>
                        <span className="text-[#1e3a8a] font-medium hindi-text">{city.name}</span>
                    </div>
                </div>
            </div>

            {/* Quick Links Bar */}
            <div className="bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700 sticky top-20 z-40">
                <div className="max-w-5xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-4 text-sm">
                        <a href="#history" className="text-slate-600 dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-[#f59e0b] transition-colors">
                            इतिहास (History)
                        </a>
                        <span className="text-slate-300">|</span>
                        <a href="#migration" className="text-slate-600 dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-[#f59e0b] transition-colors">
                            विस्थापन (Migration)
                        </a>
                        <span className="text-slate-300">|</span>
                        <a href="#gallery" className="text-slate-600 dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-[#f59e0b] transition-colors">
                            गैलरी (Gallery)
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <div className="bg-surface rounded-xl shadow-lg p-8 border border-border" id="history">
                    <div
                        className="prose prose-lg max-w-none dark:prose-invert hindi-text"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>

                {/* Related Villages */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-[#1e3a8a] dark:text-white mb-6 hindi-text">
                        अन्य गांव देखें (Explore Other Villages)
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/city" className="btn-primary">
                            सभी गांव देखें (View All)
                        </Link>
                        <Link href="/vanshavali" className="btn-secondary">
                            वंशावली देखें (View Family Tree)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
