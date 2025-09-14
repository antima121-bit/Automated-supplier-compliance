"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Settings,
  Send,
  Eye,
  Trash2,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  category: "compliance" | "workflow" | "system" | "security" | "document"
  priority: "low" | "medium" | "high" | "critical"
  recipient: string
  recipientType: "user" | "role" | "all"
  status: "sent" | "pending" | "failed" | "read" | "unread"
  createdAt: string
  sentAt?: string
  readAt?: string
  channels: ("email" | "push" | "sms" | "in_app")[]
  metadata?: Record<string, any>
}

interface NotificationTemplate {
  id: string
  name: string
  subject: string
  content: string
  category: string
  channels: string[]
  variables: string[]
}

export function NotificationCenter() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Document Expiry Alert",
      message: "GST Certificate for TechCorp Solutions expires in 15 days",
      type: "warning",
      category: "document",
      priority: "high",
      recipient: "sarah.wilson@company.com",
      recipientType: "user",
      status: "sent",
      createdAt: "2024-12-14T10:30:00Z",
      sentAt: "2024-12-14T10:31:00Z",
      channels: ["email", "in_app"],
      metadata: { supplierId: "SUP001", documentId: "DOC001", expiryDate: "2024-12-29" },
    },
    {
      id: "2",
      title: "High Risk Supplier Alert",
      message: "Global Manufacturing risk score increased to 8.5 - immediate review required",
      type: "error",
      category: "compliance",
      priority: "critical",
      recipient: "compliance_team",
      recipientType: "role",
      status: "sent",
      createdAt: "2024-12-14T09:15:00Z",
      sentAt: "2024-12-14T09:16:00Z",
      readAt: "2024-12-14T09:45:00Z",
      channels: ["email", "push", "sms"],
      metadata: { supplierId: "SUP002", oldRiskScore: 6.2, newRiskScore: 8.5 },
    },
    {
      id: "3",
      title: "Workflow Completion",
      message: "Supplier onboarding workflow completed for InnovateTech",
      type: "success",
      category: "workflow",
      priority: "medium",
      recipient: "john.doe@company.com",
      recipientType: "user",
      status: "pending",
      createdAt: "2024-12-14T08:45:00Z",
      channels: ["email", "in_app"],
    },
    {
      id: "4",
      title: "System Maintenance",
      message: "Scheduled maintenance window: Dec 15, 2024 2:00 AM - 4:00 AM UTC",
      type: "info",
      category: "system",
      priority: "low",
      recipient: "all",
      recipientType: "all",
      status: "sent",
      createdAt: "2024-12-13T16:00:00Z",
      sentAt: "2024-12-13T16:01:00Z",
      channels: ["email", "in_app"],
    },
  ])

  const [templates] = useState<NotificationTemplate[]>([
    {
      id: "1",
      name: "Document Expiry Warning",
      subject: "Document Expiry Alert - {{supplierName}}",
      content:
        "The {{documentType}} for {{supplierName}} will expire on {{expiryDate}}. Please ensure renewal to maintain compliance.",
      category: "document",
      channels: ["email", "in_app"],
      variables: ["supplierName", "documentType", "expiryDate"],
    },
    {
      id: "2",
      name: "Risk Score Alert",
      subject: "High Risk Supplier Alert - {{supplierName}}",
      content: "{{supplierName}} risk score has increased to {{riskScore}}. Immediate review and action required.",
      category: "compliance",
      channels: ["email", "push", "sms"],
      variables: ["supplierName", "riskScore", "previousScore"],
    },
    {
      id: "3",
      name: "Workflow Completion",
      subject: "Workflow Completed - {{workflowName}}",
      content: "The {{workflowName}} workflow has been completed successfully for {{supplierName}}.",
      category: "workflow",
      channels: ["email", "in_app"],
      variables: ["workflowName", "supplierName", "completionDate"],
    },
  ])

  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-secondary" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "info":
        return <Bell className="h-4 w-4 text-muted-foreground" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge variant="default">Success</Badge>
      case "warning":
        return <Badge variant="secondary">Warning</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "info":
        return <Badge variant="outline">Info</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
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

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-3 w-3" />
      case "push":
        return <Bell className="h-3 w-3" />
      case "sms":
        return <MessageSquare className="h-3 w-3" />
      case "in_app":
        return <Smartphone className="h-3 w-3" />
      default:
        return <Bell className="h-3 w-3" />
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus
    const matchesPriority = filterPriority === "all" || notification.priority === filterPriority
    return matchesType && matchesStatus && matchesPriority
  })

  const notificationStats = {
    total: notifications.length,
    sent: notifications.filter((n) => n.status === "sent").length,
    pending: notifications.filter((n) => n.status === "pending").length,
    failed: notifications.filter((n) => n.status === "failed").length,
    critical: notifications.filter((n) => n.priority === "critical").length,
  }

  const handleBulkAction = (action: string) => {
    console.log(`[v0] Bulk notification action: ${action} on notifications:`, selectedNotifications)
    // Implement bulk actions
  }

  const handleNotificationAction = (notificationId: string, action: string) => {
    console.log(`[v0] Notification action: ${action} on notification:`, notificationId)
    // Implement individual notification actions
  }

  const sendNotification = (templateId: string, recipients: string[], variables: Record<string, string>) => {
    console.log("[v0] Sending notification:", { templateId, recipients, variables })
    // Implement send notification
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-primary">Notification Center</h2>
          <p className="text-muted-foreground text-lg mt-2">Manage alerts, notifications, and communication</p>
        </div>
        <Button className="glow-primary">
          <Send className="h-4 w-4 mr-2" />
          Send Notification
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{notificationStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Notifications</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{notificationStats.sent}</div>
            <p className="text-sm text-muted-foreground">Sent</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-secondary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{notificationStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-destructive/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{notificationStats.failed}</div>
            <p className="text-sm text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-destructive/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{notificationStats.critical}</div>
            <p className="text-sm text-muted-foreground">Critical</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {selectedNotifications.length} notification(s) selected
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("resend")}>
                      <Send className="h-4 w-4 mr-2" />
                      Resend
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("mark_read")}>
                      <Eye className="h-4 w-4 mr-2" />
                      Mark Read
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleBulkAction("delete")}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedNotifications([...selectedNotifications, notification.id])
                            } else {
                              setSelectedNotifications(selectedNotifications.filter((id) => id !== notification.id))
                            }
                          }}
                          className="mt-1"
                        />
                        <div className="p-2 bg-muted rounded-lg">{getTypeIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-foreground text-balance">{notification.title}</h4>
                            {getTypeBadge(notification.type)}
                            {getPriorityBadge(notification.priority)}
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {notification.recipient} ({notification.recipientType})
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(notification.createdAt).toLocaleString()}
                            </div>
                            <div className="flex items-center space-x-1">
                              {notification.channels.map((channel, index) => (
                                <div key={index} className="flex items-center">
                                  {getChannelIcon(channel)}
                                </div>
                              ))}
                            </div>
                          </div>
                          {notification.metadata && (
                            <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                              <strong>Metadata:</strong> {JSON.stringify(notification.metadata, null, 2)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            notification.status === "sent"
                              ? "default"
                              : notification.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {notification.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNotificationAction(notification.id, "view")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNotificationAction(notification.id, "resend")}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNotificationAction(notification.id, "delete")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
                      <p className="text-sm text-muted-foreground mt-1">{template.subject}</p>
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">{template.content.substring(0, 100)}...</div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Channels:</span>
                    <div className="flex space-x-1">
                      {template.channels.map((channel, index) => (
                        <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                          {getChannelIcon(channel)}
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Variables:</span>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm">Use Template</Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose Notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Template</label>
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
                  <label className="text-sm font-medium">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Recipients</label>
                <Input placeholder="Enter email addresses or select user groups" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Notification subject" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Enter your notification message..." rows={6} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Channels</label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="email" />
                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="push" />
                    <label htmlFor="push" className="text-sm">
                      Push
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms" />
                    <label htmlFor="sms" className="text-sm">
                      SMS
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="in_app" />
                    <label htmlFor="in_app" className="text-sm">
                      In-App
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline">Schedule</Button>
                <Button variant="ghost">Save Draft</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Email Notifications</label>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Push Notifications</label>
                    <p className="text-xs text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">SMS Notifications</label>
                    <p className="text-xs text-muted-foreground">Text message alerts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Digest Mode</label>
                    <p className="text-xs text-muted-foreground">Group notifications into daily digest</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SMTP Server</label>
                  <Input placeholder="smtp.company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">SMS Provider</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select SMS provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="aws_sns">AWS SNS</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Push Service</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select push service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="firebase">Firebase</SelectItem>
                      <SelectItem value="onesignal">OneSignal</SelectItem>
                      <SelectItem value="pusher">Pusher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
