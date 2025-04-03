"use client";

import { DetailPageFrame } from "@/components/common/frame";
import { ArticleOutlineFrame, ArticleTitle } from "@/components/common/article";
import { MarkdownRenderer } from "@/components/common/text";
import { School } from "@/types/school/schoolTypes";
import { formatDateToJapanese } from "@/utils/getPropertyValue";
import Image from "next/image";

export default function SchoolDetail({ data }: { data: School }) {
  const updatedAt = formatDateToJapanese(data.updatedAt);

  // console.log("data:::::", data.coverImage.url);

  return (
    <DetailPageFrame
      className="flex flex-col items-center w-full lg:w-[75vw]"
      pageName={data.schoolName}
    >
      <div className="tracking-wider flex flex-col">
        {/* 画像 */}
        <Image
          src={data.coverImage?.url}
          alt={data.schoolName}
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
          {data.schoolName}
        </h1>
        {/* 説明 */}
        <p className="text-sm sm:text-base leading-relaxed">
          {data.description}
        </p>

        {/* 目次 */}
        {/* <ArticleOutlineFrame contents={data.contents} /> */}

        {/* コンテンツ */}
        {/* <div className="flex flex-col gap-16 lg:gap-20 pb-14">
          {data.contents.map((item) => (
            <div key={item.id} id={`content-${item.id}`}>
              <ArticleTitle contentTitle={item.contentTitle} />
              <MarkdownRenderer content={item.contentText} />
            </div>
          ))}
        </div> */}

        {/* 著者 */}
        {data.author && (
          <div className="relative border-2 border-bloom-blue rounded-lg pt-6 pb-8 sm:py-10 px-6 sm:px-10 mt-10 mb-14">
            <h3 className="absolute -top-4 text-lg font-semibold tracking-widest text-bloom-blue bg-white px-2 ml-2">
              この記事を書いた人
            </h3>
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-10">
              <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 items-center">
                <Image
                  src={data.author.avatar.url ?? "/user.png"}
                  alt={data.author.name}
                  width={50}
                  height={50}
                  className="object-cover rounded-full w-16 h-16"
                />
                <p className="text-lg font-semibold tracking-widest">
                  {data.author.name}
                </p>
              </div>

              <div className="flex items-center justify-start">
                <div className="text-xs sm:text-sm whitespace-pre-wrap text-bloom-gray">
                  {data.author.description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DetailPageFrame>
  );
}
