"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/**
 * 以前使用していた物件詳細パス
 * もしアクセスされた場合、新しい物件詳細ページにリダイレクト
 */
const PreviousPropertyDetailPage = ({
  params,
}: {
  params: { propertyId: string };
}) => {
  const propertyId = params.propertyId;
  const router = useRouter();
  const newPath = `/properties/${propertyId}`;

  useEffect(() => {
    if (propertyId) {
      // 新しいルートにリダイレクト
      router.replace(`/properties/${propertyId}`);
    }
  }, [propertyId, router]);

  return (
    <div className="pt-10 flex flex-col justify-center items-center gap-4 text-gray-900">
      <div className="text-base font-medium">
        <p>このページは、別のURLへ移動しました。</p>
        <p>
          数秒後に自動的に新しいURLへ移動しますが、切り替わらない場合は下記のリンクをクリックしてください。
        </p>
      </div>

      <Link
        className="text-bloom-blue border-b border-bloom-blue cursor-pointer hover:opacity-60"
        href={newPath}
      >
        新しいURLへ移動
      </Link>
    </div>
  );
};

export default PreviousPropertyDetailPage;
