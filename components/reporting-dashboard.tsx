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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Download,
  CalendarIcon,
  Clock,
  Send,
  Eye,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Pause,
} from "lucide-react"
import { format } from "date-fns"

interface Report {
  id: string
  name: string
  description: string
  type: "compliance" | "risk" | "performance" | "audit" | "financial" | "operational"
  format: "pdf" | "excel" | "csv" | "json"
  status: "completed" | "generating" | "scheduled" | "failed"
  createdAt: string
  generatedAt?: string
  size?: string
  downloadUrl?: string
  schedule?: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "annually"
    nextRun: string
    enabled: boolean
  }
  parameters: Record<string, any>
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  category: string
  type: string
  sections: string[]
  parameters: string[]
  estimatedTime: string
}

export function ReportingDashboard() {
  const [reports] = useState<Report[]>([
    {
      id: "1",
      name: "Monthly Compliance Report",
      description: "Comprehensive compliance status across all suppliers",
      type: "compliance",
      format: "pdf",
      status: "completed",
      createdAt: "2024-12-14T10:00:00Z",
      generatedAt: "2024-12-14T10:15:00Z",
      size: "2.4 MB",
      downloadUrl: "/reports/compliance-2024-12.pdf",
      schedule: {
        frequency: "monthly",
        nextRun: "2025-01-14T10:00:00Z",
        enabled: true,
      },
      parameters: { dateRange: "2024-11-01 to 2024-11-30", includeCharts: true },
    },
    {
      id: "2",
      name: "Risk Assessment Summary",
      description: "High-risk suppliers and mitigation strategies",
      type: "risk",
      format: "pdf",
      status: "generating",
      createdAt: "2024-12-14T09:30:00Z",
      parameters: { riskThreshold: 7.0, includeRecommendations: true },
    },
    {
      id: "3",
      name: "Supplier Performance Analytics",
      description: "KPI trends and performance metrics",
      type: "performance",
      format: "excel",
      status: "completed",
      createdAt: "2024-12-13T16:00:00Z",
      generatedAt: "2024-12-13T16:12:00Z",
      size: "1.8 MB",
      downloadUrl: "/reports/performance-2024-12-13.xlsx",
      parameters: { period: "Q4 2024", includeComparisons: true },
    },
    {
      id: "4",
      name: "Audit Trail Report",
      description: "Complete activity log for compliance audit",
      type: "audit",
      format: "pdf",
      status: "scheduled",
      createdAt: "2024-12-14T08:00:00Z",
      schedule: {
        frequency: "weekly",
        nextRun: "2024-12-21T08:00:00Z",
        enabled: true,
      },
      parameters: { includeMetadata: true, severityFilter: "medium" },
    },
  ])

  const [templates] = useState<ReportTemplate[]>([
    {
      id: "1",
      name: "Compliance Overview",
      description: "Standard compliance report with all key metrics",
      category: "Compliance",
      type: "compliance",
      sections: ["Executive Summary", "Compliance Scores", "Risk Analysis", "Action Items"],
      parameters: ["dateRange", "includeCharts", "detailLevel"],
      estimatedTime: "5-10 minutes",
    },
    {
      id: "2",
      name: "Risk Assessment",
      description: "Detailed risk analysis and recommendations",
      category: "Risk Management",
      type: "risk",
      sections: ["Risk Overview", "High Risk Suppliers", "Mitigation Plans", "Trends"],
      parameters: ["riskThreshold", "includeRecommendations", "timeframe"],
      estimatedTime: "3-7 minutes",
    },
    {
      id: "3",
      name: "Performance Dashboard",
      description: "KPI tracking and performance analytics",
      category: "Performance",
      type: "performance",
      sections: ["KPI Summary", "Trend Analysis", "Benchmarking", "Recommendations"],
      parameters: ["period", "includeComparisons", "kpiSelection"],
      estimatedTime: "4-8 minutes",
    },
    {
      id: "4",
      name: "Audit Report",
      description: "Comprehensive audit trail and compliance verification",
      category: "Audit",
      type: "audit",
      sections: ["Audit Summary", "Activity Log", "Compliance Verification", "Findings"],
      parameters: ["auditPeriod", "includeMetadata", "severityFilter"],
      estimatedTime: "8-15 minutes",
    },
  ])

  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "generating":
        return <Clock className="h-4 w-4 text-secondary animate-spin" />
      case "scheduled":
        return <CalendarIcon className="h-4 w-4 text-muted-foreground" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "generating":
        return <Badge variant="secondary">Generating</Badge>
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "compliance":
        return <Shield className="h-4 w-4" />
      case "risk":
        return <AlertTriangle className="h-4 w-4" />
      case "performance":
        return <TrendingUp className="h-4 w-4" />
      case "audit":
        return <FileText className="h-4 w-4" />
      case "financial":
        return <BarChart3 className="h-4 w-4" />
      case "operational":
        return <Users className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const reportStats = {
    total: reports.length,
    completed: reports.filter((r) => r.status === "completed").length,
    generating: reports.filter((r) => r.status === "generating").length,
    scheduled: reports.filter((r) => r.schedule?.enabled).length,
  }

  const generateReport = (templateId: string, parameters: Record<string, any>) => {
    console.log("[v0] Generating report:", { templateId, parameters })
    // Implement report generation
  }

  const downloadReport = (reportId: string) => {
    console.log("[v0] Downloading report:", reportId)
    // Implement download functionality
  }

  const scheduleReport = (reportId: string, schedule: any) => {
    console.log("[v0] Scheduling report:", { reportId, schedule })
    // Implement scheduling
  }

  const previewReport = (reportId: string) => {
    console.log("[v0] Previewing report:", reportId)
    // Implement preview functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-primary">Reporting & Analytics</h2>
          <p className="text-muted-foreground text-lg mt-2">Generate comprehensive reports and insights</p>
        </div>
        <Button className="glow-primary">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{reportStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{reportStats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-secondary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{reportStats.generating}</div>
            <p className="text-sm text-muted-foreground">Generating</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-accent/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{reportStats.scheduled}</div>
            <p className="text-sm text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Reports List */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports ({reports.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-muted rounded-lg">{getTypeIcon(report.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-foreground text-balance">{report.name}</h4>
                            {getStatusIcon(report.status)}
                            {getStatusBadge(report.status)}
                            <Badge variant="outline" className="text-xs">
                              {report.format.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {report.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              Created: {new Date(report.createdAt).toLocaleDateString()}
                            </div>
                            {report.generatedAt && (
                              <div className="flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Generated: {new Date(report.generatedAt).toLocaleDateString()}
                              </div>
                            )}
                            {report.size && (
                              <div className="flex items-center">
                                <FileText className="h-3 w-3 mr-1" />
                                Size: {report.size}
                              </div>
                            )}
                            {report.schedule?.enabled && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Next: {new Date(report.schedule.nextRun).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          {Object.keys(report.parameters).length > 0 && (
                            <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                              <strong>Parameters:</strong> {JSON.stringify(report.parameters, null, 2)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => previewReport(report.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {report.status === "completed" && (
                          <Button variant="ghost" size="sm" onClick={() => downloadReport(report.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Sections:</span>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.map((section, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Parameters:</span>
                    <div className="flex flex-wrap gap-1">
                      {template.parameters.map((param, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Estimated time: {template.estimatedTime}</span>
                    <Badge variant="outline" className="text-xs">
                      {template.type}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm">Use Template</Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Template</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Report Name</label>
                <Input
                  placeholder="Enter report name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter report description"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
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

              <div className="space-y-4">
                <label className="text-sm font-medium">Report Options</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Include Charts</label>
                      <p className="text-xs text-muted-foreground">Add visual charts and graphs</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Include Recommendations</label>
                      <p className="text-xs text-muted-foreground">Add AI-generated recommendations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Detailed Analysis</label>
                      <p className="text-xs text-muted-foreground">Include detailed breakdowns</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Executive Summary</label>
                      <p className="text-xs text-muted-foreground">Add executive summary section</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => generateReport(selectedTemplate, { dateRange, reportName })}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">Preview</Button>
                <Button variant="ghost">Save as Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports
                    .filter((r) => r.schedule?.enabled)
                    .map((report) => (
                      <div key={report.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">{report.name}</h4>
                            <p className="text-sm text-muted-foreground">{report.schedule?.frequency}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              Next: {new Date(report.schedule!.nextRun).toLocaleDateString()}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Pause className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Template</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Frequency</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipients</label>
                  <Input placeholder="Enter email addresses" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Auto-send</label>
                    <p className="text-xs text-muted-foreground">Automatically send when generated</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button className="w-full">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
