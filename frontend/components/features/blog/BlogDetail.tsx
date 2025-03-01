"use client";

import { DetailPageFrame } from "@/components/common/frame";
import { MarkdownRenderer } from "@/components/common/text";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Blog } from "@/types/blog";
import { List, SearchCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BlogDetail({ blog }: { blog: Blog }) {
  // 目次のクリック時に該当要素へスクロール
  const handleScroll = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // スムーズスクロール
    }
  };

  return (
    <DetailPageFrame>
      <Breadcrumb className="pb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="cursor-pointer">
              ブログ一覧
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-bloom-gray">
              {blog.metadata.metaTitle}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="tracking-wider leading-normal">
        {/* 画像 */}
        <Image
          src={blog.coverImage.url}
          alt={blog.title}
          width={250}
          height={200}
          objectFit="cover"
          unoptimized
        />
        {/* タイトル */}
        <h1 className="text-3xl font-bold py-6 sm:py-10">{blog.title}</h1>
        {/* 説明 */}
        <p>{blog.description}</p>

        {/* 目次 */}
        <div className="sm:inline-block my-14 rounded-lg border-2 border-bloom-blue">
          <div className="flex items-center gap-2 font-semibold py-3 px-6 bg-bloom-lightBlue border-b-2 border-bloom-blue text-bloom-blue rounded-t-lg">
            <SearchCheck />
            <span>この記事について</span>
          </div>

          <ul className="list-disc pl-10 flex flex-col gap-1 p-6 sm:pl-10 sm:pr-12">
            {blog.contents.map((item) => (
              <li
                key={item.id}
                className="marker:text-bloom-blue cursor-pointer hover:underline"
              >
                <button
                  className="block w-full text-left"
                  onClick={() => handleScroll(`content-${item.id}`)}
                >
                  {item.contentTitle}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* コンテンツ */}
        <div className="flex flex-col gap-16">
          {blog.contents.map((item) => (
            <div key={item.id} id={`content-${item.id}`}>
              {/* <h3 className="text-2xl font-semibold mb-4 py-2 pl-6 border-y-2 border-bloom-blue border-l-8">
                {item.contentTitle}
              </h3> */}
              <h3 className="relative text-xl font-semibold text-bloom-blue py-4 px-6 border-2 border-bloom-blue mb-4 rounded-lg">
                <span className="absolute top-[5px] left-[5px] w-[calc(100%+3px)] h-[calc(100%+3px)] bg-bloom-lightBlue z-[-1] rounded-lg"></span>
                {item.contentTitle}
              </h3>
              <MarkdownRenderer content={item.contentText} />
            </div>
          ))}
        </div>
      </div>
    </DetailPageFrame>
  );
}

/**
 * パンクズリストコンポーネント
 *
 * @param currentPageName {string}　- 現在のページの名前
 */
const BreadcrumbArea = ({ label }: { label: string }) => {
  const router = useRouter();

  /**
   * ブログ一覧に戻る
   */
  // const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault(); // リンクのデフォルト動作を無効化

  //   // 非同期で処理を行い、レンダリングサイクル外で状態更新を実施
  //   setTimeout(() => {
  //     if (window.history.length > 2) {
  //       router.back();
  //     } else {
  //       router.push("/blogs");
  //     }
  //   }, 0);
  // };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="cursor-pointer">ブログ一覧</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-bloom-gray">{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
