"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap, FileText, CheckSquare, Send } from "lucide-react"

export default function ApplicantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Applicant Intake</h2>
        <p className="text-muted-foreground">Choose your preferred application intake method</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-500" />
              Enhanced Workflow
            </CardTitle>
            <CardDescription>Streamlined document processing with step-by-step guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-green-500" />
                <span>Integrated document upload & parsing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckSquare className="h-4 w-4 text-green-500" />
                <span>Interactive checklist with auto-verification</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Send className="h-4 w-4 text-green-500" />
                <span>Guided submission process</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard/applicant/enhanced">
                Start Enhanced Intake
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Standard Process</CardTitle>
            <CardDescription>Traditional step-by-step application process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span>• Manual document handling</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>• Separate verification steps</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>• Traditional workflow</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
