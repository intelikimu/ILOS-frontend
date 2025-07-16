// components/forms/PlatinumCreditGuardianSmsAlertForm.tsx
export const PlatinumCreditGuardianSmsAlertForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">9. Credit Guardian & SMS Alert</h3>
    <div className=" border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <label className="block text-sm font-medium mb-1">Avail SMS Alert Facility?</label>
      <div className="flex gap-6 mb-4">
        <label className="flex items-center gap-2"><input type="radio" name="smsAlert" /> Yes</label>
        <label className="flex items-center gap-2"><input type="radio" name="smsAlert" /> No</label>
      </div>
      <label className="block text-sm font-medium mb-1">Avail Credit Guardian Facility?</label>
      <div className="flex gap-6 mb-4">
        <label className="flex items-center gap-2"><input type="radio" name="availCreditGuardian" /> Yes</label>
        <label className="flex items-center gap-2"><input type="radio" name="availCreditGuardian" /> No</label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Card Applicant's Signature</label>
          <input type="file" className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white" />
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-4">
        ℹ️ Credit Guardian waives outstanding amount in case of cardholder’s death/disability.
      </div>
    </div>
  </section>
);
