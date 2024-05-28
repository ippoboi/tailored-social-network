import React from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

export interface BlockedUsersProps {
  userName?: string;
  userPseudo?: string;
  userImage?: StaticImageData | undefined;
}
export default function BlockedUsers(props: BlockedUsersProps) {
  return (
    <div className="flex space-x-4 items-center ">
      <div className="flex space-x-4 w-full">
        <Image
          alt="userImage"
          src={props.userImage || ""}
          width={56}
          height={56}
        />
        <div>
          <div className="text-white">{props.userName}</div>
          <div className="text-subTitle">@{props.userPseudo}</div>
        </div>
      </div>
      <div>
        <button className="text-subTitle px-5 py-1 border border-1 rounded-xl">
          Unblock
        </button>
      </div>
    </div>
  );
}
