"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  Shield,
  Target,
  Brain,
} from "lucide-react"

// Mock analytics data
const complianceScoreData = [
  { month: "Jan", score: 78, target: 85 },
  { month: "Feb", score: 82, target: 85 },
  { month: "Mar", score: 79, target: 85 },
  { month: "Apr", score: 85, target: 85 },
  { month: "May", score: 88, target: 85 },
  { month: "Jun", score: 92, target: 85 },
]

const riskDistributionData = [
  { name: "Low Risk", value: 65, color: "#10b981" },
  { name: "Medium Risk", value: 23, color: "#f59e0b" },
  { name: "High Risk", value: 8, color: "#ef4444" },
  { name: "Critical Risk", value: 4, color: "#dc2626" },
]

const supplierPerformanceData = [
  { category: "Manufacturing", compliance: 88, delivery: 92, quality: 85 },
  { category: "Technology", compliance: 94, delivery: 89, quality: 96 },
  { category: "Services", compliance: 82, delivery: 87, quality: 79 },
  { category: "Raw Materials", compliance: 76, delivery: 83, quality: 88 },
]

const kpiTrendsData = [
  { metric: "On-Time Delivery", jan: 85, feb: 87, mar: 89, apr: 91, may: 88, jun: 92 },
  { metric: "Quality Score", jan: 82, feb: 84, mar: 86, apr: 88, may: 90, jun: 91 },
  { metric: "Cost Efficiency", jan: 78, feb: 80, mar: 82, apr: 85, may: 87, jun: 89 },
]

const riskHeatMapData = [
  { supplier: "TechCorp", financial: 85, operational: 72, regulatory: 90, reputation: 88, overall: 84 },
  { supplier: "ManufacturingPlus", financial: 65, operational: 58, regulatory: 70, reputation: 62, overall: 64 },
  { supplier: "ServicePro", financial: 78, operational: 82, regulatory: 75, reputation: 80, overall: 79 },
  { supplier: "GlobalSupply", financial: 45, operational: 52, regulatory: 48, reputation: 50, overall: 49 },
  { supplier: "QualityFirst", financial: 92, operational: 88, regulatory: 95, reputation: 90, overall: 91 },
]

const riskTrendsData = [
  { month: "Jan", high: 12, medium: 28, low: 102 },
  { month: "Feb", high: 15, medium: 25, low: 105 },
  { month: "Mar", high: 10, medium: 30, low: 108 },
  { month: "Apr", high: 8, medium: 32, low: 112 },
  { month: "May", high: 6, medium: 29, low: 118 },
  { month: "Jun", high: 4, medium: 26, low: 122 },
]

const complianceMetricsData = [
  { category: "Regulatory", current: 94, target: 95, trend: 2.1 },
  { category: "Financial", current: 87, target: 90, trend: -1.2 },
  { category: "Quality", current: 91, target: 88, trend: 4.5 },
  { category: "Environmental", current: 83, target: 85, trend: 1.8 },
  { category: "Safety", current: 96, target: 95, trend: 3.2 },
]

const auditTimelineData = [
  { month: "Jan", scheduled: 45, completed: 42, passed: 38, failed: 4 },
  { month: "Feb", scheduled: 38, completed: 36, passed: 33, failed: 3 },
  { month: "Mar", scheduled: 52, completed: 48, passed: 44, failed: 4 },
  { month: "Apr", scheduled: 41, completed: 39, passed: 37, failed: 2 },
  { month: "May", scheduled: 47, completed: 45, passed: 42, failed: 3 },
  { month: "Jun", scheduled: 39, completed: 37, passed: 35, failed: 2 },
]

const predictiveInsightsData = [
  { month: "Jul", predicted: 89, confidence: 85 },
  { month: "Aug", predicted: 91, confidence: 82 },
  { month: "Sep", predicted: 88, confidence: 78 },
  { month: "Oct", predicted: 93, confidence: 80 },
  { month: "Nov", predicted: 90, confidence: 75 },
  { month: "Dec", predicted: 94, confidence: 77 },
]

const riskFactorsData = [
  { factor: "Market Volatility", impact: 78, probability: 65 },
  { factor: "Regulatory Changes", impact: 85, probability: 45 },
  { factor: "Supply Chain Disruption", impact: 92, probability: 35 },
  { factor: "Financial Instability", impact: 88, probability: 25 },
  { factor: "Quality Issues", impact: 75, probability: 40 },
  { factor: "Cyber Security", impact: 95, probability: 30 },
]

