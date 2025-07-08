// components/forms/CreditCardRewardProgramForm.tsx
export const CreditCardRewardProgramForm = () => (
  <section className="mb-10">
    <h3  className="text-2xl font-bold text-primary mb-6">2. Reward Program (only for PSO/Galleria)</h3>
     <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="Reward" /> PSO RoadMiles
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="Reward" /> Classic Rewards
            </label>
          </div>
  </section>
)
