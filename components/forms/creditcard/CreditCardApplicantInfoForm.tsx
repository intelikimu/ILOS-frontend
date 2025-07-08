// components/forms/CreditCardApplicantInfoForm.tsx
export const CreditCardApplicantInfoForm = () => (
  <section className="mb-10">
    <h3 className="text-2xl font-bold text-primary mb-6">3. Introduce Yourself</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Mr</label>
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Mrs</label>
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Ms</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Full Name" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Name on Card</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Name on Card" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Computerized NIC / Passport No.</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="CNIC or Passport" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">CNIC Issuance Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">CNIC Expiry Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Old NIC Number</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Old NIC Number" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Father's / Husband’s Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Father's / Husband's Name" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 px-4 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Male</label>
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Female</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mother’s Maiden Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="Mother's Maiden Name" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Marital Status</label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Single</label>
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Married</label>
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Divorced</label>
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Widowed</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">No. of Dependents</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 px-4 py-2" placeholder="No. of Dependents" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Educational Qualification</label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Matric/O Levels</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Inter/A Levels</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Bachelors</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Masters</label>
        </div>
      </div>
    </div>
  </section>
)
