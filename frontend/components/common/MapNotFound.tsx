import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * 地図が表示できない時のコンポーネント
 *
 * @param message {string}
 * @param className {string}
 */
export const MapNotFound = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* 地図画像 */}
      <Image
        src="/vancouver_map.png"
        alt="バンクーバーの地図"
        width={400}
        height={300}
        objectFit="cover"
        unoptimized={true}
        className={cn("w-full h-[400px] object-cover opacity-70", className)}
      />
      {/* エラーメッセージ */}
      <div className="absolute text-center text-white p-4 bg-black/60 rounded-md text-sm sm:text-base">
        <p>{message}</p>
        <p>詳しい住所はスタッフまでお問い合わせください。</p>
      </div>
    </div>
  );
};
