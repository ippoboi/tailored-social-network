import React from "react";
import Image from "next/image";

import notificationSettingsIcon from "@/assets/notificationSettingsIcon.svg";
import offIcon from "@/assets/protectPostIcon.svg";
import onIcon from "@/assets/onIcon.svg";

export default function NotificationsSettings() {
  return (
    <div className="bg-componentBackground w-full space-y-6 h-4/6 rounded-xl border-1 p-5 border-componentOutline">
      <div className="flex space-x-4 w-full">
        <Image alt="privacyAndSafetyIcon" src={notificationSettingsIcon} />
        <div className="text-subTitle">Notifications</div>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col space-x-4">
          <div className="flex space-x-4 ">
            <div className="flex space-x-4 w-full">
              <div className="text-white">Post</div>
              <div>On</div>
            </div>
            <Image alt="onIcon" src={onIcon} width={46} height={25} />
          </div>

          <div className="flex space-x-4">
            <div className="flex space-x-4 w-full">
              <div className="text-white">Mention</div>
              <div>Off</div>
            </div>
            <button>
              <Image alt="offIcon" src={offIcon} width={46} height={25} />
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="flex space-x-4 w-full">
              <div className="text-white">Direct Messages</div>
              <div>On</div>
            </div>
            <Image alt="onIcon" src={onIcon} width={46} height={25} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-4">
            <div className="text-white">Likes</div>
            <div>On</div>
            <Image alt="onIcon" src={onIcon} width={46} height={25} />
          </div>
          <div className="flex space-x-4">
            <div className="text-white">New Follower</div>
            <div>On</div>
            <Image alt="onIcon" src={onIcon} width={46} height={25} />
          </div>
        </div>
      </div>
    </div>
  );
}
