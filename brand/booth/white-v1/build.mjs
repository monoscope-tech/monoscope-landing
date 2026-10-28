import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../../..');
const ink = '#000626', blue = '#0068FF';
const fonts = [400, 700].map(weight => ({name: 'Inter', weight, style: 'normal', data: fs.readFileSync(`${root}/brand/pitch/fonts/Inter-${weight}.ttf`)}));
const source = fs.readFileSync(`${root}/assets/brand/logo_full_color.svg`, 'utf8');
const contents = source.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const mark = [...source.matchAll(/<path\b[^>]*\/>/g)].slice(0, 5).map(m => m[0]).join('');
const logo = (x,y,w) => `<svg x="${x}" y="${y}" width="${w}" height="${w*450/3257}" viewBox="0 0 3257 450">${contents}</svg>`;
const symbol = (x,y,w,color) => `<svg x="${x}" y="${y}" width="${w}" height="${w*384/682}" viewBox="0 0 682 384">${mark.replace(/fill="[^"]*"/g, `fill="${color}"`).replace(/fill-opacity="[^"]*"/g, '')}</svg>`;
async function text(value,x,y,w,size,weight=400,color=ink,center=false) {
  const svg = await satori({type:'div', props:{style:{display:'flex',width:w,height:size*1.35,fontFamily:'Inter',fontSize:size,fontWeight:weight,color,whiteSpace:'nowrap',justifyContent:center?'center':'flex-start',lineHeight:1.2},children:value}}, {width:w,height:size*1.35,fonts});
  return svg.replace('<svg ', `<svg x="${x}" y="${y}" `);
}
const panel = (w,h,bg,body,title) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}"><title>${title}</title><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`;
function save(name,svg,width=1500) {
  fs.writeFileSync(`${dir}/${name}.svg`,svg);
  fs.writeFileSync(`${dir}/${name}.png`,new Resvg(svg,{fitTo:{mode:'width',value:width}}).render().asPng());
}
const trace = `<g fill="none" stroke="${blue}" stroke-width="12"><path d="M0 1810H450C610 1810 610 1590 780 1590H1900C2080 1590 2080 1380 2250 1380H3000"/><path d="M450 1810C610 1810 610 2020 780 2020H1340"/></g><g fill="${blue}">${[[450,1810],[780,1590],[780,2020],[2250,1380],[2700,1380]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="43"/>`).join('')}<path d="M240 1530H125V2140H240V2090H180V1580H240Z"/><path d="M2760 1160H2875V1600H2760V1550H2820V1210H2760Z"/></g>`;
const backdrop = panel(3000,2400,'white',logo(250,220,1450)+await text('Know what happened.',250,570,2600,210,700)+await text('Prove it. Fix it.',250,825,2600,210,700)+await text('AI SRE + open-source observability',250,1140,2600,91)+trace,'Monoscope white backdrop — provisional 3000 × 2400 mm');
const front = panel(1800,950,blue,symbol(570,205,660,'white')+await text('monoscope.com',0,740,1800,60,400,'white',true),'Monoscope table front — provisional 1800 × 950 mm');
function side(mirror=false) {
  const motif = `<g fill="none" stroke="white" stroke-width="8"><path d="M0 270H180C280 270 280 480 390 480H750"/><path d="M180 270C280 270 280 700 390 700H750"/></g><g fill="white"><circle cx="180" cy="270" r="25"/><circle cx="390" cy="480" r="25"/><circle cx="390" cy="700" r="25"/></g>`;
  return panel(750,950,blue,mirror?`<g transform="translate(750 0) scale(-1 1)">${motif}</g>`:motif,'Monoscope table side — provisional 750 × 950 mm');
}
save('backdrop-3000x2400',backdrop);
save('table-front-1800x950',front);
save('table-left-750x950',side(),750);
save('table-right-750x950',side(true),750);
const nest = (svg,x,y,w,h) => svg.replace(/width="[^"]+" height="[^"]+"/,`x="${x}" y="${y}" width="${w}" height="${h}"`);
const proof = panel(1600,1550,'#F2F5FA',await text('MONOSCOPE / WHITE BOOTH',80,45,1440,32,700)+nest(backdrop,80,120,1440,1152)+nest(front,440,955,864,456)+await text('Provisional dimensions. Supplier template required before printing.',80,1470,1440,23),'Monoscope booth artwork proof');
save('artwork-proof',proof,1600);
console.log('Saved four SVG panels with outlined lettering, PNG previews, and artwork proof.');
