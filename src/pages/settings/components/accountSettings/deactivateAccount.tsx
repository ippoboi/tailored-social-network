import React from "react";
import Image from "next/image";

import deactivateAccountIcon from "@/assets/deactivateAccountIcon.svg";

export default function DeactivateAccount() {
  const onDeactivateAccount = () => {};
  return (
    <div className="bg-componentBackground w-full space-y-6 h-4/6 rounded-xl border-1 p-5 border-componentOutline">
      <div className="flex flex-col space-y-8 h-full">
        <div className="h-full flex flex-col space-y-8">
          <div className="flex items-center space-x-4 ">
            <div>
              <Image
                alt="deactivateAccountIcon"
                src={deactivateAccountIcon}
                width={20}
                height={20}
              />
            </div>
            <div className="text-subTitle">Deactivate Account</div>
          </div>
          <div className="flex flex-col space-y-10">
            <div className="flex flex-col space-y-4">
              <div className="text-subTitle">Enter Your Password:</div>
              <input
                type="text"
                placeholder="Enter Password"
                className="px-4 py-3 text-subTitle w-full bg-btn-background focus:outline-none rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex justify-center">
            <button
              className="p-4 w-1/2 items-center bg-btn-background focus:outline-none rounded-lg"
              onClick={onDeactivateAccount}
            >
              <div className="text-red-400">Deactivate Your Account</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
