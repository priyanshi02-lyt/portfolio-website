import { writeFileSync } from 'node:fs';
const raw=process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
const origin=raw ? new URL(raw).origin : '';
writeFileSync('public/robots.txt',`User-agent: *\nAllow: /\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
if(origin)writeFileSync('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`);
