import 'i/styles/globals.css';

import { type Metadata } from 'next';
import { ThemeProvider } from 'i/components/theme-provider';
import { Archivo } from 'next/font/google';
import NavBar from 'i/components/NavBar';
import { CartProvider } from 'i/components/Cart/providers/CartProvider';
const archivo = Archivo({ subsets: ['latin'] });
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Web Shop App',
  description: 'Web shop store',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.className} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Toaster />
            <NavBar />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
