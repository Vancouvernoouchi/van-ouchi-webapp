"use client";
import Image from "next/image";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface CardFrameProps {
  linkTo: string;
  imageSrc?: string;
  imageAlt?: string;
  badgeMessage?: string;
  badgeStyle?: string;
  cardContent: ReactNode;
}

/**
 * 全ての一覧ページに共通するカードフレームコンポーネント
 *
 * ＠params linkTo　{string} - カード押下時の遷移先
 * ＠params imageSrc　{string} - 画像URL
 * ＠params imageAlt {string} - 画像説明文
 * ＠params badgeMessage {string}　- 画像左上に表示するメッセージ
 * ＠params badgeStyle {string}　- 画像左上に表示するメッセージの色指定
 * ＠params cardContent {ReactNode}　- カードの画像下に来るコンテンツ
 */
function CardFrame({
  linkTo,
  imageSrc,
  imageAlt,
  badgeMessage,
  badgeStyle = "bg-white",
  cardContent,
}: CardFrameProps) {
  const router = useRouter();

  /**
   * クリック時に sessionStorage に保存して遷移
   */
  const goToDetail = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("prevPath", window.location.pathname);
    }
    router.push(linkTo);
  };

  return (
    <div className="relative cursor-pointer" onClick={goToDetail}>
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
      {badgeMessage && (
        <div
          className={`absolute py-1.5 px-4 rounded-full z-50 top-3 left-3 shadow-md text-xs sm:text-sm opacity-85 ${badgeStyle}`}
        >
          {badgeMessage}
        </div>
      )}

      {/* カードコンテンツ */}
      <div className="flex flex-col w-full gap-1 pt-2 pb-6">{cardContent}</div>
    </div>
  );
}

export { CardFrame };
