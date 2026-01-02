import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Path to site archive content
const CONTENT_DIR = path.join(process.cwd(), '..', 'site_archive', 'content');

export async function getMarkdownContent(filename: string): Promise<{ content: string; frontmatter: Record<string, unknown> }> {
    const filePath = path.join(CONTENT_DIR, filename);

    try {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        let { data, content } = matter(fileContents);

        // Clean up content - much more aggressively
        content = content
            .replace(/@page\s*{[^}]*}/g, '') // Remove @page blocks
            .replace(/[^{}\n]+\{[^}]*:[^}]*\}/g, '') // Remove any CSS-like blocks { k:v }
            .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
            .replace(/p\s*{\s*margin-bottom[\s\S]*?}/g, '') // Remove standard leaked p styles
            .replace(/!\[\]\(http:\/\/luhachvansh\.com\/public\/frontend\/img\/[^)]+\/([^)]+)\)/g, (match: string, filename: string) => {
                return `![](/images/${filename})`;
            })
            .replace(/!\[\]\(http:\/\/luhachvansh\.com\/public\/\)\s*\n\s*\[\]\(http:\/\/luhachvansh\.com\/public\/\)/g, '') // Remove empty images
            .replace(/!\[Not Available\]\(http:\/\/luhachvansh\.com\/[^\)]*\)/g, '') // Remove "Not Available" images
            .replace(/\[\]\(http:\/\/luhachvansh\.com[^\)]*\)/g, '') // Remove empty links
            .replace(/\n{3,}/g, '\n\n') // Normalize spacing
            .trim();

        const processedContent = await remark()
            .use(html, { sanitize: false })
            .process(content);

        return {
            content: processedContent.toString(),
            frontmatter: data,
        };
    } catch (error) {
        console.error(`Error reading markdown file: ${filename}`, error);
        return {
            content: '<p>Content not found</p>',
            frontmatter: {},
        };
    }
}

export function getMarkdownFiles(directory: string = ''): string[] {
    const dirPath = path.join(CONTENT_DIR, directory);

    try {
        const files = fs.readdirSync(dirPath);
        return files.filter(file => file.endsWith('.md'));
    } catch (error) {
        console.error(`Error reading directory: ${directory}`, error);
        return [];
    }
}

export function getAllCityPages(): { slug: string; title: string }[] {
    const cityDir = path.join(CONTENT_DIR, 'search', 'city');

    try {
        const files = fs.readdirSync(cityDir);
        return files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const slug = file.replace('.md', '');
                const filePath = path.join(cityDir, file);
                const fileContents = fs.readFileSync(filePath, 'utf-8');
                const { data } = matter(fileContents);
                return {
                    slug,
                    title: (data.title as string) || decodeURIComponent(slug),
                };
            });
    } catch (error) {
        console.error('Error reading city pages:', error);
        return [];
    }
}
