import Image from "next/image";
import React from "react";

interface LoveCompProps {
  icon: string;
  something: string;
  category: string;
}

export default function LoveComp({ icon, something, category }: LoveCompProps) {
  return (
    <div className="flex gap-1">
      <Image alt="icon" src={icon} width={24} height={24} />
      <div className="flex gap-1 items-end">
        <div className="text-white text-xl">{something}</div>
        <div className="text-subTitle">{category}</div>
      </div>
    </div>
  );
}
