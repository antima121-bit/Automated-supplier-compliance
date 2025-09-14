"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Calendar,
  User,
} from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  supplierId: string
  supplierName: string
  status: "verified" | "pending" | "rejected" | "expired"
  uploadDate: string
  expiryDate?: string
  size: string
  uploadedBy: string
  version: number
  tags: string[]
}

export function DocumentManagement() {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "GST Certificate - TechCorp Solutions",
      type: "GST Certificate",
      supplierId: "SUP001",
      supplierName: "TechCorp Solutions",
      status: "verified",
      uploadDate: "2024-12-10",
      expiryDate: "2025-12-10",
      size: "2.4 MB",
      uploadedBy: "John Doe",
      version: 2,
      tags: ["tax", "compliance", "government"],
    },
    {
      id: "2",
      name: "PAN Card - Global Manufacturing",
      type: "PAN Card",
      supplierId: "SUP002",
      supplierName: "Global Manufacturing",
      status: "pending",
      uploadDate: "2024-12-12",
      size: "1.8 MB",
      uploadedBy: "Sarah Wilson",
      version: 1,
      tags: ["identity", "tax"],
    },
    {
      id: "3",
      name: "Quality Certificate - InnovateTech",
      type: "Quality Certificate",
      supplierId: "SUP003",
      supplierName: "InnovateTech",
      status: "expired",
      uploadDate: "2024-06-15",
      expiryDate: "2024-12-15",
      size: "3.2 MB",
      uploadedBy: "Mike Johnson",
      version: 1,
      tags: ["quality", "iso", "certification"],
    },
    {
      id: "4",
      name: "Bank Details - Reliable Services",
      type: "Bank Details",
      supplierId: "SUP004",
      supplierName: "Reliable Services",
      status: "rejected",
      uploadDate: "2024-12-08",
      size: "1.2 MB",
      uploadedBy: "Emma Davis",
      version: 1,
      tags: ["banking", "financial"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "pending":
        return <Clock className="h-4 w-4 text-secondary" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="default">Verified</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const documentStats = {
    total: documents.length,
    verified: documents.filter((d) => d.status === "verified").length,
    pending: documents.filter((d) => d.status === "pending").length,
    expired: documents.filter((d) => d.status === "expired").length,
    rejected: documents.filter((d) => d.status === "rejected").length,
  }

  const handleBulkAction = (action: string) => {
    console.log(`[v0] Bulk action: ${action} on documents:`, selectedDocuments)
    // Implement bulk actions
  }

  const handleDocumentAction = (documentId: string, action: string) => {
    console.log(`[v0] Document action: ${action} on document:`, documentId)
    // Implement individual document actions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-primary">Document Management</h2>
          <p className="text-muted-foreground text-lg mt-2">Centralized document storage and verification</p>
        </div>
        <Button className="glow-primary">
          <Upload className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{documentStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{documentStats.verified}</div>
            <p className="text-sm text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-secondary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{documentStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-destructive/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{documentStats.expired}</div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-destructive/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{documentStats.rejected}</div>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">All Documents</TabsTrigger>
          <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents, suppliers, or types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="GST Certificate">GST Certificate</SelectItem>
                    <SelectItem value="PAN Card">PAN Card</SelectItem>
                    <SelectItem value="Bank Details">Bank Details</SelectItem>
                    <SelectItem value="Quality Certificate">Quality Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedDocuments.length > 0 && (
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{selectedDocuments.length} document(s) selected</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("download")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction("verify")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify
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

          {/* Documents List */}
          <Card>
            <CardHeader>
              <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedDocuments.includes(doc.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDocuments([...selectedDocuments, doc.id])
                            } else {
                              setSelectedDocuments(selectedDocuments.filter((id) => id !== doc.id))
                            }
                          }}
                          className="mt-1"
                        />
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-balance">{doc.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{doc.supplierName}</span>
                            <span>•</span>
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>v{doc.version}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                            </div>
                            {doc.expiryDate && (
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                              </div>
                            )}
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {doc.uploadedBy}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {doc.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(doc.status)}
                          {getStatusBadge(doc.status)}
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleDocumentAction(doc.id, "view")}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDocumentAction(doc.id, "download")}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDocumentAction(doc.id, "delete")}>
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

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Document Upload</CardTitle>
              <p className="text-muted-foreground">Upload multiple documents at once with automatic categorization</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Drop files here or click to browse</h3>
                <p className="text-muted-foreground mb-4">Supports PDF, JPG, PNG files up to 10MB each</p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Select Files
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Supplier</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUP001">TechCorp Solutions</SelectItem>
                      <SelectItem value="SUP002">Global Manufacturing</SelectItem>
                      <SelectItem value="SUP003">InnovateTech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-categorize</label>
                  <Select defaultValue="enabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "GST Certificate Template",
                description: "Standard GST registration certificate format",
                downloads: 45,
              },
              { name: "PAN Card Template", description: "PAN card verification template", downloads: 32 },
              { name: "Bank Details Form", description: "Banking information collection form", downloads: 28 },
              { name: "Quality Certificate", description: "ISO quality certification template", downloads: 19 },
              { name: "Financial Statement", description: "Annual financial statement format", downloads: 15 },
              {
                name: "Compliance Checklist",
                description: "Document compliance verification checklist",
                downloads: 38,
              },
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{template.downloads} downloads</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
