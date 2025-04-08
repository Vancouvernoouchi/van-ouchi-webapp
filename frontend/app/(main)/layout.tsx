import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/common/header";
import { Categories } from "@/components/common";
import { Footer } from "@/components/common/footer";
import { Loader } from "@/components/common/loading";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-w-screen">
      <Header />
      <Categories />
      <main className="content-height z-0">
        <div className="w-full">
          <div className="w-full max-w-[1500px] mx-auto px-4">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
        </div>
      </main>
      <Analytics />
      <Footer />
    </div>
  );
};

export default MainLayout;
