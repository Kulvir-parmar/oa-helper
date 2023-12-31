import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { AuthProvider } from '@/components/Providers/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import ModalProvider from '@/components/Providers/ModalProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'oa-helper',
  description: 'ai that will do code so that I can clear my OA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
