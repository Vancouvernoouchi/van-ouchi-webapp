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
      <main className="content-height z-0">
        <Categories />
        {/* <Suspense fallback={<Loader />}>{children}</Suspense> */}
        {/* <div className="w-full"> */}
        <div className="w-full mx-auto flex justify-center">
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </div>
        {/* </div> */}
      </main>
      <Analytics />
      <Footer />
    </div>
  );
};

export default MainLayout;
