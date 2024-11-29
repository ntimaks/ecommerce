import "i/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "i/components/theme-provider";
import { Archivo } from 'next/font/google'
import NavBar from "i/components/NavBar";

const archivo = Archivo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Web Shop App",
  description: "Web shop store",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.className} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
