"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

/**
 * 続きを読むコンポーネント
 *
 * @param text {string}
 */
function ReadMore({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // テキストを改行ごとに分割し、最初の6行までを表示
  const lines = text ? text.split("\n") : [];
  const previewText = lines.slice(0, 6).join("\n");

  // テキストが6行以下ならグラデーションとボタンを表示しない
  const showButtonAndGradient = lines.length > 6;

  return (
    <div className="relative pb-20">
      {/* 本文 */}
      <p
        className={`whitespace-pre-line text-sm ${
          isExpanded ? "" : "line-clamp-6"
        }`}
      >
        {isExpanded ? text : previewText}
      </p>

      {/* 下方向のグラデーション */}
      {!isExpanded && showButtonAndGradient && (
        <div className="absolute bottom-12 left-0 w-full h-20 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none" />
      )}

      {/* 展開/閉じるボタン */}
      {showButtonAndGradient && (
        <button
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-10 px-5 sm:px-10 py-2 z-10 rounded-full flex items-center justify-center gap-2 text-sm bg-grayThemeColor text-themeColor"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
          <span className="text-xs">
            {isExpanded ? "閉じる" : "続きを読む"}
          </span>
        </button>
      )}
    </div>
  );
}

export { ReadMore };
