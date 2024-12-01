import { FC } from "react";

type PropertyConditionCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: any;
};

const PropertyConditionCard: FC<PropertyConditionCardProps> = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex justify-center items-center gap-1 px-2 sm:px-6 py-2 min-h-24 border border-themeColor rounded-md shadow-md">
      <Icon className="flex items-center justify-center text-themeColor w-8 h-8" />
      <div className="flex flex-col items-center justify-center w-full text-sm sm:text-base">
        <p className="font-bold text-themeColor">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default PropertyConditionCard;
