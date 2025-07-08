"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Building2,
  LayoutDashboard,
  UserPlus,
  Upload,
  AlertTriangle,
  FileText,
  Bell,
  BarChart3,
  Settings,
  Search,
  CheckCircle,
  Users,
  MapPin,
  Shield,
  Stamp,
  Database,
  Fingerprint,
  Pause,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  AlertOctagon
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { UserRole } from "@/app/types"

// Navigation items by role
const navigationByRole: Record<UserRole, any[]> = {
  'pb': [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/pb",
          icon: LayoutDashboard,
        },
        {
          title: "New Application",
          url: "/dashboard/applicant",
          icon: UserPlus,
        },
        {
          title: "My Applications",
          url: "/dashboard/pb/applications",
          icon: FileText,
        },
        {
          title: "Disbursed Loans",
          url: "/dashboard/pb/disbursed",
          icon: CheckCircle,
        },
      ],
    },
    {
      title: "Documents",
      items: [
        {
          title: "Upload Documents",
          url: "/dashboard/documents",
          icon: Upload,
        },
        {
          title: "Document Status",
          url: "/dashboard/pb/document-status",
          icon: FileText,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          title: "Alerts",
          url: "/dashboard/pb/alerts",
          icon: Bell,
          badge: "3",
        },
      ],
    },
  ],
  'spu': [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/spu",
          icon: LayoutDashboard,
        },
        {
          title: "New Applications",
          url: "/dashboard/spu/new",
          icon: FileText,
          badge: "5",
        },
        {
          title: "Verified Applications",
          url: "/dashboard/spu/verified",
          icon: CheckCircle,
        },
        {
          title: "Returned Applications",
          url: "/dashboard/spu/returned",
          icon: AlertTriangle,
        },
      ],
    },
    {
      title: "Documents",
      items: [
        {
          title: "Document Verification",
          url: "/dashboard/spu/document-verification",
          icon: FileText,
        },
        {
          title: "Missing Documents",
          url: "/dashboard/spu/missing-documents",
          icon: AlertTriangle,
          badge: "12",
        },
      ],
    },
    {
      title: "Reports",
      items: [
        {
          title: "Daily Report",
          url: "/dashboard/spu/reports/daily",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          title: "Alerts",
          url: "/dashboard//spu/alerts",
          icon: Bell,
          badge: "3",
        },
        {
          title: "Assignment",
          url: "/dashboard//spu/assignments",
          icon: Bell,
          badge: "3",
        },
      ],
    },
  ],
  'cops': [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/cops",
          icon: LayoutDashboard,
        },
        {
          title: "Data Entry Queue",
          url: "/dashboard/cops/data-entry",
          icon: Database,
          badge: "8",
        },
        {
          title: "Compliance Check",
          url: "/dashboard/cops/compliance",
          icon: Shield,
          badge: "3",
        },
        {
          title: "Processed Applications",
          url: "/dashboard/cops/processed",
          icon: CheckCircle,
        },
      ],
    },
    {
      title: "Systems",
      items: [
        {
          title: "CAPS Integration",
          url: "/dashboard/cops/caps",
          icon: Database,
        },
        {
          title: "CRM System",
          url: "/dashboard/cops/crm",
          icon: Users,
        },
      ],
    },
    {
      title: "Reports",
      items: [
        {
          title: "Compliance Reports",
          url: "/dashboard/cops/reports",
          icon: BarChart3,
        },
      ],
    },
  ],
  'eamvu': [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/eamvu",
          icon: LayoutDashboard,
        },
        {
          title: "New Applications",
          url: "/dashboard/eamvu/new",
          icon: FileText,
          badge: "6",
        },
        {
          title: "Assigned Applications",
          url: "/dashboard/eamvu/assigned",
          icon: Users,
        },
        {
          title: "Completed Visits",
          url: "/dashboard/eamvu/completed",
          icon: CheckCircle,
        },
      ],
    },
    {
      title: "Field Agents",
      items: [
        {
          title: "Agent Management",
          url: "/dashboard/eamvu/agents",
          icon: Users,
        },
        {
          title: "Field Reports",
          url: "/dashboard/eamvu/reports",
          icon: MapPin,
        },
        {
          title: "Visit Photos",
          url: "/dashboard/eamvu/photos",
          icon: Upload,
        },
      ],
    },
  ],
  'ciu': [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/ciu",
          icon: LayoutDashboard,
        },
        {
          title: "Pending Applications",
          url: "/dashboard/ciu/pending-applications",
          icon: Search,
          badge: "10",
        },
        {
          title: "Flag Application",
          url: "/dashboard/ciu/flag-application",
          icon: AlertTriangle,
          badge: "3",
        },
        {
          title: "Verification Application",
          url: "/dashboard/ciu/verification-application",
          icon: Shield,
        },
      ],
    },
    {
      title: "Verification",
      items: [
        {
          title: "NADRA Checklist",
          url: "/dashboard/ciu/nadra-checklist",
          icon: Database,
        },
        {
          title: "Blacklist Check",
          url: "/dashboard/ciu/blacklist-check",
          icon: AlertOctagon,
        },
        {
          title: "Final Approval",
          url: "/dashboard/ciu/final-approval",
          icon: Stamp,
        },
      ],
    },
    {
      title: "Reports",
      items: [
        {
          title: "Investigation Reports",
          url: "/dashboard/ciu/investigation-report",
          icon: BarChart3,
        },
      ],
    },
  ],
  'rru': [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/rru",
          icon: LayoutDashboard,
        },
        {
          title: "Under Review",
          url: "/dashboard/rru/under-review",
          icon: Pause,
          badge: "12",
        },
        {
          title: "Resume Application",
          url: "/dashboard/rru/resume-application",
          icon: RotateCcw,
        },
        {
          title: "Returned Application",
          url: "/dashboard/rru/returned-application",
          icon: AlertTriangle,
        },
      ],
    },
    {
      title: "Reports",
      items: [
        {
          title: "Rejection Analysis",
          url: "/dashboard/rru/rejection-analysis",
          icon: BarChart3,
        },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: UserRole;
}

export function AppSidebar({ userRole = 'pb', ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const navigationItems = navigationByRole[userRole] || navigationByRole['pb'];
  
  const roleDisplayNames: Record<UserRole, string> = {
    'pb': 'Personal Banking',
    'spu': 'Scrutiny Processing Unit',
    'cops': 'Consumer Operations',
    'eamvu': 'External Asset Management',
    'ciu': 'Central Investigation Unit',
    'rru': 'Rejection Review Unit',
  };

  return (
    <Sidebar {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/dashboard/${userRole}`}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">UBL ILOS</span>
                  <span className="truncate text-xs">{roleDisplayNames[userRole]}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
