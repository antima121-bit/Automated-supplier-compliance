export interface Supplier {
  id: string
  name: string
  gstin: string
  email: string
  phone: string
  address: string
  category: "Critical" | "Important" | "Standard"
  status: "Active" | "Inactive" | "Suspended"
  registrationDate: string
  lastAuditDate: string
  complianceScore: number
  riskLevel: "Low" | "Medium" | "High" | "Critical"
  documents: Document[]
  kpis: SupplierKPI[]
}

export interface Document {
  id: string
  name: string
  type: "GST_Certificate" | "PAN_Card" | "Bank_Details" | "Quality_Certificate" | "Other"
  status: "Verified" | "Pending" | "Rejected" | "Expired"
  uploadDate: string
  expiryDate?: string
  url: string
}

export interface SupplierKPI {
  id: string
  supplierId: string
  metric: string
  value: number
  target: number
  unit: string
  period: string
  status: "On_Track" | "At_Risk" | "Critical"
  lastUpdated: string
}

export interface ComplianceCheck {
  id: string
  supplierId: string
  checkType: "GSTIN_Verification" | "Document_Validation" | "Financial_Health" | "Quality_Audit"
  status: "Passed" | "Failed" | "Pending" | "Warning"
  score: number
  details: string
  checkedDate: string
  nextCheckDate: string
}

export interface Alert {
  id: string
  supplierId: string
  type: "Compliance" | "Risk" | "KPI" | "Document"
  severity: "Low" | "Medium" | "High" | "Critical"
  title: string
  description: string
  status: "Open" | "In_Progress" | "Resolved"
  createdDate: string
  assignedTo?: string
}

export interface DashboardMetrics {
  totalSuppliers: number
  activeSuppliers: number
  criticalAlerts: number
  avgComplianceScore: number
  suppliersAtRisk: number
  documentsExpiringSoon: number
  recentAudits: number
  kpiTrends: {
    metric: string
    current: number
    previous: number
    change: number
  }[]
}
