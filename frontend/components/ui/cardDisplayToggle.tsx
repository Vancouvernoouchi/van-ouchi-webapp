// components/common/CustomToggleGroup.tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CardDisplayToggleProps {
  value: string;
  onChange: (value: string) => void;
}

export function CardDisplayToggleGroup({
  value,
  onChange,
}: CardDisplayToggleProps) {
  return (
    <div className="relative flex items-center w-[120px] h-[50px] bg-blue-500 rounded-full p-1">
      <div
        className={`absolute top-1 w-1/2 h-[calc(100%-8px)] bg-white rounded-full shadow transition-transform duration-300 ${
          value === "grid" ? "translate-x-full" : ""
        }`}
      />
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => {
          if (val) onChange(val);
        }}
        className="relative z-10 flex w-full justify-between"
      >
        <ToggleGroupItem
          value="list"
          className="w-1/2 flex justify-center items-center text-black"
        >
          {/* リストアイコン */}
          <svg width="20" height="20">
            {/* ... */}
          </svg>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="grid"
          className="w-1/2 flex justify-center items-center text-black"
        >
          {/* グリッドアイコン */}
          <svg width="20" height="20">
            {/* ... */}
          </svg>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
