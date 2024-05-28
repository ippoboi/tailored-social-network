import React from "react";
import CreateEvent from "@/pages/events/components/createEvent";
import Event from "@/pages/events/components/event";
import { gql, useQuery } from "@apollo/client";
import { IEvent } from "@/interface/typeInterface";
import EventComp from "@/components/events/eventComp";
import { useAuth } from "@/context/AuthContext";

function EventsPage(props: IEvent) {
  const { user } = useAuth();
  const GET_EVENTS = gql`
    query getEvents1 {
      events(options: { sort: { date: DESC } }) {
        id
        name
        location
        eventImage
        description
        date
        createdAt
        attendees {
          avatar
          _id
          username
        }
        attendeesAggregate {
          count
        }
      }
    }
  `;

  const GET_USER_EVENTS = gql`
    query getUserEvents ($userId: ID = ${JSON.stringify(user._id)}) {
      events(where: {attendees_SINGLE: {_id: $userId}}, options: {sort: {date: DESC}}) {
        id
        name
        location
        eventImage
        description
        date
        createdAt
        attendees {
          avatar
          _id
          username
        }
        attendeesAggregate {
          count
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER_EVENTS);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  console.log(data);

  return (
    <div className="">
      <div className="w-full flex justify-center">
        <div className="space-y-5 w-4/6">
          <div className="space-y-2">
            <div>Create</div>
            <CreateEvent />
          </div>
          <div className="space-y-2">
            <div>Events</div>
            <div className="space-y-2">
              {data.events?.map((item: any) => (
                <div key={item.id}>
                  <Event {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
