// /dashboard/spu/document-verification/page.tsx
"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X } from "lucide-react"
import { useState } from "react"

const applications = [
  {
    id: "UBL-2024-001234",
    applicantName: "Muhammad Ali Khan",
    documents: [
      { id: "doc1", name: "CNIC Copy", status: "pending", required: true },
      { id: "doc2", name: "Salary Slip", status: "verified", required: true },
      { id: "doc3", name: "Bank Statement", status: "rejected", required: true },
    ],
  },
  {
    id: "UBL-2024-001235",
    applicantName: "Fatima Ahmed",
    documents: [
      { id: "doc4", name: "CNIC Copy", status: "verified", required: true },
      { id: "doc5", name: "Salary Slip", status: "pending", required: true },
      { id: "doc6", name: "Bank Statement", status: "verified", required: true },
    ],
  },
]

export default function SPUDocumentVerificationPage() {
  const [documents, setDocuments] = useState(applications)

  const handleDocumentVerify = (appId: string, docId: string) => {
    setDocuments((prevDocs) => {
      return prevDocs.map((app) => {
        if (app.id === appId) {
          const updatedDocuments = app.documents.map((doc) => {
            if (doc.id === docId) {
              return { ...doc, status: "verified" }
            }
            return doc
          })
          return { ...app, documents: updatedDocuments }
        }
        return app
      })
    })
  }

  const handleDocumentReject = (appId: string, docId: string) => {
    setDocuments((prevDocs) => {
      return prevDocs.map((app) => {
        if (app.id === appId) {
          const updatedDocuments = app.documents.map((doc) => {
            if (doc.id === docId) {
              return { ...doc, status: "rejected" }
            }
            return doc
          })
          return { ...app, documents: updatedDocuments }
        }
        return app
      })
    })
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Document Verification</h1>
      <p className="text-muted-foreground">Verify and manage documents for each application.</p>

      <Card>
        <CardHeader>
          <CardTitle>Applications Pending Document Verification</CardTitle>
          <CardDescription>Mark documents as verified or rejected based on the application status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>LOS ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((app) => (
                <React.Fragment key={app.id}>
                  {app.documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-mono text-sm">{app.id}</TableCell>
                      <TableCell>{app.applicantName}</TableCell>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            doc.status === "verified"
                              ? "default"
                              : doc.status === "pending"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2">
                          {doc.status === "pending" && (
                            <>
                              <button
                                className="text-green-600 hover:text-green-800"
                                onClick={() => handleDocumentVerify(app.id, doc.id)}
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() => handleDocumentReject(app.id, doc.id)}
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
