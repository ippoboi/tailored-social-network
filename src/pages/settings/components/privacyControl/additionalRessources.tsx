import React from "react";
import Image from "next/image";

import changePasswordIcon from "@/assets/resetPasswordGray.svg";
import upRightArrow from "@/assets/upRightArrow.svg";
import additionalRessourcesIcon from "@/assets/ressourcesIcon.svg";

export default function AdditionalRessources() {
  return (
    <div className="bg-componentBackground w-full space-y-6 h-4/6 rounded-xl border p-5 border-componentOutline">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <Image
            alt="additionalRessourcesIcon"
            src={additionalRessourcesIcon}
          />
          <div className="text-subTitle">Additional Ressources</div>
        </div>

        <div className="flex space-x-4">
          <div className=" border-b  text-iconInactive">Term of services</div>
          <Image alt="upRightArrow" src={upRightArrow} width={10} height={10} />
        </div>
        <div className="flex space-x-4">
          <div className="border-b  text-iconInactive">Privacy Policy</div>
          <Image alt="upRightArrow" src={upRightArrow} width={10} height={10} />
        </div>
        <div className="flex space-x-4">
          <div className=" border-b text-iconInactive">Cookie Policy</div>
          <Image alt="upRightArrow" src={upRightArrow} width={10} height={10} />
        </div>
        <div className="flex space-x-4">
          <div className=" border-b text-iconInactive">Release Notes</div>
          <Image alt="upRightArrow" src={upRightArrow} width={10} height={10} />
        </div>
      </div>
    </div>
  );
}
