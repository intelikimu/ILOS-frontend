export const AmeenDriveProfessionDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl text-primary font-semibold mb-4">7. Profession Details (Self-Employed Professionals)</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block mb-2 font-medium">Name of Company</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Name of Company" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Address</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Address" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Profession</label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="selfEmpProfession" /> Architect</label>
          <label className="flex items-center gap-2"><input type="radio" name="selfEmpProfession" /> Chartered Accountant</label>
          <label className="flex items-center gap-2"><input type="radio" name="selfEmpProfession" /> Engineer</label>
          <label className="flex items-center gap-2"><input type="radio" name="selfEmpProfession" /> Doctor</label>
          <label className="flex items-center gap-2"><input type="radio" name="selfEmpProfession" /> Other</label>
        </div>
      </div>
    </div>
  </section>
);
