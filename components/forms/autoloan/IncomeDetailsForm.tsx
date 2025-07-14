"use client"
import React, { useState, useEffect } from 'react';
import { useCustomer } from '@/contexts/CustomerContext';

export const IncomeDetailsForm = () => {
  const { customerData } = useCustomer();
  const [formData, setFormData] = useState({
    grossMonthlySalary: '',
    otherMonthlyIncome: '',
    totalGrossMonthlyIncome: '',
    netMonthlyIncome: '',
    otherIncomeRent: false,
    otherIncomeCommission: false,
    otherIncomeBusiness: false,
    otherIncomeBonus: false,
    otherIncomeSpecify: '',
    spouseEmployed: '',
    spousalIncome: '',
    spouseIncomeSource: '',
    statementHome: false,
    statementOffice: false,
    statementMail: false
  });

  const [prefilledFields, setPrefilledFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!customerData) return;

    const prefilled = new Set<string>();
    const newFormData = { ...formData };

    // Employment Details - Income mapping
    if (customerData.employmentDetails) {
      if (customerData.employmentDetails.monthlySalary) {
        newFormData.grossMonthlySalary = customerData.employmentDetails.monthlySalary.toString();
        prefilled.add('grossMonthlySalary');
      }
      if (customerData.employmentDetails.otherIncome) {
        newFormData.otherMonthlyIncome = customerData.employmentDetails.otherIncome.toString();
        prefilled.add('otherMonthlyIncome');
      }
      if (customerData.employmentDetails.netSalary) {
        newFormData.netMonthlyIncome = customerData.employmentDetails.netSalary.toString();
        prefilled.add('netMonthlyIncome');
      }
      if (customerData.employmentDetails.spouseIncome) {
        newFormData.spousalIncome = customerData.employmentDetails.spouseIncome.toString();
        prefilled.add('spousalIncome');
      }
      if (customerData.employmentDetails.spouseIncomeSource) {
        newFormData.spouseIncomeSource = customerData.employmentDetails.spouseIncomeSource;
        prefilled.add('spouseIncomeSource');
      }
      if (customerData.employmentDetails.spouseEmployed) {
        newFormData.spouseEmployed = customerData.employmentDetails.spouseEmployed;
        prefilled.add('spouseEmployed');
      }
    }

    // Calculate total gross monthly income if we have both values
    if (newFormData.grossMonthlySalary && newFormData.otherMonthlyIncome) {
      const gross = parseFloat(newFormData.grossMonthlySalary) || 0;
      const other = parseFloat(newFormData.otherMonthlyIncome) || 0;
      newFormData.totalGrossMonthlyIncome = (gross + other).toString();
      prefilled.add('totalGrossMonthlyIncome');
    }

    setFormData(newFormData);
    setPrefilledFields(prefilled);
  }, [customerData]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFieldClasses = (fieldName: string) => {
    const baseClasses = "w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400";
    const prefilledClasses = "bg-yellow-50 border-yellow-300";
    const normalClasses = "bg-gray-50";
    
    return `${baseClasses} ${prefilledFields.has(fieldName) ? prefilledClasses : normalClasses}`;
  };

  return (
    <section className="bg-white rounded-2xl shadow p-8 mb-10">
      <h2 className="text-2xl font-bold text-primary mb-6">7. Income Details</h2>
      
      {customerData?.isETB && prefilledFields.size > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> Fields highlighted in yellow are pre-filled from your existing customer data. You can edit them if needed.
          </div>
        </div>
      )}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Gross Monthly Salary</label>
          <input 
            type="number" 
            placeholder="Gross Monthly Salary" 
            className={getFieldClasses('grossMonthlySalary')}
            value={formData.grossMonthlySalary}
            onChange={(e) => handleInputChange('grossMonthlySalary', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Monthly Income</label>
          <input 
            type="number" 
            placeholder="Other Monthly Income" 
            className={getFieldClasses('otherMonthlyIncome')}
            value={formData.otherMonthlyIncome}
            onChange={(e) => handleInputChange('otherMonthlyIncome', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Gross Monthly Income</label>
          <input 
            type="number" 
            placeholder="Total Gross Monthly Income" 
            className={getFieldClasses('totalGrossMonthlyIncome')}
            value={formData.totalGrossMonthlyIncome}
            onChange={(e) => handleInputChange('totalGrossMonthlyIncome', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Net Monthly Income</label>
          <input 
            type="number" 
            placeholder="Net Monthly Income" 
            className={getFieldClasses('netMonthlyIncome')}
            value={formData.netMonthlyIncome}
            onChange={(e) => handleInputChange('netMonthlyIncome', e.target.value)}
          />
        </div>
        {/* Other Income */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-sm mb-2">Other Income</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.otherIncomeRent}
                onChange={(e) => handleInputChange('otherIncomeRent', e.target.checked)}
              /> 
              Rent
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.otherIncomeCommission}
                onChange={(e) => handleInputChange('otherIncomeCommission', e.target.checked)}
              /> 
              Commission
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.otherIncomeBusiness}
                onChange={(e) => handleInputChange('otherIncomeBusiness', e.target.checked)}
              /> 
              Business
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.otherIncomeBonus}
                onChange={(e) => handleInputChange('otherIncomeBonus', e.target.checked)}
              /> 
              Bonus
            </label>
            <input 
              type="text" 
              placeholder="Other Income (specify)" 
              className="w-full md:w-56 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow-sm transition placeholder:text-gray-400 mt-2"
              value={formData.otherIncomeSpecify}
              onChange={(e) => handleInputChange('otherIncomeSpecify', e.target.value)}
            />
          </div>
        </div>
        {/* Spouse */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-sm mb-2">Spouse Employed?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="spouseEmployed"
                value="Yes"
                checked={formData.spouseEmployed === 'Yes'}
                onChange={(e) => handleInputChange('spouseEmployed', e.target.value)}
              /> 
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="spouseEmployed"
                value="No"
                checked={formData.spouseEmployed === 'No'}
                onChange={(e) => handleInputChange('spouseEmployed', e.target.value)}
              /> 
              No
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="spouseEmployed"
                value="N/A"
                checked={formData.spouseEmployed === 'N/A'}
                onChange={(e) => handleInputChange('spouseEmployed', e.target.value)}
              /> 
              N/A
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spousal Income</label>
          <input 
            type="number" 
            placeholder="Spousal Income" 
            className={getFieldClasses('spousalIncome')}
            value={formData.spousalIncome}
            onChange={(e) => handleInputChange('spousalIncome', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spouse's Income Source</label>
          <input 
            type="text" 
            placeholder="Spouse's Income Source" 
            className={getFieldClasses('spouseIncomeSource')}
            value={formData.spouseIncomeSource}
            onChange={(e) => handleInputChange('spouseIncomeSource', e.target.value)}
          />
        </div>
        {/* Statement */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-sm mb-2">Statement to be Sent</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.statementHome}
                onChange={(e) => handleInputChange('statementHome', e.target.checked)}
              /> 
              Home
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.statementOffice}
                onChange={(e) => handleInputChange('statementOffice', e.target.checked)}
              /> 
              Office
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.statementMail}
                onChange={(e) => handleInputChange('statementMail', e.target.checked)}
              /> 
              Mail
            </label>
          </div>
        </div>
      </form>
    </section>
  );
};
