import React from "react";

export default function HobbyComp(hobby: any) {
  return <div className="bg-hobbies px-3 py-1 rounded-lg ">{hobby.name}</div>;
}
