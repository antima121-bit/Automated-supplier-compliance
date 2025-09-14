"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { DashboardOverview } from "@/components/dashboard-overview"
import { SupplierList } from "@/components/supplier-list"
import { AlertsPanel } from "@/components/alerts-panel"
import { SupplierRegistration } from "@/components/supplier-registration"
import { OnboardingChecklist } from "@/components/onboarding-checklist"
import { ComplianceValidation } from "@/components/compliance-validation"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { SettingsPanel } from "@/components/settings-panel"
import { DocumentManagement } from "@/components/document-management"
import { WorkflowAutomation } from "@/components/workflow-automation"
import { AdvancedSearch } from "@/components/advanced-search"
import { AuditTrail } from "@/components/audit-trail"
import { NotificationCenter } from "@/components/notification-center"
import { ReportingDashboard } from "@/components/reporting-dashboard"
import { UserManagement } from "@/components/user-management"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "suppliers":
        return <SupplierList />
      case "alerts":
        return <AlertsPanel />
      case "compliance":
        return (
          <div className="space-y-6">
            <ComplianceValidation />
            <SupplierRegistration />
            <OnboardingChecklist />
          </div>
        )
      case "analytics":
        return <AnalyticsDashboard />
      case "settings":
        return <SettingsPanel />
      case "documents":
        return <DocumentManagement />
      case "workflows":
        return <WorkflowAutomation />
      case "search":
        return <AdvancedSearch />
      case "audit":
        return <AuditTrail />
      case "notifications":
        return <NotificationCenter />
      case "reports":
        return <ReportingDashboard />
      case "users":
        return <UserManagement />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  )
}
