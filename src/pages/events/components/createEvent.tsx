import React, { useState } from "react";

import plusIcon from "@/assets/plusIcon.svg";
import Image from "next/image";

import CreateEventModal from "@/pages/events/components/createEventModal";

export default function CreateEvent() {
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
        className="rounded-xl w-full flex items-center border bg-componentBackground border-componentOutline hover:bg-btn-background transition-all gap-5 p-3 group"
        onClick={handleOpenModal}
      >
        <Image alt="plusIcon" src={plusIcon} width={12} height={12} />
        <div className="text-subTitle group-hover:text-white">
          Create a new event
        </div>
      </button>
      {showCreateNewGroup && <CreateEventModal onClose={handleCloseModal} />}
    </div>
  );
}
