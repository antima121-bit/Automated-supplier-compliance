import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CheckCircle, User } from "lucide-react"
import { mockAlerts } from "@/lib/mock-data"

export function AlertsPanel() {
  const alerts = mockAlerts

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "High":
        return <AlertTriangle className="h-4 w-4 text-secondary" />
      case "Medium":
        return <Clock className="h-4 w-4 text-secondary" />
      case "Low":
        return <CheckCircle className="h-4 w-4 text-primary" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "default"
      default:
        return "default"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Open":
        return "destructive"
      case "In_Progress":
        return "secondary"
      case "Resolved":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-secondary" />
          Active Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-balance">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant={getSeverityBadgeVariant(alert.severity)}>{alert.severity}</Badge>
                <Badge variant={getStatusBadgeVariant(alert.status)}>{alert.status.replace("_", " ")}</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Type: {alert.type}</span>
                <span>Created: {new Date(alert.createdDate).toLocaleDateString()}</span>
                {alert.assignedTo && (
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{alert.assignedTo}</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {alert.status === "Open" && <Button size="sm">Assign</Button>}
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">No active alerts. All systems are running smoothly.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
