"use client";

import { useState } from "react";

import ProfileLikes from "@/pages/profile/components/profileLikes";
import ProfilePosts from "@/pages/profile/components/profilePosts";
import ProfileReplies from "@/pages/profile/components/profileReplies";

import { useAuth } from "@/context/AuthContext";
import InformationsSection from "./components/informationsSection";
import ProfilCardSection from "./components/profilCardSection";
import { useRouter } from "next/router";

export interface ProfileProps {
  onClick: void;
}

export default function ProfilePage() {
  const [activeProfileMenu, setActiveProfileMenu] = useState("Posts");
  const router = useRouter();
  const { username } = router.query;

  const { user } = useAuth();

  return (
    <div className="w-full flex justify-center pb-10">
      <div className="space-y-5 w-4/6">
        <ProfilCardSection username={username} />

        <InformationsSection username={username} />

        <div className="flex flex-col mt-8">
          <div className="flex text-subTitle space-x-4  ">
            <button
              className={`p-2 pl-4 pr-4 ${
                activeProfileMenu === "Posts"
                  ? "bg-componentBackground rounded-md"
                  : ""
              }`}
              onClick={() => setActiveProfileMenu("Posts")}
            >
              Posts
            </button>
            <button
              className={`p-2 pl-4 pr-4 ${
                activeProfileMenu === "Likes"
                  ? "bg-componentBackground rounded-md"
                  : ""
              }`}
              onClick={() => setActiveProfileMenu("Likes")}
            >
              Likes
            </button>
            <button
              className={`p-2 pl-4 pr-4 ${
                activeProfileMenu === "Replies"
                  ? "bg-componentBackground rounded-md"
                  : ""
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
