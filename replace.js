const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.next' || file === '.git') return;
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.md')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('d:\\projects\\Al-Haragawy');
let changed = 0;
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // First, replace the word with the "Real Estate" suffix to prevent duplication
    let newContent = content.replace(/(الحرجاوي|الفضل)\s*(العقارية|العقاريه)/g, 'أكواد العقاريه');
    // Then replace any standalone occurrences
    newContent = newContent.replace(/الحرجاوي|الفضل/g, 'أكواد العقاريه');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        changed++;
        console.log('Updated', file);
    }
});
console.log('Total files changed:', changed);
