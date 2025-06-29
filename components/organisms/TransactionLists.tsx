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
  addTransaction: () => void;
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
    <div className="w-full max-w-[800px] border-2 rounded-xl overflow-hidden">
      <div className="w-full p-2 lg:p-4 border-b-2 flex items-center justify-between">
        <p className="font-bold text-xl lg:text-3xl">Your Transaction Lists</p>
        <div className="flex flex-col sm:flex-row gap-2 text-base lg:text-xl">
          <ButtonBase
            className="bg-[#333] px-3 py-1 rounded-full text-white whitespace-nowrap cursor-pointer w-max ml-auto"
            onClick={addTransaction}
          >
            Add +
          </ButtonBase>
          <Link href="/recap" prefetch={false}>
            <ButtonBase className="flex items-center gap-x-1 bg-[#333] px-3 py-1 rounded-full text-white whitespace-nowrap cursor-pointer">
              Recap Page
              <span>
                <FiArrowUpRight />
              </span>
            </ButtonBase>
          </Link>
        </div>
      </div>
      <div className="p-2 lg:p-4">
        <div className="flex flex-col gap-y-2 h-full max-h-[300px] lg:max-h-[500px] overflow-auto pr-2">
          {transactions.length > 0 ? (
            transactions.map((item) => (
              <TransactionItem key={item.id} dataTransaction={item} />
            ))
          ) : (
            <p className="text-center text-lg">
              There is no transaction data yet!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
