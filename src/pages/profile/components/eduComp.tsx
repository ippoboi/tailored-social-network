import React from "react";

export default function EduComp({
  schoolName,
  fieldOfStudy,
}: {
  schoolName: string;
  fieldOfStudy: string;
}) {
  return (
    <div className=" bg-btn-background px-4 py-3 rounded-lg">
      <div className="text-white text-xl">{schoolName}</div>
      <div className="text-subTitle">{fieldOfStudy}</div>
    </div>
  );
}
