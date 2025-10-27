import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header/Header";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ReactQueryProviders from "@/libs/providers/react-query-provider";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Plate",
  description: "알레르기 필터링으로 맞춤 비건 음식점을 찾아보세요!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable} antialiased`}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{
            top: "80px",
          }}
        />
        <Suspense fallback={<div />}>
          <Header />
        </Suspense>

        <main className="w-full h-full scroll-box">
          <ReactQueryProviders>{children}</ReactQueryProviders>
        </main>
        <div id="modal-container"></div>
      </body>
    </html>
  );
}
