"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";

import appLogo from "../../../assets/appLogo.svg";
import arrowIcon from "../../../assets/arrowIcon.svg";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export interface RegisterProps {
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;
}

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await register(
      firstName,
      lastName,
      username,
      email,
      password
    );

    console.log({ response });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-1/3 h-full p-8 rounded-xl bg-componentBackground">
        <div className="flex flex-col w-full items-center justify-center gap-12">
          <div className="flex flex-col justify-center items-center gap-6">
            <Image
              className="border border-btn-outline rounded-2xl "
              alt="appLogo"
              src={appLogo}
              height={70}
              width={70}
            />
            <div className="text-center">
              <div className="text-white text-3xl">Welcome!</div>
              <div className="text-subTitle text-lg">
                A social media that cares about you
              </div>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="flex flex-row text-subTitle space-x-2 w-full">
                <input
                  className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <input
                className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
                type="email"
                placeholder="Email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="rounded-xl w-full bg-inputField-background focus:outline-none text-subTitle py-3 px-4 border border-inputField-outline placeholder:text-subtileText"
                type="password"
                placeholder="Password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="px-3 py-2 w-full bg-btn-background border border-btn-outline text-subTitle hover:bg-btn-background-hover hover:text-white transition-all rounded-xl"
            >
              Register
            </button>
          </form>
          <div className="flex flex-row space-x-2">
            <div className="text-subTitle">Already have an account?</div>
            <Link
              href="/auth/login"
              className="flex flex-row text-subtileText items-center"
            >
              <div>Sign In</div>
              <Image alt="arrowIcon" src={arrowIcon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
