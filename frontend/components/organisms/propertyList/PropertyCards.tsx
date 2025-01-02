"use client";
import PropertyCard from "@/components/molecules/propertyList/PropertyCard";

import { FC } from "react";
import { NotionProperty, PropertyCardData } from "@/types/notionTypes";
import { formatPropertyCardData } from "@/utlis/getPropertyValue";

type PropertyCardsProps = {
  paginatedProperties: NotionProperty[];
};

const PropertyCards: FC<PropertyCardsProps> = ({ paginatedProperties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
      {paginatedProperties.map((p: NotionProperty) => {
        const property: PropertyCardData | null = formatPropertyCardData(p);

        if (property !== null) {
          return <PropertyCard key={property.id} property={property} />;
        }
      })}
    </div>
  );
};

export default PropertyCards;
