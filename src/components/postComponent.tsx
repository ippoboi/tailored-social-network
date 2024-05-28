import Image from "next/image";
import { useState } from "react";

import commentIcon from "@/assets/commentIcon.svg";
import likeIcon from "@/assets/likeIcon.svg";
import moreIcon from "@/assets/moreIcon.svg";

import { useAuth } from "@/context/AuthContext";
import { deletePostAWS } from "@/pages/api/s3";
import { defaultProfilPicture } from "@/utils/defaultImages";
import { formatRelativeTime } from "@/utils/formatDate";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";

export default function PostComponent(props: any) {
  const [activeLike, setActiveLike] = useState(
    props?.likesAggregate?.count > 0
  );
  const [activeComment, setActiveComment] = useState(false);

  const [showOptions, setShowOptions] = useState(false);

  const [countLike, setCountLike] = useState(0);
  const { user } = useAuth();

  const LIKE_POST = gql`
    mutation like_post($id: ID, $userId: ID = ${JSON.stringify(user._id)}) {
      updatePosts(
        where: { id: $id }
        update: {
          likes: { connect: { where: { node: { _id: $userId } } } }
        }
      ) {
        posts {
          likesAggregate {
            count
          }
        }
      }
    }
  `;

  const UNLIKE_POST = gql`
    mutation unlike_post($id: ID, $userId: ID = ${JSON.stringify(user._id)}) {
      updatePosts(
        where: { id: $id }
        update: {
          likes: { disconnect: { where: { node: { _id: $userId } } } }
        }
      ) {
        posts {
          likesAggregate {
            count
          }
        }
      }
    }
  `;

  const DELETE_POST = gql`
    mutation deletePost($id: ID!) {
      deletePosts(where: { id: $id }) {
        nodesDeleted
      }
    }
  `;

  const [like_post, { loading, error }] = useMutation(LIKE_POST);
  const [deletePost] = useMutation(DELETE_POST);
  const [unlike_post] = useMutation(UNLIKE_POST);

  if (error) return <p>Error</p>;

  const onLikeChange = () => {
    {
      activeLike
        ? (unlike_post({ variables: { id: props.id } }), setCountLike(0))
        : (like_post({
            variables: { id: props.id },
          }),
          setCountLike(1));
    }
    setActiveLike(!activeLike);
  };

  const onDeletePost = async () => {
    deletePost({ variables: { id: props.id } });
    setShowOptions(!showOptions);

    if (props.imageURL) {
      await deletePostAWS(props.imageURL as string);
    }

    window.location.reload();
  };

  const onCommentChange = () => {
    setActiveComment(!activeComment);
  };

  if (props.posts?.length === 0) {
    return;
  } else {
    return (
      <div className="">
        <div className="flex relative flex-col gap-5 bg-componentBackground p-5 rounded-lg border border-componentOutline text-subTitle">
          <div className="flex">
            <div className="flex space-x-3 items-center w-full">
              <Image
                alt="userIcon"
                src={props?.author?.avatar || defaultProfilPicture}
                height={40}
                width={40}
                className="border border-btn-outline rounded w-10 h-10"
              />
              <Link
                href={`/profile/${props.author?.username}`}
                className="flex gap-2"
              >
                <div className="text-white">{props.author?.firstName}</div>
                <div>@{props.author?.username}</div>
              </Link>
              <div className="text-subtileText">-</div>
              <div className="text-subtileText">
                {formatRelativeTime(props?.createdAt)}
              </div>
            </div>
            {user.username ===
              (props.author?.username || props?.posts[0]?.author?.username) && (
              <div
                onClick={() => setShowOptions(!showOptions)}
                className="cursor-pointer"
              >
                <Image width={20} height={20} alt="moreIcon" src={moreIcon} />
              </div>
            )}
            {showOptions && (
              <div className="absolute right-5 top-10 bg-componentBackground p-2 rounded-xl border border-componentOutline">
                <div className="text-subTitle p-2 hover:bg-componentOutline min-w-20 rounded-lg cursor-pointer">
                  Edit
                </div>

                <div
                  onClick={onDeletePost}
                  className="text-error p-2 hover:bg-componentOutline min-w-20 rounded-lg cursor-pointer"
                >
                  Delete
                </div>
              </div>
            )}
          </div>

          <div className="text-white text-lg space-y-4">
            <div>{props.content}</div>
            {props.imageURL && (
              <Image
                width={500}
                height={500}
                alt="postImage"
                src={props.imageURL}
                className="rounded-lg"
              />
            )}
          </div>

          <div className="flex gap-4">
            <button
              className="flex items-center gap-2"
              onClick={onCommentChange}
            >
              <Image
                alt="commentIcon"
                src={commentIcon}
                width={20}
                height={20}
              />
              <div>{props.commentsAggregate?.count}</div>
            </button>

            <button className="flex items-center gap-2" onClick={onLikeChange}>
              <Image alt="likeIcon" src={likeIcon} width={20} height={20} />
              <div>{props.likesAggregate.count + countLike || 0}</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
