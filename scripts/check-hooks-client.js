const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');

const exts = ['.js', '.jsx', '.ts', '.tsx'];
const hookRegex = /\b(useState|useEffect|useRef|useContext|useMemo|useCallback|useLayoutEffect|useImperativeHandle)\s*\(/;

let flagged = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name === 'node_modules' || ent.name === '.next' || ent.name === 'dist' || ent.name === 'build') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
    } else if (ent.isFile()) {
      if (!exts.includes(path.extname(ent.name))) continue;
      const content = fs.readFileSync(full, 'utf8');
      if (hookRegex.test(content)) {
        // find first non-empty, non-comment line
        const lines = content.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        const first = lines[0] || '';
        const hasUseClient = /^['"]use client['"];$/.test(first);
        if (!hasUseClient) flagged.push(full.replace(root + path.sep, ''));
      }
    }
  }
}

if (!fs.existsSync(src)) {
  console.error('No src directory found.');
  process.exit(1);
}

walk(src);

if (flagged.length === 0) {
  console.log('No files found that use React hooks without a `use client` directive.');
} else {
  console.log('Files using React hooks but missing `use client` (likely server components):');
  flagged.forEach(f => console.log(' -', f));
  process.exit(2);
}
