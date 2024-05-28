import React, { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Group } from "@/interface/typeInterface";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

import leftIcon from "@/assets/leftIcon.svg";

import UserPost from "@/pages/groups/components/userPostGroup";
import GroupBigComp from "./components/groupBigComp";
import PostComponent from "@/components/postComponent";
import { defaultGroupsBanner } from "@/utils/defaultImages";

export default function GroupPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const GET_GROUP = gql`
    query GetGroup($id: ID!) {
      groups(where: { id: $id }) {
        createdAt
        id
        name
        description
        groupImage
        membersAggregate {
          count
        }
      }
    }
  `;

  const GET_GROUP_POSTS = gql`
    query getGroupPosts($id: ID!) {
      groups(where: { id: $id }, options: { sort: { createdAt: DESC } }) {
        posts {
          content
          createdAt
          id
          imageURL
          author {
            avatar
            firstName
            username
          }
          likesAggregate {
            count
          }
          commentsAggregate {
            count
          }
        }
      }
    }
  `;

  const {
    loading: groupLoading,
    error: groupError,
    data: groupData,
  } = useQuery(GET_GROUP, {
    variables: { id },
    skip: !id, // Skip the query until the ID is available
  });

  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery(GET_GROUP_POSTS, {
    variables: { id },
    skip: !id,
  });

  if (groupLoading || postsLoading) return <p>Loading...</p>;

  console.log(groupData);
  console.log(postsData);

  return (
    <div className="w-full flex justify-center pb-10">
      <div className=" w-4/6 space-y-4 flex flex-col ">
        <div className="space-y-4">
          <div>
            <Link className="flex space-x-4 items-center" href={"/groups"}>
              <Image width={10} height={10} alt="leftIcon" src={leftIcon} />
              <div className="text-subTitle">Go back to groups</div>
            </Link>
          </div>

          <div className="flex w-full flex-col p-5 space-y-4 bg-componentBackground border border-componentOutline rounded-xl">
            <Image
              width={500}
              height={200}
              alt="groupIcon"
              src={groupData.groups[0].imageUrl || defaultGroupsBanner}
              className="h-36 bg-white object-cover rounded-lg"
            />
            <div>
              <div className="text-white text-lg">
                {groupData.groups[0].name}
              </div>
              <div className="text-subTitle">
                {groupData.groups[0].description}
              </div>
            </div>
            <div className="flex items-center w-full">
              <div className="flex items-center w-full ">
                <div className="text-subTitle ">
                  {groupData.groups[0].membersAggregate.count} members
                </div>
              </div>
            </div>
          </div>
          <div>
            <UserPost groupId={groupData.groups[0].id} />
          </div>

          <div className="space-y-4">
            <div className="text-subtileText">Group Posts</div>
            {!postsData.groups[0].posts && (
              <p className="flex justify-center items-center text h-32 text-subTitle">
                Sorry, there are no posts in this group.
              </p>
            )}
            {postsData.groups[0].posts.map((item: any) => (
              <div key={item.id}>
                <PostComponent {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
