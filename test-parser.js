const { parseAchieversFromMarkdown } = require('./src/lib/parseAchievers');
const achievers = parseAchieversFromMarkdown();
console.log('Total Achievers Found:', achievers.length);
achievers.forEach(a => console.log(`${a.srNo}: ${a.name}`));
