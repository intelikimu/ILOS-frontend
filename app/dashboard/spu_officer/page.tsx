// app/dashboard/spu_officer/page.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, ClipboardList, FileSearch, CheckCircle } from "lucide-react";

const officerMetrics = [
  { title: "Assigned Applications", count: 5, icon: ClipboardList },
  { title: "In Review", count: 2, icon: FileSearch },
  { title: "Completed Reviews", count: 10, icon: CheckCircle },
];

export default function OfficerDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">SPU Officer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {officerMetrics.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-4 flex items-center gap-4">
              <item.icon className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                <p className="text-xl font-bold">{item.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
