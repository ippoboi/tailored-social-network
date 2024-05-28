import React, { useState } from "react";
import Image from "next/image";

import changePasswordIcon from "@/assets/resetPasswordGray.svg";
import { useAuth } from "@/context/AuthContext";
import { gql, useMutation } from "@apollo/client";

export default function ChangePassword() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { user } = useAuth();

  const UPDATE_PASSWORD = gql`
    mutation updatePassword($id: ID!, $password: String!) {
      updateUsers(where: { _id: $id }, update: { password: $password }) {
        users {
          _id
        }
      }
    }
  `;

  const [updatePassword, { loading, error }] = useMutation(UPDATE_PASSWORD);

  const onChangePassword = (password1: string) => {
    if (password1 === password2) {
      console.log(password1);
      updatePassword({ variables: { id: user._id, password: password1 } });
    } else {
      alert("les mots de passe ne correspondent pas!");
    }
  };

  return (
    <div className="bg-componentBackground w-full space-y-6 h-4/6 rounded-xl border-1 p-5 border-componentOutline">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onChangePassword(password1);
        }}
      >
        <div className="flex h-full w-full flex-col space-y-4 ">
          <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center space-x-4 ">
              <div>
                <Image
                  alt="changePasswordIcon"
                  src={changePasswordIcon}
                  width={20}
                  height={20}
                />
              </div>
              <div className="text-subTitle">Change Password</div>
            </div>
            <div className="flex flex-col space-y-10">
              <div className="flex flex-col space-y-4">
                <div className="text-subTitle">Enter New Password:</div>
                <input
                  type="password"
                  placeholder="New Password"
                  className="px-4 py-3 w-full text-subTitle bg-btn-background focus:outline-none rounded-lg"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="text-subTitle">Confirm New Password:</div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="px-4 py-3 w-full text-subTitle bg-btn-background focus:outline-none rounded-lg"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-center">
              <button
                type="submit"
                className="p-4 w-1/2 items-center bg-btn-background focus:outline-none rounded-lg"
              >
                <div className="text-white">Confirm</div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
