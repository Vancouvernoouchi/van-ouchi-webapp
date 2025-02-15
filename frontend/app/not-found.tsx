import { Categories } from "@/components/common";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="min-h-[calc(100vh-64px-64px)] lg:min-h-[calc(100vh-80px-68px)] z-0">
          <div className="flex flex-col items-center pt-10 px-4">
            <p className="text-bloom-balck">
              ページが見つかりませんでした。URLをお確かめください。
            </p>

            <Link
              className="text-bloom-blue border-b border-bloom-blue cursor-pointer hover:opacity-60"
              href="/properties"
            >
              ホームへ戻る
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default NotFoundPage;
