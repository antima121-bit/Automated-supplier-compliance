"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Filter, X, CalendarIcon, Download, Save, History, Star } from "lucide-react"
import { format } from "date-fns"

interface SearchFilter {
  field: string
  operator: string
  value: string
  label: string
}

interface SavedSearch {
  id: string
  name: string
  description: string
  filters: SearchFilter[]
  createdDate: string
  lastUsed: string
  isStarred: boolean
}

export function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([])
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [savedSearches] = useState<SavedSearch[]>([
    {
      id: "1",
      name: "High Risk Suppliers",
      description: "Suppliers with risk score > 7 and pending documents",
      filters: [
        { field: "riskScore", operator: "greater_than", value: "7", label: "Risk Score > 7" },
        { field: "documentStatus", operator: "equals", value: "pending", label: "Documents: Pending" },
      ],
      createdDate: "2024-12-10",
      lastUsed: "2024-12-14",
      isStarred: true,
    },
    {
      id: "2",
      name: "Expiring Certificates",
      description: "Documents expiring in next 30 days",
      filters: [
        { field: "expiryDate", operator: "within_days", value: "30", label: "Expires within 30 days" },
        { field: "documentType", operator: "equals", value: "certificate", label: "Type: Certificate" },
      ],
      createdDate: "2024-12-08",
      lastUsed: "2024-12-13",
      isStarred: false,
    },
  ])

  const searchFields = [
    { value: "supplierName", label: "Supplier Name" },
    { value: "gstin", label: "GSTIN" },
    { value: "email", label: "Email" },
    { value: "category", label: "Category" },
    { value: "status", label: "Status" },
    { value: "riskScore", label: "Risk Score" },
    { value: "complianceScore", label: "Compliance Score" },
    { value: "documentType", label: "Document Type" },
    { value: "documentStatus", label: "Document Status" },
    { value: "registrationDate", label: "Registration Date" },
    { value: "lastAuditDate", label: "Last Audit Date" },
  ]

  const operators = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "contains", label: "Contains" },
    { value: "starts_with", label: "Starts With" },
    { value: "ends_with", label: "Ends With" },
    { value: "greater_than", label: "Greater Than" },
    { value: "less_than", label: "Less Than" },
    { value: "between", label: "Between" },
    { value: "within_days", label: "Within Days" },
    { value: "is_empty", label: "Is Empty" },
    { value: "is_not_empty", label: "Is Not Empty" },
  ]

  const addFilter = (field: string, operator: string, value: string) => {
    const fieldLabel = searchFields.find((f) => f.value === field)?.label || field
    const operatorLabel = operators.find((o) => o.value === operator)?.label || operator
    const label = `${fieldLabel} ${operatorLabel} ${value}`

    const newFilter: SearchFilter = { field, operator, value, label }
    setActiveFilters([...activeFilters, newFilter])
  }

  const removeFilter = (index: number) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSearchQuery("")
    setDateRange({})
  }

  const saveSearch = () => {
    console.log("[v0] Saving search with filters:", activeFilters)
    // Implement save search functionality
  }

  const loadSavedSearch = (search: SavedSearch) => {
    setActiveFilters(search.filters)
    console.log("[v0] Loaded saved search:", search.name)
  }

  const executeSearch = () => {
    console.log("[v0] Executing search:", {
      query: searchQuery,
      filters: activeFilters,
      dateRange,
    })
    // Implement search execution
  }

  const exportResults = () => {
    console.log("[v0] Exporting search results")
    // Implement export functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-primary">Advanced Search</h2>
          <p className="text-muted-foreground text-lg mt-2">Powerful search and filtering across all data</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={saveSearch}>
            <Save className="h-4 w-4 mr-2" />
            Save Search
          </Button>
          <Button onClick={executeSearch} className="glow-primary">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Search & Filter</TabsTrigger>
          <TabsTrigger value="saved">Saved Searches</TabsTrigger>
          <TabsTrigger value="history">Search History</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {/* Main Search */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search suppliers, documents, or any text..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-lg h-12"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => addFilter("status", "equals", "active")}>
                    Active Suppliers
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addFilter("riskScore", "greater_than", "7")}>
                    High Risk
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addFilter("documentStatus", "equals", "expired")}>
                    Expired Documents
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addFilter("complianceScore", "less_than", "70")}>
                    Low Compliance
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Filters */}
          {showAdvanced && (
            <Card>
              <CardHeader>
                <CardTitle>Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {searchFields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input placeholder="Value" />

                  <Button onClick={() => addFilter("supplierName", "contains", "test")}>Add Filter</Button>
                </div>

                {/* Date Range */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Date Range:</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[240px] justify-start text-left font-normal bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Filters ({activeFilters.length})</CardTitle>
                  <Button variant="outline" size="sm" onClick={clearAllFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-2">
                      {filter.label}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeFilter(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search Results */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Search Results (247 found)</CardTitle>
                <Button variant="outline" onClick={exportResults}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample Results */}
                {[
                  {
                    type: "Supplier",
                    name: "TechCorp Solutions",
                    details: "GSTIN: 27AABCT1332L1ZZ • Risk Score: 8.2 • Status: Active",
                    relevance: 95,
                  },
                  {
                    type: "Document",
                    name: "GST Certificate - Global Manufacturing",
                    details: "Expires: 2025-03-15 • Status: Verified • Size: 2.4MB",
                    relevance: 87,
                  },
                  {
                    type: "Alert",
                    name: "High Risk Supplier Alert",
                    details: "InnovateTech • Created: 2024-12-14 • Severity: Critical",
                    relevance: 92,
                  },
                ].map((result, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{result.type}</Badge>
                          <span className="text-sm text-muted-foreground">{result.relevance}% match</span>
                        </div>
                        <h4 className="font-semibold text-foreground text-balance">{result.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{result.details}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedSearches.map((search) => (
              <Card key={search.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{search.name}</CardTitle>
                        {search.isStarred && <Star className="h-4 w-4 text-secondary fill-current" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{search.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Filters:</span>
                    <div className="flex flex-wrap gap-1">
                      {search.filters.map((filter, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {filter.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Created: {new Date(search.createdDate).toLocaleDateString()}</span>
                    <span>Last used: {new Date(search.lastUsed).toLocaleDateString()}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => loadSavedSearch(search)}>
                      Load Search
                    </Button>
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

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    query: "high risk suppliers",
                    filters: 2,
                    results: 15,
                    timestamp: "2024-12-14 10:30",
                    duration: "0.8s",
                  },
                  {
                    query: "expired documents",
                    filters: 1,
                    results: 8,
                    timestamp: "2024-12-14 09:15",
                    duration: "0.5s",
                  },
                  {
                    query: "TechCorp",
                    filters: 0,
                    results: 23,
                    timestamp: "2024-12-13 16:45",
                    duration: "0.3s",
                  },
                ].map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <History className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{search.query}</span>
                        {search.filters > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {search.filters} filters
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {search.results} results • {search.timestamp} • {search.duration}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Repeat Search
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
