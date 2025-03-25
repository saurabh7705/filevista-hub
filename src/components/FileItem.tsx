
import React from "react";
import { FileIcon } from "./FileIcon";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type FileItemProps = {
  file: {
    name: string;
    type: string;
    url: string;
    size?: number;
    lastModified?: string;
  };
  onView: () => void;
  onDownload: () => void;
  className?: string;
};

export function FileItem({ file, onView, onDownload, className }: FileItemProps) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };
  
  return (
    <div className={cn(
      "group flex items-center justify-between p-3 rounded-lg transition-all duration-200",
      "hover:bg-secondary/50 hover-scale",
      className
    )}>
      <div className="flex items-center gap-3">
        <FileIcon type={file.type} className="flex-shrink-0" />
        
        <div className="min-w-0">
          <p className="font-medium truncate">{file.name}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            {file.size && <span>{formatFileSize(file.size)}</span>}
            {file.lastModified && (
              <>
                <span className="bg-muted-foreground/20 w-1 h-1 rounded-full" />
                <span>{file.lastModified}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onView}
          className="h-8 w-8"
          aria-label="View file"
        >
          <Eye size={16} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onDownload}
          className="h-8 w-8"
          aria-label="Download file"
        >
          <Download size={16} />
        </Button>
      </div>
    </div>
  );
}
