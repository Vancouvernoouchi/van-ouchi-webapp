"use client";

import { CardFrame, ListPageFrame } from "@/components/common/frame";
import { BloomNews } from "@/types/bloomNews/bloomNewsTypes";
import { PaginationType } from "@/types/common/strapi/strapi";
import { formatDateToJapanese } from "@/utils/getPropertyValue";

/**
 *  ニュース一覧ページ
 * ＠params data {BloomNews[]} - ニュースリスト
 * @params pagination {pagination}
 */
export default function BloomNewsList({
  data,
  pagination,
}: {
  data: BloomNews[];
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
 * ニュース一覧ページのカードを一覧で表示するエリア
 * ＠params data {BloomNews[]} - ニュースリスト
 */
function CardArea({ data }: { data: BloomNews[] }) {
  return (
    <>
      {/* マップで並べる */}
      {data.map((bloomNews) => (
        <CardFrame
          key={bloomNews.documentId}
          linkTo={`/bloom-news/${bloomNews.documentId.toString()}`}
          imageSrc={bloomNews.coverImage.url}
          imageAlt={bloomNews.title}
          cardContent={<CardContent bloomNews={bloomNews} />}
          badgeMessage={bloomNews.category?.categoryName}
        />
      ))}
    </>
  );
}

/**
 * カードの画像以下の部分
 * ＠params property {PropertyCardData}
 */
function CardContent({ bloomNews }: { bloomNews: BloomNews }) {
  const updatedAt = formatDateToJapanese(bloomNews.updatedAt);
  return (
    <>
      {/* ニュースタイトル */}
      <p className="text-sm sm:text-base font-medium">{bloomNews.title}</p>
      {/* 公開日 */}
      <p className="text-sm text-bloom-gray">{bloomNews.reportDate}</p>
    </>
  );
}
