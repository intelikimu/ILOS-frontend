"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Eye, Check, X, Download, AlertCircle, Server, ExternalLink, Grid, List, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DocumentExplorer from '@/components/document-explorer';

interface Application {
  id: string;
  applicantName: string;
  loanType: string;
  amount: string;
  status: string;
  submittedDate: string;
  lastUpdate: string;
}

const DocumentManagement: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loanType, setLoanType] = useState<string>('');
  const [losId, setLosId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Check server status on component mount
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('http://localhost:8081/', { 
        method: 'GET',
        mode: 'no-cors' // This will help us detect if server is running
      });
      setServerStatus('online');
    } catch (error) {
      setServerStatus('offline');
      console.warn('FileZilla server appears to be offline:', error);
    }
  };

  const fetchApplications = async () => {
    setLoadingApplications(true);
    try {
      const response = await fetch('/api/applications/recent/pb');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        throw new Error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error loading applications",
        description: "Could not load customer applications. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF, DOC, DOCX, JPG, or PNG file.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      toast({
        title: "File selected",
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !loanType || !losId) {
      toast({
        title: "Missing information",
        description: "Please select a file, loan type, and LOS ID.",
        variant: "destructive",
      });
      return;
    }

    if (serverStatus === 'offline') {
      toast({
        title: "Server offline",
        description: "The FileZilla server is not running. Please start the server first.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('loanType', loanType);
      formData.append('losId', losId);

      console.log('🔄 Frontend: Starting upload...', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        loanType,
        losId
      });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      console.log('🔄 Frontend: Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Frontend: Upload successful:', result);
        
        toast({
          title: "Upload successful!",
          description: `File ${selectedFile.name} uploaded to ${loanType}/${losId}/`,
        });

        // Reset form
        setSelectedFile(null);
        setLoanType('');
        setLosId('');
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Switch to explorer tab to show the uploaded file
        setActiveTab('explorer');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Frontend: Upload failed:', errorData);
        throw new Error(errorData.error || `Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Frontend: Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Create a synthetic event for file selection
      const syntheticEvent = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(syntheticEvent);
    }
  };

  const openUploadForm = () => {
    window.open('http://localhost:8081/pb-upload', '_blank');
  };

  const handleFileSelectFromExplorer = (file: any) => {
    toast({
      title: "File selected",
      description: `Selected: ${file.name}`,
    });
  };

  const handleCustomerSelect = (application: Application) => {
    // Extract loan type from the application
    const loanTypeMap: { [key: string]: string } = {
      'CashPlus Loan': 'cashplus',
      'Auto Loan': 'autoloan',
      'SME Loan': 'smeasaan',
      'Commercial Vehicle Loan': 'commercialvehicle',
      'AmeenDrive Loan': 'ameendrive',
      'Platinum Credit Card': 'creditcard',
      'Classic Credit Card': 'creditcard'
    };

    const mappedLoanType = loanTypeMap[application.loanType] || 'cashplus';
    
    setLosId(application.id);
    setLoanType(mappedLoanType);
    setShowCustomerSelector(false);
    
    toast({
      title: "Customer selected",
      description: `${application.applicantName} (${application.id})`,
    });
  };

  const filteredApplications = applications.filter(app => 
    app.applicantName.toLowerCase().includes(searchCustomer.toLowerCase()) ||
    app.id.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Management</h2>
        <p className="text-gray-600">Upload, verify, and manage loan application documents</p>
      </div>

      {/* Server Status Alert */}
      <div className="mb-6">
        <Alert className={serverStatus === 'online' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <Server className={`h-4 w-4 ${serverStatus === 'online' ? 'text-green-600' : 'text-red-600'}`} />
          <AlertDescription className="flex items-center gap-2">
            <span>FileZilla Server Status:</span>
            <Badge variant={serverStatus === 'online' ? 'default' : 'destructive'}>
              {serverStatus === 'checking' ? 'Checking...' : serverStatus === 'online' ? 'Online' : 'Offline'}
            </Badge>
            {serverStatus === 'offline' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkServerStatus}
                className="ml-2"
              >
                Retry
              </Button>
            )}
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Documents
          </TabsTrigger>
          <TabsTrigger value="explorer" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Document Explorer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
              
              {/* Customer Selection */}
              <div className="mb-4">
                <Label htmlFor="customer">Customer Selection</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="customer"
                    placeholder="Selected customer..."
                    value={losId ? `${losId} - ${applications.find(app => app.id === losId)?.applicantName || 'Unknown'}` : ''}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      fetchApplications();
                      setShowCustomerSelector(true);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Select Customer
                  </Button>
                </div>
              </div>

              {/* Loan Type Selection */}
              <div className="mb-4">
                <Label htmlFor="loanType">Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select loan type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cashplus">Cashplus</SelectItem>
                    <SelectItem value="creditcard">Credit Card</SelectItem>
                    <SelectItem value="autoloan">Auto Loan</SelectItem>
                    <SelectItem value="ameendrive">AmeenDrive</SelectItem>
                    <SelectItem value="commercialvehicle">Commercial Vehicle</SelectItem>
                    <SelectItem value="smeasaan">SME Asaan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* LOS ID Input */}
              <div className="mb-4">
                <Label htmlFor="losId">LOS ID</Label>
                <Input
                  id="losId"
                  placeholder="e.g. LOS-12345"
                  value={losId}
                  onChange={(e) => setLosId(e.target.value)}
                />
              </div>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  selectedFile 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Upload documents</p>
                <p className="text-sm text-gray-500 mb-4">Drag and drop or click to browse</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                />
                
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-4"
                  disabled={isUploading}
                >
                  Choose Files
                </Button>

                {selectedFile && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-900">{selectedFile.name}</p>
                        <p className="text-xs text-blue-700">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Uploading... {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || !loanType || !losId || isUploading || serverStatus === 'offline'}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </>
                )}
              </Button>

              {/* Quick Actions */}
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openUploadForm}
                  className="w-full"
                  disabled={serverStatus === 'offline'}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Open Upload Form
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Instructions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Selection</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Click "Select Customer" to choose from recent applications</li>
                    <li>• Customer name and LOS ID will be automatically filled</li>
                    <li>• Loan type will be mapped based on application type</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Supported File Types</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• PDF documents (.pdf)</li>
                    <li>• Word documents (.doc, .docx)</li>
                    <li>• Images (.jpg, .jpeg, .png)</li>
                    <li>• Maximum file size: 10MB</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">File Organization</h4>
                  <p className="text-sm text-gray-600">
                    Files are automatically organized in folders based on loan type and LOS ID:
                    <br />
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      {loanType || 'loan-type'}/{losId || 'los-id'}/filename.pdf
                    </code>
                  </p>
                </div>

                {serverStatus === 'offline' && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Server Offline:</strong> The FileZilla server needs to be running for uploads to work.
                      Start the server by running <code className="bg-gray-100 px-1 rounded">node uploadtoftp.js</code> in the backend directory.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="explorer" className="mt-6">
          <DocumentExplorer onFileSelect={handleFileSelectFromExplorer} />
        </TabsContent>
      </Tabs>

      {/* Customer Selector Dialog */}
      <Dialog open={showCustomerSelector} onOpenChange={setShowCustomerSelector}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Select Customer</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer name or LOS ID..."
                  value={searchCustomer}
                  onChange={(e) => setSearchCustomer(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={fetchApplications}
                disabled={loadingApplications}
              >
                {loadingApplications ? 'Loading...' : 'Refresh'}
              </Button>
            </div>

            {/* Applications Table */}
            <div className="border rounded-lg max-h-[60vh] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>LOS ID</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingApplications ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading applications...
                      </TableCell>
                    </TableRow>
                  ) : filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        {searchCustomer ? 'No applications match your search' : 'No applications found'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.applicantName}</TableCell>
                        <TableCell className="font-mono text-sm">{app.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{app.loanType}</Badge>
                        </TableCell>
                        <TableCell>{app.amount}</TableCell>
                        <TableCell>
                          <Badge variant={app.status === 'submitted_to_spu' ? 'default' : 'secondary'}>
                            {app.status === 'submitted_to_spu' ? 'Submitted' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleCustomerSelect(app)}
                          >
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentManagement;




