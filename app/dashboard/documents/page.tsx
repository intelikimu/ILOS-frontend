"use client";

import React, { useState } from 'react';
import { Upload, FileText, Eye, Check, X, Download } from 'lucide-react';
import { mockApplications } from '../../data/mockData';
import StatusBadge from '../verification/StatusBadge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DocumentManagement: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchLoanNumber, setSearchLoanNumber] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDocumentIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-blue-600" />;
  };

  const filteredApplications = mockApplications
    .filter(app => {
      const matchesName = app.applicantName.toLowerCase().includes(searchName.toLowerCase());
      const matchesLoan = app.loanNumber.toLowerCase().includes(searchLoanNumber.toLowerCase());
      return matchesName && matchesLoan;
    })
    .sort((a, b) => {
      return sortOrder === 'asc' ? a.loanAmount - b.loanAmount : b.loanAmount - a.loanAmount;
    });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Management</h2>
        <p className="text-gray-600">Upload, verify, and manage loan application documents</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="name">Search by Name</Label>
          <Input
            id="name"
            placeholder="e.g. Ali Raza"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="loanNumber">Loan Number</Label>
          <Input
            id="loanNumber"
            placeholder="e.g. LN-2024-1234"
            value={searchLoanNumber}
            onChange={(e) => setSearchLoanNumber(e.target.value)}
          />
        </div>
        <div>
          <Label>Sort by Loan Amount</Label>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApplication(app.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedApplication === app.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{app.applicantName}</h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {app.documents.length} docs
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{app.loanNumber}</p>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(app.loanAmount)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Document Details */}
        <div className="lg:col-span-2">
          {selectedApplication ? (
            (() => {
              const app = mockApplications.find(a => a.id === selectedApplication);
              return app ? (
                <div className="space-y-6">
                  {/* Application Header */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{app.applicantName}</h3>
                        <p className="text-gray-600">{app.loanNumber}</p>
                      </div>
                      <StatusBadge status={app.status as 'pending' | 'in-verification' | 'approved' | 'rejected' | 'disbursed' | 'verified' | 'missing' | 'error'} />
                    </div>
                    
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Upload new documents</p>
                      <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
                      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Choose Files
                      </button>
                    </div>
                  </div>

                  {/* Documents List */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900">Uploaded Documents</h4>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {app.documents.map((doc) => (
                        <div key={doc.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {getDocumentIcon(doc.type)}
                              <div>
                                <h5 className="text-sm font-medium text-gray-900">{doc.name}</h5>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>Size: {doc.size}</span>
                                  <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <StatusBadge status={doc.status} size="sm" />
                              <div className="flex space-x-1">
                                <button className="p-1 text-blue-600 hover:text-blue-800 rounded">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-1 text-gray-600 hover:text-gray-800 rounded">
                                  <Download className="h-4 w-4" />
                                </button>
                                {doc.status === 'pending' && (
                                  <>
                                    <button className="p-1 text-green-600 hover:text-green-800 rounded">
                                      <Check className="h-4 w-4" />
                                    </button>
                                    <button className="p-1 text-red-600 hover:text-red-800 rounded">
                                      <X className="h-4 w-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Documents Checklist */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Required Documents Checklist</h4>
                    <div className="space-y-3">
                      {[
                        'CNIC Copy (Front & Back)',
                        'Salary Certificate / Employment Letter',
                        'Last 3 Months Bank Statements',
                        'Vehicle Registration (if applicable)',
                        'Insurance Documents'
                      ].map((docName, index) => {
                        const isUploaded = app.documents.some(doc => 
                          doc.name.toLowerCase().includes(docName.split(' ')[0].toLowerCase())
                        );
                        return (
                          <div key={index} className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isUploaded 
                                ? 'bg-green-100 border-green-500 text-green-600' 
                                : 'border-gray-300'
                            }`}>
                              {isUploaded && <Check className="h-3 w-3" />}
                            </div>
                            <span className={`text-sm ${
                              isUploaded ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {docName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null;
            })()
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Application</h3>
              <p className="text-gray-500">Choose an application to view and manage its documents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;