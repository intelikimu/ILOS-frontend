// components/forms/PlatinumAutoDebitForm.tsx
export const PlatinumAutoDebitForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">6. Auto Debit Instruction</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <label className="block text-sm font-medium mb-1">Payment Option</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2"><input type="radio" name="paymentOption" /> Minimum</label>
        <label className="flex items-center gap-2"><input type="radio" name="paymentOption" /> Full</label>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium mb-1">Signature of Applicant</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white" />
      </div>
    </div>
  </section>
);
