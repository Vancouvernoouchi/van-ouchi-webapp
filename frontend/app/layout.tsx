import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";

import "./globals.css";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { Toaster } from "sonner";

const fontNotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export async function generateMetadata() {
  const headersList = headers();
  const ua = headersList.get("user-agent");

  const device = new UAParser(ua || "").getDevice();

  const isMobile = device.type === "mobile";

  if (isMobile) {
    return {
      title: "BLOOM バンクーバー情報サイト",
      description:
        "バンクーバー留学の総合情報サイト。シェアハウス、仕事、観光地、Co-op留学向けインターンなど幅広い情報を提供。ワーホリや留学の第一歩に最適。",
      icons: { icon: "/favicon.ico" },
    };
  } else {
    return {
      title: "BLOOM バンクーバー情報サイト",
      description:
        "バンクーバー留学の総合情報サイト。シェアハウス、仕事、観光地、Co-op留学向けインターンなど幅広い情報を提供。ワーホリや留学の第一歩に最適。",
      icons: { icon: "/favicon.ico" },
    };
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={fontNotoSansJP.className}>
        <Toaster
          toastOptions={{
            duration: 5000,
            classNames: {
              error: "border-l-4 border-red-500 bg-red-50 border-0",
              success: "border-l-4 border-green-500 bg-green-50 border-0",
              warning: "border-l-4 border-yellow-500 bg-yellow-50 border-0",
              info: "border-l-4 border-blue-500 bg-blue-50 border-0",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
