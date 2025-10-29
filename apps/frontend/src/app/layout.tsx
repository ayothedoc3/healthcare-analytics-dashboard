import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Medical Analytics Dashboard',
  description: 'Healthcare analytics dashboard with real-time metrics and reporting',
  authors: [{ name: 'Ayokunle Ademola-John' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
