import Link from "next/link";
import React from "react";
import Image from "next/image";

/**
 * バンクーバーのお家のロゴ・名前が一体化したコンポーネント
 */
const OuchiLogo = () => {
  return (
    <Link
      href="/properties"
      className="flex items-center gap-2 whitespace-nowrap"
    >
      <Image
        src="/vancouver_no_ouchi_logo2.png"
        width={80}
        height={70}
        style={{ objectFit: "cover" }}
        className="w-12"
        alt="VancouverNoOuchi Image"
        unoptimized={true}
      />
      <div className="flex flex-col items-center">
        <span className="text-xs sm:text-xs font-light">
          渡航前にシェアハウスを選べる
        </span>
        <span className="text-sm sm:text-base font-semibold sm:font-extrabold tracking-widest">
          バンクーバーのお家
        </span>
      </div>
    </Link>
  );
};

export default OuchiLogo;
