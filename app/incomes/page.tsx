"use client";

import { useRouter } from "next/navigation";
import UserForm from "@/components/molecules/UserForm";

export default function IncomesPage() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <UserForm
        showCancel={false}
        typeForm="input"
        onCancel={() => router.push("/dashboard")}
      />
    </div>
  );
}
