import React from "react";

interface ProjectCompProps {
  projectName: string;
  startDate: string;
  endDate: string;
  where: string;
}

export default function ProjectComp({
  projectName,
  startDate,
  endDate,
  where,
}: ProjectCompProps) {
  return (
    <div className=" bg-btn-background px-4 py-3 rounded-lg">
      <div className="text-subTitle flex items-end gap-2">
        <div className="text-white text-xl">{projectName}</div>
        <div className="">
          {startDate} - {endDate}
        </div>
      </div>
      <div className="text-subTitle">{where}</div>
    </div>
  );
}
