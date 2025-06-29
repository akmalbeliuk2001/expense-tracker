"use client";

import { Concert_One } from "next/font/google";

interface RekapTableProps {
  data: {
    category: string;
    total: number;
  }[];
}

export default function RekapTable({ data }: RekapTableProps) {
  console.log({ data });
  // if (!data || data.length === 0) {
  //   return (
  //     <p className="text-gray-500 mt-4">Tidak ada data untuk ditampilkan.</p>
  //   );
  // }

  return (
    <div className="w-full bg-[#F5F5F7] p-4 text-[#333] border rounded-xl text-lg">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Monthly Recap Details
      </h2>

      {!data || data.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">
          There is no transaction data yet.
        </p>
      ) : (
        <div className="flex flex-col gap-y-2">
          {/* Header */}
          <div className="flex justify-between font-semibold border-b pb-1">
            <span>Category</span>
            <span>Total Pengeluaran</span>
          </div>

          {/* Data Rows */}
          {data.map((item) => (
            <div
              key={item.category}
              className="flex justify-between bg-white rounded-md p-2 shadow-sm"
            >
              <span className="capitalize">{item.category}</span>
              <span>Rp {Number(item.total).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
