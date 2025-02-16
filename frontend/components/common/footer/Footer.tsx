import { LINKS } from "@/constants/common";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center border-t text-sm text-bloom-gray h-16">
      <div className="flex gap-4 pb-1">
        <Link href={LINKS.PRIVACY_POLICY}>プライバシーポリシー</Link>
        <Link href={LINKS.TERMS_CONDITIONS}>利用規約</Link>
      </div>
      <p className="text-sm text-bloom-balck">
        &copy; 2025 BLOOM CONSULTING Inc.
      </p>
    </footer>
  );
}

export { Footer };
