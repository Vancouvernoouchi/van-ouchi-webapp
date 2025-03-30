import { ArticleContent } from "@/types/common/strapi/strapi";
import { SearchCheck } from "lucide-react";

/**
 * ブログ等の記事系のページの目次コンポーネント
 * @params contents {ArticleContent[]} コンテンツ
 *
 */
function ArticleOutlineFrame({ contents }: { contents: ArticleContent[] }) {
  // クリック時に該当要素へスクロール
  const handleScroll = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sm:flex sm:items-start w-full">
      <div className="my-16 rounded-lg border-2 border-bloom-blue">
        <div className="flex items-center gap-2 font-semibold py-3 px-6 bg-bloom-lightBlue border-b-2 border-bloom-blue text-bloom-blue rounded-t-lg">
          <SearchCheck />
          <span>この記事について</span>
        </div>

        <ul className="list-disc pl-10 flex flex-col gap-1 p-6 sm:pl-10 sm:pr-12">
          {contents.map((item) => (
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
  );
}

/** @package */
export { ArticleOutlineFrame };
