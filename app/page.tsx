"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowRight } from "lucide-react";
import { UserRole } from "./types";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is already logged in
    const userRole = localStorage.getItem("userRole") as UserRole;
    
    if (userRole) {
      // Redirect to appropriate dashboard based on role
      router.push(`/dashboard/${userRole}`);
    } else {
      // If no role is set, redirect to login
      router.push("/login");
    }
  }, [router]);
  
  const handleRoleSelection = (role: UserRole) => {
    // Set cookie for demo purposes
    document.cookie = `user_role=${role}; path=/; max-age=86400`;
    
    // Redirect to appropriate dashboard
    router.push(`/dashboard/${role}`);
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">UBL ILOS</h1>
        <p className="text-lg text-muted-foreground mt-2">Immutable Loan Origination System</p>
      </div>
      
      <div className="max-w-4xl w-full">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Select Your Role</h2>
          <p className="text-center text-muted-foreground mb-6">
            Choose a role to access the corresponding dashboard
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RoleCard 
            title="Personal Banking" 
            description="Initiate and manage loan applications" 
            role="pb" 
            onSelect={handleRoleSelection} 
          />
          
          <RoleCard 
            title="Scrutiny Processing Unit" 
            description="Validate documents and application fields" 
            role="spu" 
            onSelect={handleRoleSelection} 
          />
          
          <RoleCard 
            title="Centralized Operations" 
            description="Data entry and compliance checks" 
            role="cops" 
            onSelect={handleRoleSelection} 
          />
          
          <RoleCard 
            title="External Asset Verification" 
            description="Field verification and site visits" 
            role="eamvu" 
            onSelect={handleRoleSelection} 
          />
          
          <RoleCard 
            title="CIU - Resume Review" 
            description="Review paused or returned applications" 
            role="ciu_rru" 
            onSelect={handleRoleSelection} 
          />
          
          <RoleCard 
            title="CIU - Anti-Fraud Division" 
            description="Fraud detection and prevention" 
            role="ciu_afd" 
            onSelect={handleRoleSelection} 
          />
          
          <RoleCard 
            title="CIU - Acceptance" 
            description="Final decision making" 
            role="ciu_acceptance" 
            onSelect={handleRoleSelection} 
          />
        </div>
      </div>
      
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>UBL ILOS - Immutable Loan Origination System</p>
        <p className="mt-1">© 2024 United Bank Limited. All rights reserved.</p>
      </div>
    </main>
  );
}

interface RoleCardProps {
  title: string;
  description: string;
  role: UserRole;
  onSelect: (role: UserRole) => void;
}

function RoleCard({ title, description, role, onSelect }: RoleCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-12"></div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onSelect(role)}>
          Access Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
