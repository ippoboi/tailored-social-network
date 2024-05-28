"use client";
import React, { ChangeEvent, useState } from "react";
import userIcon from "../../../assets/userIcon.svg";
import textModif from "../../../assets/textModif.svg";

import Image from "next/image";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";

export interface PostProps {
  userImage: string;
  userPseudo: string;
  userName: string;
  content: string;
  numberLikes: number;
  numberComments: number;
}

interface User {
  _id: string;
  username: string;
  hobbies: Hobby[];
  posts: Post[];
}

interface Post {
  id: string;
  content: string;
  imageURL: string;
  createdAt: string;
}

interface Hobby {
  id: string;
  name: string;
}

export default function PostInput() {
  const GET_USERS = gql`
    query GetUsers {
      users {
        _id
        username
        hobbies {
          id
          name
        }
      }
    }
  `;

  const DisplayUsers = () => {
    const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
      <div className="text-white">
        <h2>Users</h2>
        {data!.users.map((user) => (
          <div key={user._id}>
            <p>Username: {user.username}</p>
            <p>Hobbies:</p>
            <ul>
              {user.hobbies.map((hobby) => (
                <li key={hobby.id}>{hobby.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="text-subTitle">Post</div>
      <div className="flex flex-col bg-componentBackground my-2 p-2 rounded-md border-componentOutline text-subTitle">
        <div className="flex flex-row ">
          <Image alt="userIcon" src={userIcon} height={40} width={40} />
          <div className="bg-inputField-background rounded-md w-full pl-2">
            <input
              type="text"
              placeholder="Share your thoughts to the world!"
              className="pl-2 pr-4 py-2 border bg-btn-background w-full rounded-lg"
            />
          </div>
        </div>
        <div className="pt-4">
          <Image alt="textModif" src={textModif} height={100} width={100} />
        </div>
      </div>
      <DisplayUsers />
    </div>
  );
}
