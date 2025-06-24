import Link from "next/link";
import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/firestore";
import { DataTransaction } from "@/types/transaction";

import { FiArrowUpRight } from "react-icons/fi";

import ButtonBase from "../atoms/ButtonBase";
import TransactionItem from "../molecules/TransactiosItem";

interface User {
  uid: string;
}

interface TransactionListsProps {
  user: User;
  setTotalExpends: (total: number) => void;
}

export default function TransactionLists({
  user,
  setTotalExpends,
  addTransaction,
}: TransactionListsProps) {
  const { uid } = user;
  const [transactions, setTransactions] = useState<DataTransaction[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = getTransactions(uid, (data: DataTransaction[]) => {
      setTransactions(data);
      const total = data.reduce(
        (acc, curr) => acc + Number(curr.nominal || 0),
        0
      );
      setTotalExpends(total);
    });

    return () => unsubscribe();
  }, [user, setTotalExpends]);
  return (
    <div className="w-full max-w-[800px] border-2 rounded-xl">
      <div className="w-full p-4 border-b-2 flex items-center justify-between">
        <p className="font-bold text-3xl">Your Transaction Lists</p>
        <div className="flex gap-x-2">
          <ButtonBase
            className="bg-[#333] text-lg px-3 py-1 rounded-full text-white whitespace-nowrap cursor-pointer"
            onClick={addTransaction}
          >
            Add +
          </ButtonBase>
          <Link href="/recap" prefetch={false}>
            <ButtonBase className="flex items-center text-lg gap-x-1 bg-[#333] px-3 py-1 rounded-full text-white whitespace-nowrap cursor-pointer">
              Recap Page
              <span>
                <FiArrowUpRight />
              </span>
            </ButtonBase>
          </Link>
        </div>
      </div>
      <div className="p-4 ">
        <div className="flex flex-col gap-y-2 h-full max-h-[500px] overflow-auto pr-2">
          {transactions.map((item) => (
            <TransactionItem key={item.id} dataTransaction={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
