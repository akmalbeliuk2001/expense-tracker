"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import TransactionLists from "@/components/organisms/TransactionLists";
import SaldoInformation from "@/components/molecules/SaldoInformation";
import TransactionForm from "@/components/molecules/TransactionForm";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [totalExpends, setTotalExpends] = useState(0);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const toggleShowInput = () => setShowTransactionForm(!showTransactionForm);

  if (loading || !user) {
    return (
      <div className="h-screen flex gap-x-2 items-center justify-center text-3xl">
        <AiOutlineLoading3Quarters className="animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-[1024px] mx-auto flex gap-x-4 ">
        <div className="w-full">
          <TransactionLists
            user={user}
            setTotalExpends={setTotalExpends}
            addTransaction={toggleShowInput}
          />
        </div>
        <div className="w-full max-w-[300px]">
          <SaldoInformation user={user} totalExpends={totalExpends} />
        </div>
      </div>
      {showTransactionForm && (
        <TransactionForm onCancel={toggleShowInput} user={user} />
      )}
    </div>
  );
}
