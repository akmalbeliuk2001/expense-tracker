import { format } from "date-fns";
import { id } from "date-fns/locale";

import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { deleteTransaction } from "@/lib/firestore";
import { DataTransaction } from "@/types/transaction";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import TransactionForm from "./TransactionForm";
import ConfirmationModal from "./ConfirmationModal";

export default function TransactionItem({
  dataTransaction,
}: {
  dataTransaction: DataTransaction;
}) {
  const { user } = useAuth();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formatingDate = (firestoreDate: Timestamp) => {
    if (!firestoreDate?.seconds) return "";
    const dateObj = new Date(firestoreDate.seconds * 1000);
    const date = format(dateObj, "dd LLL yyyy", { locale: id });
    const time = `${format(dateObj, "HH:mm", { locale: id })} WIB`;

    return `${date} ${time}`;
  };

  const handleDelete = async () => {
    try {
      await deleteTransaction(user.uid, dataTransaction.id);
      setShowConfirmation(false);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <>
      <div className="w-full bg-[#F5F5F7] border-2 py-3 px-3 rounded-xl text-base lg:text-xl">
        <div className="flex items-center justify-between">
          <div className="bg-[#333] w-max text-white px-3 py-1 rounded-[24px]">
            Rp {Number(dataTransaction.nominal).toLocaleString()}
          </div>
          <div className="flex gap-x-2 text-xl lg:text-3xl">
            <MdEdit
              className="cursor-pointer text-[#333]"
              onClick={() => setShowTransactionForm(true)}
            ></MdEdit>
            <MdDelete
              className="cursor-pointer text-[#333]"
              onClick={() => setShowConfirmation(true)}
            ></MdDelete>
          </div>
        </div>
        <div className="my-4">
          <p className="font-bold capitalize">{dataTransaction.category}</p>
          <p>{dataTransaction.describtions}</p>
        </div>
        <div className="border-t-2 border-[#333] pt-3">
          {formatingDate(dataTransaction.date)}
        </div>
      </div>
      {showTransactionForm && (
        <TransactionForm
          dataTransaction={dataTransaction}
          formType="edit"
          onCancel={() => setShowTransactionForm(false)}
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          title="Are you sure you want to delete this?"
          onCancel={() => setShowConfirmation(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
