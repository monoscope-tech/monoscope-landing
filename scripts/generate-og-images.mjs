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
const logoPng = readFileSync('assets/brand/logo_full_white_clean.png');
const logoDataUri = `data:image/png;base64,${logoPng.toString('base64')}`;

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
  if (title.length > 40) return 48;
  return 56;
}

function buildLayout(title, section) {
  const sectionEl = section
    ? { type: 'div', props: { style: { display: 'flex', color: '#4d94ff', fontSize: 16, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }, children: section } }
    : null;

  return {
    type: 'div',
    props: {
      style: {
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '56px 72px',
        backgroundColor: '#0f1117',
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 75% 35%, rgba(0,80,200,0.12), transparent)',
      },
      children: [
        { type: 'img', props: { src: logoDataUri, width: 220, height: 36, style: { display: 'flex' } } },
        { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', gap: '14px' }, children: sectionEl
          ? [sectionEl, { type: 'div', props: { style: { display: 'flex', color: '#f0f0f5', fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.15 }, children: title } }]
          : { type: 'div', props: { style: { display: 'flex', color: '#f0f0f5', fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.15 }, children: title } }
        } },
        { type: 'div', props: { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [
          { type: 'div', props: { style: { display: 'flex', width: '48px', height: '3px', backgroundColor: '#3b82f6', borderRadius: '2px' }, children: '' } },
          { type: 'div', props: { style: { display: 'flex', color: '#6b7280', fontSize: 16, fontWeight: 400 }, children: 'monoscope.tech' } },
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
