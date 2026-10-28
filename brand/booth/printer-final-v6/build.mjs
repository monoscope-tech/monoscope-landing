import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../../..');
for (const sub of ['PDF', 'SVG', 'PREVIEWS']) fs.mkdirSync(`${dir}/${sub}`, { recursive: true });
const colors = { ink: '#000626', blue: '#0068FF', white: '#FFFFFF' };
const fonts = [400, 600, 700].map(weight => ({ name: 'Inter', weight, style: 'normal', data: fs.readFileSync(`${root}/brand/pitch/fonts/Inter-${weight}.ttf`) }));
const original = fs.readFileSync(`${root}/assets/brand/logo_full_color.svg`, 'utf8');
const logoPaths = original.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const symbolPaths = [...original.matchAll(/<path\b[^>]*\/>/g)].slice(0, 5).map(m => m[0]).join('');
const symbol = (x,y,w,color) => `<svg x="${x}" y="${y}" width="${w}" height="${w * 384 / 682}" viewBox="0 0 682 384">${symbolPaths.replace(/fill="[^"]*"/g, `fill="${color}"`).replace(/fill-opacity="[^"]*"/g, '')}</svg>`;
const logo = (x,y,w) => `<svg x="${x}" y="${y}" width="${w}" height="${w * 450 / 3257}" viewBox="0 0 3257 450">${logoPaths}</svg>`;
const copy = [];
async function text(value,x,y,w,size,weight=400,color=colors.ink,center=false) {
  copy.push({ value, x, y, width: w, size, weight });
  const svg = await satori({ type:'div', props:{ style:{ display:'flex', width:w, height:size*1.4, fontFamily:'Inter', fontSize:size, fontWeight:weight, color, whiteSpace:'nowrap', justifyContent:center?'center':'flex-start', lineHeight:1.12, letterSpacing:weight === 600 ? -size*0.018 : 0 }, children:value } }, { width:w, height:size*1.4, fonts });
  return svg.replace('<svg ', `<svg x="${x}" y="${y}" `);
}
const panel = (w,h,bg,body,title) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}" role="img"><title>${title}</title><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;
const trace = `<g fill="none" stroke="#0068FF" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"><path d="M180 1790H470C650 1790 650 1590 900 1590H1900C2080 1590 2080 1400 2260 1400H2820"/><path d="M470 1790C650 1790 650 1930 900 1930H1650"/><path d="M1050 1930C1190 1930 1190 2130 1330 2130H1540"/></g><g fill="#0068FF"><circle cx="470" cy="1790" r="43"/><circle cx="900" cy="1590" r="43"/><circle cx="1900" cy="1590" r="43"/><circle cx="2260" cy="1400" r="43"/><circle cx="2520" cy="1400" r="43"/><circle cx="900" cy="1930" r="43"/><circle cx="1050" cy="1930" r="43"/><circle cx="1650" cy="1930" r="43"/><circle cx="1330" cy="2130" r="43"/><circle cx="1540" cy="2130" r="43"/><path d="M240 1480H125V2100H240V2050H180V1530H240Z"/><path d="M2760 1190H2875V1610H2760V1560H2820V1240H2760Z"/></g>`;
const backdrop = panel(3000,2400,colors.white,
  logo(275,210,1450)
  + await text('Observability data lake',275,540,2525,214,700)
  + await text('+ AI SRE agents',275,790,2525,214,700)
  + await text('Catch issues and continuously improve production.',275,1110,2525,98)
  + trace,
  'Monoscope backdrop: Observability data lake + AI SRE agents. Catch issues and continuously improve production. 3000 × 2400 mm.');
const front = panel(1800,950,colors.blue,
  symbol(570,205,660,colors.white)
  + await text('monoscopehq.com',0,740,1800,60,400,colors.white,true),
  'Monoscope table front. monoscopehq.com. 1800 × 950 mm.');
function side(mirror=false) {
  const motif = `<g fill="none" stroke="${colors.white}" stroke-width="8"><path d="M750 235H640C540 235 540 450 440 450S340 700 230 700H0"/></g><g fill="${colors.white}"><circle cx="540" cy="342.5" r="25"/><circle cx="440" cy="450" r="25"/><circle cx="230" cy="700" r="25"/></g>`;
  return panel(750,950,colors.blue,mirror ? `<g transform="translate(750 0) scale(-1 1)">${motif}</g>` : motif,`Monoscope table ${mirror?'right':'left'} side. 750 × 950 mm.`);
}
const panels = [
  ['01-backdrop-3000x2400mm',backdrop,3000,2400],
  ['02-table-front-1800x950mm',front,1800,950],
  ['03-table-left-750x950mm',side(),750,950],
  ['04-table-right-750x950mm',side(true),750,950],
  ['05-table-top-1800x750mm-plain-white',panel(1800,750,colors.white,'','Optional plain white tabletop. 1800 × 750 mm.'),1800,750],
  ['06-table-back-1800x950mm-plain-blue',panel(1800,950,colors.blue,'','Optional plain blue table back. 1800 × 950 mm.'),1800,950],
];
for (const [name,svg,w,h] of panels) {
  if (/<text\b|<image\b/.test(svg)) throw new Error(`Non-vector content in ${name}`);
  fs.writeFileSync(`${dir}/SVG/${name}.svg`,svg);
  fs.writeFileSync(`${dir}/PREVIEWS/${name}.png`,new Resvg(svg,{fitTo:{mode:'width',value:w===750?900:1800}}).render().asPng());
  execFileSync('rsvg-convert',['--format','pdf','--output',`${dir}/PDF/${name}.pdf`,`${dir}/SVG/${name}.svg`]);
}
const nest = (svg,x,y,w,h) => svg.replace(/width="[^"]+" height="[^"]+"/,`x="${x}" y="${y}" width="${w}" height="${h}"`);
const sheet = panel(1800,1750,'#F2F5FA',
  await text('Monoscope / printer artwork',80,40,1640,40,600)
  + await text('Backdrop 3000 × 2400 mm · Table front 1800 × 950 mm',80,104,1640,26)
  + nest(backdrop,80,175,1440,1152)
  + nest(front,450,1010,864,456)
  + nest(side(),80,1480,180,228)
  + nest(side(true),300,1480,180,228)
  + await text('Flat layout proof — table shown in front for composition only.',560,1530,1160,24)
  + await text('Full-size panel PDFs supplied separately. Supplier must confirm fit.',560,1580,1160,24),
  'Monoscope printer artwork proof. Separate panel files supplied at full size.');
fs.writeFileSync(`${dir}/PREVIEWS/artwork-proof.png`,new Resvg(sheet,{fitTo:{mode:'width',value:1800}}).render().asPng());
fs.writeFileSync(`${dir}/artwork-manifest.json`,JSON.stringify({units:'mm',scale:'1:1',bleed:0,colors,panels:panels.map(([name,,width,height])=>({name,width,height})),copy},null,2));
const luminance = hex => {
  const rgb = hex.slice(1).match(/../g).map(s=>parseInt(s,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
  return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;
};
const contrast = (a,b) => {const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);};
console.log(JSON.stringify({panels:panels.length,outlined:true,navyOnWhite:contrast(colors.ink,colors.white),whiteOnBlue:contrast(colors.white,colors.blue)},null,2));
