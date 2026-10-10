import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';

const root = process.cwd();
const out = path.join(root, 'dist');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const excludedTopLevel = new Set(['dist', 'node_modules', '.git', '.github']);
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (excludedTopLevel.has(entry.name)) continue;
  const src = path.join(root, entry.name);
  const dst = path.join(out, entry.name);
  fs.cpSync(src, dst, { recursive: true });
}

const run = (args, label) => {
  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${label}`);
};

const encode = (inputRel, outputRel, posterRel) => {
  const input = path.join(root, inputRel);
  const output = path.join(out, outputRel);
  const poster = path.join(out, posterRel);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.mkdirSync(path.dirname(poster), { recursive: true });

  run([
    '-y', '-i', input,
    '-vf', "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'",
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '28', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k',
    '-movflags', '+faststart',
    output,
  ], outputRel);

  run([
    '-y', '-ss', '00:00:01', '-i', output,
    '-frames:v', '1', '-q:v', '5', poster,
  ], posterRel);
};

const media = [
  ['assets/screens/VID-20260915-WA0001.mp4', 'assets/web-media/screens/location-01.mp4', 'assets/web-media/screens/location-01.jpg'],
  ['assets/screens/VID20260920082504 (1).mp4', 'assets/web-media/screens/location-02.mp4', 'assets/web-media/screens/location-02.jpg'],
  ['assets/screens/VID20260920083827.mp4', 'assets/web-media/screens/location-03.mp4', 'assets/web-media/screens/location-03.jpg'],
  ['assets/video/browsing dashboard Dan function.mp4', 'assets/web-media/walkthroughs/dashboard.mp4', 'assets/web-media/walkthroughs/dashboard.jpg'],
  ['assets/video/snap2ads editor new (1).mp4', 'assets/web-media/walkthroughs/snap2ads-editor.mp4', 'assets/web-media/walkthroughs/snap2ads-editor.jpg'],
  ['assets/video/snap2ads own poster.mp4', 'assets/web-media/walkthroughs/own-poster.mp4', 'assets/web-media/walkthroughs/own-poster.jpg'],
];

for (const item of media) encode(...item);

const googleFontPatterns = [
  /\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/g,
  /\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*/g,
  /\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Plus\+Jakarta\+Sans:[^"]+" rel="stylesheet">\s*/g,
];

const htmlFiles = [
  'index.html',
  'business-partner/index.html',
  'tools/whatsapp-link/index.html',
  'tools/roi-calculator/index.html',
  '404.html',
];

for (const rel of htmlFiles) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  for (const pattern of googleFontPatterns) html = html.replace(pattern, '\n');
  html = html.replaceAll("'Plus Jakarta Sans',Arial,sans-serif", "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif");
  html = html.replaceAll("'Plus Jakarta Sans', Arial, sans-serif", "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif");
  fs.writeFileSync(file, html);
}

const homePath = path.join(out, 'index.html');
let home = fs.readFileSync(homePath, 'utf8');

const proofReplacements = [
  ['assets/screens/VID-20260915-WA0001.mp4', 'assets/web-media/screens/location-01.mp4', 'assets/web-media/screens/location-01.jpg'],
  ['assets/screens/VID20260920082504%20(1).mp4', 'assets/web-media/screens/location-02.mp4', 'assets/web-media/screens/location-02.jpg'],
  ['assets/screens/VID20260920083827.mp4', 'assets/web-media/screens/location-03.mp4', 'assets/web-media/screens/location-03.jpg'],
];
for (const [oldSrc, newSrc, poster] of proofReplacements) {
  const escaped = oldSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<video controls muted playsinline preload="(?:metadata|none)"([^>]*)><source src="${escaped}" type="video/mp4"><\\/video>`, 'g');
  home = home.replace(pattern, `<video controls muted playsinline preload="none" poster="${poster}"$1><source src="${newSrc}" type="video/mp4"></video>`);
}

