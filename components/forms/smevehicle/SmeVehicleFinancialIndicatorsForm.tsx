// components/forms/FinancialIndicatorsForm.tsx
export const FinancialIndicatorsForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Financial Indicators</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50" >
      <div>
        <label className="block text-sm font-medium mb-1">Total Assets (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Total Assets"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Total Liabilities (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Total Liabilities"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Net Worth (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Net Worth"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Annual Turnover (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Annual Turnover"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Net Profit (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Net Profit"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bank Account Balance (Rs.)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base shadow-sm"
          placeholder="Bank Account Balance"
        />
      </div>
    </div>
  </section>
)
