import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/common/header";
import { Categories } from "@/components/common";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Categories />
        <main className="base-px flex-1 z-0">
          <Suspense>{children}</Suspense>
          <Analytics />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
