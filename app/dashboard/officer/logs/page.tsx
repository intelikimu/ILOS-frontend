'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  History, 
  FileText, 
  CheckCircle, 
  Flag, 
  MessageCircle, 
  Edit, 
  Eye, 
  Clock, 
  Calendar,
  User,
  Search
} from "lucide-react";

interface ActivityLog {
  id: string;
  action: 'reviewed' | 'commented' | 'flagged' | 'verified' | 'approved' | 'rejected';
  applicationId: string;
  applicant: string;
  description: string;
  timestamp: string;
  details?: string;
}

export default function ReviewLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const [logs, setLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      action: "reviewed",
      applicationId: "APP001",
      applicant: "John Doe",
      description: "Started review of Auto Loan application",
      timestamp: "2024-01-15T09:00:00Z",
      details: "Began document verification process"
    },
    {
      id: "2",
      action: "verified",
      applicationId: "APP001",
      applicant: "John Doe",
      description: "Verified CNIC document",
      timestamp: "2024-01-15T09:15:00Z",
      details: "All details match application form"
    },
    {
      id: "3",
      action: "commented",
      applicationId: "APP001",
      applicant: "John Doe",
      description: "Added comment to application",
      timestamp: "2024-01-15T09:30:00Z",
      details: "Document verification complete"
    },
    {
      id: "4",
      action: "flagged",
      applicationId: "APP002",
      applicant: "Jane Smith",
      description: "Flagged salary certificate",
      timestamp: "2024-01-15T10:00:00Z",
      details: "Certificate date is older than 3 months"
    },
    {
      id: "5",
      action: "approved",
      applicationId: "APP001",
      applicant: "John Doe",
      description: "Approved Auto Loan application",
      timestamp: "2024-01-15T11:00:00Z",
      details: "All documents verified successfully"
    },
    {
      id: "6",
      action: "rejected",
      applicationId: "APP003",
      applicant: "Mike Johnson",
      description: "Rejected Cash Plus application",
      timestamp: "2024-01-15T14:30:00Z",
      details: "Missing required bank statements"
    }
  ]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today': return daysDiff === 0;
        case 'week': return daysDiff <= 7;
        case 'month': return daysDiff <= 30;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesAction && matchesDate;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'commented': return 'bg-purple-100 text-purple-800';
      case 'reviewed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <FileText className="h-4 w-4 text-red-600" />;
      case 'flagged': return <Flag className="h-4 w-4 text-yellow-600" />;
      case 'verified': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'commented': return <MessageCircle className="h-4 w-4 text-purple-600" />;
      case 'reviewed': return <Eye className="h-4 w-4 text-gray-600" />;
      default: return <History className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Statistics
  const totalActivities = logs.length;
  const todayActivities = logs.filter(log => {
    const logDate = new Date(log.timestamp);
    const today = new Date();
    return logDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Review Logs</h2>
          <p className="text-muted-foreground">
            Track all your review activities and actions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {totalActivities} Total Activities
          </Badge>
          <Badge variant="outline" className="text-sm">
            {todayActivities} Today
          </Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActivities}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Activities</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayActivities}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {logs.filter(log => log.action === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">Applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flags Raised</CardTitle>
            <Flag className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {logs.filter(log => log.action === 'flagged').length}
            </div>
            <p className="text-xs text-muted-foreground">Issues found</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="commented">Commented</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log, index) => (
              <div key={log.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {getActionIcon(log.action)}
                  </div>
                  {index < filteredLogs.length - 1 && (
                    <div className="w-px h-8 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(log.timestamp)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({getTimeAgo(log.timestamp)})
                      </span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="font-medium">{log.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                      <FileText className="h-3 w-3" />
                      <span>{log.applicationId}</span>
                      <User className="h-3 w-3 ml-2" />
                      <span>{log.applicant}</span>
                    </div>
                    {log.details && (
                      <p className="text-sm text-muted-foreground mt-2">{log.details}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No activities found</h3>
            <p className="text-muted-foreground">
              {searchTerm || actionFilter !== 'all' || dateFilter !== 'all' 
                ? "Try adjusting your filters to see more activities."
                : "Your review activities will appear here."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 