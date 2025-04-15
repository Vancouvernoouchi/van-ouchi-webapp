"use client";

import { CardFrame, ListPageFrame } from "@/components/common/frame";
import { Blog } from "@/types/blog/blogTypes";
import { PaginationType } from "@/types/common/strapi/strapi";
import { formatDateToJapanese } from "@/utils/getPropertyValue";

/**
 * ブログ一覧ページ
 * ＠params data {Blog[]} - ブログリスト
 * @params pagination {pagination}
 */
export default function BlogList({
  data,
  pagination,
}: {
  data: Blog[];
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
function CardArea({ data }: { data: Blog[] }) {
  return (
    <>
      {/* マップで並べる */}
      {data.map((blog, index: number) => {
        const tabIndex = 100 + index; // 各ページで100からスタート
        return (
          <CardFrame
            tabIndex={tabIndex}
            key={blog.documentId}
            linkTo={`/blogs/${blog.documentId.toString()}`} // 詳細画面の遷移先パス
            imageSrc={blog.coverImage.url} // カードの画像
            imageAlt={blog.title} // 画像の説明文
            cardContent={<CardContent blog={blog} />} // 画像下にくる部分　（別途作成）
            badgeMessage={blog.category?.categoryName} // 左上のバッヂ
          />
        );
      })}
    </>
  );
}

/**
 * カードの画像以下の部分
 * ＠params property {PropertyCardData}
 */
function CardContent({ blog }: { blog: Blog }) {
  const updatedAt = formatDateToJapanese(blog.updatedAt);
  return (
    <>
      {/* ブログタイトル */}
      <p className="text-sm sm:text-base font-medium">{blog.title}</p>
      {/* 更新日 */}
      <p className="text-sm text-bloom-gray">{updatedAt}</p>
    </>
  );
}
