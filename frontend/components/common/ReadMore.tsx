"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ReadMoreProps {
  text: string;
  maxHeight?: number;
}

/**
 * 続きを読むコンポーネント
 *
 * @param text {string}
 * @param maxHeight {number} - (px)
 */
export function ReadMore({ text, maxHeight = 150 }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const fullHeight = useRef<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      fullHeight.current = scrollHeight;
      setShowButton(scrollHeight > maxHeight);
    }
  }, [maxHeight]);

  return (
    <div className="relative">
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? `${fullHeight.current}px` : `${maxHeight}px`,
        }}
      >
        <p ref={contentRef} className="whitespace-pre-line text-sm">
          {text}
        </p>
      </div>

      {!isExpanded && showButton && (
        <div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pointer-events-none"
          style={{ height: "100px" }}
        />
      )}

      {showButton && (
        <div className="relative mt-2 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="px-5 sm:px-10 py-2 rounded-full flex items-center justify-center gap-2 text-sm bg-bloom-grayishBlue text-bloom-blue border border-bloom-grayishBlue z-10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                閉じる
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                続きを読む
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
