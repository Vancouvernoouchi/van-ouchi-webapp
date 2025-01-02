import { SkeletonPropertyCard } from "@/components/molecules/propertyList/SkeletonCard";
import React from "react";

const PropertyListLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {[...Array(30)].map((_, i) => (
        <SkeletonPropertyCard key={i} />
      ))}
    </div>
  );
};

export default PropertyListLoading;
