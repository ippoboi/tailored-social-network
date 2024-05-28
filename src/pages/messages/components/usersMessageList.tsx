import React from "react";
import Message from "./message";

export default function UsersMessageList(props: any) {
  return (
    <div className=" bg-componentBackground border border-componentOutline rounded-xl max-w-96 min-w-80 min-h-[700px] p-3 space-y-2">
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}
