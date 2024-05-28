"use client";

import Image from "next/image";

import albumIcon from "@/assets/album-01.svg";
import mockProfilPic from "@/assets/mockProfilPic.png";
import { useAuth } from "@/context/AuthContext";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { generateUploadURL } from "@/pages/api/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface UserPost {
  groupId: string;
}

export default function UserPost(props: UserPost) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const { user } = useAuth();

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const buttonDisabled = content.length < 1 || loading;

  const PUBLISH_POST = gql`
    mutation updateGroups( $id : ID = ${JSON.stringify(
      props.groupId
    )}, $userId: ID = ${JSON.stringify(
    user._id
  )}, $content: String!, $imageURL: String) {
        updateGroups(
            where: {id:$id}
            create: {posts: {node: {content: $content, imageURL: $imageURL, author: {connect: {where: {node: {_id: $userId}}}}}}}
               
        ) {
            groups {
                posts {
                    id
                    content
                }
            }
        }
    }
  `;

  const [createPost, { data, loading: mutaLoading, error }] =
    useMutation(PUBLISH_POST);

  if (error) return <p>Error</p>;
  if (mutaLoading) return <p>Loading...</p>;
  console.log(data);

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusMessage("creating");
    setLoading(true);

    if (file) {
      setStatusMessage("Uploading file");
      const checksum = await computeSHA256(file);

      const signedUrlResult = await generateUploadURL({
        fileSize: file.size,
        fileType: file.type,
        checksum,
      });

      if (signedUrlResult.failure !== undefined) {
        setStatusMessage("failed");
        setLoading(false);
        console.error("error");
        return;
      }

      const { url } = signedUrlResult.success;

      await createPost({
        variables: { content: content, imageURL: url.split("?")[0] },
      });

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
    }

    if (!file) {
      await createPost({
        variables: { content: content, imageURL: null },
      });
    }

    setStatusMessage("Created");
    setLoading(false);
  };

  // console.log(data.createPosts.posts[0].id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <div className="text-subtileText">Post</div>
        <div className="flex flex-col bg-componentBackground p-[4px] pb-3 rounded-lg border border-componentOutline text-subTitle space-y-3">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Image
              alt="userIcon"
              src={mockProfilPic}
              height={40}
              width={40}
              className="border border-btn-outline rounded w-10 h-10"
            />
            <input
              type="text"
              placeholder="Share your thoughts to the world!"
              className=" bg-btn-background w-full rounded p-2 focus:outline-none placeholder:text-subTitle"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className={twMerge(
                "bg-btn-background rounded p-2",
                buttonDisabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={buttonDisabled}
              aria-disabled={buttonDisabled}
              type="submit"
            >
              Post
            </button>
          </form>

          {fileUrl && file && (
            <div className="mt-4">
              {file.type.startsWith("image/") ? (
                <Image
                  src={fileUrl}
                  alt="Selected file"
                  className="w-full h-auto max-h-96 rounded-lg"
                />
              ) : file.type.startsWith("video/") ? (
                <video src={fileUrl} controls />
              ) : null}
            </div>
          )}

          <label className="flex pl-12 w-full gap-3">
            <Image
              alt="upload image"
              className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity duration-300"
              src={albumIcon}
              height={20}
              width={20}
            />
            <input
              className="bg-transparent flex-1 border-none outline-none hidden"
              name="media"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-2 text-center text-subTitle border border-componentBackground rounded-lg`}
        >
          <p>{statusMessage}</p>
        </div>
      )}
    </div>
  );
}
