type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" className="rounded border px-3 py-1">
        Prev
      </button>
      <span className="text-sm">
        Page {currentPage} / {totalPages}
      </span>
      <button type="button" className="rounded border px-3 py-1">
        Next
      </button>
    </div>
  );
}
