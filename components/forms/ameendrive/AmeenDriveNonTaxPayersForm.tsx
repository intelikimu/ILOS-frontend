export const AmeenDriveNonTaxPayersForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">12. For Non-Tax Payers Only</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-medium">Full Name (Mr./Mrs./Ms.)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Resident of</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div className="md:col-span-2">
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="appliedFinancing" /> I have applied for financing from UBL Ameen</label>
          <label className="flex items-center gap-2"><input type="radio" name="noNTNDeclaration" /> I hereby declare that I do not have a National Income Tax Number</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Signature of the Applicant</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Signature of the Co-Applicant</label>
        <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
      </div>
    </div>
  </section>
);
