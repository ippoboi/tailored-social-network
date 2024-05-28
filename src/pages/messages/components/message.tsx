import { defaultProfilPicture } from "@/utils/defaultImages";
import Image from "next/image";
import { useState } from "react";

export default function Message() {
  const [newMessage, setNewMessage] = useState(false);

  return (
    <div
      className={`p-3 cursor-pointer group hover:bg-btn-background transition-all pr-5 space-y-3 ${
        newMessage && "bg-btn-background"
      } rounded-lg`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src={defaultProfilPicture}
            alt="userIcon"
            height={40}
            width={40}
            className="rounded w-10 h-10"
          />
          <div>
            <div className="text-white">Dimitar</div>
            <div className="text-subTitle text-sm">@dimitroweb</div>
          </div>
        </div>
        <div
          className={`text-sm group-hover:text-subTitle transition-all ${
            newMessage ? "text-subTitle" : "text-subtileText"
          }`}
        >
          4 min
        </div>
      </div>
      <div>{newMessage && "Sent a new message"}</div>
    </div>
  );
}
