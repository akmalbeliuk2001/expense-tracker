import { ReactNode, MouseEventHandler } from "react";

interface ButtonBaseProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function ButtonBase({
  children,
  onClick,
  className = "",
}: ButtonBaseProps) {
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
}
