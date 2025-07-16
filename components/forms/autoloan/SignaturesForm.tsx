export const SignaturesForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">12. Signatures</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block font-semibold mb-1">Applicant's Signature (Current)</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-base shadow-sm transition" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Co-Borrower's Signature (Current)</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-base shadow-sm transition" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Applicant's Signature (As per CNIC)</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-base shadow-sm transition" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Co-Borrower's Signature (As per CNIC)</label>
        <input type="file" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-base shadow-sm transition" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Date (Applicant)</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-base shadow-sm transition" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Date (Co-Borrower)</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-base shadow-sm transition" />
      </div>
    </form>
  </section>
);
