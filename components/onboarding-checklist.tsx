import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, FileText, Shield, Users } from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "pending" | "failed"
  priority: "high" | "medium" | "low"
  category: "documentation" | "compliance" | "verification" | "setup"
}

export function OnboardingChecklist() {
  const checklistItems: ChecklistItem[] = [
    {
      id: "1",
      title: "Basic Information Submitted",
      description: "Company details and contact information provided",
      status: "completed",
      priority: "high",
      category: "setup",
    },
    {
      id: "2",
      title: "GSTIN Verification",
      description: "Government database validation of GST registration",
      status: "completed",
      priority: "high",
      category: "verification",
    },
    {
      id: "3",
      title: "Document Upload",
      description: "Required compliance documents uploaded",
      status: "in-progress",
      priority: "high",
      category: "documentation",
    },
    {
      id: "4",
      title: "Financial Assessment",
      description: "Credit score and financial stability check",
      status: "pending",
      priority: "medium",
      category: "verification",
    },
    {
      id: "5",
      title: "Quality Certification",
      description: "ISO and quality standards verification",
      status: "pending",
      priority: "medium",
      category: "compliance",
    },
    {
      id: "6",
      title: "Risk Assessment",
      description: "Automated risk scoring and categorization",
      status: "pending",
      priority: "high",
      category: "compliance",
    },
    {
      id: "7",
      title: "Contract Setup",
      description: "Master service agreement and terms",
      status: "pending",
      priority: "low",
      category: "setup",
    },
    {
      id: "8",
      title: "Portal Access",
      description: "Supplier portal account activation",
      status: "pending",
      priority: "medium",
      category: "setup",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-secondary" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "documentation":
        return <FileText className="h-4 w-4" />
      case "compliance":
        return <Shield className="h-4 w-4" />
      case "verification":
        return <CheckCircle className="h-4 w-4" />
      case "setup":
        return <Users className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const completedItems = checklistItems.filter((item) => item.status === "completed").length
  const totalItems = checklistItems.length
  const progressPercentage = (completedItems / totalItems) * 100

  const groupedItems = checklistItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ChecklistItem[]>,
  )

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Onboarding Progress</CardTitle>
          <p className="text-muted-foreground">Track your supplier registration and verification status</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {completedItems} of {totalItems} steps completed
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center capitalize">
              {getCategoryIcon(category)}
              <span className="ml-2">{category.replace("_", " ")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 mt-0.5">{getStatusIcon(item.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground text-balance">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(item.status)}
                        <Badge
                          variant={
                            item.priority === "high"
                              ? "destructive"
                              : item.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {item.priority} priority
                        </Badge>
                      </div>
                    </div>
                    {item.status === "in-progress" && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          Continue
                        </Button>
                      </div>
                    )}
                    {item.status === "failed" && (
                      <div className="mt-3">
                        <Button variant="destructive" size="sm">
                          Retry
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Next Steps */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Complete the remaining verification steps to activate your supplier account:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                Upload missing compliance documents
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 text-secondary mr-2" />
                Wait for financial assessment completion (2-3 business days)
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                Review and sign master service agreement
              </li>
            </ul>
            <div className="pt-4">
              <Button>Upload Documents</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
