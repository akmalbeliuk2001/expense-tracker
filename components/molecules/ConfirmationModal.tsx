import { ReactNode } from "react";

import Overlay from "../atoms/Overlay";
import ButtonBase from "../atoms/ButtonBase";

interface ConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  children?: ReactNode;
  title?: string;
  subTitle?: string;
}

export default function ConfirmationModal({
  onCancel,
  onConfirm,
  children,
  title = "",
  subTitle = "",
}: ConfirmationModalProps) {
  return (
    <Overlay>
      <div className="relative bg-[#F5F5F7] border rounded-lg p-4 w-full max-w-[500px]">
        <div>
          <p className="font-bold mb-2 text-xl">{title}</p>
          <p>{subTitle}</p>
          {children}
        </div>
        <div className="flex justify-end items-center gap-x-4 w-full mt-8">
          <ButtonBase
            className="text-[#333] font-bold cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </ButtonBase>
          <ButtonBase
            className="bg-[#333] text-white rounded px-4 py-1 font-bold cursor-pointer"
            onClick={onConfirm}
          >
            Confirm
          </ButtonBase>
        </div>
      </div>
    </Overlay>
  );
}
