const fs = require('fs');

const path = 'app/units/[id]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
    'bg-[#090909]': 'bg-gray-50',
    'bg-[#111111]': 'bg-white',
    'bg-[#1c1c1c]': 'bg-gray-50',
    'text-white/50': 'text-gray-500',
    'text-white/60': 'text-gray-500',
    'text-white/70': 'text-gray-600',
    'text-white/80': 'text-gray-600',
    'text-white/90': 'text-gray-700',
    'text-white': 'text-[#082b26]',
    'border-white/5': 'border-gray-100',
    'border-white/10': 'border-gray-200',
    'bg-white/10': 'bg-gray-100',
    'bg-white/5': 'bg-gray-50',
    'shadow-[0_20px_50px_rgba(0,0,0,0.5)]': 'shadow-sm',
    'shadow-[0_20px_50px_rgba(0,0,0,0.3)]': 'shadow-sm',
    'shadow-[0_10px_30px_rgba(0,0,0,0.5)]': 'shadow-sm',
    'shadow-[0_10px_30px_rgba(0,0,0,0.2)]': 'shadow-sm',
    'shadow-[0_0_15px_rgba(197,160,89,0.1)]': 'shadow-sm',
    'bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05]': 'bg-gray-50',
    'hover:border-primary/40': 'hover:border-[#148968]/30',
    'hover:shadow-[0_10px_40px_rgba(197,160,89,0.1)]': 'hover:shadow-md',
    'bg-primary/10': 'bg-[#148968]/5',
    'bg-primary/20': 'bg-[#148968]/10',
    'border-primary/30': 'border-[#148968]/20',
    'text-primary': 'text-[#148968]',
    'bg-primary': 'bg-[#148968]',
    'border-primary': 'border-[#148968]',
    'hover:text-white': 'hover:text-[#148968]',
    'text-[#082b26] border border-[#082b26]/10 px-3 py-1 rounded-full text-xs font-bold font-body': 'bg-gray-100 text-[#082b26] border border-gray-200 px-3 py-1 rounded-full text-xs font-bold font-body',
    'text-[#082b26]/50': 'text-gray-500'
};

for (const [old, newStr] of Object.entries(replacements)) {
    content = content.split(old).join(newStr);
}

// Special fixes
content = content.split('group-hover:text-black').join('group-hover:text-white');
content = content.split('grayscale-[0.2] contrast-125 opacity-90').join('opacity-90');
content = content.split('grayscale-[0.5]').join('');

fs.writeFileSync(path, content, 'utf8');
console.log('Theme converted successfully');
