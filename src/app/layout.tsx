import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { UmkmProvider } from '@/context/UmkmContext';
import AuthGuard from '@/components/AuthGuard';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'DigiPajak UMKM',
  description: 'Simulasi dan Analisis Pajak UMKM',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UmkmProvider>
            <AuthGuard>
              {children}
            </AuthGuard>
            <Toaster />
          </UmkmProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
