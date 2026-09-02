import type { Metadata } from 'next';
import './globals.css';
const title='Priyanshi Srivastava | Software Engineer';
const description='Software engineer, BCA student at ITM GIDA, and AI and data enthusiast based in Gorakhpur. Explore my work, experience, and journey.';
export const metadata: Metadata = {title,description,icons:{icon:'/favicon.svg'},openGraph:{title,description,type:'website',images:[{url:'/og.png',alt:'Priyanshi Srivastava — Software Engineer · AI & Data Enthusiast'}]},twitter:{card:'summary_large_image',title,description,images:['/og.png']}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
