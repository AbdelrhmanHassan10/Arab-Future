const fs = require('fs');
const path = require('path');

function replaceInFiles(dir, searchRegex, replacement, extFilters) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.next')) {
                replaceInFiles(fullPath, searchRegex, replacement, extFilters);
            }
        } else {
            const ext = path.extname(fullPath);
            if (extFilters.includes(ext)) {
                let content = fs.readFileSync(fullPath, 'utf8');
                if (searchRegex.test(content)) {
                    content = content.replace(searchRegex, replacement);
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Replaced in ${fullPath}`);
                }
            }
        }
    }
}

replaceInFiles('d:/projects/Al-Haragawy', /الفضل/g, 'الحرجاوي', ['.ts', '.tsx']);
