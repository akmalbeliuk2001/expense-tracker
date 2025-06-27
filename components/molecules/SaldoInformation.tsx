import { getUserData } from "@/lib/firestore";
import { useEffect, useState } from "react";

interface User {
  uid: string;
}

interface IncomeItem {
  source: string;
  nominal: number;
}

interface SaldoInformationProps {
  user: User;
  totalExpends: number;
}

export default function SaldoInformation({
  user,
  totalExpends,
}: SaldoInformationProps) {
  const { uid } = user;
  const [incomes, setIncomes] = useState<IncomeItem[]>([]);

  const totalIncome = () => {
    const total = incomes.reduce((total, item) => {
      return total + Number(item.nominal);
    }, 0);
    return total;
  };

  useEffect(() => {
    if (!user) return;

    const unsubscribe = getUserData(
      uid,
      (dataUser: { income: IncomeItem[] }) => {
        if (dataUser) {
          setIncomes(dataUser.income);
        } else {
          console.warn("User document not found");
        }
      }
    );

    return () => unsubscribe(); // stop listener saat unmount
  }, [user]);

  return (
    <div className="w-full border-2 rounded-xl p-4 h-max text-lg">
      <div className="flex flex-col gap-y-1 pb-3">
        {incomes.map((income, index) => (
          <div key={index} className="w-full flex justify-between ">
            <p>• {income.source}:</p>
            <p>Rp {Number(income.nominal).toLocaleString()}</p>
          </div>
        ))}
        <div className="w-full flex justify-between">
          <p>Total Income:</p>
          <p className="border-t-2 border-[#333]">
            Rp {Number(totalIncome()).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between border-t-2 border-[#333] pt-3">
        <p>Total Expendses:</p>
        <p>Rp {Number(totalExpends).toLocaleString()}</p>
      </div>
      <div className="w-full flex justify-between font-bold">
        <p>Saldo:</p>
        <p>Rp {Number(totalIncome() - totalExpends).toLocaleString()}</p>
      </div>
    </div>
  );
}
