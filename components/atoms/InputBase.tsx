import React from "react";

interface InputBaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  autoComplete: string;
}

export default function InputBase({
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  className = "",
  autoComplete = "off",
  ...props
}: InputBaseProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      className={`${className}`}
      autoComplete={autoComplete}
      {...props}
    />
  );
}
