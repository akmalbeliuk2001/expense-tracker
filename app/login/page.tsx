"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { login, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { FaGoogle } from "react-icons/fa";

import InputBase from "@/components/atoms/InputBase";
import ButtonBase from "@/components/atoms/ButtonBase";

export default function LoginPage() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const userCredential = await login(dataUser.email, dataUser.password);
      const uid = userCredential.user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const isValidUser =
        docSnap.exists() && userData && Object.keys(userData).length > 0;

      if (isValidUser) {
        router.push("/dashboard");
      } else {
        router.push("/incomes");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const uid = result.user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const isValidUser =
        docSnap.exists() && userData && Object.keys(userData).length > 0;

      if (isValidUser) {
        router.push("/dashboard");
      } else {
        router.push("/incomes");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <div className="bg-white w-full h-screen flex items-center justify-center px-4">
      <div className="bg-[#F5F5F7] border rounded-lg p-4 w-full max-w-[500px] text-base md:text-lg">
        <div className="flex flex-col items-center gap-y-2 mb-3 w-full text-[#333]">
          <h1 className="text-3xl font-bold">Hallo!</h1>
          <p className="text-center">
            Hi! Hope everything’s <u>going well</u> for you today!
          </p>
        </div>
        <p>Email</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          value={dataUser.email}
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          autoComplete="off"
        ></InputBase>
        <p className="mt-4">Password</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          type="password"
          value={dataUser.password}
          placeholder="Password"
          name="password"
          onChange={handleChange}
          autoComplete="off"
        ></InputBase>
        <ButtonBase
          className="bg-[#333] w-full rounded-md py-1 text-white text-center cursor-pointer mt-4"
          onClick={handleLogin}
        >
          Log In
        </ButtonBase>
        <ButtonBase
          className=" w-full cursor-pointer mt-3"
          onClick={handleGoogleLogin}
        >
          <div className="w-fit mx-auto flex items-center gap-x-2 cursor-pointer">
            <FaGoogle />
            <p>Login dengan Google</p>
          </div>
        </ButtonBase>

        <p className="mt-5">
          <strong>Dont Have Account? </strong>
          <Link className="cursor-pointer" href="/register" prefetch={false}>
            <u>Sign Up Here</u>{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
