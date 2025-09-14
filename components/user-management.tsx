"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  User,
  UserPlus,
  Shield,
  Settings,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Lock,
  Key,
  UserCheck,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  department: string
  status: "active" | "inactive" | "pending" | "suspended"
  lastLogin?: string
  createdAt: string
  permissions: string[]
  avatar?: string
  twoFactorEnabled: boolean
  sessionCount: number
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isSystem: boolean
}

interface Permission {
  id: string
  name: string
  description: string
  category: string
  isSystem: boolean
}

export function UserManagement() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      phone: "+1-555-0123",
      role: "Compliance Manager",
      department: "Compliance",
      status: "active",
      lastLogin: "2024-12-14T10:30:00Z",
      createdAt: "2024-01-15T09:00:00Z",
      permissions: ["view_suppliers", "edit_suppliers", "approve_documents", "generate_reports"],
      twoFactorEnabled: true,
      sessionCount: 2,
    },
    {
      id: "2",
      name: "John Doe",
      email: "john.doe@company.com",
      phone: "+1-555-0124",
      role: "System Admin",
      department: "IT",
      status: "active",
      lastLogin: "2024-12-14T09:45:00Z",
      createdAt: "2024-01-10T08:30:00Z",
      permissions: ["*"],
      twoFactorEnabled: true,
      sessionCount: 1,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "Auditor",
      department: "Audit",
      status: "active",
      lastLogin: "2024-12-13T16:20:00Z",
      createdAt: "2024-02-01T10:00:00Z",
      permissions: ["view_suppliers", "view_documents", "view_audit_trail", "generate_reports"],
      twoFactorEnabled: false,
      sessionCount: 0,
    },
    {
      id: "4",
      name: "Emma Davis",
      email: "emma.davis@company.com",
      role: "Supplier Coordinator",
      department: "Procurement",
      status: "pending",
      createdAt: "2024-12-10T14:00:00Z",
      permissions: ["view_suppliers", "edit_supplier_basic"],
      twoFactorEnabled: false,
      sessionCount: 0,
    },
  ])

  const [roles] = useState<Role[]>([
    {
      id: "1",
      name: "System Admin",
      description: "Full system access with all permissions",
      permissions: ["*"],
      userCount: 1,
      isSystem: true,
    },
    {
      id: "2",
      name: "Compliance Manager",
      description: "Manage compliance processes and approve documents",
      permissions: ["view_suppliers", "edit_suppliers", "approve_documents", "generate_reports", "manage_workflows"],
      userCount: 1,
      isSystem: false,
    },
    {
      id: "3",
      name: "Auditor",
      description: "View-only access for audit and reporting purposes",
      permissions: ["view_suppliers", "view_documents", "view_audit_trail", "generate_reports"],
      userCount: 1,
      isSystem: false,
    },
    {
      id: "4",
      name: "Supplier Coordinator",
      description: "Basic supplier management and data entry",
      permissions: ["view_suppliers", "edit_supplier_basic", "upload_documents"],
      userCount: 1,
      isSystem: false,
    },
  ])

  const [permissions] = useState<Permission[]>([
    {
      id: "1",
      name: "view_suppliers",
      description: "View supplier information",
      category: "Suppliers",
      isSystem: true,
    },
    { id: "2", name: "edit_suppliers", description: "Edit supplier details", category: "Suppliers", isSystem: true },
    { id: "3", name: "delete_suppliers", description: "Delete suppliers", category: "Suppliers", isSystem: true },
    {
      id: "4",
      name: "approve_documents",
      description: "Approve supplier documents",
      category: "Documents",
      isSystem: true,
    },
    { id: "5", name: "upload_documents", description: "Upload documents", category: "Documents", isSystem: true },
    { id: "6", name: "view_audit_trail", description: "View audit logs", category: "Audit", isSystem: true },
    {
      id: "7",
      name: "generate_reports",
      description: "Generate and download reports",
      category: "Reports",
      isSystem: true,
    },
    {
      id: "8",
      name: "manage_workflows",
      description: "Create and manage workflows",
      category: "Workflows",
      isSystem: true,
    },
    { id: "9", name: "manage_users", description: "Manage user accounts", category: "Administration", isSystem: true },
    {
      id: "10",
      name: "system_settings",
      description: "Modify system settings",
      category: "Administration",
      isSystem: true,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "inactive":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-secondary" />
      case "suspended":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    pending: users.filter((u) => u.status === "pending").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    twoFactorEnabled: users.filter((u) => u.twoFactorEnabled).length,
  }

  const handleBulkAction = (action: string) => {
    console.log(`[v0] Bulk user action: ${action} on users:`, selectedUsers)
    // Implement bulk actions
  }

  const handleUserAction = (userId: string, action: string) => {
    console.log(`[v0] User action: ${action} on user:`, userId)
    // Implement individual user actions
  }

  const createUser = (userData: any) => {
    console.log("[v0] Creating user:", userData)
    // Implement user creation
  }

  const updateRole = (roleId: string, roleData: any) => {
    console.log("[v0] Updating role:", { roleId, roleData })
    // Implement role update
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-primary">User Management</h2>
          <p className="text-muted-foreground text-lg mt-2">Manage users, roles, and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="glow-primary">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Input placeholder="Enter department" />
              </div>
              <Button className="w-full" onClick={() => createUser({})}>
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{userStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{userStats.active}</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-secondary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{userStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-destructive/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{userStats.suspended}</div>
            <p className="text-sm text-muted-foreground">Suspended</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-accent/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{userStats.twoFactorEnabled}</div>
            <p className="text-sm text-muted-foreground">2FA Enabled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{selectedUsers.length} user(s) selected</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("activate")}>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("suspend")}>
                      <Lock className="h-4 w-4 mr-2" />
                      Suspend
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

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user.id])
                            } else {
                              setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                            }
                          }}
                          className="mt-1"
                        />
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-foreground">{user.name}</h4>
                            {getStatusIcon(user.status)}
                            {getStatusBadge(user.status)}
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                            {user.twoFactorEnabled && (
                              <Badge variant="default" className="text-xs">
                                2FA
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {user.email}
                            </div>
                            {user.phone && (
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {user.phone}
                              </div>
                            )}
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {user.department}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Joined: {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                            {user.lastLogin && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Last login: {new Date(user.lastLogin).toLocaleDateString()}
                              </div>
                            )}
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              Sessions: {user.sessionCount}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">Permissions: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {user.permissions.slice(0, 3).map((permission, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                              {user.permissions.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{user.permissions.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, "view")}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, "edit")}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, "settings")}>
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, "delete")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        {role.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {role.isSystem && (
                        <Badge variant="outline" className="text-xs">
                          System
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {role.userCount} users
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Permissions:</span>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.includes("*") ? (
                        <Badge variant="default" className="text-xs">
                          All Permissions
                        </Badge>
                      ) : (
                        role.permissions.slice(0, 4).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission.replace("_", " ")}
                          </Badge>
                        ))
                      )}
                      {role.permissions.length > 4 && !role.permissions.includes("*") && (
                        <Badge variant="secondary" className="text-xs">
                          +{role.permissions.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" disabled={role.isSystem}>
                      Edit Role
                    </Button>
                    <Button variant="outline" size="sm">
                      View Users
                    </Button>
                    <Button variant="ghost" size="sm" disabled={role.isSystem}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(
                  permissions.reduce(
                    (acc, permission) => {
                      if (!acc[permission.category]) {
                        acc[permission.category] = []
                      }
                      acc[permission.category].push(permission)
                      return acc
                    },
                    {} as Record<string, Permission[]>,
                  ),
                ).map(([category, categoryPermissions]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-foreground">{permission.name.replace("_", " ")}</h5>
                              <p className="text-sm text-muted-foreground">{permission.description}</p>
                            </div>
                            {permission.isSystem && (
                              <Badge variant="outline" className="text-xs">
                                System
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Require Two-Factor Authentication</label>
                    <p className="text-xs text-muted-foreground">Force 2FA for all users</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Password Complexity</label>
                    <p className="text-xs text-muted-foreground">Enforce strong passwords</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Session Timeout</label>
                    <p className="text-xs text-muted-foreground">Auto-logout inactive users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Login Attempt Limit</label>
                    <p className="text-xs text-muted-foreground">Lock accounts after failed attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Role for New Users</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select default role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles
                        .filter((role) => !role.isSystem)
                        .map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Duration (hours)</label>
                  <Input type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Failed Login Attempts</label>
                  <Input type="number" defaultValue="5" />
                </div>
                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
