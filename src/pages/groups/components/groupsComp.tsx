import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import userIcon from "@/assets/userIcon.svg";
import groupNumberIcon from "@/assets/groupNumberIcon.svg";

import mockProfilPic from "@/assets/mockProfilPic.png";
import { useAuth } from "@/context/AuthContext";
import { gql, useMutation } from "@apollo/client";
import { defaultGroupsPicture } from "@/utils/defaultImages";

export interface GroupsProps {
  eventImage?: string;
  description?: number;
  createdAt?: boolean;
  id: string;
  name: string;
  members: any;
  membersAggregate: any;
}

export default function GroupComponent(props: GroupsProps) {
  const [joinedGroup, setJoinedGroup] = useState(false);
  const { user } = useAuth();

  const JOIN_GROUP = gql`
  mutation joinGroup ($id: ID, $userId: ID = ${JSON.stringify(user._id)}) {
    updateGroups(
      where: { id: $id }
      update: { members: { connect: { where: { node: { _id: $userId } } } } }
    ) {
      groups {
        membersAggregate {
          count
        }
      }
    }
  }
`;

  const LEAVE_GROUP = gql`
  mutation leaveGroup ($id: ID, $userId: ID = ${JSON.stringify(user._id)}) {
    updateGroups(
      where: { id: $id }
      update: { members: { disconnect: { where: { node: { _id: $userId } } } } }
    ) {
      groups {
        membersAggregate {
          count
        }
      }
    }
  }
`;

  const [joinGroup] = useMutation(JOIN_GROUP);
  const [leaveGroup, { loading, error }] = useMutation(LEAVE_GROUP);
  if (error) return <p>Error</p>;

  const onJoinedGroupChange = () => {
    if (joinedGroup) {
      leaveGroup({
        variables: { id: props.id },
      });

      setJoinedGroup(!joinedGroup);
    } else {
      joinGroup({
        variables: { id: props.id },
      });
      setJoinedGroup(!joinedGroup);
    }
  };

  return (
    <div className="w-full flex min-w-96 bg-inputField-background rounded-md border border-componentOutline p-2 justify-center items-center">
      <div className="flex w-full items-center gap-3">
        <Image
          alt="group picture"
          src={props.eventImage || defaultGroupsPicture}
          height={64}
          width={64}
          className="rounded"
        />

        <div className="flex flex-col text-subTitle items-left">
          <div className="text-white">{props.name}</div>
          <div className="flex">
            Join {props.membersAggregate?.count} members
          </div>
        </div>
      </div>
      {joinedGroup ? (
        <button
          onClick={onJoinedGroupChange}
          className="px-3 py-[4px] bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-lg"
        >
          Leave Group
        </button>
      ) : (
        <button
          onClick={onJoinedGroupChange}
          className="px-3 py-[4px] bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-lg"
        >
          Join
        </button>
      )}
    </div>
  );
}
