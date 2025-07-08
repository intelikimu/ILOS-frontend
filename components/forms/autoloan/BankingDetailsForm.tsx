export const BankingDetailsForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl font-bold text-primary mb-6">8. Banking Details – Direct Debit / Repayment Account</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <input type="text" placeholder="Bank Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch</label>
        <input type="text" placeholder="Branch" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Account No.</label>
        <input type="text" placeholder="Account No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div className="flex flex-col col-span-2">
        <label className="font-semibold text-sm mb-2">Account Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> PLS</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Current</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Fixed Deposit</label>
        </div>
      </div>
      <div className="flex flex-col col-span-2">
        <label className="font-semibold text-sm mb-2">Currency Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Local</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Foreign (please specify)</label>
        </div>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold mt-8 mb-2">Other Account Details</h3>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <input type="text" placeholder="Bank Name" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Branch</label>
        <input type="text" placeholder="Branch" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Account No.</label>
        <input type="text" placeholder="Account No." className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
      </div>
      <div className="flex flex-col col-span-2">
        <label className="font-semibold text-sm mb-2">Account Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> PLS</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Current</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Fixed Deposit</label>
        </div>
      </div>
      <div className="flex flex-col col-span-2">
        <label className="font-semibold text-sm mb-2">Currency Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="checkbox" /> Local</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Foreign (please specify)</label>
        </div>
      </div>
    </form>
  </section>
);
