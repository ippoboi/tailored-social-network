"use client";

import Image from "next/image";
import React, { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import appLogo from "../../../assets/appLogo.svg";
import arrowIcon from "../../../assets/arrowIcon.svg";

export interface LoginProps {
  Email: string;
  Password: string;
}

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await login(email, password);

    console.log({ response });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-1/3 h-full p-8 rounded-xl bg-componentBackground">
        <div className="flex flex-col w-full items-center justify-center gap-16">
          <div className="flex flex-col justify-center items-center gap-6">
            <Image
              className="border border-btn-outline rounded-2xl "
              alt="appLogo"
              src={appLogo}
              height={70}
              width={70}
            />
            <div className="text-center">
              <div className="text-white text-3xl">Welcome Back!</div>
              <div className="text-subTitle text-lg">
                See what&apos;s new inside.
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
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
              Login
            </button>
          </form>

          <div className="flex flex-row space-x-2">
            <div className="text-subTitle">Don&apos;t have an account?</div>
            <Link
              href="/auth/register"
              className="flex flex-row text-subtileText items-center"
            >
              <div>Sign Up</div>
              <Image alt="arrowIcon" src={arrowIcon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
