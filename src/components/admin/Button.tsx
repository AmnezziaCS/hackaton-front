import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Button({ children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className="rounded bg-black px-3 py-2 text-white" {...props}>
      {children}
    </button>
  );
}
