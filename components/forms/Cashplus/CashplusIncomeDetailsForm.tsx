// components/forms/CashplusIncomeDetailsForm.tsx
export const CashplusIncomeDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">5. Income Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block mb-2 font-medium">Gross Monthly Salary</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Gross Monthly Salary" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Other Monthly Income</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Other Monthly Income" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Net Monthly Income</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Net Monthly Income" />
      </div>
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Other Income Sources</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="otherIncomeSource" /> Rent</label>
          <label className="flex items-center gap-2"><input type="radio" name="otherIncomeSource" /> Commission</label>
          <label className="flex items-center gap-2"><input type="radio" name="otherIncomeSource" /> Business</label>
          <label className="flex items-center gap-2"><input type="radio" name="otherIncomeSource" /> Bonus</label>
          <label className="flex items-center gap-2"><input type="radio" name="otherIncomeSource" /> Other</label>
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="If Other, specify" />
        </div>
      </div>
    </div>
  </section>
)
