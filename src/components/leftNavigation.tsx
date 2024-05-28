import appIcon from "@/assets/appLogo.svg";
import calendarIcon from "@/assets/calendarIcon.svg";
import groupIcon from "@/assets/groupIcon.svg";
import homeIcon from "@/assets/homeIcon.svg";
import menuIcon from "@/assets/menuIcon.svg";
import messageIcon from "@/assets/messageIcon.svg";
import notificationIcon from "@/assets/notificationIcon.svg";
import searchIcon from "@/assets/searchIcon.svg";
import settingsIcon from "@/assets/settingsIcon.svg";
import userIcon from "@/assets/userIcon.svg";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";

import showMenuIcon from "@/assets/showMenu.svg";
import { useState } from "react";
import NavLinkComp from "./navLinkComp";
import { defaultProfilPicture } from "@/utils/defaultImages";

function LeftNavigation() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="fixed top-0 left-0">
      <div className="flex flex-col justify-between h-screen bg-componentBackground p-5 text-subTitle">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Image alt="appLogo" src={appIcon} height={40} width={40} />
            <Image alt="menuLogo" src={menuIcon} height={32} width={32} />
          </div>
          <div className="flex pl-4 bg-btn-background rounded-lg">
            <Image
              src={searchIcon}
              alt="Search"
              className=""
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-3 bg-btn-background focus:outline-none rounded-lg"
            />
          </div>
          <NavLinkComp
            groupIcon={homeIcon}
            altIcon="homeIcon"
            title="Home"
            pageName=""
          />
          <NavLinkComp
            groupIcon={notificationIcon}
            altIcon="notificationIcon"
            title="Notifications"
            pageName="notifications"
          />
          <NavLinkComp
            groupIcon={messageIcon}
            altIcon="messageIcon"
            title="Messages"
            pageName="messages"
          />
          <NavLinkComp
            groupIcon={groupIcon}
            altIcon="groupIcon"
            title="Groups"
            pageName="groups"
          />
          <NavLinkComp
            groupIcon={calendarIcon}
            altIcon="calendarIcon"
            title="Events"
            pageName="events"
          />
          <NavLinkComp
            groupIcon={userIcon}
            altIcon="userIcon"
            title="Profile"
            pageName={`profile/${user?.username}`}
          />
          <NavLinkComp
            groupIcon={settingsIcon}
            altIcon="settingsIcon"
            title="Settings"
            pageName="settings"
          />
        </div>
        <div className="relative w-full">
          {showMenu && (
            <div className="absolute -top-20 w-full bg-btn-background rounded-xl flex-col space-y-4 p-2">
              <button
                className="w-full rounded-lg px-4 text-red-400 py-3 hover:bg-red-900/35 hover:text-red-200 transition-all"
                onClick={() => logout()}
              >
                Deconnexion
              </button>
            </div>
          )}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center p-[4px] pr-4 bg-btn-background justify-between w-full rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div>
                <Image
                  alt="profile"
                  src={user?.avatar || defaultProfilPicture}
                  height={56}
                  width={56}
                  className="rounded"
                />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-white">{user?.firstName || "Dimitar"}</div>
                <div className="">@{user?.username || "dimitroweb"}</div>
              </div>
            </div>

            <Image alt="show menu icon" src={showMenuIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftNavigation;
