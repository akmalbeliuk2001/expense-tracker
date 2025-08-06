"use client";

import { getMontlyRecap } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import HeaderActions from "@/components/molecules/HeaderAction";

export default function MontlyRecapPage() {
  const { user } = useAuth();
  const [recap, setRecap] = useState({});

  console.log({ recap });

  useEffect(() => {
    if (!user) return;

    console.log({ user });

    getMontlyRecap(user.uid).then(setRecap);
  }, [user]);

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1024px] mx-auto">
        <HeaderActions />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Rekap Bulanan</h1>
          <div className="space-y-3">
            {Object.entries(recap).map(([month, total]) => (
              <div
                key={month}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <span>{month}</span>
                <span className="font-semibold text-right">
                  Rp {(Number(total) || 0).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
