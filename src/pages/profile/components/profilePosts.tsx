import {
  UserPostsQuery,
  UserPostsQueryVariables,
} from "@/interface/typeInterface";

import { useAuth } from "@/context/AuthContext";
import { gql, useQuery } from "@apollo/client";
import PostComponent from "../../../components/postComponent";

export default function ProfilePosts(username: any) {
  const { user } = useAuth();
  const GET_USER_POSTS = gql`
    query getUserPost($username: String = ${JSON.stringify(
      username.username
    )}) {
      posts(where: { author: { username: $username }}, options: {sort: {createdAt: DESC}}) {
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
          avatar
          _id
          firstName
          username
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div className="space-y-3">
      {data.posts.length === 0 && (
        <p className="flex justify-center items-center text h-32 text-subTitle">
          Sorry, you have no posts.
        </p>
      )}
      {data?.posts?.map((item: any) => (
        <div key={item.id}>
          <PostComponent {...item} />
        </div>
      ))}
    </div>
  );
}
