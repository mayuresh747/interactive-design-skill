import type { Metadata } from 'next';
import './globals.css';
// {{FONT_IMPORTS}}

export const metadata: Metadata = {
  title: '{{SITE_TITLE}}',
  description: '{{SITE_DESCRIPTION}}',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
