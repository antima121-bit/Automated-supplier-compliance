"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, AlertCircle, FileText, Building2 } from "lucide-react"

interface RegistrationStep {
  id: string
  title: string
  description: string
  completed: boolean
}

export function SupplierRegistration() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    companyName: "",
    gstin: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    contactPerson: "",
    businessType: "",
    description: "",
  })

  const steps: RegistrationStep[] = [
    {
      id: "basic",
      title: "Basic Information",
      description: "Company details and contact information",
      completed: false,
    },
    {
      id: "documents",
      title: "Document Upload",
      description: "Upload required compliance documents",
      completed: false,
    },
    {
      id: "verification",
      title: "Verification",
      description: "Automated validation and approval",
      completed: false,
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderBasicInformation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            placeholder="Enter company name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gstin">GSTIN *</Label>
          <Input
            id="gstin"
            value={formData.gstin}
            onChange={(e) => handleInputChange("gstin", e.target.value)}
            placeholder="27AABCT1332L1ZZ"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="contact@company.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+91-9876543210"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Business Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Enter complete business address"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Supplier Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="Important">Important</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type *</Label>
          <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Trading">Trading</SelectItem>
              <SelectItem value="Service">Service Provider</SelectItem>
              <SelectItem value="Distributor">Distributor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPerson">Primary Contact Person *</Label>
        <Input
          id="contactPerson"
          value={formData.contactPerson}
          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
          placeholder="Enter contact person name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Business Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Brief description of your business and services"
          rows={4}
        />
      </div>
    </div>
  )

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground">Upload Required Documents</h3>
        <p className="text-muted-foreground">Please upload the following documents for verification</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "GST Certificate", required: true, status: "pending" },
          { name: "PAN Card", required: true, status: "pending" },
          { name: "Bank Details", required: true, status: "pending" },
          { name: "Quality Certificate", required: false, status: "pending" },
          { name: "ISO Certificate", required: false, status: "pending" },
          { name: "Financial Statements", required: true, status: "pending" },
        ].map((doc, index) => (
          <Card key={index} className="border-dashed border-2 hover:border-primary transition-colors">
            <CardContent className="p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <h4 className="font-medium text-foreground mb-2">{doc.name}</h4>
              <Badge variant={doc.required ? "destructive" : "secondary"}>
                {doc.required ? "Required" : "Optional"}
              </Badge>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Document Requirements:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• All documents must be in PDF format</li>
          <li>• Maximum file size: 5MB per document</li>
          <li>• Documents should be clear and legible</li>
          <li>• Ensure all documents are current and valid</li>
        </ul>
      </div>
    </div>
  )

  const renderVerification = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground">Verification in Progress</h3>
        <p className="text-muted-foreground">We are validating your information and documents</p>
      </div>

      <div className="space-y-4">
        {[
          { step: "GSTIN Validation", status: "completed", description: "Verified with government database" },
          { step: "Document Verification", status: "in-progress", description: "Checking document authenticity" },
          { step: "Risk Assessment", status: "pending", description: "Calculating risk score" },
          { step: "Compliance Check", status: "pending", description: "Validating compliance requirements" },
        ].map((item, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="flex-shrink-0">
              {item.status === "completed" && <CheckCircle className="h-5 w-5 text-primary" />}
              {item.status === "in-progress" && (
                <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
              {item.status === "pending" && <AlertCircle className="h-5 w-5 text-muted-foreground" />}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{item.step}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <Badge
              variant={
                item.status === "completed" ? "default" : item.status === "in-progress" ? "secondary" : "outline"
              }
            >
              {item.status.replace("-", " ")}
            </Badge>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">What happens next?</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• You will receive an email confirmation once verification is complete</li>
          <li>• Our team may contact you for additional information if needed</li>
          <li>• Typical verification time is 2-3 business days</li>
          <li>• You can track the status in your supplier portal</li>
        </ul>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInformation()
      case 1:
        return renderDocumentUpload()
      case 2:
        return renderVerification()
      default:
        return renderBasicInformation()
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center">
            <Building2 className="h-6 w-6 mr-3 text-primary" />
            Supplier Registration & Onboarding
          </CardTitle>
          <p className="text-muted-foreground">Complete the registration process to become an approved supplier</p>
        </CardHeader>
      </Card>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    index <= currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-0.5 mx-4 ${index < currentStep ? "bg-primary" : "bg-muted-foreground/30"}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-4" />
          <div className="text-center">
            <h3 className="font-semibold text-foreground">{steps[currentStep].title}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            <div className="flex space-x-2">
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>Next Step</Button>
              ) : (
                <Button>Submit Registration</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
