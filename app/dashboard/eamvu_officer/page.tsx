"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutDashboard, ClipboardList, FileSearch, CheckCircle, Eye, ThumbsUp, ThumbsDown, MapPin, Camera, FileText, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DocumentExplorer from "@/components/document-explorer";

export default function EAMVUOfficerDashboard() {
  const [assignedApplications, setAssignedApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [investigationNotes, setInvestigationNotes] = useState("")
  const [showDocuments, setShowDocuments] = useState(false)
  const [currentAgent, setCurrentAgent] = useState("")
  const [showAgentSelector, setShowAgentSelector] = useState(false)
  const { toast } = useToast()

  const [availableAgents, setAvailableAgents] = useState<any[]>([])

  // Fetch available agents from backend
  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents')
      if (response.ok) {
        const agentsData = await response.json()
        console.log('🔄 Agents Data:', agentsData);
        setAvailableAgents(agentsData)
      } else {
        // Fallback to mock data if API fails
        setAvailableAgents([
          { agent_id: "agent-001", name: "Ahmad Hassan", status: "active", assigned_applications: 3 },
          { agent_id: "agent-002", name: "Fatima Ali", status: "active", assigned_applications: 5 },
          { agent_id: "agent-003", name: "Muhammad Khan", status: "active", assigned_applications: 2 },
          { agent_id: "agent-004", name: "Aisha Sheikh", status: "active", assigned_applications: 4 }
        ])
      }
    } catch (error) {
      console.error('Error fetching agents:', error)
      // Fallback to mock data
      setAvailableAgents([
        { agent_id: "agent-001", name: "Ahmad Hassan", status: "active", assigned_applications: 3 },
        { agent_id: "agent-002", name: "Fatima Ali", status: "active", assigned_applications: 5 },
        { agent_id: "agent-003", name: "Muhammad Khan", status: "active", assigned_applications: 2 },
        { agent_id: "agent-004", name: "Aisha Sheikh", status: "active", assigned_applications: 4 }
      ])
    }
  }

  const officerMetrics = [
    { title: "Assigned Cases", count: assignedApplications.length, icon: ClipboardList },
    { title: "In Investigation", count: assignedApplications.filter(app => app.status === 'assigned_to_eavmu_officer').length, icon: FileSearch },
    { title: "Completed Today", count: assignedApplications.filter(app => app.status === 'returned_by_eavmu_officer').length, icon: CheckCircle },
  ];

  useEffect(() => {
    // Fetch agents and check if agent is already selected in localStorage
    fetchAgents()
    const storedAgent = localStorage.getItem('currentEAMVUAgent')
    if (storedAgent) {
      setCurrentAgent(storedAgent)
      fetchAssignedApplications(storedAgent)
    } else {
      setShowAgentSelector(true)
    }
  }, [])

  // Auto-select first agent if available and none selected
  useEffect(() => {
    if (availableAgents.length > 0 && !currentAgent && !showAgentSelector) {
      const firstActiveAgent = availableAgents.find(agent => agent.status === 'active')
      if (firstActiveAgent) {
        handleAgentSelection(firstActiveAgent.agent_id)
      }
    }
  }, [availableAgents, currentAgent, showAgentSelector])

  // Fetch applications when agent changes
  useEffect(() => {
    if (currentAgent) {
      fetchAssignedApplications(currentAgent)
    }
  }, [currentAgent])

  const fetchAssignedApplications = async (agentId?: string) => {
    console.log('🔄 Fetching applications for agent:', agentId)
    if (!agentId) {
      console.log('❌ No agent ID provided')
      return;
    }
    
    try {
      setLoading(true)
      // Fetch applications assigned to specific agent
      const response = await fetch(`/api/applications/agent/${agentId}`)
      console.log('🔄 Response:', response);
      const data = await response.json()
      
      if (response.ok) {
        setAssignedApplications(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch assigned applications",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error fetching assigned applications:', error)
      toast({
        title: "Error", 
        description: "Failed to connect to server",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAgentSelection = (agentId: string) => {
    console.log('🔄 Agent selected:', agentId)
    setCurrentAgent(agentId)
    localStorage.setItem('currentEAMVUAgent', agentId)
    setShowAgentSelector(false)
    
    const selectedAgentInfo = availableAgents.find(agent => agent.agent_id === agentId)
    toast({
      title: "Agent Selected",
      description: `Now showing applications for ${selectedAgentInfo?.name}`,
    })
  }

  const handleCompleteInvestigation = async (losId: string, applicationType: string) => {
    try {
      // Check if currentAgent is set
      if (!currentAgent) {
        toast({
          title: "Error",
          description: "Please select an agent first",
          variant: "destructive"
        })
        return
      }

      console.log('🔄 Completing investigation with data:', {
        losId,
        status: 'assigned_to_eavmu_officer',
        applicationType: getApplicationType(applicationType),
        department: 'EAMVU_OFFICER',
        action: 'complete',
        agentId: currentAgent
      })

      const response = await fetch('/api/applications/update-status-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          losId: losId,
          status: 'assigned_to_eavmu_officer', // Current status
          applicationType: getApplicationType(applicationType),
          department: 'EAMVU_OFFICER',
          action: 'complete',
          agentId: currentAgent
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Investigation completed and returned to EAMVU HEAD"
        })
        
        // Add investigation notes if provided
        if (investigationNotes.trim()) {
          await handleAddInvestigationNotes(losId, investigationNotes)
        }
        
        setSelectedApplication(null)
        setInvestigationNotes("")
        fetchAssignedApplications(currentAgent) // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to complete investigation",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error completing investigation:', error)
      toast({
        title: "Error",
        description: "Failed to complete investigation",
        variant: "destructive"
      })
    }
  }

  const handleRejectApplication = async (losId: string, applicationType: string) => {
    try {
      // Check if currentAgent is set
      if (!currentAgent) {
        toast({
          title: "Error",
          description: "Please select an agent first",
          variant: "destructive"
        })
        return
      }

      console.log('🔄 Rejecting application with data:', {
        losId,
        status: 'assigned_to_eavmu_officer',
        applicationType: getApplicationType(applicationType),
        department: 'EAMVU_OFFICER',
        action: 'reject',
        agentId: currentAgent
      })

      const response = await fetch('/api/applications/update-status-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          losId: losId,
          status: 'assigned_to_eavmu_officer', // Current status
          applicationType: getApplicationType(applicationType),
          department: 'EAMVU_OFFICER',
          action: 'reject',
          agentId: currentAgent
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Application rejected"
        })
        
        // Add rejection notes if provided
        if (investigationNotes.trim()) {
          await handleAddInvestigationNotes(losId, investigationNotes)
        }
        
        setSelectedApplication(null)
        setInvestigationNotes("")
        fetchAssignedApplications(currentAgent) // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to reject application",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error rejecting application:', error)
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive"
      })
    }
  }

  const handleAddInvestigationNotes = async (losId: string, notes: string) => {
    try {
      const response = await fetch('/api/applications/update-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          losId: parseInt(losId.replace('LOS-', '')),
          fieldName: 'eamvu_comments',
          commentText: notes
        })
      })
      
      if (!response.ok) {
        console.error('Failed to add investigation notes')
      }
    } catch (error) {
      console.error('Error adding investigation notes:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "assigned_to_eavmu_officer":
        return <Badge className="bg-blue-100 text-blue-800">Assigned for Investigation</Badge>
      case "returned_by_eavmu_officer":
        return <Badge className="bg-green-100 text-green-800">Investigation Completed</Badge>
      case "rejected_by_eavmu":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const extractLosId = (id: string) => {
    // Extract LOS ID from composite ID format (e.g., "AutoLoan-123" -> "123")
    const parts = id.split('-')
    return parts[parts.length - 1]
  }

  const getApplicationType = (applicationType: string) => {
    // Map frontend application types to backend expected types
    const typeMap: { [key: string]: string } = {
      'cashplus_applications': 'CashPlus',
      'autoloan_applications': 'AutoLoan',
      'smeasaan_applications': 'SMEASAAN',
      'commercial_vehicle_applications': 'CommercialVehicle',
      'ameendrive_applications': 'AmeenDrive',
      'platinum_card_applications': 'PlatinumCreditCard',
      'creditcard_applications': 'ClassicCreditCard'
    }
    return typeMap[applicationType] || applicationType
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">EAMVU Officer Dashboard</h1>
        <div className="flex items-center gap-4">
          {currentAgent && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm">
                Agent: {availableAgents.find(agent => agent.agent_id === currentAgent)?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAgentSelector(true)}
              >
                Switch Agent
              </Button>
            </div>
          )}
          <Button onClick={() => fetchAssignedApplications(currentAgent)} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {officerMetrics.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assigned Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Applications for Investigation</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading applications...</p>
          ) : assignedApplications.length === 0 ? (
            <p>No applications assigned for investigation.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>LOS ID</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-mono text-sm">{app.los_id}</TableCell>
                    <TableCell className="font-medium">{app.applicant_name}</TableCell>
                    <TableCell>{app.loan_type}</TableCell>
                    <TableCell>PKR {app.loan_amount?.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(app.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedApplication(app)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowDocuments(true)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Documents
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleCompleteInvestigation(extractLosId(app.los_id), app.application_type)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Application</DialogTitle>
                              <DialogDescription>
                                Please provide investigation notes and reason for rejecting this application.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="investigation-notes">Investigation Notes & Rejection Reason</Label>
                                <Textarea
                                  id="investigation-notes"
                                  value={investigationNotes}
                                  onChange={(e) => setInvestigationNotes(e.target.value)}
                                  placeholder="Enter your investigation findings and reason for rejection..."
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setInvestigationNotes("")}>
                                Cancel
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={() => handleRejectApplication(extractLosId(app.los_id), app.application_type)}
                                disabled={!investigationNotes.trim()}
                              >
                                Reject Application
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Application Investigation Dialog */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Application Investigation</DialogTitle>
              <DialogDescription>
                Investigate and review details for {selectedApplication.applicant_name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Application Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>LOS ID</Label>
                  <p className="font-mono text-sm">{selectedApplication.los_id}</p>
                </div>
                <div>
                  <Label>Applicant Name</Label>
                  <p>{selectedApplication.applicant_name}</p>
                </div>
                <div>
                  <Label>Loan Type</Label>
                  <p>{selectedApplication.loan_type}</p>
                </div>
                <div>
                  <Label>Loan Amount</Label>
                  <p>PKR {selectedApplication.loan_amount?.toLocaleString()}</p>
                </div>
                <div>
                  <Label>Priority</Label>
                  <p className="capitalize">{selectedApplication.priority}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p>{getStatusBadge(selectedApplication.status)}</p>
                </div>
                <div>
                  <Label>Branch</Label>
                  <p>{selectedApplication.branch}</p>
                </div>
                <div>
                  <Label>Assigned Date</Label>
                  <p>{new Date(selectedApplication.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Investigation Notes Section */}
              <div className="space-y-4">
                <Label>Investigation Notes</Label>
                <Textarea
                  value={investigationNotes}
                  onChange={(e) => setInvestigationNotes(e.target.value)}
                  placeholder="Enter your investigation findings, verification status, field visit notes, etc..."
                  rows={6}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowDocuments(true)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                  <Button variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Field Visit
                  </Button>
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photos
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    onClick={() => handleCompleteInvestigation(extractLosId(selectedApplication.los_id), selectedApplication.application_type)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Investigation
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleRejectApplication(extractLosId(selectedApplication.los_id), selectedApplication.application_type)}
                    disabled={!investigationNotes.trim()}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Reject Application
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Explorer Dialog */}
      {showDocuments && selectedApplication && (
        <Dialog open={showDocuments} onOpenChange={setShowDocuments}>
          <DialogContent className="max-w-6xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Documents - {selectedApplication.applicant_name}</DialogTitle>
            </DialogHeader>
            <DocumentExplorer losId={extractLosId(selectedApplication.los_id)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Agent Selection Dialog */}
      <Dialog open={showAgentSelector} onOpenChange={setShowAgentSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Agent</DialogTitle>
            <DialogDescription>
              Choose which EAMVU agent you are to view your assigned applications.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Available Agents</Label>
              <Select value={currentAgent} onValueChange={handleAgentSelection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your agent profile" />
                </SelectTrigger>
                <SelectContent>
                  {availableAgents
                    .filter(agent => agent.status === 'active')
                    .map((agent) => (
                      <SelectItem key={agent.agent_id} value={agent.agent_id}>
                        {agent.name} ({agent.assigned_applications} applications)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>⚠️ You must select an agent to view and manage assigned applications.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}