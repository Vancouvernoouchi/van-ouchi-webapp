import React from "react";
import { Skeleton } from "../../ui/skeleton";

/**
 * 一覧ページのローディング　共通コンポーネント
 */
function ListPageSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="relative shadow-md border border-gray-100 rounded-lg"
        >
          {/* 画像エリア */}
          <div className="z-0 min-w-full h-64 sm:h-48 xl:h-56 bg-slate-300 relative">
            <Skeleton className="w-full h-full" />
          </div>
          {/* 詳細エリア */}
          <div className="flex flex-col gap-1 w-full h-full p-2 pb-5">
            <div className="flex items-center">
              <Skeleton className="w-32 h-4 rounded" />
            </div>
            <div className="flex items-center">
              <Skeleton className="w-20 h-4 rounded" />
            </div>
            <div className="flex items-center">
              <Skeleton className="w-24 h-4 rounded" />
            </div>
            <div className="flex items-center">
              <Skeleton className="w-28 h-4 rounded" />
            </div>
            <div className="flex items-center">
              <Skeleton className="w-28 h-4 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ListPageSkeleton };