const chartConfig = {
  score: { label: "Compliance Score", color: "#0ea5e9" },
  target: { label: "Target", color: "#64748b" },
  compliance: { label: "Compliance", color: "#0ea5e9" },
  delivery: { label: "Delivery", color: "#10b981" },
  quality: { label: "Quality", color: "#f59e0b" },
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    console.log("[v0] Export started:", { timeRange, selectedCategory })

    try {
      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create and download CSV data
      const csvData = [
        ["Metric", "Value", "Trend", "Category"],
        ["Overall Score", "87.5%", "+5.2%", "Performance"],
        ["Active Suppliers", "142", "+8", "Count"],
        ["Risk Score", "2.3", "-0.4", "Risk"],
        ["Audit Success", "94.2%", "+2.1%", "Compliance"],
      ]

      const csvContent = csvData.map((row) => row.join(",")).join("\n")
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `supplier-analytics-${timeRange}-${Date.now()}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      console.log("[v0] Export completed successfully")
    } catch (error) {
      console.error("[v0] Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleViewDetails = (dataPoint: any, chartType: string) => {
    console.log("[v0] View details clicked:", { dataPoint, chartType })
    // This would typically open a modal or navigate to a detailed view
    alert(`Viewing details for ${chartType}: ${JSON.stringify(dataPoint)}`)
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "#10b981" // Green for low risk (high score)
    if (score >= 60) return "#f59e0b" // Yellow for medium risk
    if (score >= 40) return "#ef4444" // Orange for high risk
    return "#dc2626" // Red for critical risk
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Analytics Command Center
          </h2>
          <p className="text-muted-foreground text-lg mt-2">Advanced insights & predictive intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] bg-card/50 border-primary/20">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px] bg-card/50 border-secondary/20">
              <Filter className="h-4 w-4 mr-2 text-secondary" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
            className="bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 glow-accent"
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export Data"}
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">87.5%</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span className="text-primary">+5.2%</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">142</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-primary mr-1" />
                  <span className="text-primary">+8</span>
                  <span className="text-muted-foreground ml-1">new this month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">2.3</div>
                <div className="flex items-center text-sm">
                  <TrendingDown className="h-4 w-4 text-primary mr-1" />
                  <span className="text-primary">-0.4</span>
                  <span className="text-muted-foreground ml-1">improvement</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Audit Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">94.2%</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-primary mr-1" />
                  <span className="text-primary">+2.1%</span>
                  <span className="text-muted-foreground ml-1">vs target</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Score Trends */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Compliance Score Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly compliance performance vs targets</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(complianceScoreData, "compliance-trends")}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={complianceScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeDasharray="5 5" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Risk Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">Current supplier risk levels</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(riskDistributionData, "risk-distribution")}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {riskDistributionData.map((item) => (
                    <Badge key={item.name} variant="outline" className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}: {item.value}%
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Supplier Performance by Category</CardTitle>
                  <p className="text-sm text-muted-foreground">Comparative performance metrics</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(supplierPerformanceData, "supplier-performance")}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <BarChart data={supplierPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="compliance" fill="var(--color-compliance)" />
                    <Bar dataKey="delivery" fill="var(--color-delivery)" />
                    <Bar dataKey="quality" fill="var(--color-quality)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>KPI Performance Trends</CardTitle>
              <p className="text-sm text-muted-foreground">Key performance indicators over time</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {kpiTrendsData.map((kpi) => (
                  <div key={kpi.metric} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{kpi.metric}</h4>
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(kpi, "kpi-trends")}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-6 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-medium">Jan</div>
                        <div className="text-muted-foreground">{kpi.jan}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Feb</div>
                        <div className="text-muted-foreground">{kpi.feb}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Mar</div>
                        <div className="text-muted-foreground">{kpi.mar}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Apr</div>
                        <div className="text-muted-foreground">{kpi.apr}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">May</div>
                        <div className="text-muted-foreground">{kpi.may}%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Jun</div>
                        <div className="text-primary font-medium">{kpi.jun}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {/* Risk Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  High Risk Suppliers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">4</div>
                <div className="text-sm text-muted-foreground">-2 from last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Risk Score Average
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2.3</div>
                <div className="text-sm text-primary">-0.4 improvement</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Risk Mitigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">87%</div>
                <div className="text-sm text-primary">+5% this quarter</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">142</div>
                <div className="text-sm text-muted-foreground">suppliers tracked</div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Heat Map */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Supplier Risk Heat Map</CardTitle>
                <p className="text-sm text-muted-foreground">Multi-dimensional risk assessment across key categories</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleViewDetails(riskHeatMapData, "risk-heatmap")}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskHeatMapData.map((supplier) => (
                  <div key={supplier.supplier} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{supplier.supplier}</h4>
                      <Badge
                        variant={
                          supplier.overall >= 80 ? "default" : supplier.overall >= 60 ? "secondary" : "destructive"
                        }
                      >
                        {supplier.overall}% Overall
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Financial</div>
                        <Progress value={supplier.financial} className="h-2" />
                        <div className="text-xs font-medium">{supplier.financial}%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Operational</div>
                        <Progress value={supplier.operational} className="h-2" />
                        <div className="text-xs font-medium">{supplier.operational}%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Regulatory</div>
                        <Progress value={supplier.regulatory} className="h-2" />
                        <div className="text-xs font-medium">{supplier.regulatory}%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Reputation</div>
                        <Progress value={supplier.reputation} className="h-2" />
                        <div className="text-xs font-medium">{supplier.reputation}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Trends and Factors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly distribution of supplier risk levels</p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <AreaChart data={riskTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="high" stackId="1" stroke="#dc2626" fill="#dc2626" />
                    <Area type="monotone" dataKey="medium" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="low" stackId="1" stroke="#10b981" fill="#10b981" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Impact vs probability assessment</p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ScatterChart data={riskFactorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="probability" name="Probability" />
                    <YAxis dataKey="impact" name="Impact" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Scatter dataKey="impact" fill="#0ea5e9" />
                  </ScatterChart>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {riskFactorsData.map((factor) => (
                    <div key={factor.factor} className="flex items-center justify-between text-sm">
                      <span>{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Impact: {factor.impact}%</span>
                        <span className="text-muted-foreground">Prob: {factor.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Overall Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">90.2%</div>
                <div className="text-sm text-primary">+2.1% vs target</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">23</div>
                <div className="text-sm text-muted-foreground">in progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Non-Compliance Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">7</div>
                <div className="text-sm text-primary">-3 resolved this week</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Certification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">up to date</div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Metrics by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Metrics by Category</CardTitle>
              <p className="text-sm text-muted-foreground">Performance against targets across compliance areas</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complianceMetricsData.map((metric) => (
                  <div key={metric.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{metric.category}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Target: {metric.target}%</span>
                        <Badge variant={metric.current >= metric.target ? "default" : "secondary"}>
                          {metric.current}%
                        </Badge>
                        <div className="flex items-center gap-1">
                          {metric.trend > 0 ? (
                            <TrendingUp className="h-4 w-4 text-primary" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className={`text-sm ${metric.trend > 0 ? "text-primary" : "text-destructive"}`}>
                            {metric.trend > 0 ? "+" : ""}
                            {metric.trend}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress value={metric.current} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audit Timeline */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Audit Timeline & Results</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly audit scheduling and completion rates</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(auditTimelineData, "audit-timeline")}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={auditTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="scheduled" fill="#64748b" name="Scheduled" />
                  <Bar dataKey="completed" fill="#0ea5e9" name="Completed" />
                  <Bar dataKey="passed" fill="#10b981" name="Passed" />
                  <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          {/* Predictive Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Model Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">87.3%</div>
                <div className="text-sm text-primary">+2.1% this month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Predicted Risk Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">12</div>
                <div className="text-sm text-muted-foreground">next 30 days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Early Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">5</div>
                <div className="text-sm text-muted-foreground">active alerts</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Forecast Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">82%</div>
                <div className="text-sm text-muted-foreground">6-month outlook</div>
              </CardContent>
            </Card>
          </div>

          {/* Predictive Insights Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance Forecast</CardTitle>
                <p className="text-sm text-muted-foreground">ML-powered predictions with confidence intervals</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(predictiveInsightsData, "predictive-forecast")}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={predictiveInsightsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    name="Predicted Performance"
                  />
                  <Line
                    type="monotone"
                    dataKey="confidence"
                    stroke="#10b981"
                    strokeDasharray="5 5"
                    name="Confidence Level"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* ML Insights and Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <p className="text-sm text-muted-foreground">Key findings from predictive analysis</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-primary">Performance Improvement Expected</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Based on current trends, overall supplier performance is predicted to improve by 5.2% over the
                          next quarter.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-secondary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-secondary">Risk Alert: Supply Chain</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          3 suppliers show early indicators of potential supply chain disruptions in Q4.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-primary">Compliance Optimization</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implementing suggested process improvements could increase compliance scores by 3.8%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <p className="text-sm text-muted-foreground">AI-suggested interventions and optimizations</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-background rounded-lg border">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">High Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Review contracts with GlobalSupply - predicted 78% chance of delivery delays
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Take Action
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-background rounded-lg border">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Medium Priority</h4>
                      <p className="text-sm text-muted-foreground">
                        Schedule additional quality audits for ManufacturingPlus based on trend analysis
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Schedule
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-background rounded-lg border">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider expanding partnership with QualityFirst - consistently exceeding benchmarks
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Explore
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
