'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function ThemeToggle(){
 const [dark,setDark]=useState(false);
 useEffect(()=>{let saved:string|null=null;try{saved=localStorage.getItem('portfolio-theme')}catch{}const value=saved==='dark';setDark(value);document.documentElement.dataset.theme=value?'dark':'light';},[]);
 function toggle(){const next=!dark;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';try{localStorage.setItem('portfolio-theme',next?'dark':'light')}catch{}}
 return <Button variant="ghost" className="theme-toggle" onClick={toggle} aria-label={dark?'Switch to light mode':'Switch to dark mode'} title={dark?'Switch to light mode':'Switch to dark mode'}>{dark?<Sun size={17}/>:<Moon size={17}/>}<span>{dark?'Light':'Dark'}</span></Button>;
}
