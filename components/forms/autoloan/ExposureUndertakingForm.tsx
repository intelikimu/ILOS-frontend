export const ExposureUndertakingForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl font-bold text-primary mb-6">
      9. Undertaking – Existing Exposure from Entire Banking Sector
    </h2>
    <form className="space-y-10">
      {/* A. Credit Cards (Clean) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">A. Credit Cards (Clean)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name of Bank / DFI</label>
            <input type="text" placeholder="Name of Bank / DFI" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Approved Limit</label>
            <input type="number" placeholder="Approved Limit" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
        </div>
      </div>

      {/* B. Credit Cards (Secured) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">B. Credit Cards (Secured)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name of Bank / DFI</label>
            <input type="text" placeholder="Name of Bank / DFI" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Approved Limit</label>
            <input type="number" placeholder="Approved Limit" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
        </div>
      </div>

      {/* C. Personal Loan (Clean) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">C. Personal Loan (Clean)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name of Bank</label>
            <input type="text" placeholder="Name of Bank" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Approved Limit</label>
            <input type="number" placeholder="Approved Limit" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount Outstanding on Application Date</label>
            <input type="number" placeholder="Amount Outstanding on Application Date" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
        </div>
      </div>

      {/* D. Personal Loan (Secured) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">D. Personal Loan (Secured)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name of Bank</label>
            <input type="text" placeholder="Name of Bank" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Approved Limit</label>
            <input type="number" placeholder="Approved Limit" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount Outstanding on Application Date</label>
            <input type="number" placeholder="Amount Outstanding on Application Date" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
        </div>
      </div>

      {/* E. Other Facilities (Clean & Secured) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">E. Other Facilities (Clean & Secured)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name of Bank / DFI</label>
            <input type="text" placeholder="Name of Bank / DFI" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Approved Limit</label>
            <input type="number" placeholder="Approved Limit" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nature (Clean / Secured)</label>
            <input type="text" placeholder="Nature (Clean / Secured)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Current Outstanding</label>
            <input type="number" placeholder="Current Outstanding" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
        </div>
      </div>

      {/* F. Applied Limits (Including Current Application) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">F. Applied Limits (Including Current Application)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name of Bank / DFI</label>
            <input type="text" placeholder="Name of Bank / DFI" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Facility under Process</label>
            <input type="text" placeholder="Facility under Process" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nature of Facility (Clean / Secured)</label>
            <input type="text" placeholder="Nature of Facility (Clean / Secured)" className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400"/>
          </div>
        </div>
      </div>
    </form>
  </section>
);
