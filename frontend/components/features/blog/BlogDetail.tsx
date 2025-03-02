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
import { formatDateToJapanese } from "@/utlis/getPropertyValue";
import { Instagram, List, SearchCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BlogDetail({ blog }: { blog: Blog }) {
  // 目次のクリック時に該当要素へスクロール
  const handleScroll = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const updatedAt = formatDateToJapanese(blog.updatedAt);
  console.log(blog);

  return (
    <DetailPageFrame className="flex flex-col items-center">
      <div className="lg:w-[60vw]">
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
        <div className="tracking-wider flex flex-col items-center">
          {/* 画像 */}
          <Image
            src={blog.coverImage.url}
            alt={blog.title}
            width={250}
            height={200}
            className="w-full h-[250px] lg:h-[400px] object-cover"
            objectFit="cover"
            unoptimized
          />
          {/* 最終更新日 */}
          <p className="text-right w-full pt-2 text-xs sm:text-sm text-bloom-gray">
            最終更新日: {updatedAt}
          </p>
          {/* タイトル */}
          <h1 className="text-2xl sm:text-3xl font-bold py-6 sm:py-10">
            {blog.title}
          </h1>
          {/* 説明 */}
          <p className="text-sm sm:text-base leading-relaxed">
            {blog.description}
          </p>

          {/* 目次 */}
          <div className="sm:flex sm:items-start w-full">
            <div className="my-16 rounded-lg border-2 border-bloom-blue">
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
          </div>

          {/* コンテンツ */}
          <div className="flex flex-col gap-16 lg:gap-20 pb-14">
            {blog.contents.map((item) => (
              <div key={item.id} id={`content-${item.id}`}>
                <h3 className="relative text-base sm:text-xl tracking-widest font-semibold text-bloom-blue py-4 px-4 sm:px-6 border-2 border-bloom-blue mb-4 rounded-lg">
                  <span className="absolute top-[5px] left-[5px] w-[calc(100%+3px)] h-[calc(100%+3px)] bg-bloom-lightBlue z-[-1] rounded-lg"></span>
                  {item.contentTitle}
                </h3>
                <MarkdownRenderer content={item.contentText} />
              </div>
            ))}
          </div>

          {/* 著者 */}
          <div className="relative border-2 border-bloom-blue rounded-lg pt-6 pb-8 sm:py-10 px-6 sm:px-10 mt-10 mb-14">
            <h3 className="absolute -top-4 text-lg font-semibold tracking-widest text-bloom-blue bg-white px-2 ml-2">
              この記事を書いた人
            </h3>
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-10">
              <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 items-center">
                <Image
                  src={blog.author.avatar.url}
                  alt={blog.author.name}
                  width={50}
                  height={50}
                  className="object-cover rounded-full w-16 h-16"
                />
                <p className="text-lg font-semibold tracking-widest">
                  {blog.author.name}
                </p>
              </div>

              <div className="flex items-center justify-start">
                <div className="text-xs sm:text-sm whitespace-pre-wrap text-bloom-gray">
                  {blog.author.message}
                </div>
              </div>
            </div>
          </div>
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
