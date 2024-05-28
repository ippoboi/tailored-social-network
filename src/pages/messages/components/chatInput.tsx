import Image from "next/image";
import React, { useState } from "react";

import chatEmoji from "@/assets/chatEmoji.svg";
import sendIcon from "@/assets/sendIcon.svg";
import { twMerge } from "tailwind-merge";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const buttonDisabled = message.length < 1 || loading;

  return (
    <form className="w-full flex p-3 gap-3 bg-btn-background border border-btn-outline rounded-xl justify-between">
      <button className="opacity-50 hover:opacity-100 transition-opacity">
        <Image src={chatEmoji} alt="emoji" width={24} height={24} />
      </button>
      <input
        className="flex-1 bg-transparent text-subTitle placeholder:text-subTitle/60 focus:outline-none"
        placeholder="Chat with your friends..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className={twMerge(
          "grayscale-0 transition-colors",
          buttonDisabled && "grayscale opacity-50 cursor-not-allowed"
        )}
      >
        <Image src={sendIcon} alt="emoji" width={24} height={24} />
      </button>
    </form>
  );
}
