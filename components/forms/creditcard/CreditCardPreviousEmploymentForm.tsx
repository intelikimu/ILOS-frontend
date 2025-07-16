// components/forms/CreditCardPreviousEmploymentForm.tsx
export const CreditCardPreviousEmploymentForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">8. Previous Employment Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
      <div>
        <label className="block text-sm font-medium mb-1">Previous Employer / Business</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Previous Employer / Business" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Designation at Previous Employer</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Designation" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Experience at Previous Employer (Years)</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Experience (Years)" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telephone (Previous Employer)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Telephone" />
      </div>
    </div>
  </section>
)
