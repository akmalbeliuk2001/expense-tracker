"use client";

import Link from "next/link";
import React from "react";

import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      await login(dataUser.email, dataUser.password);
      router.push("/dashboard");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-white w-full h-screen flex items-center justify-center px-4">
      <div className="bg-[#F5F5F7] border rounded-lg p-4 w-full max-w-[500px]">
        <div className="flex flex-col items-center gap-y-2 mb-5 w-full text-[#333]">
          <h1 className="text-3xl font-bold">Hallo!</h1>
          <p className="text-md text-center">
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
