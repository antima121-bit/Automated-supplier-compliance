"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Users, Zap, Shield, Target } from "lucide-react"
import { mockDashboardMetrics } from "@/lib/mock-data"

export function DashboardOverview() {
  const [metrics, setMetrics] = useState(mockDashboardMetrics)
  const [isRealTime, setIsRealTime] = useState(false)

  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalSuppliers: prev.totalSuppliers + Math.floor(Math.random() * 3) - 1,
        criticalAlerts: Math.max(0, prev.criticalAlerts + Math.floor(Math.random() * 3) - 1),
        avgComplianceScore: Math.min(100, Math.max(0, prev.avgComplianceScore + (Math.random() - 0.5) * 2)),
        suppliersAtRisk: Math.max(0, prev.suppliersAtRisk + Math.floor(Math.random() * 3) - 1),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [isRealTime])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary glow-primary">Supplier Command Center</h1>
          <p className="text-muted-foreground text-lg mt-2">Real-time compliance monitoring & risk assessment</p>
        </div>
        <Button
          onClick={() => setIsRealTime(!isRealTime)}
          variant={isRealTime ? "default" : "outline"}
          className={`${isRealTime ? "glow-primary" : ""} transition-all duration-300`}
        >
          <Zap className="h-4 w-4 mr-2" />
          {isRealTime ? "Live Data ON" : "Enable Live Data"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card glow-primary border-primary/20 hover:glow-primary transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-primary">Total Suppliers</CardTitle>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">{metrics.totalSuppliers}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-primary mr-1" />
              <span className="text-primary font-medium">{metrics.activeSuppliers} active</span>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card glow-secondary border-destructive/20 hover:glow-secondary transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-destructive">Critical Alerts</CardTitle>
            <div className="p-2 bg-destructive/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive mb-2">{metrics.criticalAlerts}</div>
            <p className="text-sm text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="gradient-card glow-accent border-secondary/20 hover:glow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-secondary">Compliance Score</CardTitle>
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Shield className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-3">{metrics.avgComplianceScore.toFixed(1)}%</div>
            <Progress value={metrics.avgComplianceScore} className="h-3 bg-muted" />
          </CardContent>
        </Card>

        <Card className="gradient-card glow-primary border-accent/20 hover:glow-primary transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-accent">Risk Suppliers</CardTitle>
            <div className="p-2 bg-accent/20 rounded-lg">
              <Target className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent mb-2">{metrics.suppliersAtRisk}</div>
            <p className="text-sm text-muted-foreground">Medium to high risk</p>
          </CardContent>
        </Card>
      </div>

      <Card className="gradient-card border-primary/10">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">Performance Trends</CardTitle>
              <p className="text-muted-foreground mt-1">Key metrics trending upward</p>
            </div>
            <Badge variant="outline" className="bg-card text-foreground border-primary/30 px-3 py-1">
              Live Updates{" "}
              <span className={isRealTime ? "text-primary font-semibold" : "text-muted-foreground"}>
                {isRealTime ? "ON" : "OFF"}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.kpiTrends.map((trend, index) => {
              const colors = ["primary", "secondary", "accent"]
              const color = colors[index % colors.length]
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border border-${color}/20 bg-${color}/5 hover:bg-${color}/10 transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-foreground">{trend.metric}</h4>
                    <div className="flex items-center space-x-2">
                      {trend.change > 0 ? (
                        <TrendingUp className={`h-5 w-5 text-${color}`} />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-destructive" />
                      )}
                      <Badge variant={trend.change > 0 ? "default" : "destructive"} className="font-bold">
                        {trend.change > 0 ? "+" : ""}
                        {trend.change}%
                      </Badge>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground">{trend.current}%</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gradient-card border-l-4 border-l-secondary glow-secondary hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold flex items-center text-secondary">
              <Clock className="h-5 w-5 mr-3 p-1 bg-secondary/20 rounded" />
              Expiring Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary mb-2">{metrics.documentsExpiringSoon}</div>
            <p className="text-sm text-muted-foreground">Next 30 days</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-secondary/20 text-secondary hover:bg-secondary/10 bg-transparent"
            >
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-primary glow-primary hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold flex items-center text-primary">
              <CheckCircle className="h-5 w-5 mr-3 p-1 bg-primary/20 rounded" />
              Recent Audits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">{metrics.recentAudits}</div>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-primary/20 text-primary hover:bg-primary/10 bg-transparent"
            >
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-card border-l-4 border-l-destructive glow-accent hover:scale-105 transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold flex items-center text-destructive">
              <AlertTriangle className="h-5 w-5 mr-3 p-1 bg-destructive/20 rounded" />
              High Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive mb-2">{metrics.suppliersAtRisk}</div>
            <p className="text-sm text-muted-foreground">Require attention</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-destructive/20 text-destructive hover:bg-destructive/10 bg-transparent"
            >
              Take Action
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
