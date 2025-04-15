//キーボード操作での「Enter」キー押下で何かの動作をトリガーしたい時の共通ファンクション
export const handleEnterKey = (
  e: React.KeyboardEvent<HTMLElement>,
  callback: () => void
) => {
  if (e.key === "Enter") {
    callback();
  }
};
