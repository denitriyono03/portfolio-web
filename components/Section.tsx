import type { ReactNode } from 'react';
import Reveal from './Reveal';
export function Section({ id, eyebrow, title, children, note }: { id: string; eyebrow: string; title: string; children: ReactNode; note?: string }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {note && <p className="mt-3 max-w-3xl rounded-xl bg-amber-50 px-4 py-3 text-sm text-stone-600">{note}</p>}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}
