import React, { useState } from "react";
import Image from "next/image";

import userIcon from "@/assets/userIcon.svg";
import mockProfileIcon from "@/assets/mockProfilPic.png";
import phoneIcon from "@/assets/phoneIcon.svg";
import protectPostIcon from "@/assets/protectPostIcon.svg";
import commentBlockIcon from "@/assets/commentBlockIcon.svg";
import languageIcon from "@/assets/languageIcon.svg";
import genderIcon from "@/assets/genderIcon.svg";
import emailIcon from "@/assets/emailIcon.svg";
import countryIcon from "@/assets/countryIcon.svg";
import frenchFlagIcon from "@/assets/frenchFlagIcon.svg";
import birthdayCakeIcon from "@/assets/birthdayCakeIcon.svg";
import { User } from "@/interface/typeInterface";
import onIcon from "@/assets/onIcon.svg";
import { defaultProfilPicture } from "@/utils/defaultImages";

export default function AccountInformation(props: User) {
  const [commentBlockActive, setCommentBlockActive] = useState(false);

  const onChangeProtectPost = () => {
    setCommentBlockActive(!commentBlockActive);
  };
  return (
    <div className="bg-componentBackground w-full space-y-6 h-4/6 rounded-xl border-1 p-5 border-componentOutline">
      <div className="flex items-center space-x-4 ">
        <div>
          <Image alt="userIcon" src={userIcon} width={20} height={20} />
        </div>
        <div className="text-subTitle">Account Information</div>
      </div>
      <div className="flex flex-col  space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4 w-full bg-componentOutline rounded-xl p-1">
            <Image
              className="rounded-xl"
              alt="mockIcon"
              src={defaultProfilPicture}
              width={56}
              height={56}
            />
            <div className="flex flex-col justify-center">
              <div className="text-white">{props.firstName}</div>
              <div className="text-subTitle">@{props.username}</div>
            </div>
          </div>
          <div className="flex space-x-4 w-full bg-componentOutline rounded-xl p-1">
            <Image alt="phoneIcon" src={phoneIcon} height={24} width={24} />
            <div className="flex flex-col space-y-2">
              <div className="text-white">Phone</div>
              <div className="text-subTitle">+33 665645342</div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center p-1 pt-5 pb-5 space-x-4 w-full bg-componentOutline rounded-xl">
            <div className="flex  space-x-4 w-full">
              <Image
                className="rounded-xl"
                alt="commentBlockIcon"
                src={commentBlockIcon}
                width={24}
                height={24}
              />

              <div className="text-white">Protect Posts</div>
            </div>
            {commentBlockActive ? (
              <button className="" onClick={onChangeProtectPost}>
                <Image
                  className="p-1"
                  alt="protectPostIcon"
                  src={onIcon}
                  height={60}
                  width={60}
                />
              </button>
            ) : (
              <button className="" onClick={onChangeProtectPost}>
                <Image
                  className="p-1"
                  alt="protectPostIcon"
                  src={protectPostIcon}
                  height={60}
                  width={60}
                />
              </button>
            )}
          </div>
          <div className="flex space-x-4 w-full bg-componentOutline rounded-xl p-1">
            <Image alt="emailIcon" src={emailIcon} height={24} width={24} />
            <div className="flex flex-col space-y-2">
              <div className="text-white">Email</div>
              <div className="text-subTitle">{props.email}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4 w-full bg-componentOutline rounded-xl p-1">
            <Image
              className="rounded-xl"
              alt="languageIcon"
              src={languageIcon}
              width={24}
              height={24}
            />
            <div className="flex flex-col space-y-2">
              <div className="text-white">Language</div>
              <div className="text-subTitle">English</div>
            </div>
          </div>
          <div className="flex space-x-4 w-full bg-componentOutline rounded-xl p-1">
            <div className="flex space-x-4 w-full ">
              <Image
                alt="countryIcon"
                src={countryIcon}
                height={24}
                width={24}
              />
              <div className="flex flex-col space-y-2">
                <div className="text-white">Country</div>
                <div className="text-subTitle">France</div>
              </div>
            </div>

            <Image
              alt="frenchFlag"
              src={frenchFlagIcon}
              height={32}
              width={48}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4 w-full bg-componentOutline rounded-xl p-1">
            <Image
              className="rounded-xl"
              alt="genderIcon"
              src={genderIcon}
              width={24}
              height={24}
            />
            <div className="flex flex-col space-y-2">
              <div className="text-white">Gender</div>
              <div className="text-subTitle">Male</div>
            </div>
          </div>
          <div className="flex space-x-4 w-full bg-componentOutline rounded-xl p-1">
            <Image
              alt="birthdayCakeIcon"
              src={birthdayCakeIcon}
              height={24}
              width={24}
            />
            <div className="flex flex-col space-y-2">
              <div className="text-white">Birthday</div>
              <div className="text-subTitle">15/06/2002</div>
            </div>
            <div className="text-subTitle">DD/MM/YYYY</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-subTitle">Created at:</div>
          <div className="text-subTitle">May 21, 2024, 1:13:17 PM</div>
        </div>
      </div>
    </div>
  );
}
