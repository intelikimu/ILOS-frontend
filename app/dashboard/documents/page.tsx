"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, Eye, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockParsedData = {
  salarySlip: {
    employeeName: "Muhammad Ahmed Khan",
    employeeId: "EMP-12345",
    basicSalary: "85,000",
    allowances: "25,000",
    grossSalary: "110,000",
    deductions: "15,000",
    netSalary: "95,000",
    month: "November 2024",
    confidence: 94,
  },
  bankStatement: {
    accountNumber: "****-****-1234",
    accountTitle: "Muhammad Ahmed Khan",
    averageBalance: "125,000",
    creditTurnover: "180,000",
    debitTurnover: "165,000",
    bounceCount: "0",
    period: "Sep 2024 - Nov 2024",
    confidence: 87,
  },
}

export default function DocumentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({})
  const [parsedData, setParsedData] = useState<{ [key: string]: any }>({})
  const [isProcessing, setIsProcessing] = useState<{ [key: string]: boolean }>({})
  const { toast } = useToast()

  const handleFileUpload = (type: string, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: file }))
    setIsProcessing((prev) => ({ ...prev, [type]: true }))

    // Simulate OCR processing
    setTimeout(() => {
      setParsedData((prev) => ({
        ...prev,
        [type]: type === "salary-slip" ? mockParsedData.salarySlip : mockParsedData.bankStatement,
      }))
      setIsProcessing((prev) => ({ ...prev, [type]: false }))

      toast({
        title: "Document Processed",
        description: `${type.replace("-", " ")} has been successfully parsed`,
      })
    }, 3000)
  }

  const DocumentUploadCard = ({
    type,
    title,
    description,
    acceptedTypes,
  }: {
    type: string
    title: string
    description: string
    acceptedTypes: string
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadedFiles[type] ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop your {title.toLowerCase()} here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">Accepted formats: {acceptedTypes}</p>
            <Input
              type="file"
              className="hidden"
              accept={acceptedTypes}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(type, file)
              }}
            />
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => document.querySelector(`input[type="file"]`)?.click()}
            >
              Choose File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">{uploadedFiles[type].name}</p>
                  <p className="text-sm text-gray-500">{(uploadedFiles[type].size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {isProcessing[type] && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processing document...</span>
                </div>
                <Progress value={75} className="w-full" />
              </div>
            )}

            {parsedData[type] && !isProcessing[type] && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Document Processed Successfully</AlertTitle>
                <AlertDescription>
                  <div className="mt-2">
                    <Badge variant="secondary" className="mb-2">
                      Confidence: {parsedData[type].confidence}%
                    </Badge>
                    <Button variant="link" className="p-0 h-auto">
                      View Extracted Data
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Document Upload & Parser</h2>
        <p className="text-muted-foreground">Upload and automatically extract information from financial documents</p>
      </div>

      <Tabs defaultValue="salary-slip" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="salary-slip" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Salary Slip
            {parsedData["salary-slip"] && <CheckCircle className="h-3 w-3 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger value="bank-statement" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Bank Statement
            {parsedData["bank-statement"] && <CheckCircle className="h-3 w-3 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger value="financial-statement" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Financial Statement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="salary-slip" className="space-y-4">
          <DocumentUploadCard
            type="salary-slip"
            title="Salary Slip"
            description="Upload the latest salary slip for income verification"
            acceptedTypes=".pdf,.jpg,.png"
          />

          {parsedData["salary-slip"] && (
            <Card>
              <CardHeader>
                <CardTitle>Extracted Information</CardTitle>
                <CardDescription>Review and edit the extracted salary information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Employee Name</Label>
                    <Input value={parsedData["salary-slip"].employeeName} />
                  </div>
                  <div>
                    <Label>Employee ID</Label>
                    <Input value={parsedData["salary-slip"].employeeId} />
                  </div>
                  <div>
                    <Label>Basic Salary (PKR)</Label>
                    <Input value={parsedData["salary-slip"].basicSalary} />
                  </div>
                  <div>
                    <Label>Allowances (PKR)</Label>
                    <Input value={parsedData["salary-slip"].allowances} />
                  </div>
                  <div>
                    <Label>Gross Salary (PKR)</Label>
                    <Input value={parsedData["salary-slip"].grossSalary} />
                  </div>
                  <div>
                    <Label>Net Salary (PKR)</Label>
                    <Input value={parsedData["salary-slip"].netSalary} className="font-semibold" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="bank-statement" className="space-y-4">
          <DocumentUploadCard
            type="bank-statement"
            title="Bank Statement"
            description="Upload 3-month bank statement for financial analysis"
            acceptedTypes=".pdf"
          />

          {parsedData["bank-statement"] && (
            <Card>
              <CardHeader>
                <CardTitle>Extracted Information</CardTitle>
                <CardDescription>Review the extracted banking information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Account Number</Label>
                    <Input value={parsedData["bank-statement"].accountNumber} />
                  </div>
                  <div>
                    <Label>Account Title</Label>
                    <Input value={parsedData["bank-statement"].accountTitle} />
                  </div>
                  <div>
                    <Label>Average Balance (PKR)</Label>
                    <Input value={parsedData["bank-statement"].averageBalance} />
                  </div>
                  <div>
                    <Label>Credit Turnover (PKR)</Label>
                    <Input value={parsedData["bank-statement"].creditTurnover} />
                  </div>
                  <div>
                    <Label>Bounce Count</Label>
                    <Input value={parsedData["bank-statement"].bounceCount} />
                  </div>
                  <div>
                    <Label>Statement Period</Label>
                    <Input value={parsedData["bank-statement"].period} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="financial-statement">
          <DocumentUploadCard
            type="financial-statement"
            title="Financial Statement"
            description="Upload audited financial statements for business loans"
            acceptedTypes=".pdf"
          />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Save Progress</Button>
        <Button disabled={!parsedData["salary-slip"] && !parsedData["bank-statement"]}>Continue to Checklist</Button>
      </div>
    </div>
  )
}
