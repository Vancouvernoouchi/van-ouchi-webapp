/**
 * ブログ等の記事系のページのコンテンツタイトル
 * @param contentTitle {string} - タイトル
 */
function ArticleTitle({ contentTitle }: { contentTitle: string }) {
  return (
    <h3 className="relative text-base sm:text-xl tracking-widest font-semibold border-b-2 border-bloom-blue pb-2  mb-4 w-full">
      {contentTitle}
    </h3>
  );
}

/** @package */
export { ArticleTitle };
