import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/shared/header";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/shared/providers";


const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Главная",
  description: "описание!",
};

export default function RootLayout({
  children,
}
  :
  {
    children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${nunito.variable} antialiased`}>
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
