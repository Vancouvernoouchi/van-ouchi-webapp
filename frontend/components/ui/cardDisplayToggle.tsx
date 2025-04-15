"use client";
import { useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";

interface CustomToggleProps {
  value: string;
  onChange: (value: string) => void;
}

export function CardDisplayToggle({ value, onChange }: CustomToggleProps) {
  const isChecked = value === "2col";

  const handleToggle = () => {
    onChange(isChecked ? "1col" : "2col");
  };

  return (
    <label className="relative inline-flex w-16 h-7 bg-bloom-blue rounded-full cursor-pointer p-1 items-center justify-between">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="sr-only"
      />
      {/* スライダー（白い丸） */}
      <span
        className={`absolute top-0.5 left-[2px] h-6 w-8 rounded-full bg-white shadow-md transition-transform duration-300 ${
          isChecked ? "translate-x-7" : "translate-x-0"
        }`}
      ></span>

      {/* アイコン */}
      <div className="flex justify-between items-center w-full z-10 px-1 text-white">
        <LayoutList
          size={17}
          className={isChecked ? "text-white" : "text-black"}
        />
        <LayoutGrid
          size={17}
          className={isChecked ? "text-black" : "text-white"}
        />
      </div>
    </label>
  );
}
