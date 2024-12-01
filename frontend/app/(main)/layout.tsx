import Header from "@/components/organisms/Header";
import { Suspense } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="base-px flex-1 z-0">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
