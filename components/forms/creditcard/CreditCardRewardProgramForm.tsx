// components/forms/CreditCardRewardProgramForm.tsx
export const CreditCardRewardProgramForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl rounded-lg text-white font-semibold mb-4 p-4 bg-blue-500">2. Reward Program (only for PSO/Galleria)</h3>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
            <label className="flex items-center gap-2">
              <input type="radio" name="Reward" /> PSO RoadMiles
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="Reward" /> Classic Rewards
            </label>
          </div>
  </section>
)