const walkthroughs = [
  ['assets/video/browsing%20dashboard%20Dan%20function.mp4', 'assets/web-media/walkthroughs/dashboard.mp4', 'assets/web-media/walkthroughs/dashboard.jpg'],
  ['assets/video/snap2ads%20editor%20new%20(1).mp4', 'assets/web-media/walkthroughs/snap2ads-editor.mp4', 'assets/web-media/walkthroughs/snap2ads-editor.jpg'],
  ['assets/video/snap2ads%20own%20poster.mp4', 'assets/web-media/walkthroughs/own-poster.mp4', 'assets/web-media/walkthroughs/own-poster.jpg'],
];
for (const [oldSrc, newSrc, poster] of walkthroughs) {
  home = home.replaceAll(`data-video="${oldSrc}"`, `data-video="${newSrc}"`);
  const escaped = oldSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const preview = new RegExp(`<video muted playsinline preload="(?:metadata|none)" aria-hidden="true"><source src="${escaped}" type="video/mp4"><\\/video>`, 'g');
  home = home.replace(preview, `<img src="${poster}" loading="lazy" decoding="async" alt="" aria-hidden="true">`);
}

home = home.replace('.walk-open .video-frame video{pointer-events:none}', '.walk-open .video-frame video{pointer-events:none}.walk-open .video-frame img{width:100%;height:100%;object-fit:cover}');
home = home.replace('<video id="walkModalVideo" controls playsinline preload="metadata"></video>', '<video id="walkModalVideo" controls playsinline preload="none"></video>');

if (!home.includes('content-visibility:auto')) {
  home = home.replace('section{padding:78px 0;border-top:1px solid var(--line)}', 'section{padding:78px 0;border-top:1px solid var(--line)}section:not(.hero){content-visibility:auto;contain-intrinsic-size:auto 760px}');
}
if (!home.includes('rel="prefetch" href="/tools/whatsapp-link/"')) {
  home = home.replace('</head>', '  <link rel="prefetch" href="/tools/whatsapp-link/">\n  <link rel="prefetch" href="/business-partner/">\n</head>');
}
fs.writeFileSync(homePath, home);

const bpPath = path.join(out, 'business-partner/index.html');
if (fs.existsSync(bpPath)) {
  let bp = fs.readFileSync(bpPath, 'utf8');
  if (!bp.includes('content-visibility:auto')) {
    bp = bp.replace('section{padding:82px 0;border-top:1px solid var(--line)}', 'section{padding:82px 0;border-top:1px solid var(--line)}section:not(.hero){content-visibility:auto;contain-intrinsic-size:auto 720px}');
  }
  if (!bp.includes('rel="prefetch" href="/"')) bp = bp.replace('</head>', '  <link rel="prefetch" href="/">\n</head>');
  if (!bp.includes('/assets/partner-dashboard.js')) bp = bp.replace('</body>', '  <script src="/assets/partner-dashboard.js" defer></script>\n</body>');
  if (!bp.includes('/assets/partner-slip-sync.js')) bp = bp.replace('</body>', '  <script src="/assets/partner-slip-sync.js" defer></script>\n</body>');
  if (!bp.includes('/assets/partner-copy-fix.js')) bp = bp.replace('</body>', '  <script src="/assets/partner-copy-fix.js" defer></script>\n</body>');
  fs.writeFileSync(bpPath, bp);
}

for (const rel of ['tools/whatsapp-link/index.html', 'tools/roi-calculator/index.html']) {
  const file = path.join(out, rel);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('rel="prefetch" href="/"')) html = html.replace('</head>', '  <link rel="prefetch" href="/">\n</head>');
  fs.writeFileSync(file, html);
}

// Raw video files are build inputs only. Do not ship them in the public deployment.
fs.rmSync(path.join(out, 'assets/screens'), { recursive: true, force: true });
fs.rmSync(path.join(out, 'assets/video'), { recursive: true, force: true });
for (const topLevelVideo of ['browsing dashboard Dan function.mp4', 'snap2ads own poster.mp4']) {
  fs.rmSync(path.join(out, topLevelVideo), { force: true });
}

console.log('LOOKaL static build complete. Compressed media is interaction-first and raw videos are excluded from dist.');
