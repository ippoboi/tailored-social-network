import { useAuth } from "@/context/AuthContext";
import { gql, useQuery, useSubscription } from "@apollo/client";
import PostComponent from "./postComponent";
import { useState } from "react";

export default function SubscriptionFeed(userId: any) {
  const { user } = useAuth();
  const [hasNewPost, setHasNewPost] = useState(false);

  const countPosts = 0;

  const GET_FOLLOWING_POSTS = gql`
  query getFollowingPosts($_id: ID = ${JSON.stringify(user._id)}) {
    posts(where: {author: {followers_SOME: {_id: $_id}}} options: {sort: {createdAt: DESC}}) {
      content
      createdAt
      id
      imageURL
      author {
        _id
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
  const POST_SUBSCRIPTION = gql`
    subscription addedPost {
      posts {
        id

        author {
          avatar
          _id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_FOLLOWING_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No data found</p>;

  // useSubscription(POST_SUBSCRIPTION, {});

  return (
    <div className="space-y-3">
      {hasNewPost && (
        <div
          className={`p-2 cursor-pointer text-center text-subTitle border hover:bg-componentBackground/50 transition-all border-componentBackground rounded-lg`}
        >
          <p className="text-subtileText">
            Load <span className="text-subTitle">{countPosts}</span> new posts
          </p>
        </div>
      )}
      {data.posts.length === 0 && (
        <p className="flex justify-center items-center text h-32 text-subTitle">
          Sorry, either your are not following anyone or they have not posted.
        </p>
      )}
      {data.posts.map((item: any) => (
        <div key={item.id}>
          <PostComponent {...item} />
        </div>
      ))}
    </div>
  );
}
