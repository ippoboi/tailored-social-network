import Image from "next/image";
import React, { useState } from "react";

import testIcon from "@/assets/shareIcon.svg";
import LoveComp from "./loveComp";
import HobbyComp from "./hobbyComp";
import ProjectComp from "./projectComp";
import EduComp from "./eduComp";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuth } from "@/context/AuthContext";

const GET_HOBBIES = gql`
  query getHobbies {
    hobbies {
      name
      id
    }
  }
`;

const ADD_HOBBY = gql`
  mutation addHobby($hobbyName: String!, $username: String!) {
    updateUsers(
      connect: { hobbies: { where: { node: { name: $hobbyName } } } }
      where: { username: $username }
    ) {
      users {
        hobbies {
          name
          id
        }
      }
    }
  }
`;

export default function ProfileInfoEditModal({ onClose, props }: any) {
  const { user } = useAuth();
  const [showAddHobby, setShowAddHobby] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState("");
  const { loading, error, data } = useQuery(GET_HOBBIES);
  const [addHobby] = useMutation(ADD_HOBBY);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  const uniqueHobbies = new Set(data.hobbies);

  const onAddHobbyClicked = () => {
    console.log(props.users[0]._id);
    addHobby({
      variables: {
        hobbyName: selectedHobby,
        username: user.username,
      },
    });
    console.log("Hobby added");
    window.location.reload();
  };

  return (
    <>
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
        <div className=" bg-componentBackground border-btn-outline border m-auto p-5 w-[558px] rounded-lg space-y-5">
          <div className="flex justify-between items-center ">
            <h3 className="text-subTitle">Edit your informations</h3>
            <button
              onClick={onClose}
              type="button"
              className=" text-red-500 p-2 "
            >
              X
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-subTitle">Hobbies</div>
            <div className="flex gap-2">
              {props.users[0].hobbies.map((item: any) => (
                <div key={item.id}>
                  <div className="bg-hobbies px-3 py-1 rounded-lg  text-black">
                    {item.name}
                  </div>
                </div>
              ))}
              <div className="relative">
                <button
                  onClick={() => setShowAddHobby(!showAddHobby)}
                  className="rounded-lg px-3 py-1  text-subtileText border border-inputField-outline"
                >
                  + Add hobby
                </button>
                {showAddHobby && (
                  <div className="absolute mt-2 space-x-3 bg-componentBackground border border-componentOutline p-3 rounded-xl flex gap-2">
                    <select
                      name="hobby"
                      id="hobby"
                      value={selectedHobby}
                      onChange={(e) => setSelectedHobby(e.target.value)}
                      className="border-inputField-outline text-subTitle focus:outline-none bg-inputField-background p-2 rounded-lg"
                    >
                      <option value="0">Select a hobby</option>
                      {Array.from(uniqueHobbies).map((item: any) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                    </select>
                    <div className="flex gap-1">
                      <button
                        onClick={onAddHobbyClicked}
                        className="rounded-lg px-3 py-1 hover:text-subTitle transition-all text-subtileText border border-inputField-outline"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddHobby(!showAddHobby)}
                        className="rounded-lg px-3 py-1  text-error grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all "
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-subTitle">Loves</div>
            <div className="flex flex-wrap gap-4">
              <LoveComp icon={testIcon} something="Paella" category="Food" />
              <LoveComp
                icon={testIcon}
                something="Museums"
                category="Going-Out"
              />
              <LoveComp
                icon={testIcon}
                something="Hiking"
                category="Favorit Sport"
              />
              <button className=" text-subtileText border-inputField-outline">
                + Add new things you love
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-subTitle">Latest Projects or Experiences</div>
            <div className="flex flex-col gap-2">
              <ProjectComp
                projectName="Data Dashboard"
                startDate="22 Mar 2023"
                endDate="Today"
                where="Consulting"
              />
              <ProjectComp
                projectName="Data Dashboard"
                startDate="22 Mar 2023"
                endDate="Today"
                where="Consulting"
              />

              <button className="rounded-lg  text-subtileText p-2 border border-inputField-outline">
                + Add new Projects or Experiences
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-subTitle">Education</div>
            <div className="flex flex-col gap-2">
              <EduComp
                schoolName="Harvard University"
                fieldOfStudy="Computer Science"
              />
              <EduComp
                schoolName="Harvard University"
                fieldOfStudy="Computer Science"
              />
            </div>
            <button className="rounded-lg  text-subtileText p-2 border border-inputField-outline">
              + Add new education
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
