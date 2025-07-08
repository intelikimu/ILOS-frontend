// components/forms/CashplusApplicationTypeForm.tsx
export const CashplusApplicationTypeForm = () => (
  <section className="mb-10">
    <h3 className="text-xl font-semibold mb-4">2. Application Type</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block mb-2">UBL Existing Customer</label>
        <label className="flex items-center gap-2">
          <input type="radio" name="ublExistingCustomer" /> Yes
        </label>
      </div>
      <div>
        <label className="block mb-2">Branch</label>
        <input type="text" className="w-full border rounded-xl bg-white px-4 py-2" placeholder="Branch" />
      </div>
      <div>
        <label className="block mb-2">Account</label>
        <input type="text" className="w-full border rounded-xl bg-white px-4 py-2" placeholder="Account" />
      </div>
      <div>
        <label className="block mb-2">Purpose of Loan</label>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="loanPurpose" /> Education</label>
          <label className="flex items-center gap-2"><input type="radio" name="loanPurpose" /> Travel</label>
          <label className="flex items-center gap-2"><input type="radio" name="loanPurpose" /> Wedding</label>
          <label className="flex items-center gap-2"><input type="radio" name="loanPurpose" /> Other</label>
          <input type="text" className="rounded-xl border bg-white px-4 py-2" placeholder="If Other, please specify" />
        </div>
      </div>
    </div>
  </section>
)
