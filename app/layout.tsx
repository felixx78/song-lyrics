import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppLayout from "./components/AppLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "song lyrics",
  description: "Translate your favorite song lyrics easily.",
  keywords: ["song lyrics"],
  openGraph: {
    title: "song lyrics",
    description: "Translate your favorite song lyrics easily.",
    url: "https://song-lyrics.org",
    images: [
      {
        url: "https://song-lyrics.org/_next/image?url=%2Fimage.jpg&w=640&q=75%201x,%20/_next/image?url=%2Fimage.jpg&w=1200&q=75",
        width: 600,
        height: 600,
        alt: "Song Lyrics Translation App",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
