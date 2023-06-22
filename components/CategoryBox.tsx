"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
  key: string;
  label: string;
  description: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox = ({
  key,
  label,
  description,
  icon: Icon,
  selected,
}: CategoryBoxProps) => {
  return (
    <div
      className={`
      flex 
      flex-col 
      items-center 
      justify-center 
      gap-2 
      p-3 
      border-b-2 
      hover:text-neutral-800 
      cursor-pointer 
      ${ selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}
      `}
    >
        <Icon size={26} />
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  );
};

export default CategoryBox;
