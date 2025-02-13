import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface CardFrameProps {
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  labelMessage?: string;
  labelColor?: string;
  cardContent: ReactNode;
}

/**
 * 全ての一覧ページに共通するカードフレームコンポーネント
 *
 * ＠params href　{string} - カード押下時の遷移先
 * ＠params imageSrc　{string} - 画像URL
 * ＠params imageAlt {string} - 画像説明文
 * ＠params labelMessage {string}　- 画像左上に表示するメッセージ
 * ＠params labelColor {string}　- 画像左上に表示するメッセージの色指定
 * ＠params children {ReactNode}　- カードの画像下に来るコンテンツ
 */
function CardFrame({
  href,
  imageSrc,
  imageAlt,
  labelMessage,
  labelColor = "bg-white",
  cardContent,
}: CardFrameProps) {
  return (
    <Link href={`/properties/${href}`} className="relative">
      {/* 画像 */}
      <div className="relative z-0 w-full rounded-lg aspect-[9/8]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? "画像"}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
            loading="lazy"
            unoptimized={true}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 rounded-lg border">
            画像がありません
          </div>
        )}
      </div>

      {/* 画像右上に表示するラベル */}
      {labelMessage && (
        <div
          className={`absolute py-1.5 px-4 rounded-full z-50 top-3 left-3 shadow-md text-xs sm:text-sm opacity-85 ${labelColor}`}
        >
          {labelMessage}
        </div>
      )}

      {/* カードコンテンツ */}
      <div className="flex flex-col w-full gap-1 pt-2 pb-6">{cardContent}</div>
    </Link>
  );
}

export { CardFrame };
