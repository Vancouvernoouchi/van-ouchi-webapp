"use client";
import { useRouter } from "next/navigation";
import React from "react";

function DevelopingMessage() {
  const router = useRouter();

  return (
    <div className="pt-10 flex flex-col justify-center items-center gap-4 text-gray-900">
      <div className="flex flex-col justify-center items-center text-base font-medium">
        <p>このページは現在開発中です。</p>
        <p>This page is developing.</p>
      </div>

      <div
        className="text-bloom-blue border-b border-bloom-blue cursor-pointer hover:opacity-60"
        onClick={() => {
          router.push("/properties");
        }}
      >
        戻る / Back
      </div>
    </div>
  );
}

/** @package */
export { DevelopingMessage };
