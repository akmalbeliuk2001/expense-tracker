import { ChangeEvent, SelectHTMLAttributes } from "react";

interface Option {
  id: string | number;
  label: string;
}

interface SelectBaseProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
}

export default function SelectBase({
  name,
  value,
  onChange,
  options = [],
  className = "",
  ...props
}: SelectBaseProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
