import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-lg bg-white p-4 shadow">
      {title ? <h2 className="mb-3 text-xl font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}
