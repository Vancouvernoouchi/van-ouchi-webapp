import { Categories } from "@/components/common";
import { Header } from "@/components/common/header";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Categories />
        <div className="pt-10 flex flex-col justify-center items-center gap-4">
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
      </div>
    </div>
  );
};

export default NotFoundPage;
