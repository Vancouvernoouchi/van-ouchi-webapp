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
          linkTo={`/bloom-news/${bloomNews.documentId.toString()}`} // 詳細画面の遷移先パス
          imageSrc={bloomNews.coverImage.url} // カードの画像
          imageAlt={bloomNews.title} // 画像の説明文
          cardContent={<CardContent bloomNews={bloomNews} />} // 画像下にくる部分　（別途作成）
          badgeMessage={bloomNews.category?.categoryName} // 左上のバッヂ
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
      {/* 更新日 */}
      <p className="text-sm text-bloom-gray">{updatedAt}</p>
    </>
  );
}
