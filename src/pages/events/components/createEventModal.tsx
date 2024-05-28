import closeIcon from "@/assets/closeIcon.svg";
import editProfileIcon from "@/assets/editProfileIcon.svg";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";

export default function CreateEventModal({ onClose }: any) {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("2024-05-27T10:30:00");

  const CREATE_EVENT = gql`
    mutation publishEvents(
      $description: String!
      $name: String!
      $location: String!
      $date: DateTime
    ) {
      createEvents(
        input: {
          name: $name
          description: $description
          location: $location
          date: $date
        }
      ) {
        events {
          name
          id
          location
          createdAt
          date
          description
        }
      }
    }
  `;
  const [createEvents, { loading, error }] = useMutation(CREATE_EVENT);
  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;
  console.log(createEvents);

  return (
    <>
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
        <div className=" bg-componentBackground border-btn-outline border m-auto p-5 min-w-[558px] rounded-xl ">
          <div className="flex justify-between items-center">
            <h3 className="text-subTitle">Create a New Event</h3>
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

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              createEvents({
                variables: {
                  name: name,
                  description: description,
                  location: location,
                  date: date,
                },
              });
            }}
          >
            <button className="flex items-center justify-center w-full bg-btn-background h-32 rounded-md mt-4">
              <Image
                width={16}
                height={16}
                className=""
                alt="modifyPicture"
                src={editProfileIcon}
              />
            </button>

            <div className="text-subTitle">Name</div>
            <input
              className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="text-subTitle">Description</div>
            <input
              className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
              placeholder="What is this event about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
              placeholder="Where does it take place?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
