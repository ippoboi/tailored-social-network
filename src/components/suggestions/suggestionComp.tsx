import userIcon from "@/assets/userIcon.svg";

import Image, { StaticImageData } from "next/image";

import mockProfilPic from "@/assets/mockProfilPic.png";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { defaultProfilPicture } from "@/utils/defaultImages";

export default function SuggestionComp(props: any) {
  const { user } = useAuth();
  const [followed, setFollowed] = useState(false);

  const FOLLOW = gql`
    mutation follow($userToFollowId: ID! = ${
      props._id
    }, $_userId: ID = ${JSON.stringify(user._id)}) {
      updateUsers(
        connect: { followers: { where: { node: { _id: $_userId } } } }
        where: { _id: $userToFollowId }
      ) {
        users {
          followersAggregate {
            count
          }
          email
        }
      }
    }
  `;

  return (
    <div className="w-full flex min-w-96  bg-inputField-background rounded-md border border-componentOutline p-2 justify-center items-center">
      <div className="flex w-full items-center gap-3">
        <Image
          alt="userIcon"
          src={defaultProfilPicture}
          height={64}
          width={64}
          className="rounded"
        />
        <div className="flex flex-col text-subTitle ">
          <div className=" text-white">{props.firstName}</div>
          <div className="flex flex-row gap-1">
            Loves{" "}
            <span className="text-success">
              {props.hobbies[0].name.toLowerCase()}
            </span>
            like you
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-[4px] bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-lg">
          Follow
        </button>
        <Link
          href={`/profile/${props.username}`}
          className="px-3 py-[4px] bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-lg"
        >
          See
        </Link>
      </div>
    </div>
  );
}

//John Victor
