"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Download,
  Eye,
  User,
  FileText,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  CalendarIcon,
  Activity,
  Database,
} from "lucide-react"
import { format } from "date-fns"

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: string
  action: string
  category: "authentication" | "data_access" | "data_modification" | "system_config" | "compliance" | "workflow"
  resource: string
  resourceId: string
  details: string
  ipAddress: string
  userAgent: string
  severity: "low" | "medium" | "high" | "critical"
  outcome: "success" | "failure" | "warning"
  metadata?: Record<string, any>
}

export function AuditTrail() {
  const [auditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2024-12-14T10:30:15Z",
      userId: "USR001",
      userName: "Sarah Wilson",
      userRole: "Compliance Manager",
      action: "Document Approved",
      category: "compliance",
      resource: "Document",
      resourceId: "DOC001",
      details: "Approved GST Certificate for TechCorp Solutions",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium",
      outcome: "success",
      metadata: { documentType: "GST Certificate", supplierId: "SUP001" },
    },
    {
      id: "2",
      timestamp: "2024-12-14T09:45:22Z",
      userId: "USR002",
      userName: "John Doe",
      userRole: "System Admin",
      action: "User Login",
      category: "authentication",
      resource: "User Session",
      resourceId: "SES001",
      details: "Successful login from new device",
      ipAddress: "10.0.0.50",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "low",
      outcome: "success",
    },
    {
      id: "3",
      timestamp: "2024-12-14T09:15:33Z",
      userId: "USR003",
      userName: "Mike Johnson",
      userRole: "Auditor",
      action: "Failed Login Attempt",
      category: "authentication",
      resource: "User Session",
      resourceId: "SES002",
      details: "Multiple failed login attempts detected",
      ipAddress: "203.0.113.45",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "high",
      outcome: "failure",
    },
    {
      id: "4",
      timestamp: "2024-12-14T08:30:10Z",
      userId: "USR001",
      userName: "Sarah Wilson",
      userRole: "Compliance Manager",
      action: "Supplier Risk Score Updated",
      category: "data_modification",
      resource: "Supplier",
      resourceId: "SUP002",
      details: "Risk score changed from 6.5 to 8.2 for Global Manufacturing",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium",
      outcome: "success",
      metadata: { oldRiskScore: 6.5, newRiskScore: 8.2, reason: "Document expiry detected" },
    },
    {
      id: "5",
      timestamp: "2024-12-14T07:00:05Z",
      userId: "SYSTEM",
      userName: "System",
      userRole: "System",
      action: "Automated Compliance Check",
      category: "workflow",
      resource: "Compliance Check",
      resourceId: "CHK001",
      details: "Daily compliance validation completed for 45 suppliers",
      ipAddress: "127.0.0.1",
      userAgent: "System/1.0",
      severity: "low",
      outcome: "success",
      metadata: { suppliersChecked: 45, issuesFound: 3, alertsGenerated: 2 },
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [outcomeFilter, setOutcomeFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const getActionIcon = (category: string) => {
    switch (category) {
      case "authentication":
        return <Shield className="h-4 w-4" />
      case "data_access":
        return <Eye className="h-4 w-4" />
      case "data_modification":
        return <Database className="h-4 w-4" />
      case "system_config":
        return <Settings className="h-4 w-4" />
      case "compliance":
        return <CheckCircle className="h-4 w-4" />
      case "workflow":
        return <Activity className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "failure":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-secondary" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    const matchesOutcome = outcomeFilter === "all" || log.outcome === outcomeFilter
    return matchesSearch && matchesCategory && matchesSeverity && matchesOutcome
  })

  const auditStats = {
    total: auditLogs.length,
    success: auditLogs.filter((l) => l.outcome === "success").length,
    failure: auditLogs.filter((l) => l.outcome === "failure").length,
    critical: auditLogs.filter((l) => l.severity === "critical").length,
    high: auditLogs.filter((l) => l.severity === "high").length,
  }

  const exportAuditLogs = () => {
    console.log("[v0] Exporting audit logs:", filteredLogs.length, "entries")
    // Implement export functionality
  }

  const viewLogDetails = (logId: string) => {
    console.log("[v0] Viewing audit log details:", logId)
    // Implement detailed view
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-primary">Audit Trail</h2>
          <p className="text-muted-foreground text-lg mt-2">Complete activity logging and compliance tracking</p>
        </div>
        <Button onClick={exportAuditLogs} className="glow-primary">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{auditStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Events</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{auditStats.success}</div>
            <p className="text-sm text-muted-foreground">Successful</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-destructive/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{auditStats.failure}</div>
            <p className="text-sm text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-destructive/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{auditStats.critical}</div>
            <p className="text-sm text-muted-foreground">Critical</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-secondary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{auditStats.high}</div>
            <p className="text-sm text-muted-foreground">High Severity</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search audit logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="authentication">Authentication</SelectItem>
                      <SelectItem value="data_access">Data Access</SelectItem>
                      <SelectItem value="data_modification">Data Modification</SelectItem>
                      <SelectItem value="system_config">System Config</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="workflow">Workflow</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Outcomes</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failure">Failure</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Date Range:</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[240px] justify-start text-left font-normal bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs List */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs ({filteredLogs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-muted rounded-lg">{getActionIcon(log.category)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-foreground">{log.action}</h4>
                            {getOutcomeIcon(log.outcome)}
                            {getSeverityBadge(log.severity)}
                            <Badge variant="outline" className="text-xs">
                              {log.category.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {log.userName} ({log.userRole})
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(log.timestamp).toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <Database className="h-3 w-3 mr-1" />
                              {log.resource}: {log.resourceId}
                            </div>
                            <div className="flex items-center">
                              <Activity className="h-3 w-3 mr-1" />
                              {log.ipAddress}
                            </div>
                          </div>
                          {log.metadata && (
                            <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                              <strong>Metadata:</strong> {JSON.stringify(log.metadata, null, 2)}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => viewLogDetails(log.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Authentication", count: 45, percentage: 35 },
                    { category: "Data Modification", count: 32, percentage: 25 },
                    { category: "Compliance", count: 28, percentage: 22 },
                    { category: "Workflow", count: 15, percentage: 12 },
                    { category: "System Config", count: 8, percentage: 6 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-muted-foreground">{item.count} events</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Failed Login Attempts</span>
                    <span className="text-sm font-medium text-destructive">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Unauthorized Access Attempts</span>
                    <span className="text-sm font-medium text-destructive">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Privilege Escalations</span>
                    <span className="text-sm font-medium text-secondary">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Data Export Events</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Configuration Changes</span>
                    <span className="text-sm font-medium">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Audit Report</CardTitle>
                <p className="text-sm text-muted-foreground">Last 30 days activity summary</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Audit Events</span>
                  <span className="text-sm font-medium">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Compliance Violations</span>
                  <span className="text-sm font-medium text-destructive">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Policy Adherence</span>
                  <span className="text-sm font-medium text-primary">98.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Data Integrity Checks</span>
                  <span className="text-sm font-medium text-primary">Passed</span>
                </div>
                <Button className="w-full mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Compliance Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regulatory Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { requirement: "SOX Compliance", status: "compliant", lastCheck: "2024-12-14" },
                  { requirement: "GDPR Data Protection", status: "compliant", lastCheck: "2024-12-13" },
                  { requirement: "ISO 27001", status: "review_needed", lastCheck: "2024-12-10" },
                  { requirement: "PCI DSS", status: "compliant", lastCheck: "2024-12-12" },
                ].map((req, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{req.requirement}</h4>
                      <p className="text-xs text-muted-foreground">Last check: {req.lastCheck}</p>
                    </div>
                    <Badge variant={req.status === "compliant" ? "default" : "secondary"}>
                      {req.status === "compliant" ? "Compliant" : "Review Needed"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Enable Audit Logging</label>
                    <p className="text-xs text-muted-foreground">Log all system activities</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Real-time Monitoring</label>
                    <p className="text-xs text-muted-foreground">Monitor activities in real-time</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Log Retention Period</label>
                    <p className="text-xs text-muted-foreground">How long to keep audit logs</p>
                  </div>
                  <Badge variant="outline">7 Years</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Automatic Archival</label>
                    <p className="text-xs text-muted-foreground">Archive old logs automatically</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Security Alerts</label>
                    <p className="text-xs text-muted-foreground">Alert on security events</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Failed Login Threshold</label>
                    <p className="text-xs text-muted-foreground">Alert after N failed attempts</p>
                  </div>
                  <Badge variant="outline">5 attempts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Data Export Alerts</label>
                    <p className="text-xs text-muted-foreground">Alert on large data exports</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
