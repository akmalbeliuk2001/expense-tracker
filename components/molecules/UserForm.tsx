"use client";

import InputBase from "../atoms/InputBase";
import ButtonBase from "../atoms/ButtonBase";

import { IoIosAddCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

import { useAuth } from "@/context/AuthContext";
import { addDataUser, updateDataUser, getDataUser } from "@/lib/firestore";

export default function UserForm({ onCancel, typeForm = "input" }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [incomes, setIncomes] = useState([
    {
      source: "",
      nominal: "",
    },
  ]);

  const handleAdd = () => setIncomes([...incomes, { source: "", nominal: "" }]);

  const handleChange = (e, field, idx) => {
    const updated = [...incomes];
    updated[idx][field] = e.target.value;
    setIncomes(updated);
  };

  const handleSave = async () => {
    const finalData = {
      name: name,
      income: incomes.map((item) => ({
        source: item.source,
        nominal: Number(item.nominal),
      })),
    };

    try {
      typeForm === "input"
        ? await addDataUser(user.uid, finalData)
        : await updateDataUser(user.uid, finalData);
      onCancel();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const fetchDataUser = async () => {
    const dataUser = await getDataUser(user.uid);
    if (dataUser && Object.keys(dataUser).length > 0) {
      setName(dataUser.name);
      setIncomes(dataUser.income);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchDataUser();
  }, [user]);

  return (
    <div className="bg-[#F5F5F7] border rounded-lg p-4 w-full max-w-[500px]">
      <h1 className="text-3xl font-bold text-center w-full mb-5 text-[#333] capitalize">
        Your Data
      </h1>
      <p>Name</p>
      <InputBase
        className="border p-2 rounded-md w-full text-[#333]"
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className="mt-4">Income</p>
      <div className="flex flex-col gap-y-2">
        {incomes.map((n, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <InputBase
              id="source"
              className="border p-2 rounded-md w-full text-[#333]"
              type="text"
              placeholder="Source Income"
              value={n.source}
              onChange={(e) => {
                handleChange(e, "source", index);
              }}
            />
            <InputBase
              className="border p-2 rounded-md w-full text-[#333]"
              type="number"
              placeholder="Nominal"
              value={n.nominal}
              onChange={(e) => {
                handleChange(e, "nominal", index);
              }}
            />
            <MdDelete className="text-xl shrink-0 cursor-pointer" />
          </div>
        ))}
      </div>
      <div className="w-full mt-2 flex justify-end">
        <ButtonBase
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={handleAdd}
        >
          <p>Add</p>
          <IoIosAddCircle />
        </ButtonBase>
      </div>
      <div className="flex flex-col gap-y-3 mt-6">
        <ButtonBase
          className="bg-[#333] w-full rounded-md py-1 text-white text-center cursor-pointer font-bold"
          onClick={handleSave}
        >
          {typeForm === "input" ? "Save" : "Update"}
        </ButtonBase>
        <ButtonBase
          className="w-full rounded-md py-1 text-[#333] text-center cursor-pointer font-bold"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </ButtonBase>
      </div>
    </div>
  );
}
