"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, AlertTriangle, CheckCircle } from "lucide-react"
import { mockSuppliers } from "@/lib/mock-data"
import type { Supplier } from "@/lib/types"

export function SupplierList() {
  const [suppliers] = useState<Supplier[]>(mockSuppliers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [riskFilter, setRiskFilter] = useState<string>("all")

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.gstin.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter
    const matchesRisk = riskFilter === "all" || supplier.riskLevel === riskFilter

    return matchesSearch && matchesStatus && matchesRisk
  })

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low":
        return "default"
      case "Medium":
        return "secondary"
      case "High":
        return "destructive"
      case "Critical":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Inactive":
        return "secondary"
      case "Suspended":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Supplier Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers by name or GSTIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
                <SelectItem value="Critical">Critical Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-balance">{supplier.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">GSTIN: {supplier.gstin}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant={getStatusBadgeVariant(supplier.status)}>{supplier.status}</Badge>
                  <Badge variant={getRiskBadgeVariant(supplier.riskLevel)}>{supplier.riskLevel} Risk</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">{supplier.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Compliance Score</p>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{supplier.complianceScore}%</span>
                    {supplier.complianceScore >= 80 ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-secondary" />
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Last Audit</p>
                  <p className="font-medium">{new Date(supplier.lastAuditDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{supplier.address}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  Registered: {new Date(supplier.registrationDate).toLocaleDateString()}
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No suppliers found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
