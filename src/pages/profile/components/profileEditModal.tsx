import closeIcon from "@/assets/closeIcon.svg";
import InputComp from "@/components/inputComp";
import { useAuth } from "@/context/AuthContext";
import { deletePostAWS, generateUploadURL } from "@/pages/api/s3";
import computeSHA256 from "@/utils/computeSHA256";
import {
  defaultBannerPicture,
  defaultProfilPicture,
} from "@/utils/defaultImages";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const USER_UPDATE = gql`
  mutation updateUser(
    $_id: ID!
    $location: String
    $firstName: String
    $descLink: String
    $bio: String
    $banner: String
    $avatar: String
    $job: String
  ) {
    updateUsers(
      where: { _id: $_id }
      update: {
        avatar: $avatar
        banner: $banner
        bio: $bio
        descLink: $descLink
        firstName: $firstName
        location: $location
        job: $job
      }
    ) {
      users {
        _id
      }
    }
  }
`;

export default function ProfileEditModal({ onClose, props }: any) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    props.users[0]?.avatar
  );
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [bannerUrl, setBannerUrl] = useState<string | undefined>(
    props.users[0]?.banner
  );
  const [bannerFile, setBannerFile] = useState<File | undefined>(undefined);
  const [files, setFiles] = useState<File[]>([]);

  const [firstName, setFirstName] = useState(props.firstName);
  const [bio, setBio] = useState(props.bio);
  const [location, setLocation] = useState(props.location);
  const [job, setJob] = useState(props.job);
  const [descLink, setDescLink] = useState(props.desckLink);

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let buttonDisabled = false;

  if (statusMessage) {
    buttonDisabled = true;
  } else {
    buttonDisabled = false;
  }

  const { user } = useAuth();

  const [updateUser, { data, loading: mutaLoading, error }] =
    useMutation(USER_UPDATE);

  const handleAvatarChange = async (e: any) => {
    const file = e.target.files?.[0];
    setAvatarFile(file);

    if (avatarUrl) {
      URL.revokeObjectURL(avatarUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    } else {
      setAvatarUrl(undefined);
    }

    setFiles(file);
  };

  const handleBannerChange = async (e: any) => {
    const file = e.target.files?.[0];
    setBannerFile(file);

    if (bannerUrl) {
      URL.revokeObjectURL(bannerUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setBannerUrl(url);
    } else {
      setBannerUrl(undefined);
    }

    setFiles(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusMessage("creating");
    setLoading(true);

    const uploadFile = async (file: any) => {
      setStatusMessage(`Uploading files...`);
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
        return null;
      }

      const { url } = signedUrlResult.success;

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      return url.split("?")[0];
    };

    let newBannerUrl = bannerUrl;
    let newAvatarUrl = avatarUrl;

    if (bannerFile) {
      newBannerUrl = (await uploadFile(bannerFile)) as string;
      if (!newBannerUrl) {
        setStatusMessage("Banner upload failed");
        setLoading(false);
        return;
      }

      await deletePostAWS(props.users[0]?.banner as string);
    }

    if (avatarFile) {
      newAvatarUrl = (await uploadFile(avatarFile)) as string;

      if (!newAvatarUrl) {
        setStatusMessage("Avatar upload failed");
        setLoading(false);
        return;
      }

      await deletePostAWS(props.users[0]?.avatar as string);
    }

    updateUser({
      variables: {
        _id: user._id,
        location: location,
        firstName: firstName,
        descLink: descLink,
        bio: bio,
        banner: newBannerUrl?.split("?")[0] || bannerUrl,
        avatar: newAvatarUrl?.split("?")[0] || avatarUrl,
        job: job,
      },
    });

    setStatusMessage("Changes applied successfully");
    setLoading(false);

    window.location.reload();
  };

  return (
    <>
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
        <div className=" bg-componentBackground border-btn-outline border m-auto p-5 min-w-[558px] rounded-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-subTitle">Edit your profile</h3>
            <button onClick={onClose} type="button" className=" text-red-500 ">
              <Image
                width={16}
                height={16}
                className=""
                alt="closeIcon"
                src={closeIcon}
              />
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="flex items-center justify-center ">
              <Image
                width={720}
                height={300}
                className="w-full hover:opacity-80 cursor-pointer transtion-all bg-btn-background h-32 rounded-md object-cover"
                alt="modifyPicture"
                src={bannerUrl || defaultBannerPicture}
              />
              <input
                className="bg-transparent flex-1 border-none outline-none hidden"
                name="media"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                onChange={handleBannerChange}
              />
            </label>

            <div className="flex space-x-5 text-subTitle w-full justify-center items-center">
              <label className="h-32 min-w-32 overflow-hidden rounded-xl ">
                <Image
                  width={256}
                  height={256}
                  className="hover:opacity-80 h-32 w-32 cursor-pointer transtion-all object-cover"
                  alt="userIcon"
                  src={avatarUrl || defaultProfilPicture}
                />
                <input
                  className="bg-transparent flex-1 border-none outline-none hidden"
                  name="media"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                  onChange={handleAvatarChange}
                />
              </label>
              <InputComp
                value={firstName}
                setValue={(e: any) => setFirstName(e.target.value)}
                placeholder={props.users[0]?.firstName}
                label="First Name"
              />
            </div>
            <InputComp
              value={bio}
              setValue={(e: any) => setBio(e.target.value)}
              placeholder={props.users[0]?.bio || "C'est vide ici..."}
              label="Bio"
              isTextArea={true}
            />
            <div className="flex w-full space-x-4 ">
              <InputComp
                value={job}
                setValue={(e: any) => setJob(e.target.value)}
                placeholder={props.users[0]?.job || "No job..."}
                label="Current Job"
              />
              <InputComp
                value={location}
                setValue={(e: any) => setLocation(e.target.value)}
                placeholder={props.users[0]?.location || "No location..."}
                label="Location"
              />
            </div>
            <div className="flex w-full">
              <div className="flex flex-col w-full">
                <InputComp
                  value={descLink}
                  setValue={(e: any) => setDescLink(e.target.value)}
                  placeholder={props.users[0]?.descLink || "No link..."}
                  label="Link"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={buttonDisabled}
              aria-disabled={buttonDisabled}
              className={twMerge(
                `px-3 py-2 w-full bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-xl`,
                buttonDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {statusMessage ? (
                <div className="text-center text-subTitle">{statusMessage}</div>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
