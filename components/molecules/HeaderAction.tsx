"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

import { IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

import Overlay from "@/components/atoms/Overlay";
import UserForm from "@/components/molecules/UserForm";

export default function HeaderActions() {
  const router = useRouter();
  const [showUserForm, setShowUserForm] = useState(false);

  const toggleShowUserForm = () => setShowUserForm(!showUserForm);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error: any) {
      console.error("Failed logout:", error.message);
    }
  };

  return (
    <>
      {showUserForm && (
        <Overlay>
          <UserForm onCancel={toggleShowUserForm} />
        </Overlay>
      )}

      <div className="w-full flex justify-end items-center gap-x-2 mb-4">
        <IoMdSettings
          className="text-2xl cursor-pointer"
          onClick={toggleShowUserForm}
        />
        <IoLogOut className="text-2xl cursor-pointer" onClick={handleLogout} />
      </div>
    </>
  );
}
