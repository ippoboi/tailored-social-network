import SubscriptionFeed from "@/components/subscriptionFeed";
import SuggestedFeed from "@/components/suggestedFeed";
import UserPost from "@/components/userPost";
import { useAuth } from "@/context/AuthContext";
import { gql, useQuery } from "@apollo/client";

import { Montserrat } from "next/font/google";
import { useState } from "react";

const inter = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [activeProfileMenu, setActiveProfileMenu] = useState("For you");
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);

  const GET_POSTS = gql`
    query getPosts {
      posts(options: { sort: { createdAt: DESC } }) {
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
  `;

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { posts },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center h-fit pb-10">
      <div className="w-4/6 space-y-3">
        <UserPost />

        <div className="flex flex-col mt-8">
          <div className="flex text-subTitle space-x-4  ">
            <button
              className={`p-2 px-4 rounded-md transition-all duration-200 ${
                activeProfileMenu === "For you"
                  ? "bg-componentBackground "
                  : "hover:bg-componentBackground/50"
              }`}
              onClick={() => setActiveProfileMenu("For you")}
            >
              For you
            </button>
            <button
              className={`p-2 px-4 rounded-md transition-all duration-200 ${
                activeProfileMenu === "Susbscribed"
                  ? "bg-componentBackground "
                  : "hover:bg-componentBackground/50"
              }`}
              onClick={() => setActiveProfileMenu("Susbscribed")}
            >
              Subscribed
            </button>
          </div>
        </div>

        {/* TODO Post Recommendations & Subscribed */}
        {activeProfileMenu === "For you" ? (
          <SuggestedFeed userId={user._id} />
        ) : (
          <SubscriptionFeed userId={user._id} />
        )}
      </div>
    </div>
  );
}
