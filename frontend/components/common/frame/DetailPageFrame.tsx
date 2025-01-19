import { ReactNode } from "react";

export default function DetailPageFrame({ children }: { children: ReactNode }) {
  return <div className="px-base lg:px-12">{children}</div>;
}
