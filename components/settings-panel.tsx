"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, Database, Users, Palette, Download, Upload, Save } from "lucide-react"

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    // Dashboard Settings
    refreshRate: 15,
    theme: "light",
    compactView: false,
    showTrends: true,

    // Alert Settings
    emailNotifications: true,
    pushNotifications: false,
    criticalAlertThreshold: 85,
    riskScoreThreshold: 7.5,

    // Compliance Settings
    autoValidation: true,
    gstinVerification: true,
    documentExpiry: 30,
    auditFrequency: "quarterly",

    // User Management
    sessionTimeout: 60,
    twoFactorAuth: false,
    passwordExpiry: 90,
  })

  const handleSettingChange = (key: string, value: any) => {
    console.log("[v0] Setting changed:", { key, value })
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    console.log("[v0] Saving settings:", settings)
    // This would typically save to backend/database
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
          <p className="text-muted-foreground">Configure your supplier compliance system</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Dashboard Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="refresh-rate">Auto Refresh Rate (minutes)</Label>
                  <div className="space-y-2">
                    <Slider
                      id="refresh-rate"
                      min={5}
                      max={60}
                      step={5}
                      value={[settings.refreshRate]}
                      onValueChange={(value) => handleSettingChange("refreshRate", value[0])}
                    />
                    <div className="text-sm text-muted-foreground">Current: {settings.refreshRate} minutes</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-view">Compact View</Label>
                    <p className="text-sm text-muted-foreground">Show more data in less space</p>
                  </div>
                  <Switch
                    id="compact-view"
                    checked={settings.compactView}
                    onCheckedChange={(checked) => handleSettingChange("compactView", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-trends">Show Trend Indicators</Label>
                    <p className="text-sm text-muted-foreground">Display trend arrows and percentages</p>
                  </div>
                  <Switch
                    id="show-trends"
                    checked={settings.showTrends}
                    onCheckedChange={(checked) => handleSettingChange("showTrends", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Alert Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="critical-threshold">Critical Alert Threshold (%)</Label>
                  <div className="space-y-2">
                    <Slider
                      id="critical-threshold"
                      min={50}
                      max={100}
                      step={5}
                      value={[settings.criticalAlertThreshold]}
                      onValueChange={(value) => handleSettingChange("criticalAlertThreshold", value[0])}
                    />
                    <div className="text-sm text-muted-foreground">
                      Trigger critical alerts when compliance score drops below {settings.criticalAlertThreshold}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="risk-threshold">Risk Score Threshold</Label>
                  <div className="space-y-2">
                    <Slider
                      id="risk-threshold"
                      min={1}
                      max={10}
                      step={0.5}
                      value={[settings.riskScoreThreshold]}
                      onValueChange={(value) => handleSettingChange("riskScoreThreshold", value[0])}
                    />
                    <div className="text-sm text-muted-foreground">
                      Alert when risk score exceeds {settings.riskScoreThreshold}/10
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Compliance Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-validation">Automatic Validation</Label>
                    <p className="text-sm text-muted-foreground">Auto-validate supplier documents</p>
                  </div>
                  <Switch
                    id="auto-validation"
                    checked={settings.autoValidation}
                    onCheckedChange={(checked) => handleSettingChange("autoValidation", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="gstin-verification">GSTIN Verification</Label>
                    <p className="text-sm text-muted-foreground">Verify GSTIN with government database</p>
                  </div>
                  <Switch
                    id="gstin-verification"
                    checked={settings.gstinVerification}
                    onCheckedChange={(checked) => handleSettingChange("gstinVerification", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="document-expiry">Document Expiry Warning (days)</Label>
                  <Input
                    id="document-expiry"
                    type="number"
                    value={settings.documentExpiry}
                    onChange={(e) => handleSettingChange("documentExpiry", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audit-frequency">Audit Frequency</Label>
                  <Select
                    value={settings.auditFrequency}
                    onValueChange={(value) => handleSettingChange("auditFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="biannual">Bi-Annual</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => handleSettingChange("passwordExpiry", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Export Data</CardTitle>
                    <p className="text-sm text-muted-foreground">Download system data</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Suppliers
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Compliance Data
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Import Data</CardTitle>
                    <p className="text-sm text-muted-foreground">Upload bulk data</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Suppliers
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Documents
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Import KPI Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <Badge variant="outline">v1.0.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Database:</span>
                  <Badge variant="outline" className="text-primary">
                    Connected
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Backup:</span>
                  <span className="text-sm">2024-12-14 10:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime:</span>
                  <span className="text-sm">15 days, 4 hours</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-transparent">
                  Clear Cache
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Backup Database
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Generate Report
                </Button>
                <Button variant="destructive" className="w-full">
                  Reset System
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
