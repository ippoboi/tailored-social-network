import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import React, { useState } from "react";
import albumIcon from "@/assets/album-01.svg";
import mockProfilPic from "@/assets/mockProfilPic.png";
import textBoldIcon from "@/assets/text-bold.svg";
import textItalicIcon from "@/assets/text-italic.svg";
import { useAuth } from "@/context/AuthContext";
import UsersMessageList from "./components/usersMessageList";
import ChatPage from "./components/[id]";

function MessagesPage() {
  const [content, setContent] = useState("");
  const [receiver, setReceiver] = useState("");
  const { user } = useAuth();

  const SEND_MESSAGE = gql`
    mutation SendMessage(
      $content: String!
      $sender: String!
      $receiver: String!
    ) {
      sendMessage(content: $content, sender: $sender, receiver: $receiver) {
        id
        content
        sender
        receiver
        timestamp
      }
    }
  `;

  const [sendMessage] = useMutation(SEND_MESSAGE);

  return (
    <div className="flex gap-4">
      <div className="space-y-2 w-fit">
        <div className="text-subtileText">Messages</div>
        <UsersMessageList />
      </div>
      <div className="space-y-2 flex-1">
        <div className="text-subtileText">Chat</div>
        <ChatPage />
      </div>
    </div>
  );
}

export default MessagesPage;
