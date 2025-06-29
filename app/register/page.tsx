"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";

import InputBase from "@/components/atoms/InputBase";
import ButtonBase from "@/components/atoms/ButtonBase";

export default function RegisterPage() {
  const router = useRouter();
  const [dataAccount, setDataAccount] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDataAccount({ ...dataAccount, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await register(dataAccount.email, dataAccount.password);
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-white w-full h-screen flex items-center justify-center px-4">
      <div className="bg-[#F5F5F7] border rounded-lg p-4 w-full max-w-[500px] text-base md:text-lg">
        <div className="text-3xl font-bold text-center w-full mb-5 text-[#333]">
          Create Your Account Here
        </div>
        <p className="mt-4">Email</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          type="email"
          value={dataAccount.email}
          placeholder="Email"
          name="email"
          onChange={handleChanges}
          autoComplete="off"
        ></InputBase>
        <p className="mt-4">Pasword</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          type="password"
          value={dataAccount.password}
          placeholder="Password"
          name="password"
          onChange={handleChanges}
          autoComplete="off"
        ></InputBase>
        <ButtonBase
          className="bg-[#333] w-full rounded-md py-1 text-white text-center cursor-pointer mt-4"
          onClick={handleSubmit}
        >
          Create Account
        </ButtonBase>
        <p className="mt-5">
          <strong>Already Have Account? </strong>
          <Link className="cursor-pointer" href="/login" prefetch={false}>
            <u>Log In Here</u>
          </Link>
        </p>
      </div>
    </div>
  );
}
