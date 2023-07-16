import './globals.css';
import clsx from 'clsx';
import { Inter } from 'next/font/google';

import { bgColor } from '@/common/foundation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, bgColor['gray120'])}>
        <StyledLayout>{children}</StyledLayout>
        <div id="portal" />
      </body>
    </html>
  );
}

function StyledLayout({ children }: { children: React.ReactNode }) {
  return <div className={clsx('px-20px', 'h-screen')}>{children}</div>;
}
