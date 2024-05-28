import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavLinkCompProps {
  groupIcon: any;
  altIcon: string;
  title: string;
  pageName: string;
}

export default function NavLinkComp({
  groupIcon,
  altIcon,
  title,
  pageName,
}: NavLinkCompProps) {
  const router = useRouter();
  return (
    <Link
      href={`/${pageName}`}
      className={`flex flex-row w-full items-center rounded-lg px-4 py-3 hover:bg-btn-background hover:text-white transition-all ${
        router.pathname === `/${pageName}` ? "bg-btn-background text-white" : ""
      }`}
    >
      <div className="mr-5">
        <Image alt={altIcon} src={groupIcon} height={20} width={20} />
      </div>
      <div>{title}</div>
    </Link>
  );
}
