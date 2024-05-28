import { defaultProfilPicture } from "@/utils/defaultImages";
import ChatInput from "./chatInput";
import MyMessage from "./myMessage";
import OtherUserMessage from "./otherUserMessage";
import Image from "next/image";

export default function ChatPage() {
  return (
    <div className=" bg-componentBackground border border-componentOutline rounded-xl min-h-[700px] p-3 space-y-2 flex flex-col justify-between">
      <div className="w-full p-4 bg-componentOutline rounded-lg flex gap-4">
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
      <div className="flex-1 flex flex-col justify-end">
        <MyMessage
          content="This is a big message to test the caracters max length and how it will
          look like when it's too long."
          date="23 May 2023 4:00 AM"
        />
        <OtherUserMessage
          content="This is a big message to test the caracters max length and how it will
          look like when it's too long."
          date="23 May 2023 4:00 AM"
        />
      </div>
      <ChatInput />
    </div>
  );
}
