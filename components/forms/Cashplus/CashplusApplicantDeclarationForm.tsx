// components/forms/CashplusApplicantDeclarationForm.tsx
export const CashplusApplicantDeclarationForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">Applicant’s Declaration & Signature</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block mb-2 font-medium">Applicant's Signature (must match CNIC)</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Date</label>
        <input type="date" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" />
      </div>
      <div className="md:col-span-2">
        <span className="text-xs text-gray-500">📎 Note: Must attach photocopy of CNIC.</span>
      </div>
    </div>
  </section>
);
