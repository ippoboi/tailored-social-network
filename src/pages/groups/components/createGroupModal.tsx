import closeIcon from "@/assets/closeIcon.svg";
import editProfileIcon from "@/assets/editProfileIcon.svg";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";

export default function CreateGroupModal({ onClose }: any) {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const CREATE_GROUP = gql`
    mutation publishGroups($description: String!, $name: String!) {
      createGroups(input: { name: $name, description: $description }) {
        groups {
          name
          id
          description
          createdAt
        }
      }
    }
  `;
  const [createGroups, { loading, error }] = useMutation(CREATE_GROUP);
  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;
  console.log(createGroups);

  return (
    <>
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
        <div className=" bg-componentBackground border-btn-outline border m-auto p-5 min-w-[558px] rounded-xl ">
          <div className="flex justify-between items-center">
            <h3 className="text-subTitle">Create a New Group</h3>
            <button onClick={onClose} type="button" className=" text-red-500 ">
              <Image className="" alt="closeIcon" src={closeIcon} />
            </button>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              createGroups({
                variables: { name: name, description: description },
              });
            }}
          >
            <button className="flex items-center justify-center w-full bg-btn-background h-32 rounded-md mt-4">
              <Image className="" alt="modifyPicture" src={editProfileIcon} />
            </button>

            <div className="text-subTitle">Name</div>
            <input
              className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
              placeholder="Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="text-subTitle">Description</div>
            <input
              className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
              placeholder="What is this group about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              type="submit"
              className="px-3 py-2 w-full bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-xl"
            >
              Create Group
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
