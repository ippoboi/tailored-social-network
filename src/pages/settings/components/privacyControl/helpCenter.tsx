import React from "react";
import Image from "next/image";

import changePasswordIcon from "@/assets/resetPasswordGray.svg";

export default function HelpCenter() {
  return (
    <div className="bg-componentBackground w-full space-y-6 h-4/6 rounded-xl border-1 p-5 border-componentOutline">
      <div className="flex h-full flex-col space-y-4 ">
        <div className="h-full flex flex-col space-y-4">
          <div className="flex items-center space-x-4 ">
            <div>
              <Image
                alt="changePasswordIcon"
                src={changePasswordIcon}
                width={20}
                height={20}
              />
            </div>
            <div className="text-subTitle">Change Password</div>
          </div>
          <div className="flex flex-col space-y-10">
            <div className="flex flex-col space-y-4">
              <div className="text-subTitle">Enter New Password:</div>
              <input
                type="text"
                placeholder="New Password"
                className="px-4 py-3 w-full bg-btn-background focus:outline-none rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="text-subTitle">Confirm New Password:</div>
              <input
                type="text"
                placeholder="Confirm Password"
                className="px-4 py-3 w-full bg-btn-background focus:outline-none rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex justify-center">
            <button className="p-4 w-1/2 items-center bg-btn-background focus:outline-none rounded-lg">
              <div className="text-white">Confirm</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
