// components/forms/CashplusLoanPreferenceForm.tsx
export const CashplusLoanPreferenceForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">1. Loan Preference Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block mb-2">Loan Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="loanType" /> Normal</label>
          <label className="flex items-center gap-2"><input type="radio" name="loanType" /> Top up</label>
        </div>
      </div>
      <div>
        <label className="block mb-2">Amount Requested</label>
        <input type="number" className="w-full border rounded-xl bg-white px-4 py-2" placeholder="Amount Requested" />
      </div>
      <div>
        <label className="block mb-2">Minimum Amount Acceptable</label>
        <input type="number" className="w-full border rounded-xl bg-white px-4 py-2" placeholder="Minimum Acceptable" />
      </div>
      <div>
        <label className="block mb-2">Max Affordable Installment</label>
        <input type="number" className="w-full border rounded-xl bg-white px-4 py-2" placeholder="Max Affordable Installment" />
      </div>
      <div>
        <label className="block mb-2">Tenure</label>
        <div className="flex flex-wrap gap-3">
          {[1,2,3,4,5].map(y => (
            <label key={y} className="flex items-center gap-2">
              <input type="radio" name="tenure" /> {y} Year{y>1?'s':''}
            </label>
          ))}
        </div>
      </div>
    </div>
  </section>
)
