"use client";

import { useAuth } from "@/context/AuthContext";
import { toKebab, toCapitalize } from "@/utils/textFormat";
import {
  addUserDAta,
  updateUserData,
  getUserData,
  deleteUserData,
} from "@/lib/firestore";

import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

import Overlay from "../atoms/Overlay";
import InputBase from "../atoms/InputBase";
import ButtonBase from "../atoms/ButtonBase";
import ConfirmationModal from "./ConfirmationModal";

interface Category {
  raw: string; // nilai input apa adanya
  id: string; // id terformat
  label: string; // label kapital
}
interface Income {
  source: string;
  nominal: string;
}
interface Categories {
  id: string;
  label: string;
}
interface IncomesUser {
  name: string;
  income: Income[];
  categories: Categories[];
}

interface UserFormProps {
  onCancel: () => void;
  typeForm: "input" | "edit";
  showCancel: boolean;
}

export default function UserForm({
  onCancel,
  typeForm = "input",
  showCancel = true,
}: UserFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [incomes, setIncomes] = useState<Income[]>([
    {
      source: "",
      nominal: "",
    },
  ]);
  const [category, setCategory] = useState<Category[]>([
    { raw: "", id: "", label: "" },
  ]);
  const [showConfrimation, setShowConfirmation] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState("");
  const [fieldToDelete, setFieldToDelete] = useState("");
  // Incomes
  const handleAddIncomes = () =>
    setIncomes([...incomes, { source: "", nominal: "" }]);

  const handleChangeIncomes = (
    e: string,
    field: keyof Income, // ✅ hanya "source" atau "nominal"
    idx: number
  ) => {
    const updated = [...incomes];
    updated[idx][field] = e;
    setIncomes(updated);
  };

  const deleteIncome = async () => {
    await deleteUserData(user.uid, fieldToDelete, sourceToDelete);
  };

  const handleDeleteIncome = (field: string, source: string) => {
    if (field === "income" && incomes.length <= 1) return;
    if (field === "category" && category.length <= 1) return;

    setSourceToDelete(source);
    setFieldToDelete(field);
    setShowConfirmation(true);
  };

  // Category
  const handleAddCategory = () =>
    setCategory([...category, { raw: "", id: "", label: "" }]);

  const handleChangeCategory = (value: string, idx: number) => {
    const raw = value;
    const id = toKebab(raw);
    const label = toCapitalize(raw);

    setCategory((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, raw, id, label } : item))
    );
  };

  const handleSave = async () => {
    const finalData = {
      name: name,
      income: incomes.map((item) => ({
        source: item.source,
        nominal: Number(item.nominal),
      })),
      categories: category.map((item) => ({
        id: item.id,
        label: item.label,
      })),
    };

    try {
      typeForm === "input"
        ? await addUserDAta(user.uid, finalData)
        : await updateUserData(user.uid, finalData);
      onCancel();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!user) return;
    const unsubscribe = getUserData(user.uid, (dataUser: IncomesUser) => {
      if (!dataUser) return;
      setName(dataUser.name || "");
      const incomesData = Array.isArray(dataUser.income) ? dataUser.income : [];
      setIncomes(
        incomesData.length > 0 ? incomesData : [{ source: "", nominal: "" }]
      );
      const categoriesData = Array.isArray(dataUser.categories)
        ? dataUser.categories.map((cat) => ({
            ...cat,
            raw: cat.label,
          }))
        : [];

      setCategory(
        categoriesData.length
          ? categoriesData
          : [{ raw: "", id: "", label: "" }]
      );
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <Overlay>
      <div className="bg-[#F5F5F7] border rounded-lg p-4 w-full max-w-[500px]">
        <h1 className="text-3xl font-bold text-center w-full mb-5 text-[#333] capitalize">
          <span className="capitalize">{typeForm}</span> Your Data
        </h1>
        <p>Name</p>
        <InputBase
          className="border p-2 rounded-md w-full text-[#333]"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <p className="mt-4">Incomes</p>
          <div className="flex flex-col gap-y-2">
            {incomes.map((n, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <InputBase
                  id="source"
                  className="border p-2 rounded-md w-full text-[#333]"
                  type="text"
                  placeholder="Source Income"
                  value={n.source}
                  autoComplete="off"
                  onChange={(e) => {
                    handleChangeIncomes(e.target.value, "source", index);
                  }}
                />
                <InputBase
                  className="border p-2 rounded-md w-full text-[#333]"
                  type="number"
                  placeholder="Nominal"
                  value={n.nominal}
                  autoComplete="off"
                  onChange={(e) => {
                    handleChangeIncomes(e.target.value, "nominal", index);
                  }}
                />
                <MdDelete
                  className={`text-xl shrink-0  ${
                    incomes.length <= 1
                      ? "text-[#999] cursor-not-allowed"
                      : "text-[#333] cursor-pointer"
                  }`}
                  onClick={() => {
                    handleDeleteIncome("income", n.source);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="w-full mt-2 flex justify-end">
            <ButtonBase
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={handleAddIncomes}
            >
              <p>Add Income</p>
              <IoIosAddCircle />
            </ButtonBase>
          </div>
        </div>

        <div>
          <p className="mt-4">Expenditure Category</p>
          <div className="flex flex-col gap-y-2">
            {category.map((c, index) => (
              <div className="flex items-center gap-x-2">
                <InputBase
                  key={index}
                  className="border p-2 rounded-md w-full text-[#333]"
                  type="text"
                  placeholder="Category"
                  value={c.raw}
                  autoComplete="off"
                  onChange={(e) => {
                    handleChangeCategory(e.target.value, index);
                  }}
                />
                <MdDelete
                  className={`text-xl shrink-0  ${
                    category.length <= 1
                      ? "text-[#999] cursor-not-allowed"
                      : "text-[#333] cursor-pointer"
                  }`}
                  onClick={() => {
                    handleDeleteIncome("category", c.id);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="w-full mt-2 flex justify-end">
            <ButtonBase
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={handleAddCategory}
            >
              <p>Add Category</p>
              <IoIosAddCircle />
            </ButtonBase>
          </div>
        </div>

        <div className="flex flex-col gap-y-3 mt-6">
          <ButtonBase
            className="bg-[#333] w-full rounded-md py-1 text-white text-center cursor-pointer font-bold"
            onClick={handleSave}
          >
            {typeForm === "input" ? "Save" : "Update"}
          </ButtonBase>
          {showCancel && (
            <ButtonBase
              className="w-full rounded-md py-1 text-[#333] text-center cursor-pointer font-bold"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </ButtonBase>
          )}
        </div>
      </div>
      {showConfrimation && (
        <ConfirmationModal
          title="Are you sure you want to delete this?"
          onCancel={() => setShowConfirmation(false)}
          onConfirm={() => {
            setShowConfirmation(false);
            deleteIncome();
          }}
        />
      )}
    </Overlay>
  );
}
