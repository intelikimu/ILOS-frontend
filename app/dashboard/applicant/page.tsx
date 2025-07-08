"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ApplicantPage() {
  const [cnic, setCnic] = useState("")
  const [product, setProduct] = useState("")
  const [subOption, setSubOption] = useState("")
  const router = useRouter()

  // Next button action
  const handleNext = () => {
    if (!cnic || !product) return
    // Example navigation (adjust for your routes)
    let url = `/dashboard/applicant/${product.toLowerCase()}`
    if (product === "auto" && subOption) url += `/${subOption.toLowerCase().replace(/\s/g, "-")}`
    if (product === "creditcard" && subOption) url += `/${subOption.toLowerCase().replace(/\s/g, "-")}`
    router.push(url)
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New Applicant Intake</h2>
        <p className="text-muted-foreground">Enter your CNIC and choose your preferred product</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Start Application</CardTitle>
          <CardDescription>Begin by entering applicant details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* CNIC Field */}
          <div>
            <label className="block text-sm font-medium mb-1">CNIC No.</label>
            <input
              type="text"
              placeholder="e.g. 12345-1234567-1"
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow transition placeholder:text-gray-400"
              value={cnic}
              onChange={e => setCnic(e.target.value)}
              maxLength={15}
            />
          </div>

          {/* Product Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Choose Product</label>
            <select
              className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow transition"
              value={product}
              onChange={e => {
                setProduct(e.target.value)
                setSubOption("")
              }}
            >
              <option value="">Select...</option>
              <option value="auto">Auto</option>
              <option value="creditcard">Credit Card</option>
              <option value="cashplus">Cashplus</option>
              <option value="ameendrive">Ameen Drive</option>
            </select>
          </div>

          {/* Conditional sub-dropdowns */}
          {product === "auto" && (
            <div>
              <label className="block text-sm font-medium mb-1">Auto Subtype</label>
              <select
                className="w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 px-4 py-2 text-base shadow transition"
                value={subOption}
                onChange={e => setSubOption(e.target.value)}
              >
                <option value="">Select...</option>
                 <option value="Autoloans">Auto loans</option>
                <option value="Financial Vehicles">Financial Vehicles</option>
                <option value="SME Loans">SME Loans</option>
              </select>
            </div>
          )}

          {product === "creditcard" && (
            <div>
              <label className="block text-sm font-medium mb-2">Credit Card Type</label>
              <div className="flex gap-8">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="creditcard-type"
                    value="Platinum Credit Card"
                    checked={subOption === "Platinum Credit Card"}
                    onChange={e => setSubOption(e.target.value)}
                  />
                  Platinum Credit Card
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="creditcard-type"
                    value="Gold Credit Card"
                    checked={subOption === "Gold Credit Card"}
                    onChange={e => setSubOption(e.target.value)}
                  />
                  Gold Credit Card
                </label>
              </div>
            </div>
          )}

          {/* Next Button */}
          <Button
            className="w-full mt-4"
            disabled={
              !cnic ||
              !product ||
              ((product === "auto" || product === "creditcard") && !subOption)
            }
            onClick={handleNext}
            type="button"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
