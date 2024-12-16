"use client";
import PropertyCard from "@/components/molecules/propertiesList/PropertyCard";

import { FC } from "react";
import { FormattedPropertyData, NotionProperty } from "@/types/notionTypes";
import { formatPropertyData } from "@/utlis/getPropertyValue";

type PropertyCardsProps = {
  paginatedProperties: NotionProperty[];
};

const PropertyCards: FC<PropertyCardsProps> = ({ paginatedProperties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
      {paginatedProperties.map((p: NotionProperty) => {
        const property: FormattedPropertyData | null = formatPropertyData(p);

        if (property !== null) {
          return <PropertyCard key={property.id} property={property} />;
        }
      })}
    </div>
  );
};

export default PropertyCards;
