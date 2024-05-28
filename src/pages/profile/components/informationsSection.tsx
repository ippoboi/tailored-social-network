import editProfileIcon from "@/assets/editProfileIcon.svg";
import testIcon from "@/assets/shareIcon.svg";
import { useAuth } from "@/context/AuthContext";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";
import EduComp from "./eduComp";
import LoveComp from "./loveComp";
import ProfileInfoEditModal from "./profileInfoEditModal";
import ProjectComp from "./projectComp";

export default function InformationsSection(username: any) {
  const [showInfoEdit, setShowInfoEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { user } = useAuth();
  const isUserMe = user.username == username.username ? true : false;

  const GET_USER_PROFILE_INFO = gql`
  query getUserInfo($username: String = ${JSON.stringify(username.username)}) {
    users(where: {username: $username}) {
      hobbies {
        name
        id
      }
    }
  }
`;

  const { loading, error, data } = useQuery(GET_USER_PROFILE_INFO);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;
  console.log(data);

  const handleOpenModal = () => {
    setShowInfoEdit(true);
  };

  const handleCloseModal = () => {
    setShowInfoEdit(false);
  };

  return (
    <div className="space-y-2">
      {showInfoEdit && (
        <ProfileInfoEditModal props={data} onClose={handleCloseModal} />
      )}
      <div className=" text-subtileText">Informations</div>
      <div className="flex flex-col bg-componentBackground px-5 py-6 rounded-xl gap-3 border border-componentOutline text-subTitle">
        <div className="flex w-full justify-between">
          <div>Hobbies</div>
          {isUserMe && (
            <button
              className="flex items-center gap-2 h-fit group rounded-lg transition-all duration-200 "
              onClick={handleOpenModal}
            >
              <p className="opacity-50 group-hover:opacity-100 transition-opacity">
                Edit Info
              </p>

              <Image
                width={16}
                height={16}
                alt="editProfileIcon"
                src={editProfileIcon}
              />
            </button>
          )}
        </div>
        <div className="flex gap-2 w-full text-background items-center">
          {data.users[0].hobbies.map((item: any) => (
            <div key={item.id}>
              <div className="bg-hobbies px-3 py-1 rounded-lg  text-black">
                {item.name}
              </div>
            </div>
          ))}
        </div>
        {showMore && (
          <div className="space-y-4">
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
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-subTitle">
                Latest Projects or Experiences
              </div>
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
            </div>
          </div>
        )}

        <div className="flex text-subTitle w-full mt-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="pl-2 pr-4 py-2 border-btn-outline border w-full rounded-lg"
          >
            {!showMore ? (
              <div>
                Learn more about <span className="text-white">Dimitar</span>
              </div>
            ) : (
              <div>
                See less about <span className="text-white">Dimitar</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
