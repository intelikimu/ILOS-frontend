// components/forms/CashplusExposureTable.tsx

type CashplusExposureTableProps = {
  title: string;
  columns: string[];
  rows?: number;
};

export const CashplusExposureTable = ({
  title,
  columns,
  rows = 2,
}: CashplusExposureTableProps) => (
  <section className="mb-10">
    <h4 className="text-lg font-semibold mb-4">{title}</h4>
    <table className="min-w-full border mb-4">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="px-2 py-1 border">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, idx) => (
          <tr key={idx}>
            {columns.map((col, i) => (
              <td key={i}>
                <input
                  className="w-full border border-gray-300 bg-white px-2 py-1"
                  placeholder={col}
                  type={
                    col.toLowerCase().includes("date")
                      ? "date"
                      : col.toLowerCase().includes("number") ||
                        col.toLowerCase().includes("limit") ||
                        col.toLowerCase().includes("outstanding")
                      ? "number"
                      : "text"
                  }
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
