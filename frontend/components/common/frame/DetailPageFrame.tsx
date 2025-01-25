import { ReactNode } from "react";

/**
 * 全ての詳細ページに共通するフレームコンポーネント
 *
 * ＠params children {ReactNode}
 */
export default function DetailPageFrame({ children }: { children: ReactNode }) {
  return <div className="px-base lg:px-12">{children}</div>;
}
