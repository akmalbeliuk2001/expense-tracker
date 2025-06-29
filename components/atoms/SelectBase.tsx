import { ChangeEvent, SelectHTMLAttributes, useEffect, useState } from "react";
import { getUserData } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";

interface Option {
  id: string | number;
  label: string;
}

interface categoriesItem {
  id: string;
  label: string;
}

interface SelectBaseProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export default function SelectBase({
  name,
  value,
  onChange,
  className = "",
  ...props
}: SelectBaseProps) {
  const { user } = useAuth();
  const [options, setOptions] = useState<categoriesItem[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = getUserData(
      user.uid,
      (dataUser: { categories: categoriesItem[] }) => {
        if (dataUser) {
          setOptions(dataUser.categories);
        } else {
          console.warn("User document not found");
        }
      }
    );

    return () => unsubscribe();
  }, [user]);

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
