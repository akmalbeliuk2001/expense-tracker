"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import ButtonBase from "../atoms/ButtonBase";
import InputBase from "../atoms/InputBase";
import SelectBase from "../atoms/SelectBase";
import { addTransaction, updateTransaction } from "@/lib/firestore";

import Overlay from "../atoms/Overlay";

export default function TransactionForm({
  onCancel,
  user,
  dataTransaction = [],
  formType = "input",
}) {
  const selectOptions = [
    { id: "", label: "Pilih Kategori" },
    { id: "makan", label: "Makan" },
    { id: "hobi", label: "Hobi" },
    { id: "transport", label: "Transportasi" },
    { id: "lainnya", label: "Lainnya" },
  ];
  const [docId, setDocId] = useState("");

  const [inputTransaction, setInputTransaction] = useState({
    nominal: "",
    category: "",
    describtions: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) =>
    setInputTransaction({
      ...inputTransaction,
      [e.target.name]: e.target.value,
    });

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      formType === "input"
        ? await addTransaction(user.uid, inputTransaction)
        : await updateTransaction(user.uid, docId, inputTransaction);
      onCancel();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (formType === "edit") {
      const { createAt, id, ...restData } = dataTransaction[0];
      setDocId(id);
      const formattedDate = format(new Date(restData.date), "yyyy-MM-dd");
      const newData = {
        ...restData,
        date: formattedDate,
      };

      setInputTransaction(newData);
    }
  }, []);

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
        ></InputBase>
        <p className="mt-4">Spend Category</p>
        <SelectBase
          className="border p-2 rounded-md w-full text-[#333]"
          value={inputTransaction.category}
          name="category"
          onChange={handleChange}
          options={selectOptions}
        />
        <p className="mt-4">Describtions</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          value={inputTransaction.describtions}
          type="text"
          placeholder="Describtions"
          name="describtions"
          onChange={handleChange}
        ></InputBase>
        <p className="mt-4">Date</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          value={inputTransaction.date}
          type="date"
          placeholder="Date"
          name="date"
          onChange={handleChange}
        ></InputBase>

        <div className="flex flex-col gap-y-3 mt-4">
          <ButtonBase
            className="bg-[#333] w-full rounded-md py-1 text-white text-center cursor-pointer font-bold"
            onClick={handleSave}
          >
            Save
          </ButtonBase>
          <ButtonBase
            className="w-full rounded-md py-1 text-[#333] text-center cursor-pointer font-bold"
            onClick={() => onCancel()}
          >
            Cancel
          </ButtonBase>
        </div>
      </div>
    </Overlay>
  );
}
