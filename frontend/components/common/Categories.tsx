"use client";
import {
  Apple,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Dumbbell,
  House,
  Laptop,
  LucideIcon,
  Scissors,
  Shirt,
  Store,
  Utensils,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export const categories = [
  {
    label: "お家",
    icon: House,
    path: "/properties",
  },
  // {
  //   label: "レストラン",
  //   icon: Utensils,
  //   path: "/restaurants",
  // },
  // {
  //   label: "カフェ",
  //   icon: Coffee,
  //   path: "/cafes",
  // },
  // {
  //   label: "小売店",
  //   icon: Store,
  //   path: "/retail",
  // },
  // {
  //   label: "フリマ",
  //   icon: Shirt,
  //   path: "/market",
  // },
  // {
  //   label: "スーパー",
  //   icon: Apple,
  //   path: "/groceries",
  // },
  // {
  //   label: "美容院",
  //   icon: Scissors,
  //   path: "/cafe",
  // },
  // {
  //   label: "ジム",
  //   icon: Dumbbell,
  //   path: "/gyms",
  // },
  {
    label: "お役立ちブログ",
    icon: Laptop,
    path: "blogs",
  },
];

export const Categories = () => {
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
          {categories.map((item) => (
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
          className="absolute left-4 md:left-10 xl:left-20 top-1/2 transform -translate-y-1/2 border bg-white p-1 rounded-full shadow-md z-10"
          onClick={scrollPrev}
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {nextBtnEnabled && (
        <button
          className="absolute right-4 md:right-10 xl:right-20 top-1/2 transform -translate-y-1/2 border bg-white p-1 rounded-full shadow-md z-10"
          onClick={scrollNext}
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
};

const CategoryBox = ({
  icon: Icon,
  label,
  path,
  selected,
}: {
  icon: LucideIcon;
  label: string;
  path: string;
  selected: boolean;
}) => {
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
        <Icon size={22} />
        <div className="text-[10px] whitespace-nowrap">{label}</div>{" "}
      </div>
    </div>
  );
};
