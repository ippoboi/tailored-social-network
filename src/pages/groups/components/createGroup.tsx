import React, { useState } from "react";

import plusIcon from "@/assets/plusIcon.svg";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import CreateGroupModal from "@/pages/groups/components/createGroupModal";

export default function CreateGroup() {
  const [showCreateNewGroup, setShowCreateNewGroup] = useState(false);

  const handleOpenModal = () => {
    setShowCreateNewGroup(true);
  };

  const handleCloseModal = () => {
    setShowCreateNewGroup(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="rounded-xl w-full flex items-center border bg-componentBackground border-componentOutline hover:bg-btn-background transition-all gap-5 p-3 group"
      >
        <Image alt="plusIcon" src={plusIcon} width={12} height={12} />
        <div className="text-subTitle group-hover:text-white">
          Create a new group
        </div>
      </button>
      {showCreateNewGroup && <CreateGroupModal onClose={handleCloseModal} />}
    </div>
  );
}
