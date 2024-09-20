import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const firaGO = localFont({
  src: "./fonts/FiraGO.woff2",
  variable: "--font-fira-go",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Real Estate Manager",
  description:
    "უძრავი ქონების ლისტინგების გვერდი, სადაც მომხმარებელი დამატებული უძრავი ქონების სრულ სიას ნახავს.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaGO.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
