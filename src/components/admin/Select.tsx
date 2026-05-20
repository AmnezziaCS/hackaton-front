import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

export default function Select({ children, ...props }: SelectProps) {
  return (
    <select className="rounded border p-2" {...props}>
      {children}
    </select>
  );
}
