import React from "react";
import Image from "next/image";

import settingsIcon from "@/assets/settingsIcon.svg";
import accessibilityIcon from "@/assets/accessibility.svg";
export default function Accessibility() {
  return (
    <div className="bg-componentBackground w-full space-y-6 h-4/6 rounded-xl border-1 p-5 border-componentOutline">
      <div className="flex space-x-4">
        <Image alt="settingsIcon" src={accessibilityIcon} />
        <div className="text-subTitle">Accessibility</div>
      </div>

      <div className="text-iconInactive">Coming Soon</div>
    </div>
  );
}
