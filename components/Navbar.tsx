'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
const links = [
  ['Home', '#home'], ['About', '#about'], ['Work', '#work'], ['Open Source', '#opensource'],
  ['Skills', '#skills'], ['Career', '#career'], ['Testimonials', '#testimonials'], ['Contact', '#contact'],
];
export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">{name.slice(0, 1)}</span>
          {name} <span className="hidden text-stone-500 sm:inline">/ portfolio</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {links.map(([label, href]) => (<a key={href} href={href} className="text-stone-600 hover:text-accent">{label}</a>))}
          <a href="#contact" className="rounded-full bg-accent px-4 py-2 font-medium text-white hover:bg-teal-800">Hire me</a>
        </nav>
        <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-stone-200 px-4 py-3 md:hidden">
          {links.map(([label, href]) => (<a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 hover:bg-stone-100">{label}</a>))}
        </nav>
      )}
    </header>
  );
}
