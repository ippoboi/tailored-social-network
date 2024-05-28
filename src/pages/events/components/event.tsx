import { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { IEvent } from "@/interface/typeInterface";
import { useAuth } from "@/context/AuthContext";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";

import { defaultEventsBanner } from "@/utils/defaultImages";

export interface EventsProps {
  eventsName?: string;
  eventsNumber?: number;
  eventsDate?: string;
  eventImage?: StaticImageData | undefined;
  eventsPlace?: string;
}

export default function Event(props: IEvent) {
  const [eventParticipate, setEventParticipate] = useState(false);
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

  const [joinEvent, { loading, error }] = useMutation(JOIN_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);

  if (error) return <p>Error</p>;

  const onParticipateEventChange = () => {
    {
      if (!eventParticipate) {
        leaveEvent({
          variables: { id: props.id },
        });

        setEventParticipate(!eventParticipate);
      } else {
        joinEvent({
          variables: { id: props.id },
        });
      }
      setEventParticipate(!eventParticipate);
    }
  };

  return (
    <div className="flex w-full flex-col space-y-4 p-5 bg-componentBackground border border-componentOutline rounded-xl">
      <Image
        width={500}
        height={200}
        alt="eventIcon"
        src={props.eventImage || defaultEventsBanner}
        className="h-36 bg-white rounded-lg object-cover"
      />
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <div className="flex space-x-2">
            <div className="text-white">{props.name}</div>
            <div className="text-subTitle">{props.description}</div>
          </div>
          <div className="text-subTitle">{props.location}</div>
        </div>

        {eventParticipate ? (
          <div className="flex items-center w-full">
            <div className="flex items-center w-full">
              <div className="text-subTitle ">
                {props!.attendees.length} members
              </div>
            </div>
            <button
              onClick={onParticipateEventChange}
              className="px-3 py-[4px] bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-lg"
            >
              Participate
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="text-subTitle">
              {props!.attendees.length} members
            </div>

            <div className="flex space-x-2">
              <Link
                href={`/events/${props.id}`}
                className="px-3 py-2 bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-lg"
              >
                See More
              </Link>
              <button
                onClick={onParticipateEventChange}
                className="text-success tracking-wide px-3 "
              >
                Participating
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
