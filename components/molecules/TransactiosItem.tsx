import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { DataTransaction } from "@/types/transaction";
import { Timestamp } from "firebase/firestore";

export default function TransactionItem({
  dataTransaction,
}: {
  dataTransaction: DataTransaction;
}) {
  const formatingDate = (firestoreDate: Timestamp) => {
    if (!firestoreDate?.seconds) return "";
    const dateObj = new Date(firestoreDate.seconds * 1000);
    const date = format(dateObj, "dd LLL yyyy", { locale: id });
    const time = `${format(dateObj, "HH:mm", { locale: id })} WIB`;

    return `${date} ${time}`;
  };

  return (
    <div className="w-full bg-[#F5F5F7] border-2 py-3 px-3 rounded-xl text-lg">
      <div className="flex items-center justify-between">
        <div className="bg-[#333] w-max text-white px-3 py-1 rounded-[24px]">
          Rp {Number(dataTransaction.nominal).toLocaleString()}
        </div>
        <div className="flex gap-x-2 text-3xl">
          <MdEdit className="cursor-pointer text-[#333]"></MdEdit>
          <MdDelete className="cursor-pointer text-[#333]"></MdDelete>
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
  );
}
