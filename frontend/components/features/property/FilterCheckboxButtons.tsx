import FilterCheckBoxButton from "@/components/features/property/FilterCheckboxButton";
import { checkboxOptionType } from "@/config/commonOptions";
import React, { FC } from "react";

type FilterCheckboxButtonProps = {
  options: checkboxOptionType[];
};

const FilterCheckboxButtons: FC<FilterCheckboxButtonProps> = ({ options }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        return (
          <FilterCheckBoxButton
            key={o.label}
            queryKey={o.queryKey}
            icon={o.icon}
          >
            {o.label}
          </FilterCheckBoxButton>
        );
      })}
    </div>
  );
};

export default FilterCheckboxButtons;
