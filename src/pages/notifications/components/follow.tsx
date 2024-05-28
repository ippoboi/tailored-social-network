import React from "react";
import Image, { StaticImageData } from "next/image";

import userIcon from "../../../assets/userIcon.svg";
import moreIcon from "../../../assets/moreIcon.svg";
import commentIcon from "../../../assets/commentIcon.svg";
import likeIcon from "../../../assets/likeIcon.svg";
import shareIcon from "../../../assets/shareIcon.svg";
import { defaultProfilPicture } from "@/utils/defaultImages";

export interface FollowProps {
  firstName?: string;
  username?: string;
  avatar?: any;
  profileName?: string; //pas sûr de ça
}

export default function Follow(props: FollowProps) {
  return (
    <div>
      <div className="flex flex-col bg-componentBackground gap-5 p-5 rounded-xl border-1 border-componentOutline text-subTitle">
        <div className="flex items-center">
          <div className="flex space-x-3 items-center w-full">
            <Image
              alt="userIcon"
              src={props.avatar || defaultProfilPicture}
              height={32}
              width={32}
              className="border border-btn-outline rounded w-8 h-8"
            />

            <div className="flex space-x-1">
              <div className="text-white">Dimitar</div>
              <div>followed you</div>
            </div>
          </div>
          <div className="">
            <Image alt="moreIcon" src={shareIcon} width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
