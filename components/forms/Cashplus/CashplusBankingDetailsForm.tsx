import { CashplusExposureTable } from "./CashplusExposureTable";

// components/forms/CashplusBankingDetailsForm.tsx
export const CashplusBankingDetailsForm = () => (
  <section className="mb-10">
    <h3 className="text-xl font-semibold mb-4">6. Banking Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 font-medium">Are you a UBL Customer?</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2"><input type="radio" name="isUblCustomer" /> Yes</label>
          <label className="flex items-center gap-2"><input type="radio" name="isUblCustomer" /> No</label>
        </div>
      </div>
      
      <div>
        <label className="block mb-2 font-medium">UBL Account Number</label>
        <input type="text" className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2" placeholder="UBL Account Number" />
        <span className="block text-xs text-gray-500 mt-1">
          Non-disclosure of this information may result in rejection of application.
        </span>
      </div>
    </div>
  </section>
)
