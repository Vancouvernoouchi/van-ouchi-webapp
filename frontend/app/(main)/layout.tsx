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
      <main className="min-h-[calc(100vh-64px-64px)] lg:min-h-[calc(100vh-80px-68px)] z-0">
        <Categories />
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </main>
      <Analytics />
      <Footer />
    </div>
  );
};

export default MainLayout;
