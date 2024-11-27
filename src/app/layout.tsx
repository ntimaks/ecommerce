import "i/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "i/components/theme-provider";
import { Archivo } from 'next/font/google'

const archivo = Archivo({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Aorist App",
  description: "aorist store",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}