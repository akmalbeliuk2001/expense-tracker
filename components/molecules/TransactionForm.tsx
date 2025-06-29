"use client";

import { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { addTransaction, updateTransaction } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";

import Overlay from "../atoms/Overlay";
import InputBase from "../atoms/InputBase";
import ButtonBase from "../atoms/ButtonBase";
import SelectBase from "../atoms/SelectBase";

interface RawTransaction {
  id: string;
  nominal: number;
  category: string;
  describtions: string;
  date: Timestamp;
  createAt: Timestamp;
}

interface InputTransaction {
  nominal: string;
  category: string;
  describtions: string;
  date: string;
}

interface TransactionFormProps {
  onCancel: () => void;
  dataTransaction: RawTransaction;
  formType: "input" | "edit";
}

export default function TransactionForm({
  onCancel,
  dataTransaction,
  formType = "input",
}: TransactionFormProps) {
  const { user } = useAuth();
  const [docId, setDocId] = useState("");

  const [inputTransaction, setInputTransaction] = useState<InputTransaction>({
    nominal: "",
    category: "",
    describtions: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setInputTransaction({
      ...inputTransaction,
      [e.target.name]: e.target.value,
    });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user) return;

      if (formType === "input") {
        await addTransaction(user.uid, inputTransaction);
      } else {
        await updateTransaction(user.uid, docId, inputTransaction);
      }

      onCancel();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (formType === "edit" && dataTransaction) {
      const { createAt, id, date, ...restData } = dataTransaction;
      setDocId(id);

      const formattedDate = new Date(date.seconds * 1000)
        .toISOString()
        .split("T")[0];

      setInputTransaction({
        ...restData,
        nominal: String(restData.nominal),
        date: formattedDate,
      });
    }
  }, [formType, dataTransaction]);

  return (
    <Overlay>
      <div className="bg-[#F5F5F7] border rounded-lg p-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center w-full mb-5 text-[#333] capitalize">
          {formType} Your Expenses
        </h1>
        <p>Nominal</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          value={inputTransaction.nominal}
          type="number"
          placeholder="Nominal"
          name="nominal"
          onChange={handleChange}
          autoComplete="off"
        />
        <p className="mt-4">Spend Category</p>
        <SelectBase
          className="border p-2 rounded-md w-full text-[#333]"
          value={inputTransaction.category}
          name="category"
          onChange={handleChange}
          autoComplete="off"
        />
        <p className="mt-4">Describtions</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          value={inputTransaction.describtions}
          type="text"
          placeholder="Describtions"
          name="describtions"
          onChange={handleChange}
          autoComplete="off"
        />
        <p className="mt-4">Date</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          value={inputTransaction.date}
          type="date"
          placeholder="Date"
          name="date"
          onChange={handleChange}
          autoComplete="off"
        />

        <div className="flex flex-col gap-y-3 mt-4">
          <ButtonBase
            className="bg-[#333] w-full rounded-md py-1 text-white text-center cursor-pointer font-bold"
            onClick={handleSave}
          >
            Save
          </ButtonBase>
          <ButtonBase
            className="w-full rounded-md py-1 text-[#333] text-center cursor-pointer font-bold"
            onClick={onCancel}
          >
            Cancel
          </ButtonBase>
        </div>
      </div>
    </Overlay>
  );
}
