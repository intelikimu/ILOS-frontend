// components/forms/CashplusPersonalInfoForm.tsx 
export const CashplusPersonalInfoForm = () => (
  <section className="mb-10">
    <h3 className="text-xl font-semibold mb-4">3. Personal Information</h3>
    {/* REPLACED form WITH div TO FIX ERROR */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Title */}
      <div>
        <label className="block mb-2 font-medium">Title</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Mr.</label>
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Mrs.</label>
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Ms.</label>
        </div>
      </div>
      {/* First, Middle, Last Name */}
      <div>
        <label className="block mb-2 font-medium">First Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="First Name" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Middle Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Middle Name" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Last Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Last Name" />
      </div>
      {/* CNIC */}
      <div>
        <label className="block mb-2 font-medium">CNIC</label>
        <input type="text" maxLength={13} className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="CNIC (13 digits)" />
      </div>
      {/* NTN */}
      <div>
        <label className="block mb-2 font-medium">NTN (if available)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="NTN" />
      </div>
      {/* Date of Birth */}
      <div>
        <label className="block mb-2 font-medium">Date of Birth</label>
        <input type="date" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" />
      </div>
      {/* Gender */}
      <div>
        <label className="block mb-2 font-medium">Gender</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Male</label>
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Female</label>
        </div>
      </div>
      {/* Marital Status */}
      <div>
        <label className="block mb-2 font-medium">Marital Status</label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Single</label>
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Married</label>
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Widowed</label>
          <label className="flex items-center gap-2"><input type="radio" name="maritalStatus" /> Divorced</label>
        </div>
      </div>
      {/* Dependants */}
      <div>
        <label className="block mb-2 font-medium">Dependants</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Number of Dependants" />
      </div>
      {/* Education */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Educational Qualification</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Below Matric</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Matric/O’Levels</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Inter/A’Levels</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Graduate</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Post Graduate</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Other</label>
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="If Other, specify" />
        </div>
      </div>
      {/* Father's/Husband's Name */}
      <div>
        <label className="block mb-2 font-medium">Father’s / Husband’s Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Father/Husband Name" />
      </div>
      {/* Mother's Maiden Name */}
      <div>
        <label className="block mb-2 font-medium">Mother’s Maiden Name</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Mother’s Maiden Name" />
      </div>
      {/* Employment Status */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Employment Status</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="employmentStatus" /> Salaried</label>
          <label className="flex items-center gap-2"><input type="radio" name="employmentStatus" /> Govt. servant</label>
          <label className="flex items-center gap-2"><input type="radio" name="employmentStatus" /> Armed forces</label>
          <label className="flex items-center gap-2"><input type="radio" name="employmentStatus" /> Staff</label>
        </div>
      </div>
      {/* Address Group */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Address</label>
        <textarea rows={2} className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="House/Apt, Street, etc." />
      </div>
      <div>
        <label className="block mb-2 font-medium">Nearest Landmark</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Nearest Landmark" />
      </div>
      <div>
        <label className="block mb-2 font-medium">City</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="City" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Postal Code</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Postal Code" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Residing Since</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Duration at Address" />
      </div>
      {/* Type of Accommodation */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Type of Accommodation</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Your own house</label>
          <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Wife’s/Husband’s house</label>
          <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Parent’s house</label>
          <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Company provided house</label>
          <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Rented house</label>
          <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Mortgaged house</label>
          <label className="flex items-center gap-2"><input type="radio" name="accommodationType" /> Other</label>
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="If Other, specify" />
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Monthly Rent</label>
        <input type="number" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Monthly Rent (if rented)" />
      </div>
      {/* Preferred Mailing Address */}
      <div>
        <label className="block mb-2 font-medium">Preferred Mailing Address</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="mailingAddress" /> Residence</label>
          <label className="flex items-center gap-2"><input type="radio" name="mailingAddress" /> Office</label>
        </div>
      </div>
      {/* Permanent Address */}
      <div className="md:col-span-3">
        <label className="block mb-2 font-medium">Permanent Address (If Different from Current)</label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="House / Apt. No." />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Street" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="City" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Postal Code" />
        </div>
      </div>
      {/* Residence Contact Details */}
      <div>
        <label className="block mb-2 font-medium">Telephone (Current)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Telephone (Current)" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Telephone (Permanent)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Telephone (Permanent)" />
      </div>
      <div>
        <label className="block mb-2 font-medium">Mobile</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Mobile" />
      </div>
      {/* Mobile Type */}
      <div>
        <label className="block mb-2 font-medium">Mobile Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="mobileType" /> Prepaid</label>
          <label className="flex items-center gap-2"><input type="radio" name="mobileType" /> Postpaid</label>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Other (Please Specify)</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="Other (Please Specify)" />
      </div>
    </div>
  </section>
)
