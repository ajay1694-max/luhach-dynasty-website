import fs from 'fs';
import path from 'path';

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

export function parseAchieversFromMarkdown(): Achiever[] {
    const filePath = path.join(process.cwd(), 'content', 'achievers', 'all.md');

    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Find the "Consolidated Table Data" section
        const tableStart = content.indexOf('| Sr. No. | Name |');
        if (tableStart === -1) return [];

        const tableContent = content.substring(tableStart);
        const lines = tableContent.split('\n');
        const achievers: Achiever[] = [];

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.includes('Sr. No.') || trimmedLine.includes('---')) {
                continue;
            }

            if (trimmedLine.startsWith('|')) {
                const cells = trimmedLine.split('|').map(cell => cell.trim());
                // After splitting "| 1 | Name | ... |", index 0 and last index are empty strings
                // So SrNo is cells[1], Name is cells[2], etc.
                // Columns mapping (1-based index from split):
                // 1:SrNo, 2:Name, 3:FatherName, 4:Profession, 5:Photo, 6:Achievements, 7:Residence, 8:BirthPlace, 9:Village, 10:District, 11:State
                if (cells.length >= 11) {
                    achievers.push({
                        srNo: cells[1] || '',
                        name: cells[2] || '',
                        fatherName: cells[3] || '',
                        profession: cells[4] || '',
                        achievement: cells[6] || '',
                        village: cells[9] || '',
                        district: cells[10] || '',
                        state: cells[11] || '',
                    });
                }
            }
        }

        return achievers;
    } catch (error) {
        console.error('Error parsing achievers:', error);
        return [];
    }
}

export function getAchieversByProfession(profession: string): Achiever[] {
    const achievers = parseAchieversFromMarkdown();
    return achievers.filter(a =>
        a.profession.toLowerCase().includes(profession.toLowerCase())
    );
}
