"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertTriangle, Clock, XCircle, Shield, FileText, Database, Zap, RefreshCw } from "lucide-react"

interface ValidationRule {
  id: string
  name: string
  description: string
  category: "document" | "financial" | "regulatory" | "quality"
  status: "passed" | "failed" | "warning" | "pending"
  score: number
  lastChecked: string
  nextCheck: string
  details: string[]
}

interface ComplianceResult {
  supplierId: string
  supplierName: string
  overallScore: number
  status: "compliant" | "non-compliant" | "at-risk" | "pending"
  validationRules: ValidationRule[]
  lastValidated: string
}

export function ComplianceValidation() {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("1")
  const [isValidating, setIsValidating] = useState(false)

  const mockComplianceResults: ComplianceResult[] = [
    {
      supplierId: "1",
      supplierName: "TechCorp Solutions Pvt Ltd",
      overallScore: 92,
      status: "compliant",
      lastValidated: "2024-12-14T10:30:00Z",
      validationRules: [
        {
          id: "gstin-check",
          name: "GSTIN Verification",
          description: "Validates GSTIN against government database",
          category: "regulatory",
          status: "passed",
          score: 100,
          lastChecked: "2024-12-14T10:30:00Z",
          nextCheck: "2024-12-21T10:30:00Z",
          details: ["GSTIN is valid and active", "Registration status confirmed", "No pending issues found"],
        },
        {
          id: "document-validity",
          name: "Document Validity Check",
          description: "Verifies authenticity and expiry of uploaded documents",
          category: "document",
          status: "passed",
          score: 95,
          lastChecked: "2024-12-14T10:25:00Z",
          nextCheck: "2024-12-28T10:25:00Z",
          details: ["All required documents uploaded", "GST certificate valid until 2025-01-15", "PAN card verified"],
        },
        {
          id: "financial-health",
          name: "Financial Health Assessment",
          description: "Evaluates financial stability and credit worthiness",
          category: "financial",
          status: "passed",
          score: 88,
          lastChecked: "2024-12-14T09:00:00Z",
          nextCheck: "2025-01-14T09:00:00Z",
          details: ["Credit score: 750/900", "Debt-to-equity ratio within limits", "Cash flow positive"],
        },
        {
          id: "quality-standards",
          name: "Quality Standards Compliance",
          description: "Checks adherence to quality management standards",
          category: "quality",
          status: "warning",
          score: 75,
          lastChecked: "2024-12-14T08:00:00Z",
          nextCheck: "2024-12-21T08:00:00Z",
          details: ["ISO 9001 certificate expires in 60 days", "Quality audit pending", "Minor non-conformities noted"],
        },
      ],
    },
    {
      supplierId: "2",
      supplierName: "Global Manufacturing Ltd",
      overallScore: 68,
      status: "at-risk",
      lastValidated: "2024-12-14T11:00:00Z",
      validationRules: [
        {
          id: "gstin-check",
          name: "GSTIN Verification",
          description: "Validates GSTIN against government database",
          category: "regulatory",
          status: "passed",
          score: 100,
          lastChecked: "2024-12-14T11:00:00Z",
          nextCheck: "2024-12-21T11:00:00Z",
          details: ["GSTIN is valid and active"],
        },
        {
          id: "document-validity",
          name: "Document Validity Check",
          description: "Verifies authenticity and expiry of uploaded documents",
          category: "document",
          status: "failed",
          score: 40,
          lastChecked: "2024-12-14T10:55:00Z",
          nextCheck: "2024-12-15T10:55:00Z",
          details: ["GST certificate expired", "Bank details not updated", "Missing quality certificates"],
        },
        {
          id: "financial-health",
          name: "Financial Health Assessment",
          description: "Evaluates financial stability and credit worthiness",
          category: "financial",
          status: "warning",
          score: 65,
          lastChecked: "2024-12-14T09:30:00Z",
          nextCheck: "2025-01-14T09:30:00Z",
          details: ["Credit score: 620/900", "High debt-to-equity ratio", "Irregular payment history"],
        },
      ],
    },
  ]

  const currentResult = mockComplianceResults.find((r) => r.supplierId === selectedSupplier) || mockComplianceResults[0]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-secondary" />
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge variant="default">Passed</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "warning":
        return <Badge variant="secondary">Warning</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "financial":
        return <Database className="h-4 w-4" />
      case "regulatory":
        return <Shield className="h-4 w-4" />
      case "quality":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getOverallStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge variant="default" className="text-sm">
            Compliant
          </Badge>
        )
      case "non-compliant":
        return (
          <Badge variant="destructive" className="text-sm">
            Non-Compliant
          </Badge>
        )
      case "at-risk":
        return (
          <Badge variant="secondary" className="text-sm">
            At Risk
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-sm">
            Pending
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-sm">
            Unknown
          </Badge>
        )
    }
  }

  const handleRunValidation = async () => {
    setIsValidating(true)
    // Simulate validation process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsValidating(false)
  }

  const groupedRules = currentResult.validationRules.reduce(
    (acc, rule) => {
      if (!acc[rule.category]) {
        acc[rule.category] = []
      }
      acc[rule.category].push(rule)
      return acc
    },
    {} as Record<string, ValidationRule[]>,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center">
            <Shield className="h-6 w-6 mr-3 text-primary" />
            Automated Compliance Validation Engine
          </CardTitle>
          <p className="text-muted-foreground">
            Real-time compliance monitoring and automated validation of supplier requirements
          </p>
        </CardHeader>
      </Card>

      {/* Supplier Selection & Overall Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Validation Results</CardTitle>
            <div className="flex items-center justify-between">
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background text-foreground"
              >
                {mockComplianceResults.map((result) => (
                  <option key={result.supplierId} value={result.supplierId}>
                    {result.supplierName}
                  </option>
                ))}
              </select>
              <Button onClick={handleRunValidation} disabled={isValidating}>
                {isValidating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Run Validation
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground text-balance">{currentResult.supplierName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last validated: {new Date(currentResult.lastValidated).toLocaleString()}
                  </p>
                </div>
                {getOverallStatusBadge(currentResult.status)}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Overall Compliance Score</span>
                  <span className="text-sm text-muted-foreground">{currentResult.overallScore}%</span>
                </div>
                <Progress value={currentResult.overallScore} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Rules</span>
                <span className="font-semibold text-foreground">{currentResult.validationRules.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Passed</span>
                <span className="font-semibold text-primary">
                  {currentResult.validationRules.filter((r) => r.status === "passed").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Warnings</span>
                <span className="font-semibold text-secondary">
                  {currentResult.validationRules.filter((r) => r.status === "warning").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Failed</span>
                <span className="font-semibold text-destructive">
                  {currentResult.validationRules.filter((r) => r.status === "failed").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Rules by Category */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Rules</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {Object.entries(groupedRules).map(([category, rules]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center capitalize">
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category} Validation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <div key={rule.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(rule.status)}
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground text-balance">{rule.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(rule.status)}
                          <span className="text-sm font-medium text-foreground">{rule.score}%</span>
                        </div>
                      </div>

                      <div className="ml-7 space-y-2">
                        <div className="text-sm text-muted-foreground">
                          <strong>Details:</strong>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {rule.details.map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                          <span>Last checked: {new Date(rule.lastChecked).toLocaleString()}</span>
                          <span>Next check: {new Date(rule.nextCheck).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {Object.entries(groupedRules).map(([category, rules]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center capitalize">
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category} Validation Rules</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <div key={rule.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(rule.status)}
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground text-balance">{rule.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(rule.status)}
                          <span className="text-sm font-medium text-foreground">{rule.score}%</span>
                        </div>
                      </div>

                      <div className="ml-7 space-y-2">
                        <div className="text-sm text-muted-foreground">
                          <strong>Validation Details:</strong>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {rule.details.map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                          <span>Last checked: {new Date(rule.lastChecked).toLocaleString()}</span>
                          <span>Next check: {new Date(rule.nextCheck).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
