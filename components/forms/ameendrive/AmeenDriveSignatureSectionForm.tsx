export const AmeenDriveSignatureSectionForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">10. Signature Section</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-medium">Signature of the Applicant (Current)</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Signature of the Co-Applicant (Current)</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Signature of the Applicant (as per CNIC)</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Signature of the Co-Applicant (as per CNIC)</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
    </div>
  </section>
);
