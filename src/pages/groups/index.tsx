import React, { useState } from "react";
import CreateGroup from "@/pages/groups/components/createGroup";
import { gql, useMutation, useQuery } from "@apollo/client";
import GroupBigComp from "@/pages/groups/components/groupBigComp";
import { useAuth } from "@/context/AuthContext";
import { Group } from "@/interface/typeInterface";
import Link from "next/link";

function GroupsPage(props: Group) {
  const { user } = useAuth();
  const [joinedGroup, setJoinedGroup] = useState(false);

  const GET_GROUPS = gql`
    query getGroups {
      groups(options: { sort: { createdAt: DESC } }) {
        createdAt
        id
        name
        description
        groupImage
        membersAggregate {
          count
        }
        members {
          avatar
          _id
          username
        }
      }
    }
  `;

  const GET_USER_GROUPS = gql`
    query GetUserGroups( $userId: ID = ${JSON.stringify(user._id)}) {
      groups(where: { members_SINGLE: { _id : $userId } }) {
        createdAt
        id
        name
        description
        groupImage
        membersAggregate {
          count
        }
        members {
          avatar
          _id
          username
        }
      }
    }
  `;

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
    }`;

  const { loading, error, data } = useQuery(GET_USER_GROUPS);
  const [joinGroup] = useMutation(JOIN_GROUP);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;
  console.log(data);

  return (
    <div className="">
      <div className="w-full flex justify-center">
        <div className="space-y-5 w-4/6">
          <div className="space-y-2">
            <div>Create</div>
            <CreateGroup />
          </div>
          <div className="space-y-2">
            <div>Your Groups</div>
            {data.groups.map((item: any) => (
              <div key={item.key}>
                <GroupBigComp {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupsPage;
