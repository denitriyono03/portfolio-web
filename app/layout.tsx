import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Deni — Software Engineer', description: 'Portfolio of Deni, a software engineer in Jakarta, Indonesia. Web and Android projects that actually ship.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
