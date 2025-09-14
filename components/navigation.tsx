"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Workflow,
  Search,
  Activity,
  Bell,
  PieChart,
  UserCog,
} from "lucide-react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [collapsed, setCollapsed] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "suppliers", label: "Suppliers", icon: Users },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "compliance", label: "Compliance", icon: FileText },
    { id: "documents", label: "Documents", icon: FolderOpen },
    { id: "workflows", label: "Workflows", icon: Workflow },
    { id: "search", label: "Search", icon: Search },
    { id: "audit", label: "Audit Trail", icon: Activity },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "reports", label: "Reports", icon: PieChart },
    { id: "users", label: "User Management", icon: UserCog },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && <h1 className="text-lg font-semibold text-sidebar-foreground">Supplier Compliance</h1>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-sidebar-foreground",
                isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                !isActive && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "px-2",
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
              {!collapsed && item.label}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground/60">
            <p>Automated Compliance System</p>
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  )
}
