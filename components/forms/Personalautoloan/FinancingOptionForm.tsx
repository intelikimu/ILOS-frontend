export const FinancingOptionForm = () => (
  <section className="bg-white rounded-2xl shadow p-8 mb-10">
    <h2 className="text-2xl text-white font-semibold mb-4 rounded-lg p-4 bg-blue-500">11. Financing / Leasing Option</h2>
    <form>
      <label className="block font-semibold text-sm mb-3">Select Option</label>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2 text-base font-medium">
          <input type="radio" name="finance" />
          Financing (Vehicle in customer's name & HPA UBL)
        </label>
        <label className="flex items-center gap-2 text-base font-medium">
          <input type="radio" name="finance" />
          Leasing (Vehicle in Bank's name)
        </label>
        <label className="flex items-center gap-2 text-base font-medium">
          <input type="radio" name="finance" />
          Leasing with RV Option (Vehicle in Bank's name)
        </label>
      </div>
    </form>
  </section>
);
