import Reply from "@/pages/notifications/components/reply";
import { gql, useQuery } from "@apollo/client";

export default function ProfileReplies(username: any) {
  const GET_USER_REPLIED_POSTS = gql`
    query getUserReplies($username: String = ${JSON.stringify(
      username.username
    )}) {
      comments(
        where: { author: { username: $username } }
        options: { sort: { createdAt: DESC } }
      ) {
        content
        createdAt
        id
        author {
          _id
          avatar
          firstName
          username
        }
        imageURL
        likesAggregate {
          count
        }
        commentsAggregate {
          count
        }
        post {
          author {
            username
            _id
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER_REPLIED_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <div className="space-y-3">
        {data.comments.length === 0 && (
          <p className="flex justify-center items-center text h-32 text-subTitle">
            Sorry, you have no replies.
          </p>
        )}
        {data.comments.map((item: any) => (
          <div key={item.id}>
            <Reply {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
