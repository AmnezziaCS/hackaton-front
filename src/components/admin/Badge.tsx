import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return <span className="rounded bg-gray-100 px-3 py-1 text-sm">{children}</span>;
}
