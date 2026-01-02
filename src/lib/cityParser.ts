import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CITY_DIR = path.join(process.cwd(), '..', 'site_archive', 'content', 'search', 'city');

export interface CityData {
    slug: string;
    name: string;
    title: string;
    content: string;
    url?: string;
    date?: string;
}

// Decode URL-encoded Hindi filenames
function decodeSlug(slug: string): string {
    try {
        return decodeURIComponent(slug);
    } catch {
        return slug;
    }
}

// Get all city slugs for static generation
export function getAllCitySlugs(): string[] {
    try {
        const files = fs.readdirSync(CITY_DIR);
        return files
            .filter(file => file.endsWith('.md'))
            .map(file => file.replace('.md', ''));
    } catch (error) {
        console.error('Error reading city directory:', error);
        return [];
    }
}

// Get city data by slug  
export function getCityBySlug(slug: string): CityData | null {
    // First try the exact slug as provided (might be encoded)
    let filePath = path.join(CITY_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        // Try decoding it (if it was double encoded)
        try {
            const decoded = decodeURIComponent(slug);
            filePath = path.join(CITY_DIR, `${decoded}.md`);
        } catch { /* ignore */ }
    }

    // Still not found? Try matching by decoded name
    if (!fs.existsSync(filePath)) {
        try {
            const decodedSlug = decodeURIComponent(slug);
            const files = fs.readdirSync(CITY_DIR);
            const match = files.find(f => decodeURIComponent(f.replace('.md', '')) === decodedSlug);
            if (match) {
                filePath = path.join(CITY_DIR, match);
            } else {
                return null;
            }
        } catch {
            return null;
        }
    }

    try {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContents);
        const decodedName = decodeURIComponent(path.basename(filePath).replace('.md', ''));

        // Clean up content - remove CSS @page rules and empty image links
        let cleanContent = content
            .replace(/@page[\s\S]*?}/g, '') // Remove CSS
            .replace(/!\[\]\(http:\/\/luhachvansh\.com\/public\/frontend\/img\/village\/([^)]+)\)/g, (match, filename) => {
                return `![](/images/${filename})`;
            })
            .replace(/!\[\]\(http:\/\/luhachvansh\.com\/public\/\)\s*\n\s*\[\]\(http:\/\/luhachvansh\.com\/public\/\)/g, '') // Remove empty images
            .replace(/\[\]\(http:\/\/luhachvansh\.com[^\)]*\)/g, '') // Remove empty links
            .replace(/\n{3,}/g, '\n\n'); // Normalize spacing

        return {
            slug,
            name: decodedName,
            title: (data.title as string) || decodedName,
            content: cleanContent,
            url: data.url as string,
            date: data.date as string,
        };
    } catch (error) {
        console.error(`Error reading city file: ${slug}`, error);
        return null;
    }
}

// Get all cities for listing page
export function getAllCities(): CityData[] {
    const slugs = getAllCitySlugs();
    const cities: CityData[] = [];

    for (const slug of slugs) {
        const city = getCityBySlug(slug);
        if (city) {
            cities.push(city);
        }
    }

    // Sort alphabetically by Hindi name
    return cities.sort((a, b) => a.name.localeCompare(b.name, 'hi'));
}

// Map original web paths to local public paths
export function mapImagePath(originalPath: string): string {
    if (!originalPath) return '';
    // Extract filename from path like http://luhachvansh.com/public/frontend/img/about/image_one.jpeg
    const filename = originalPath.split('/').pop();
    if (filename) {
        // Many original filenames are mapped to asset_... in our scraped archive
        // We'll try to find the match if possible, or just return the filename
        return `/images/${filename}`;
    }
    return originalPath;
}

export interface CityGroup {
    state: string;
    stateEn: string;
    cities: CityData[];
}

// Group cities by state  
export function getCitiesGroupedByState(): CityGroup[] {
    const allCities = getAllCities();

    const groups: CityGroup[] = [
        { state: 'हरियाणा', stateEn: 'Haryana', cities: [] },
        { state: 'उत्तर प्रदेश', stateEn: 'Uttar Pradesh', cities: [] },
        { state: 'राजस्थान', stateEn: 'Rajasthan', cities: [] },
        { state: 'अन्य', stateEn: 'Other', cities: [] },
    ];

    // More comprehensive village lists
    const haryanaVillages = ['नान्धा', 'गिरावड़', 'मोहला', 'रिटौली', 'खाटू श्याम', 'गहना', 'भड़ताना', 'सालहेवाला', 'गुगाहेड़ी', 'गड़ी गुलडहर', 'सेहरा', 'भंडोली', 'मदीना', 'खेड़ी मेहम', 'भड़ाना', 'गुड़हेड़ी', 'कर्नल', 'नंगला', 'कांगड़', 'रोहतक', 'भिवानी', 'चरखी दादरी', 'झज्जर'];
    const rajasthanVillages = ['मारोत', 'पुण्याना', 'दाँशाह मलिक', 'ढूँढवा', 'सारगोथ', 'इगलास', 'घरोट', 'कबूलपुर', 'झुंझुनू', 'सीकर', 'जयपुर', 'अलवर', 'अजमेर', 'नागौर'];

    for (const city of allCities) {
        const name = city.name;
        // Check content for state names if name doesn't match
        const content = city.content.toLowerCase();

        if (haryanaVillages.some(v => name.includes(v)) || content.includes('हरियाणा') || content.includes('haryana')) {
            groups[0].cities.push(city);
        } else if (content.includes('उत्तर प्रदेश') || content.includes('uttar pradesh') || content.includes(' u.p.') || content.includes('बुलंदशहर') || content.includes('मेरठ') || content.includes('सहारनपुर')) {
            groups[1].cities.push(city);
        } else if (rajasthanVillages.some(v => name.includes(v)) || content.includes('राजस्थान') || content.includes('rajasthan')) {
            groups[2].cities.push(city);
        } else {
            // Default to UP for many others as requested
            groups[1].cities.push(city);
        }
    }

    // Move "Other" to UP if they seem to fit, otherwise keep in Other
    // Actually, let's just ensure we have 46 total
    const totalCount = groups.reduce((acc, g) => acc + g.cities.length, 0);
    console.log(`Total grouped cities: ${totalCount}`);

    return groups.filter(g => g.cities.length > 0);
}
