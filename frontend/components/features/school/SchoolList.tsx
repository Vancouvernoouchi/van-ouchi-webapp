"use client";

import { CardFrame, ListPageFrame } from "@/components/common/frame";
import { PaginationType } from "@/types/common/strapi/strapi";
import { School } from "@/types/school/schoolTypes";
import { formatDateToJapanese } from "@/utils/getPropertyValue";

/**
 * ブログ一覧ページ
 * ＠params data {Blog[]} - ブログリスト
 * @params pagination {pagination}
 */
export default function SchoolList({
  data,
  pagination,
}: {
  data: School[];
  pagination: PaginationType;
}) {
  return (
    <ListPageFrame
      pagination={pagination}
      cardArea={<CardArea data={data} />}
    />
  );
}

/**
 * ブログ一覧ページのカードを一覧で表示するエリア
 * ＠params data {Blog[]} - ブログリスト
 */
function CardArea({ data }: { data: School[] }) {
  return (
    <>
      {/* マップで並べる */}
      {data.map((school) => (
        <CardFrame
          key={school.documentId}
          linkTo={`/school/${school.documentId.toString()}`} // 詳細画面の遷移先パス
          imageSrc={school.coverImage?.url}
          imageAlt={school.schoolName} // 画像の説明文
          cardContent={<CardContent school={school} />} // 画像下にくる部分　（別途作成）
          // badgeMessage={school.category?.categoryName} // 左上のバッヂ
        />
      ))}
    </>
  );
}

/**
 * カードの画像以下の部分
 * ＠params property {PropertyCardData}
 */
function CardContent({ school }: { school: School }) {
  const updatedAt = formatDateToJapanese(school.updatedAt);
  return (
    <>
      {/* ブログタイトル */}
      <p className="text-sm sm:text-base font-medium">{school.schoolName}</p>
      {/* 更新日 */}
      <p className="text-sm text-bloom-gray">{updatedAt}</p>
    </>
  );
}
