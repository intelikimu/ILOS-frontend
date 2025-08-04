"use client";

import React, { useState, useEffect } from 'react';
import { Folder, File, Download, ChevronRight, ChevronDown, Home, ArrowUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: number;
}

interface DocumentExplorerProps {
  losId?: string;
  applicationType?: string;
  onFileSelect?: (file: FileItem) => void;
}

const DocumentExplorer: React.FC<DocumentExplorerProps> = ({ losId, applicationType, onFileSelect }) => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Load files for current path or specific LOS ID
  const loadFiles = async (path: string) => {
    setLoading(true);
    try {
      let response;
      
      if (losId && applicationType) {
        // Use the new filtered API for specific LOS ID
        const numericLosId = losId.replace('LOS-', '');
        const apiUrl = `/api/documents/${numericLosId}?applicationType=${applicationType}`;
        console.log('🔄 DocumentExplorer: Using filtered API:', apiUrl);
        
        response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ DocumentExplorer: Received data:', data);
        
        if (data.exists && data.documents) {
          const fileItems: FileItem[] = data.documents.map((doc: any) => ({
            name: doc.name,
            type: doc.type,
            path: doc.path,
            size: doc.size
          }));
          setFiles(fileItems);
        } else {
          setFiles([]);
          toast({
            title: "No documents found",
            description: `No documents found for ${losId}`,
          });
        }
      } else {
        // Use the old explorer API for general browsing
        response = await fetch(`http://localhost:8081/explorer${encodeURI(path)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        
        // Parse the HTML to extract file information
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const fileItems: FileItem[] = [];
        
        // Extract files and folders from the table
        const rows = doc.querySelectorAll('table tr');
        
        rows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 3) {
            const nameCell = cells[0];
            const typeCell = cells[1];
            const actionCell = cells[2];
            
            const link = nameCell.querySelector('a');
            const icon = nameCell.querySelector('.icon');
            const name = link ? link.textContent?.trim() : nameCell.textContent?.trim();
            const type = typeCell.textContent?.trim();
            
            if (name && type) {
              const isFolder = type === 'Folder' || icon?.textContent?.includes('📁');
              const isFile = type === 'File' || icon?.textContent?.includes('📄');
              
              if (isFolder || isFile) {
                const itemPath = link ? link.getAttribute('href')?.replace('/explorer', '') || path : path;
                
                fileItems.push({
                  name: name,
                  type: isFolder ? 'folder' : 'file',
                  path: itemPath,
                  size: isFile ? 0 : undefined // We could extract size if needed
                });
              }
            }
          }
        });
        
        setFiles(fileItems);
      }
    } catch (error) {
      console.error('Error loading files:', error);
      toast({
        title: "Error loading files",
        description: "Could not load the document explorer. Please check if the server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (losId && applicationType) {
      // Load files for specific LOS ID
      loadFiles('/');
    } else {
      // Load files for current path (general browsing)
      loadFiles(currentPath);
    }
  }, [currentPath, losId, applicationType]);

  const handleFolderClick = (folder: FileItem) => {
    const newPath = folder.path;
    setCurrentPath(newPath);
    
    // Toggle expanded state
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder.path)) {
      newExpanded.delete(folder.path);
    } else {
      newExpanded.add(folder.path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (file: FileItem) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDownload = async (file: FileItem) => {
    try {
      let downloadUrl;
      
      if (losId && applicationType) {
        // Use the direct file URL for filtered documents
        downloadUrl = `http://localhost:8081${file.path}`;
      } else {
        // Use the explorer URL for general browsing
        downloadUrl = `http://localhost:8081/explorer${encodeURI(file.path)}`;
      }
      
      console.log('Downloading file:', downloadUrl);
      
      // Create a direct download link
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name;
      link.target = '_blank';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: `Downloading ${file.name}...`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download failed",
        description: "Could not download the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleView = async (file: FileItem) => {
    try {
      // Check file type first
      const fileName = file.name.toLowerCase();
      const isHtmlFile = fileName.endsWith('.html') || fileName.endsWith('.htm');
      const isImageFile = fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || 
                         fileName.endsWith('.png') || fileName.endsWith('.gif') || 
                         fileName.endsWith('.bmp') || fileName.endsWith('.webp');
      const isPdfFile = fileName.endsWith('.pdf');
      const isTextFile = fileName.endsWith('.txt') || fileName.endsWith('.md') || 
                        fileName.endsWith('.json') || fileName.endsWith('.xml');
      
      if (!isHtmlFile && !isImageFile && !isPdfFile && !isTextFile) {
        toast({
          title: "Preview not available",
          description: `This file type (${file.name.split('.').pop()}) cannot be previewed. Please download it instead.`,
          variant: "destructive",
        });
        return;
      }

      let fileUrl;
      
      if (losId && applicationType) {
        // For LOS-specific documents, construct the direct file URL
        fileUrl = `http://localhost:8081${file.path}`;
      } else {
        // For general browsing, use the explorer URL
        fileUrl = `http://localhost:8081/explorer${encodeURI(file.path)}`;
      }
      
      console.log('Fetching file for preview:', fileUrl);
      
      // Try to fetch the file content first
      const response = await fetch(fileUrl, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Get the file content
      const fileContent = await response.blob();
      
      // Create a blob URL for the file
      const blobUrl = URL.createObjectURL(fileContent);
      
      // Open the blob URL in a new tab
      const newWindow = window.open(blobUrl, '_blank');
      
      if (!newWindow) {
        toast({
          title: "Popup blocked",
          description: "Please allow popups for this site to view files.",
          variant: "destructive",
        });
        return;
      }
      
      // Clean up the blob URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 1000);
      
      toast({
        title: "Opening preview",
        description: `Opening ${file.name} in a new tab...`,
      });
    } catch (error) {
      console.error('Error opening file preview:', error);
      
      // Fallback: try opening directly
      try {
        let fallbackUrl;
        
        if (losId && applicationType) {
          fallbackUrl = `http://localhost:8081${file.path}`;
        } else {
          fallbackUrl = `http://localhost:8081/explorer${encodeURI(file.path)}`;
        }
        
        window.open(fallbackUrl, '_blank');
        
        toast({
          title: "Opening file",
          description: `Opening ${file.name} in a new tab...`,
        });
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        toast({
          title: "Error opening preview",
          description: "Could not open the file preview. Please try downloading it instead.",
          variant: "destructive",
        });
      }
    }
  };

  const navigateToParent = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const newPath = '/' + pathParts.slice(0, -1).join('/');
      setCurrentPath(newPath);
    }
  };

  const navigateToRoot = () => {
    setCurrentPath('/');
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Explorer</h3>
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={navigateToRoot}
            className="p-1 h-auto"
          >
            <Home className="h-4 w-4" />
          </Button>
          
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newPath = '/' + breadcrumbs.slice(0, index + 1).join('/');
                  setCurrentPath(newPath);
                }}
                className="p-1 h-auto text-blue-600 hover:text-blue-800"
              >
                {crumb}
              </Button>
            </React.Fragment>
          ))}
        </div>

        {/* Search */}
        <div className="mb-3">
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>

        {/* Back button */}
        {currentPath !== '/' && (
          <Button
            variant="outline"
            size="sm"
            onClick={navigateToParent}
            className="mb-3"
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            Back to Parent
          </Button>
        )}
      </div>

      {/* File List */}
      <div className="border rounded-lg">
        {loading ? (
          <div className="p-4 text-center text-gray-500">
            Loading files...
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'No files match your search' : 'This folder is empty'}
          </div>
        ) : (
          <div className="divide-y">
            {filteredFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => file.type === 'folder' ? handleFolderClick(file) : handleFileClick(file)}
              >
                <div className="flex items-center gap-2">
                  {file.type === 'folder' ? (
                    <Folder className="h-5 w-5 text-blue-500" />
                  ) : (
                    <File className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="text-sm font-medium">{file.name}</span>
                  {file.type === 'folder' && (
                    <Badge variant="secondary" className="text-xs">
                      Folder
                    </Badge>
                  )}
                </div>
                
                {file.type === 'file' && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(file);
                      }}
                      className="p-1 h-auto"
                      title="Download file"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(file);
                      }}
                      className="p-1 h-auto"
                      title="View file"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status */}
      <div className="mt-3 text-xs text-gray-500">
        {filteredFiles.length} item{filteredFiles.length !== 1 ? 's' : ''}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>
    </div>
  );
};

export default DocumentExplorer; 