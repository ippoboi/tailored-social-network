import React from "react";
import Image from "next/image";

import privacySafetyIcon from "@/assets/privacySafetyGray.svg";
import blockedUsersIcon from "@/assets/blockedUsersIcon.svg";
import romainIcon from "@/assets/romainIcon.svg";

import BlockedUsers from "@/pages/settings/components/privacyControl/blockedUsers";

export default function PrivacyAndSafety() {
  return (
    <div className="bg-componentBackground w-full space-y-6 h-4/6 rounded-xl border-1 p-5 border-componentOutline">
      <div className="flex space-x-4 w-full">
        <Image alt="privacyAndSafetyIcon" src={privacySafetyIcon} />
        <div className="text-subTitle">Privacy and Safety</div>
      </div>

      <div className="flex space-x-4">
        <Image
          alt="blockedUsersIcon"
          src={blockedUsersIcon}
          width={16}
          height={16}
        />
        <div className="text-iconInactive">Blocked Accounts</div>
      </div>
      <BlockedUsers
        userImage={romainIcon}
        userName="Romain"
        userPseudo="rohe61420"
      />
      <BlockedUsers
        userImage={romainIcon}
        userName="Romain"
        userPseudo="rohe61420"
      />
      <BlockedUsers
        userImage={romainIcon}
        userName="Romain"
        userPseudo="rohe61420"
      />
    </div>
  );
}
