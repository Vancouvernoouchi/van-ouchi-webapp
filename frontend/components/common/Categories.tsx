"use client";
import {
  BriefcaseBusiness,
  Building,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  House,
  Laptop,
  Laugh,
  LucideIcon,
  MapPinned,
  PartyPopper,
  Recycle,
  Smartphone,
  Stethoscope,
  Store,
  TreePalm,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface CategoryList {
  label: string;
  icon: LucideIcon;
  path: string;
}

// カテゴリーリスト
const categoryList: CategoryList[] = [
  {
    label: "バンクーバーのお家",
    icon: House,
    path: "/properties",
  },
  {
    label: "仕事探し",
    icon: BriefcaseBusiness,
    path: "/jobs",
  },
  {
    label: "ミートアップ・イベント",
    icon: PartyPopper,
    path: "/events",
  },
  {
    label: "マーケットプレイス",
    icon: Recycle,
    path: "/marketplace",
  },
  {
    label: "おすすめの観光地",
    icon: TreePalm,
    path: "/tourist-spots",
  },
  {
    label: "スキルマーケット",
    icon: Laugh,
    path: "/skill-market",
  },
  {
    label: "個人経営のお店",
    icon: Store,
    path: "/local-shops",
  },
  {
    label: "病院・クリニック",
    icon: Stethoscope,
    path: "/clinics",
  },
  {
    label: "留学エージェント",
    icon: Building,
    path: "/agencies",
  },
  {
    label: "携帯会社",
    icon: Smartphone,
    path: "/mobile-carriers",
  },
  {
    label: "保険会社",
    icon: HeartHandshake,
    path: "/insurance",
  },
  {
    label: "お役立ちブログ",
    icon: Laptop,
    path: "/blogs",
  },
  {
    label: "トイレマップ",
    icon: MapPinned,
    path: "/washrooms",
  },
];

/**
 * カテゴリーコンポーネント
 */
function Categories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const pathname = usePathname();

  return (
    <div className="relative py-2">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {categoryList.map((item) => (
            <CategoryBox
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              selected={pathname === item.path}
            />
          ))}
        </div>
      </div>
      {prevBtnEnabled && (
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 border bg-white p-1 rounded-full shadow-md z-10"
          onClick={scrollPrev}
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {nextBtnEnabled && (
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 border bg-white p-1 rounded-full shadow-md z-10"
          onClick={scrollNext}
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

function CategoryBox({
  icon: Icon,
  label,
  path,
  selected,
}: {
  icon: LucideIcon;
  label: string;
  path: string;
  selected: boolean;
}) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(path);
  }, [path, router]);

  return (
    <div className="flex-grow-0 flex-shrink-0 basis-1/12">
      <div
        onClick={handleClick}
        className={`flex flex-col items-center justify-between gap-1 p-2 border-b-2 hover:text-gray-800 transition cursor-pointer
        ${
          selected
            ? "border-b-gray-800 font-normal"
            : "border-transparent text-gray-500"
        }
        `}
      >
        <Icon size={22} strokeWidth={1} />
        <div className="text-[10px] whitespace-nowrap">{label}</div>
      </div>
    </div>
  );
}

export { Categories };
