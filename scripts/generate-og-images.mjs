import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';
import { glob } from 'glob';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

const WIDTH = 1200;
const HEIGHT = 630;
const OUT_DIR = 'assets/og';

const fontRegular = readFileSync('assets/fonts/Inter-Regular.ttf');
const fontBold = readFileSync('assets/fonts/Inter-Bold.ttf');

function deriveSection(filePath) {
  const parts = filePath.replace(/\/index\.md$/, '').replace(/\.md$/, '').split('/');
  return parts.slice(0, -1).map(p => p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(' / ');
}

function outPath(filePath) {
  const slug = filePath.replace(/\/index\.md$/, '').replace(/\.md$/, '');
  return join(OUT_DIR, `${slug}.png`);
}

function titleSize(title) {
  if (title.length > 60) return 40;
  if (title.length > 40) return 46;
  return 52;
}

function buildLayout(title, section) {
  const sectionEl = section
    ? { type: 'div', props: { style: { display: 'flex', color: '#0068ff', fontSize: 18, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }, children: section } }
    : null;

  return {
    type: 'div',
    props: {
      style: {
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '60px 80px',
        backgroundColor: '#0a0a0f',
        backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(0,104,255,0.15), transparent 60%)',
      },
      children: [
        { type: 'div', props: { style: { display: 'flex', alignItems: 'center', color: '#ffffff', fontSize: 28, fontWeight: 700 },
          children: 'monoscope' } },
        { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: sectionEl
          ? [sectionEl, { type: 'div', props: { style: { display: 'flex', color: '#ffffff', fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.2, maxWidth: '900px' }, children: title } }]
          : { type: 'div', props: { style: { display: 'flex', color: '#ffffff', fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.2, maxWidth: '900px' }, children: title } }
        } },
        { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [
          { type: 'div', props: { style: { display: 'flex', width: '60px', height: '4px', backgroundColor: '#0068ff', borderRadius: '2px' }, children: '' } },
          { type: 'div', props: { style: { display: 'flex', color: '#555555', fontSize: 18 }, children: 'monoscope.tech' } },
        ] } },
      ],
    },
  };
}

async function main() {
  const files = await glob('**/*.md', { ignore: ['node_modules/**', 'README.md', 'CLAUDE.md', '_quickstatic/**'] });
  console.log(`Generating OG images for ${files.length} pages...`);
  let count = 0;

  for (const file of files) {
    try {
      const raw = readFileSync(file, 'utf-8');
      const { data } = matter(raw);
      const title = data.ogTitle || data.title;
      if (!title) continue;

      const section = deriveSection(file);
      const layout = buildLayout(title, section);

      const svg = await satori(layout, {
        width: WIDTH, height: HEIGHT,
        fonts: [{ name: 'Inter', data: fontRegular, weight: 400, style: 'normal' }, { name: 'Inter', data: fontBold, weight: 700, style: 'normal' }],
      });

      const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } });
      const png = resvg.render().asPng();

      const dest = outPath(file);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, png);
      count++;
    } catch (err) {
      console.error(`Failed: ${file} — ${err.message}`);
    }
  }
  console.log(`Generated ${count} OG images.`);
}

main();
