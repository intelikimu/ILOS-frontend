"use client";

import React, { useState, useEffect } from 'react';
import { Folder, File, Download, ChevronRight, ChevronDown, Home, ArrowUp } from 'lucide-react';
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
  onFileSelect?: (file: FileItem) => void;
}

const DocumentExplorer: React.FC<DocumentExplorerProps> = ({ onFileSelect }) => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Load files for current path
  const loadFiles = async (path: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/explorer${encodeURI(path)}`);
      
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
    loadFiles(currentPath);
  }, [currentPath]);

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
      const downloadUrl = `http://localhost:8081/explorer${encodeURI(file.path)}`;
      
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