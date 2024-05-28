import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import userIcon from "@/assets/userIcon.svg";
import moreIcon from "@/assets/moreIcon.svg";
import commentIcon from "@/assets/commentIcon.svg";
import likeIcon from "@/assets/likeIcon.svg";
import { defaultProfilPicture } from "@/utils/defaultImages";
import { formatRelativeTime } from "@/utils/formatDate";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { deletePostAWS } from "@/pages/api/s3";

const DELETE_REPLY = gql`
  mutation deleteReply($id: ID!) {
    deleteComments(where: { id: $id }) {
      nodesDeleted
    }
  }
`;

export default function ReplyComponent(props: any) {
  const [activeLike, setActiveLike] = useState(false);
  const [activeComment, setActiveComment] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [countLike, setCountLike] = useState(0);
  const { user } = useAuth();

  const [deleteReply] = useMutation(DELETE_REPLY);

  const onLikeChange = () => {
    // {
    //   activeLike
    //     ? (unlike_post({ variables: { id: props.id } }), setCountLike(0))
    //     : (like_post({
    //         variables: { id: props.id },
    //       }),
    //       setCountLike(1));
    // }
    setActiveLike(!activeLike);
  };

  const onDeletePost = async () => {
    deleteReply({ variables: { id: props.id } });
    setShowOptions(!showOptions);

    if (props.imageURL) {
      await deletePostAWS(props.imageURL as string);
    }

    window.location.reload();
  };

  const onCommentChange = () => {
    setActiveComment(!activeComment);
  };

  return (
    <div>
      <div className="flex relative flex-col bg-componentBackground gap-5 p-5 rounded-xl border border-componentOutline text-subTitle">
        <div className="flex ">
          <div className="flex space-x-3 items-center w-full">
            <img
              alt="userIcon"
              src={props.author.avatar || defaultProfilPicture}
              height={40}
              width={40}
              className="border border-btn-outline rounded w-10 h-10"
            />

            <div className="flex-col">
              <div className="flex items-center space-x-2">
                <div className="text-white">{props.author?.firstName}</div>
                <div>@{props.author?.username}</div>
                <div className="text-subtileText">-</div>
                <div className="text-subtileText">
                  {formatRelativeTime(props.createdAt)}
                </div>
              </div>
              <div className="flex flex-row space-x-1 text-sm">
                <div>Replying to</div>
                <Link
                  href={`/profile/${props.comments?.author?.username}` || `/`}
                >
                  <div className="text-green-500">
                    @{props.comments?.author?.username}
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {user.username === props.author?.username && (
            <div
              onClick={() => setShowOptions(!showOptions)}
              className="cursor-pointer"
            >
              <Image alt="moreIcon" src={moreIcon} />
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

        <div className=" text-white text-xl">
          <div>{props.content}</div>
          {props.imageURL && (
            <img alt="postImage" src={props.imageURL} className="rounded-lg" />
          )}
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2" onClick={onCommentChange}>
            <Image alt="commentIcon" src={commentIcon} width={20} height={20} />
            <div>{props.commentsAggregate?.count}</div>
          </button>

          <button className="flex items-center gap-2" onClick={onLikeChange}>
            <Image alt="likeIcon" src={likeIcon} width={20} height={20} />
            <div>{props.likesAggregate?.count || 0 + countLike}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
