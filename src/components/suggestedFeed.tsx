import {
  UserPostsQuery,
  UserPostsQueryVariables,
} from "@/interface/typeInterface";

import { useAuth } from "@/context/AuthContext";
import { gql, useQuery } from "@apollo/client";
import PostComponent from "./postComponent";

export default function SuggestedFeed(userId: any) {
  const { user } = useAuth();
  const GET_RECOMMENDED_POSTS = gql`
    query recommendUserByFollow {
      users {
        recommendUserByFollow(userId: ${JSON.stringify(user._id)}) {
          posts {
            content
            createdAt
            id
            imageURL
            likesAggregate {
              count
            }
            commentsAggregate {
              count
            }
            author {
              _id
              avatar
              firstName
              username
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_RECOMMENDED_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No data found</p>;

  const allPosts = data.users[0].recommendUserByFollow.flatMap(
    (user: any) => user.posts
  );

  const sortedPosts = allPosts.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-3">
      {data.users[0].recommendUserByFollow.length === 0 && (
        <p className="flex justify-center items-center text h-32 text-subTitle">
          Sorry, you follow everyone so there are no recommended posts.
        </p>
      )}
      {sortedPosts.map((post: any) => (
        <div key={post.id}>
          <PostComponent {...post} />
        </div>
      ))}
    </div>
  );
}
