import React, { useState } from "react";
import Suggestions from "./suggestions/suggestionComp";
import Events from "./events/eventComp";
import GroupComponent from "@/pages/groups/components/groupsComp";

import kingWhale from "@/assets/kingWhale.png";
import { useAuth } from "@/context/AuthContext";
import { gql, useQuery } from "@apollo/client";

function RightNavigation() {
  const [usersToShow, setUsersToShow] = useState(3);
  const [eventsToShow, setEventsToShow] = useState(3);
  const [groupsToShow, setGroupsToShow] = useState(3);
  const { user } = useAuth();

  const GET_INFOS = gql`
    query getInfos($limitEvents: Int = 10, $limitGroups: Int = 10) {
      events(options: { sort: { date: DESC }, limit: $limitEvents }) {
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
      users {
        recommendUserByHobby(userId: ${JSON.stringify(user._id)}) {
          firstName
          hobbies {
            name
          }
          username
        }
      }
      groups(options: { limit: $limitGroups }) {
        groupImage
        description
        createdAt
        id
        name
        members {
          _id
          avatar
          username
        }
        membersAggregate {
          count
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_INFOS);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  const seenIds = new Set();

  return (
    <div className="flex flex-col h-screen center-items p-5 gap-5">
      <div className="space-y-2">
        <div className="text-subtileText">Suggestions</div>

        {data.users[0]?.recommendUserByHobby
          ?.filter((item: any) => item.username !== user.username)
          .filter((item: any) => {
            if (seenIds.has(item.username)) {
              return false;
            } else {
              seenIds.add(item.username);
              return true;
            }
          })
          .map((item: any) => (
            <div key={item.id}>
              <Suggestions {...item} />
            </div>
          ))}

        {usersToShow == 3 ? (
          <button
            onClick={() => setUsersToShow(10)}
            className="p-2 border text-subtileText border-btn-outline w-full rounded-lg"
          >
            See More
          </button>
        ) : (
          <button
            onClick={() => setUsersToShow(3)}
            className="p-2 border text-subtileText border-btn-outline w-full rounded-lg"
          >
            See Less
          </button>
        )}
      </div>
      <div className="space-y-2">
        <div className="text-subtileText">Events for you</div>
        {data.events?.slice(0, eventsToShow).map((item: any) => (
          <div key={item.id}>
            <Events {...item} />
          </div>
        ))}

        {eventsToShow == 3 ? (
          <button
            onClick={() => setEventsToShow(10)}
            className="p-2 border text-subtileText border-btn-outline w-full rounded-lg"
          >
            See More
          </button>
        ) : (
          <button
            onClick={() => setEventsToShow(3)}
            className="p-2 border text-subtileText border-btn-outline w-full rounded-lg"
          >
            See Less
          </button>
        )}
      </div>
      <div className="space-y-2">
        <div className="text-subtileText">Groups for you</div>
        {data.groups?.slice(0, groupsToShow).map((item: any) => (
          <div key={item.id}>
            <GroupComponent {...item} />
          </div>
        ))}

        {groupsToShow == 3 ? (
          <button
            onClick={() => setGroupsToShow(10)}
            className="p-2 border text-subtileText border-btn-outline w-full rounded-lg"
          >
            See More
          </button>
        ) : (
          <button
            onClick={() => setGroupsToShow(3)}
            className="p-2 border text-subtileText border-btn-outline w-full rounded-lg"
          >
            See Less
          </button>
        )}
      </div>
    </div>
  );
}

export default RightNavigation;
