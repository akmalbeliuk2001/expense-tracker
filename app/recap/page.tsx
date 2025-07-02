"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/firestore";

import { FaArrowLeft } from "react-icons/fa";

import ButtonBase from "@/components/atoms/ButtonBase";
import HeaderActions from "@/components/molecules/HeaderAction";
import RecapChart from "@/components/organisms/RecapCharts";
import RecapTable from "@/components/organisms/RecapTable";

// ✅ Tambahkan ini
type TransactionItem = {
  category: string;
  nominal: number;
  [key: string]: any;
};

export default function RecapPage() {
  const { user, loading } = useAuth();
  const [totalPerCategory, setTotalPerCategory] = useState<
    { category: string; total: number }[]
  >([]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = getTransactions(user.uid, (data: TransactionItem[]) => {
      const kategoriTotal = data.reduce((acc, item) => {
        const kategori = item.category;
        const nominal = item.nominal;

        if (!acc[kategori]) acc[kategori] = 0;
        acc[kategori] += nominal;

        return acc;
      }, {} as Record<string, number>);

      const totalArray = Object.entries(kategoriTotal).map(
        ([category, total]) => ({
          category,
          total,
        })
      );

      setTotalPerCategory(totalArray);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="bg-white w-full h-screen flex-col p-4 md:flex items-center justify-center overflow-auto">
      <div className="w-full max-w-[1024px] mx-auto">
        <div className="flex w-full items-center justify-between">
          <ButtonBase className="bg-[#333] w-max p-1.5 rounded-full">
            <Link href="/dashboard" prefetch={false}>
              <FaArrowLeft className="text-white text-xs" />
            </Link>
          </ButtonBase>
          <HeaderActions />
        </div>
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-4 mt-4 lg:mt-6 w-full">
          <RecapChart data={totalPerCategory} />
          <RecapTable data={totalPerCategory} />
        </div>
      </div>
    </div>
  );
}
