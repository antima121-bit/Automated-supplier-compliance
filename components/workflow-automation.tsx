"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Settings, CheckCircle, Clock, AlertTriangle, ArrowRight, User, Mail, Zap } from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  type: "approval" | "validation" | "notification" | "action"
  status: "pending" | "in-progress" | "completed" | "failed"
  assignee?: string
  duration?: string
  description: string
}

interface Workflow {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "draft"
  trigger: string
  steps: WorkflowStep[]
  completedSteps: number
  totalSteps: number
  lastRun: string
  successRate: number
}

export function WorkflowAutomation() {
  const [workflows] = useState<Workflow[]>([
    {
      id: "WF001",
      name: "Supplier Onboarding",
      description: "Complete supplier registration and verification process",
      status: "active",
      trigger: "New supplier registration",
      completedSteps: 3,
      totalSteps: 6,
      lastRun: "2024-12-14 09:30",
      successRate: 94,
      steps: [
        {
          id: "S1",
          name: "Document Collection",
          type: "action",
          status: "completed",
          description: "Collect required documents from supplier",
          duration: "2 hours",
        },
        {
          id: "S2",
          name: "GSTIN Verification",
          type: "validation",
          status: "completed",
          description: "Verify GSTIN with government database",
          duration: "15 minutes",
        },
        {
          id: "S3",
          name: "Risk Assessment",
          type: "action",
          status: "completed",
          description: "Calculate supplier risk score",
          duration: "30 minutes",
        },
        {
          id: "S4",
          name: "Manager Approval",
          type: "approval",
          status: "in-progress",
          assignee: "Sarah Wilson",
          description: "Manager review and approval",
          duration: "1 day",
        },
        {
          id: "S5",
          name: "Contract Setup",
          type: "action",
          status: "pending",
          description: "Generate and send contract",
          duration: "2 hours",
        },
        {
          id: "S6",
          name: "Welcome Notification",
          type: "notification",
          status: "pending",
          description: "Send welcome email to supplier",
          duration: "5 minutes",
        },
      ],
    },
    {
      id: "WF002",
      name: "Document Expiry Alert",
      description: "Monitor and alert for expiring documents",
      status: "active",
      trigger: "Document expiry check (daily)",
      completedSteps: 2,
      totalSteps: 3,
      lastRun: "2024-12-14 06:00",
      successRate: 98,
      steps: [
        {
          id: "S1",
          name: "Scan Documents",
          type: "action",
          status: "completed",
          description: "Check all documents for expiry dates",
          duration: "10 minutes",
        },
        {
          id: "S2",
          name: "Generate Alerts",
          type: "action",
          status: "completed",
          description: "Create alerts for expiring documents",
          duration: "5 minutes",
        },
        {
          id: "S3",
          name: "Send Notifications",
          type: "notification",
          status: "in-progress",
          assignee: "System",
          description: "Email suppliers and managers",
          duration: "15 minutes",
        },
      ],
    },
    {
      id: "WF003",
      name: "Compliance Audit",
      description: "Quarterly compliance audit workflow",
      status: "paused",
      trigger: "Quarterly schedule",
      completedSteps: 0,
      totalSteps: 5,
      lastRun: "2024-09-15 10:00",
      successRate: 87,
      steps: [
        {
          id: "S1",
          name: "Select Suppliers",
          type: "action",
          status: "pending",
          description: "Select suppliers for audit based on risk",
          duration: "1 hour",
        },
        {
          id: "S2",
          name: "Document Review",
          type: "validation",
          status: "pending",
          description: "Review all compliance documents",
          duration: "2 days",
        },
        {
          id: "S3",
          name: "Site Inspection",
          type: "action",
          status: "pending",
          assignee: "Audit Team",
          description: "Conduct on-site inspection",
          duration: "1 day",
        },
        {
          id: "S4",
          name: "Report Generation",
          type: "action",
          status: "pending",
          description: "Generate audit report",
          duration: "4 hours",
        },
        {
          id: "S5",
          name: "Stakeholder Notification",
          type: "notification",
          status: "pending",
          description: "Send report to stakeholders",
          duration: "30 minutes",
        },
      ],
    },
  ])

  const getStepIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <User className="h-4 w-4" />
      case "validation":
        return <CheckCircle className="h-4 w-4" />
      case "notification":
        return <Mail className="h-4 w-4" />
      case "action":
        return <Zap className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-secondary" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "paused":
        return <Badge variant="secondary">Paused</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleWorkflowAction = (workflowId: string, action: string) => {
    console.log(`[v0] Workflow action: ${action} on workflow:`, workflowId)
    // Implement workflow actions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-primary">Workflow Automation</h2>
          <p className="text-muted-foreground text-lg mt-2">Automated business process management</p>
        </div>
        <Button className="glow-primary">
          <Settings className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{workflows.length}</div>
            <p className="text-sm text-muted-foreground">Total Workflows</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {workflows.filter((w) => w.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-secondary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">
              {Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-accent/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">
              {workflows.reduce((acc, w) => acc + w.completedSteps, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Steps Completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground">{workflow.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">{workflow.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(workflow.status)}
                    <div className="flex space-x-1">
                      {workflow.status === "active" ? (
                        <Button variant="ghost" size="sm" onClick={() => handleWorkflowAction(workflow.id, "pause")}>
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => handleWorkflowAction(workflow.id, "start")}>
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleWorkflowAction(workflow.id, "settings")}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">
                      {workflow.completedSteps} of {workflow.totalSteps} steps
                    </span>
                  </div>
                  <Progress value={(workflow.completedSteps / workflow.totalSteps) * 100} className="h-2" />
                </div>

                {/* Workflow Steps */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Workflow Steps</h4>
                  <div className="space-y-3">
                    {workflow.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(step.status)}
                          <div className="p-2 bg-muted rounded-lg">{getStepIcon(step.type)}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-foreground">{step.name}</h5>
                            <div className="flex items-center space-x-2">
                              {step.assignee && (
                                <Badge variant="outline" className="text-xs">
                                  {step.assignee}
                                </Badge>
                              )}
                              {step.duration && <span className="text-xs text-muted-foreground">{step.duration}</span>}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        {index < workflow.steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <span className="text-sm text-muted-foreground">Trigger</span>
                    <p className="text-sm font-medium text-foreground">{workflow.trigger}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Last Run</span>
                    <p className="text-sm font-medium text-foreground">{workflow.lastRun}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <p className="text-sm font-medium text-foreground">{workflow.successRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Supplier Onboarding",
                description: "Complete supplier registration workflow",
                steps: 6,
                category: "Onboarding",
              },
              {
                name: "Document Approval",
                description: "Multi-level document approval process",
                steps: 4,
                category: "Approval",
              },
              {
                name: "Risk Assessment",
                description: "Automated risk evaluation workflow",
                steps: 5,
                category: "Assessment",
              },
              {
                name: "Compliance Audit",
                description: "Periodic compliance audit process",
                steps: 7,
                category: "Audit",
              },
              {
                name: "Contract Renewal",
                description: "Automated contract renewal workflow",
                steps: 4,
                category: "Contract",
              },
              {
                name: "Incident Response",
                description: "Compliance incident response workflow",
                steps: 6,
                category: "Response",
              },
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{template.steps} steps</span>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Execution History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    workflow: "Supplier Onboarding",
                    status: "completed",
                    startTime: "2024-12-14 09:30",
                    endTime: "2024-12-14 11:45",
                    duration: "2h 15m",
                    trigger: "New supplier: TechCorp Solutions",
                  },
                  {
                    workflow: "Document Expiry Alert",
                    status: "completed",
                    startTime: "2024-12-14 06:00",
                    endTime: "2024-12-14 06:30",
                    duration: "30m",
                    trigger: "Daily schedule",
                  },
                  {
                    workflow: "Risk Assessment",
                    status: "failed",
                    startTime: "2024-12-13 14:20",
                    endTime: "2024-12-13 14:25",
                    duration: "5m",
                    trigger: "Manual trigger",
                  },
                ].map((execution, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{execution.workflow}</h4>
                        <p className="text-sm text-muted-foreground">{execution.trigger}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-foreground">{execution.duration}</p>
                          <p className="text-xs text-muted-foreground">{execution.startTime}</p>
                        </div>
                        <Badge variant={execution.status === "completed" ? "default" : "destructive"}>
                          {execution.status}
                        </Badge>
                      </div>
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
                <CardTitle>Workflow Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{workflow.name}</span>
                        <span className="text-sm text-muted-foreground">{workflow.successRate}%</span>
                      </div>
                      <Progress value={workflow.successRate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Execution Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Executions</span>
                    <span className="text-sm font-medium">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Successful</span>
                    <span className="text-sm font-medium text-primary">231</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Failed</span>
                    <span className="text-sm font-medium text-destructive">16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Duration</span>
                    <span className="text-sm font-medium">1h 23m</span>
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
