import editProfileIcon from "@/assets/editProfileIcon.svg";
import locationIcon from "@/assets/locationIcon.svg";
import mockPostImage from "@/assets/mockPostImage.png";
import permanentJobIcon from "@/assets/permanentJobIcon.svg";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";
import ProfileEditModal from "./profileEditModal";
import { useAuth } from "@/context/AuthContext";
import {
  defaultBannerPicture,
  defaultProfilPicture,
} from "@/utils/defaultImages";

import moreIcon from "@/assets/moreIcon.svg";

export default function ProfilCardSection(username: any) {
  const [showOptions, setShowOptions] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const { user } = useAuth();
  const isUserMe = user.username == username.username ? true : false;

  const GET_USER_PROFILE_INFO = gql`
    query getUserInfo($username: String = ${JSON.stringify(
      username.username
    )}) {
      users(where: { username: $username }) {
        _id
        firstName
        username
        avatar
        banner
        bio
        descLink
        followersAggregate {
          count
        }
        followingAggregate {
          count
        }
        job
        location
      }
    }
  `;

  const CHECK_FOLLOW = gql`
    query checkFollow(
      $usernameToFollow: String = ${JSON.stringify(username.username)},
      $_userId: ID = ${JSON.stringify(user._id)}
    ) {
      users(where: { username: $usernameToFollow }) {
        username
        followers(where: { _id: $_userId }) {
          _id
        }
      }
    }
  `;

  const CHECK_BLOCK = gql`
    query checkBlock(
      $username: String = ${JSON.stringify(user.username)},
      $blockedUsername: String = ${JSON.stringify(username.username)}
    ) {
      users(where: { username: $username }) {
        username
        blockedUser(where: { username: $blockedUsername }) {
          username
        }
      }
    }
  `;

  const FOLLOW = gql`
    mutation follow($userToFollowId: ID!, $_userId: ID = ${JSON.stringify(
      user._id
    )}) {
      updateUsers(
        connect: { followers: { where: { node: { _id: $_userId } } } }
        where: { _id: $userToFollowId }
      ) {
        users {
          followersAggregate {
            count
          }
          email
        }
      }
    }
  `;

  const UNFOLLOW = gql`
    mutation unfollow($userToFollowId: ID!, $_userId: ID = ${JSON.stringify(
      user._id
    )}) {
      updateUsers(
        disconnect: { followers: { where: { node: { _id: $_userId } } } }
        where: { _id: $userToFollowId }
      ) {
        users {
          followersAggregate {
            count
          }
          email
        }
      }
    }
  `;

  const BLOCK_USER = gql`
    mutation blockedUser($blockedUserId: ID!, $userId: ID = ${JSON.stringify(
      user._id
    )}) {
      updateUsers(
        connect: { blockedUser: { where: { node: { _id: $blockedUserId } } } }
        where: { _id: $userId }
      ) {
        users {
          firstName
        }
      }
    }
  `;

  const UNBLOCK_USER = gql`
    mutation unblockedUser($blockedUserId: ID!, $userId: ID = ${JSON.stringify(
      user._id
    )}) {
      updateUsers(
        disconnect: { blockedUser: { where: { node: { _id: $blockedUserId } } } }
        where: { _id: $userId }
      ) {
        users {
          firstName
        }
      }
    }
  `;

  //   const FOLLOW_SUBSCRIPTION = gql`
  //   subscription OnNewFollower($username: String = ${JSON.stringify(
  //     username.username
  //   )}) {
  //     onNewFollower(username: $username) {
  //       id
  //       content
  //     }
  //   }
  // `;

  const { loading, error, data } = useQuery(GET_USER_PROFILE_INFO);
  const { data: isFollowing } = useQuery(CHECK_FOLLOW);
  const { data: dataBlocked } = useQuery(CHECK_BLOCK);

  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);
  const [blockUser] = useMutation(BLOCK_USER);
  const [unblockUser] = useMutation(UNBLOCK_USER);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  const isFollowed = isFollowing?.users[0]?.followers.length > 0;

  const isBlocked = dataBlocked?.users[0]?.blockedUser.length > 0;

  const handleOpenModal = () => {
    setShowProfileEdit(true);
  };

  const handleCloseModal = () => {
    setShowProfileEdit(false);
  };

  const handleFollow = () => {
    if (user.username != username.username) {
      follow({
        variables: { userToFollowId: data.users[0]._id },
      });
    }
    window.location.reload();
  };

  const handleUnfollow = () => {
    if (user.username != username.username) {
      unfollow({
        variables: { userToFollowId: data.users[0]._id },
      });
    }
    window.location.reload();
  };

  const onBlockUser = () => {
    blockUser({
      variables: { blockedUserId: data.users[0]._id },
    });
    window.location.reload();
  };

  const onUnblockUser = () => {
    unblockUser({
      variables: { blockedUserId: data.users[0]._id },
    });
    window.location.reload();
  };

  return (
    <div className="space-y-2">
      {showProfileEdit && (
        <ProfileEditModal props={data} onClose={handleCloseModal} />
      )}

      <div className="text-subtileText">
        {isUserMe ? "Your profile" : username.username + "'s profile"}
      </div>
      <div className="flex flex-col bg-componentBackground p-5 rounded-xl border border-componentOutline text-subTitle space-y-5">
        <Image
          width={400}
          height={200}
          alt="user banner"
          src={data.users[0]?.banner || defaultBannerPicture}
          className="w-full bg-btn-background h-36 rounded-md object-cover"
        />
        <div className="flex w-full justify-between">
          <div className="flex gap-3 items-center">
            <Image
              alt="userIcon"
              src={data.users[0]?.avatar || defaultProfilPicture}
              height={40}
              width={40}
              className="w-16 h-16 rounded-md"
            />
            <div className="flex flex-col">
              <div className="text-white text-xl">
                {data.users[0]?.firstName}
              </div>
              <div>@{data.users[0]?.username}</div>
            </div>
          </div>
          {isUserMe ? (
            <button
              className="flex items-center gap-2 py-2 px-3 h-fit group rounded-lg transition-all duration-200 hover:bg-btn-background"
              onClick={handleOpenModal}
            >
              <p className="opacity-50 group-hover:opacity-100 transition-opacity">
                Edit Profile
              </p>

              <Image
                width={20}
                height={20}
                alt="editProfileIcon"
                src={editProfileIcon}
              />
            </button>
          ) : (
            <div className="relative">
              <div
                onClick={() => setShowOptions(!showOptions)}
                className="cursor-pointer p-3"
              >
                <Image width={20} height={20} alt="moreIcon" src={moreIcon} />
              </div>
              {showOptions &&
                (isBlocked ? (
                  <div className="absolute right-3 top-8 bg-componentBackground p-2 rounded-xl border border-componentOutline">
                    <div
                      onClick={onUnblockUser}
                      className="text-error p-2 hover:bg-componentOutline min-w-20 rounded-lg cursor-pointer"
                    >
                      Unblock
                    </div>
                  </div>
                ) : (
                  <div className="absolute right-3 top-8 bg-componentBackground p-2 rounded-xl border border-componentOutline">
                    <div
                      onClick={onBlockUser}
                      className="text-error p-2 hover:bg-componentOutline min-w-20 rounded-lg cursor-pointer"
                    >
                      Block
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-white text-lg">
            {data.bio || "C'est vide ici..."}
          </div>
          <div>
            Check out this link:{" "}
            {data.users[0]?.descLink ? (
              <a
                href={"https://" + data.users[0]?.descLink}
                target="_blank"
                className="text-success"
              >
                {data.users[0]?.descLink || "No link"}
              </a>
            ) : (
              "No link"
            )}
          </div>
        </div>
        <div className="flex w-3/4 space-x-8 mt-2">
          <div className="flex">
            <Image
              width={16}
              height={16}
              className="mr-1"
              alt="commentIcon"
              src={permanentJobIcon}
            />
            <div>{data.users[0]?.job || "No job"}</div>
          </div>
          <div className="flex">
            <Image
              width={16}
              height={16}
              className="mr-1"
              alt="likeIcon"
              src={locationIcon}
            />
            <div>{data.users[0]?.location || "No location"}</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-8 text-lg">
            <div className="flex">
              <div className="text-white mr-1">
                {data.users[0]?.followersAggregate?.count}
              </div>
              <div>Followers</div>
            </div>
            <div className="flex">
              <div className="text-white mr-1">
                {data.users[0]?.followingAggregate?.count}
              </div>
              <div>Following</div>
            </div>
          </div>
          {!isUserMe &&
            (isFollowed ? (
              <button
                onClick={handleUnfollow}
                className={`px-3 py-2 bg-btn-background border border-btn-outline text-error hover:bg-btn-background-hover hover:text-white transition-all rounded-xl`}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className={`px-3 py-2 bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-xl`}
              >
                Follow
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
