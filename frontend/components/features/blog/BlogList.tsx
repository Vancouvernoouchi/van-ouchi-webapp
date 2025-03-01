"use client";

import { CardFrame, ListPageFrame } from "@/components/common/frame";
import { Blog } from "@/types/blog";
import { PaginationType } from "@/types/common/strapi/index";
import { formatDateToJapanese } from "@/utlis/getPropertyValue";

/**
 * ブログ一覧ページ
 * ＠params blogs {Blog[]} - ブログリスト
 * @params pagination {pagination}
 */
export default function BlogList({
  blogs,
  pagination,
}: {
  blogs: Blog[];
  pagination: PaginationType;
}) {
  return (
    <ListPageFrame
      pagination={pagination}
      cardArea={<CardArea blogs={blogs} />}
    />
  );
}

/**
 * ブログ一覧ページのカードを一覧で表示するエリア
 * ＠params blogs {Blog[]} - ブログリスト
 */
const CardArea = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <>
      {blogs.map((blog) => (
        <CardFrame
          key={blog.id}
          linkTo={`/blogs/${blog.id.toString()}`}
          imageSrc={blog.coverImage.url}
          imageAlt={blog.title}
          cardContent={<CardContent blog={blog} />}
          labelMessage={blog.category?.categoryName}
        />
      ))}
    </>
  );
};

/**
 * カードの画像以下の部分
 * ＠params peoperty {PropertyCardData}
 */
const CardContent = ({ blog }: { blog: Blog }) => {
  const updatedAt = formatDateToJapanese(blog.updatedAt);
  return (
    <>
      <p className="text-sm sm:text-base font-medium">{blog.title}</p>
      <p className="text-sm text-bloom-gray">{updatedAt}</p>
    </>
  );
};
