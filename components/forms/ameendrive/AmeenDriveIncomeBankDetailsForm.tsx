export const AmeenDriveIncomeBankDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">8. Income Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block mb-2 font-medium">Regular Monthly</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Regular Monthly" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Gross Income</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Gross Income" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Net Take Home</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Net Take Home" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Other Monthly Income (if any)</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Other Monthly Income" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Source of Other Income</label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="otherIncome" /> Business</label>
          <label className="flex items-center gap-2"><input type="radio" name="otherIncome" /> Rent</label>
          <label className="flex items-center gap-2"><input type="radio" name="otherIncome" /> Commission</label>
          <label className="flex items-center gap-2"><input type="radio" name="otherIncome" /> Bonus</label>
          <label className="flex items-center gap-2"><input type="radio" name="otherIncome" /> Other</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Monthly Income</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Monthly Income" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Average Monthly Savings</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Average Monthly Savings" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Is your Spouse Employed?</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="spouseEmployed" /> Yes</label>
          <label className="flex items-center gap-2"><input type="radio" name="spouseEmployed" /> No</label>
          <label className="flex items-center gap-2"><input type="radio" name="spouseEmployed" /> Not Applicable</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Source of Spouse's Income</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Source of Spouse's Income" />
      </div>
    </div>
    <div className="mt-8">
      <h4 className="text-lg font-semibold mb-4">Bank Details (Bank 1 & 2)</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
        {[1, 2].map((i) => (
          <div key={i} className="border p-4 rounded-xl">
            <label className="block mb-2 font-medium">Bank {i} Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" placeholder={`Bank ${i} Name`} />
            <label className="block mb-2 font-medium">Branch</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" placeholder="Branch" />
            <label className="block mb-2 font-medium">Account No.</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" placeholder="Account No." />
            <label className="block mb-2 font-medium">Type of Account</label>
            <div className="flex gap-3 mb-2">
              <label className="flex items-center gap-2"><input type="radio" name={`accountType${i}`} /> Current</label>
              <label className="flex items-center gap-2"><input type="radio" name={`accountType${i}`} /> Saving</label>
              <label className="flex items-center gap-2"><input type="radio" name={`accountType${i}`} /> Certificate</label>
            </div>
            <label className="block mb-2 font-medium">Currency Type</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2"><input type="radio" name={`currencyType${i}`} /> Local</label>
              <label className="flex items-center gap-2"><input type="radio" name={`currencyType${i}`} /> Foreign</label>
            </div>
          </div>
        ))}
      </div>
      <h4 className="text-lg font-semibold mt-8 mb-4">Additional Bank Details (Multiple)</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
        {[1, 2].map((i) => (
          <div key={i} className="border p-4 rounded-xl">
            <label className="block mb-2 font-medium">Financing Payable to</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" placeholder="Financing Payable to" />
            <label className="block mb-2 font-medium">Purpose of Financing</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" placeholder="Purpose of Financing" />
            <label className="block mb-2 font-medium">Date Financing Taken</label>
            <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" />
            <label className="block mb-2 font-medium">Outstanding Balance (Rs.)</label>
            <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" placeholder="Outstanding Balance (Rs.)" />
            <label className="block mb-2 font-medium">Monthly Installment (Rs.)</label>
            <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2" placeholder="Monthly Installment (Rs.)" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
