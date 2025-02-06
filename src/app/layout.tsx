import 'i/styles/globals.css';

import { type Metadata } from 'next';
import { ThemeProvider } from 'i/components/theme-provider';
import NavBar from 'i/components/layout/navbar/NavBar';
import { CartProvider } from 'i/components/Cart/providers/CartProvider';
import { Toaster } from 'sonner';
import Footer from 'i/components/layout/footer/footer';

export const metadata: Metadata = {
  title: 'Web Shop App',
  description: 'Web shop store',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="w-screen max-w-[100dvw] overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Toaster />
            <NavBar />
            {children}
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
