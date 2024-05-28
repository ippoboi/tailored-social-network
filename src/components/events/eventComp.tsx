import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import mockProfilPic from "@/assets/mockProfilPic.png";
import { formatDate } from "@/utils/dateFormatter";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "@/context/AuthContext";
import { defaultEventsPicture } from "@/utils/defaultImages";

export interface EventsProps {
  id: string;
  name: string;
  eventImage: any;
  description: string;
  date: string;
  createdAt: Date;
  attendees: any;
  attendeesAggregate: any;
  location: string;
}

export default function EventComp(props: EventsProps) {
  const [joinedEvent, setJoinedEvent] = useState(false);
  const { user } = useAuth();

  const JOIN_EVENT = gql`
  mutation joinEvent ($id: ID, $userId: ID = ${JSON.stringify(user._id)}) {
    updateEvents(
      where: { id: $id }
      update: { attendees: { connect: { where: { node: { _id: $userId } } } } }
    ) {
      events {
        attendeesAggregate {
          count
        }
      }
    }
  }
`;

  const LEAVE_EVENT = gql`
  mutation leaveEvent ($id: ID, $userId: ID = ${JSON.stringify(user._id)}) {
  updateEvents(
    where: { id: $id }
    update: { attendees: { disconnect: { where: { node: { _id: $userId } } } } }
  ) {
    events {
      attendeesAggregate {
        count
      }
    }
  }
}
`;

  const [joinGroup] = useMutation(JOIN_EVENT);
  const [leaveGroup, { loading, error }] = useMutation(LEAVE_EVENT);
  if (error) return <p>Error</p>;

  const onJoinedEventChange = () => {
    if (joinedEvent) {
      leaveGroup({
        variables: { id: props.id },
      });

      setJoinedEvent(!joinedEvent);
    } else {
      joinGroup({
        variables: { id: props.id },
      });

      setJoinedEvent(!joinedEvent);
    }
  };

  return (
    <div className="w-full min-w-96 flex bg-componentBackground rounded-md border border-componentOutline p-2 justify-center items-center">
      <div className="flex w-full items-center gap-3">
        <Image
          alt="event image"
          src={props.eventImage || defaultEventsPicture}
          height={64}
          width={64}
          className="rounded"
        />
        <div className="flex flex-col text-subTitle items-left">
          <div className=" text-white text-lg">{props.name}</div>
          <div className="flex flex-row ">{formatDate(props.date)}</div>
        </div>
      </div>
      {joinedEvent ? (
        <button
          onClick={onJoinedEventChange}
          className="px-3 py-[4px] bg-btn-background border border-btn-outline text-green-400 hover:bg-btn-background-hover hover:text-white transition-all rounded-lg"
        >
          Participating
        </button>
      ) : (
        <button
          onClick={onJoinedEventChange}
          className="px-3 py-[4px] bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-lg"
        >
          Participate
        </button>
      )}
    </div>
  );
}
