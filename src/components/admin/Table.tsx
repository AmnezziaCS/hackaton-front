import type { ReactNode } from "react";

type TableProps = {
  headers: string[];
  emptyText: string;
  children?: ReactNode;
};

export default function Table({ headers, emptyText, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-2 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children ? (
            children
          ) : (
            <tr>
              <td className="px-2 py-3 text-gray-500" colSpan={headers.length}>
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
