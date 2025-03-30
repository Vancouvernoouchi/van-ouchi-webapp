import { ROUTES } from "@/constants/common/routes";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center border-t text-xs lg:text-sm text-bloom-gray h-16">
      <div className="flex gap-4 pb-1">
        <Link href={ROUTES.PRIVACY_POLICY.pathname}>プライバシーポリシー</Link>
        <Link href={ROUTES.TERMS_CONDITIONS.pathname}>利用規約</Link>
      </div>
      <p className="text-bloom-black">&copy; 2025 BLOOM CONSULTING Inc.</p>
    </footer>
  );
}

export { Footer };
