import PostComponent from "@/components/postComponent";
import { gql, useQuery } from "@apollo/client";

export default function ProfileLikes(username: any) {
  const GET_USER_LIKED_POSTS = gql`
    query getLikedPost($username: String = ${JSON.stringify(
      username.username
    )}, $limit: Int = 10) {
      users(where: { username: $username }) {
        likes(options: { sort: { createdAt: DESC }, limit: $limit }) {
          content
          id
          createdAt
          imageURL
          author {
            _id
            avatar
            firstName
            username
          }
          commentsAggregate {
            count
          }
          likesAggregate {
            count
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER_LIKED_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="space-y-3">
      {data.users[0].likes.length === 0 && (
        <p className="flex justify-center items-center text h-32 text-subTitle">
          Sorry, you have no liked posts.
        </p>
      )}
      {data.users[0].likes.map((item: any) => (
        <div key={item.id}>
          <PostComponent {...item} />
        </div>
      ))}
    </div>
  );
}
