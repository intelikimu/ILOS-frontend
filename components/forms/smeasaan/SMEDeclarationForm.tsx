// components/forms/SMEDeclarationForm.tsx
export const SMEDeclarationForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">Declaration</h3>
    <div>
      <label className="block text-sm font-medium mb-2">
        I hereby declare that the information provided is true and complete to the best of my knowledge.
      </label>
      <div className="flex gap-6 mt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" /> I Agree
        </label>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Applicant Signature</label>
          <input
            type="file"
            className="w-full rounded-xl border border-gray-300 px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full rounded-xl border border-gray-300 px-4 py-2"
          />
        </div>
      </div>
    </div>
  </section>
)
