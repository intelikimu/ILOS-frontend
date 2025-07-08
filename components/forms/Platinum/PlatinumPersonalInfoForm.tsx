// components/forms/PlatinumPersonalInfoForm.tsx
export const PlatinumPersonalInfoForm = () => (
  <section className="mb-10">
    <h3 className="text-lg font-semibold mb-4">1. Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Mr</label>
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Mrs</label>
          <label className="flex items-center gap-2"><input type="radio" name="title" /> Ms</label>
        </div>
      </div>
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <div className="grid grid-cols-3 gap-2">
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="First" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Middle" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Last" />
        </div>
      </div>
      {/* Name on Card */}
      <div>
        <label className="block text-sm font-medium mb-1">Name on Card</label>
        <input type="text" maxLength={19} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Max 19 characters" />
      </div>
      {/* CNIC/Passport */}
      <div>
        <label className="block text-sm font-medium mb-1">Computerized NIC</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="CNIC" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Passport Number</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Passport (for Foreign Nationals)" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CNIC Issuance Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">CNIC Expiry Date</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Old NIC Number</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Old NIC" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Father’s / Husband’s Name</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Father/Husband Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input type="date" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Male</label>
          <label className="flex items-center gap-2"><input type="radio" name="gender" /> Female</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mother’s Maiden Name</label>
        <input type="text" minLength={6} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Min 6 characters" />
      </div>
      {/* Marital Status (RADIO) */}
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
        <label className="block text-sm font-medium mb-1">Dependents</label>
        <input type="number" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" />
      </div>
      {/* Education */}
      <div>
        <label className="block text-sm font-medium mb-1">Education</label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Matric/O’Levels</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Inter/A’Levels</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Bachelors</label>
          <label className="flex items-center gap-2"><input type="radio" name="education" /> Masters</label>
        </div>
      </div>
      {/* Current Address */}
      <div className="md:col-span-3">
        <label className="block text-sm font-medium mb-1">Current Address</label>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="House" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Street" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Tehsil" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Landmark" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="City" />
          <input type="text" className="rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Postal Code" />
        </div>
      </div>
      {/* Residential Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Residential Phone</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Residential Phone" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mobile</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Mobile" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">NTN</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="NTN" />
      </div>
      {/* Type of Accommodation (RADIO) */}
      <div>
        <label className="block text-sm font-medium mb-1">Type of Accommodation</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="accommodation" /> House</label>
          <label className="flex items-center gap-2"><input type="radio" name="accommodation" /> Apartment</label>
        </div>
      </div>
      {/* Nature of Residence (RADIO) */}
      <div>
        <label className="block text-sm font-medium mb-1">Nature of Residence</label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2"><input type="radio" name="residenceNature" /> Owned</label>
          <label className="flex items-center gap-2"><input type="radio" name="residenceNature" /> Rented</label>
          <label className="flex items-center gap-2"><input type="radio" name="residenceNature" /> Parents</label>
          <label className="flex items-center gap-2"><input type="radio" name="residenceNature" /> Mortgage</label>
          <label className="flex items-center gap-2"><input type="radio" name="residenceNature" /> Company Provided</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Residing Since</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Residing Since" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Email" />
      </div>
      {/* Permanent Address (if different) */}
      <div className="md:col-span-3">
        <label className="block text-sm font-medium mb-1">Permanent Address (if different)</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Permanent Address" />
      </div>
      <div className="md:col-span-3">
        <label className="block text-sm font-medium mb-1">Vehicle Info</label>
        <input type="text" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2" placeholder="Vehicle Info" />
      </div>
    </div>
  </section>
);
