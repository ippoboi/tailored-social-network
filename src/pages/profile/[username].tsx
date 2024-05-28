"use client";

import { useState } from "react";

import ProfileLikes from "@/pages/profile/components/profileLikes";
import ProfilePosts from "@/pages/profile/components/profilePosts";
import ProfileReplies from "@/pages/profile/components/profileReplies";

import { useRouter } from "next/router";
import InformationsSection from "./components/informationsSection";
import ProfilCardSection from "./components/profilCardSection";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "@/context/AuthContext";

export interface ProfileProps {
  onClick: void;
}

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useAuth();
  const [activeProfileMenu, setActiveProfileMenu] = useState("Posts");

  const IS_BLOCKED = gql`    query checkIsBlocked(
    $username: String = ${JSON.stringify(username)},
    $blockedUsername: String = ${JSON.stringify(user.username)}
  ) {
    users(where: { username: $username }) {
      username
      blockedUser(where: { username: $blockedUsername }) {
        username
      }
    }
  }`;

  const { data, error, loading } = useQuery(IS_BLOCKED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  let isBlocked = data.users[0].blockedUser.length > 0;

  if (isBlocked) {
    return (
      <div className="flex relative justify-center items-center h-full">
        <div className="absolute text-center z-10">
          <h1 className="text-2xl">This account is private</h1>
          <p className="text-subTitle">
            You can&apos;t see this profile because you are blocked
          </p>
        </div>

        <div className="space-y-5 w-4/6 opacity-80 blur-md select-none">
          <ProfilCardSection username={username} />

          <InformationsSection username={username} />

          <div className="flex flex-col mt-8 ">
            <div className="flex text-subTitle space-x-4  ">
              <button
                className={`p-2 px-4 rounded-md transition-all duration-200 ${
                  activeProfileMenu === "Posts"
                    ? "bg-componentBackground "
                    : "hover:bg-componentBackground/50"
                }`}
                onClick={() => setActiveProfileMenu("Posts")}
              >
                Posts
              </button>
              <button
                className={`p-2 px-4 rounded-md transition-all duration-200 ${
                  activeProfileMenu === "Likes"
                    ? "bg-componentBackground "
                    : "hover:bg-componentBackground/50"
                }`}
                onClick={() => setActiveProfileMenu("Likes")}
              >
                Likes
              </button>
              <button
                className={`p-2 px-4 rounded-md transition-all duration-200 ${
                  activeProfileMenu === "Replies"
                    ? "bg-componentBackground "
                    : "hover:bg-componentBackground/50"
                }`}
                onClick={() => setActiveProfileMenu("Replies")}
              >
                Replies
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center pb-10">
        <div className="space-y-5 w-4/6">
          <ProfilCardSection username={username} />

          <InformationsSection username={username} />

          <div className="flex flex-col mt-8">
            <div className="flex text-subTitle space-x-4  ">
              <button
                className={`p-2 px-4 rounded-md transition-all duration-200 ${
                  activeProfileMenu === "Posts"
                    ? "bg-componentBackground "
                    : "hover:bg-componentBackground/50"
                }`}
                onClick={() => setActiveProfileMenu("Posts")}
              >
                Posts
              </button>
              <button
                className={`p-2 px-4 rounded-md transition-all duration-200 ${
                  activeProfileMenu === "Likes"
                    ? "bg-componentBackground "
                    : "hover:bg-componentBackground/50"
                }`}
                onClick={() => setActiveProfileMenu("Likes")}
              >
                Likes
              </button>
              <button
                className={`p-2 px-4 rounded-md transition-all duration-200 ${
                  activeProfileMenu === "Replies"
                    ? "bg-componentBackground "
                    : "hover:bg-componentBackground/50"
                }`}
                onClick={() => setActiveProfileMenu("Replies")}
              >
                Replies
              </button>
            </div>
          </div>

          {activeProfileMenu == "Posts" ? (
            <ProfilePosts username={username} />
          ) : activeProfileMenu == "Likes" ? (
            <ProfileLikes username={username} />
          ) : (
            <ProfileReplies username={username} />
          )}
        </div>
      </div>
    );
  }
}
