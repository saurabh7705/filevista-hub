
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileItem } from "./FileItem";

type FileListProps = {
  files: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    size?: number;
    lastModified?: string;
  }>;
  onFileSelect: (file: any) => void;
  className?: string;
};

export function FileList({ files, onFileSelect, className }: FileListProps) {
  const handleDownload = (file: any) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.click();
  };
  
  return (
    <ScrollArea className={className}>
      <div className="space-y-1 p-1">
        {files.map((file) => (
          <FileItem 
            key={file.id}
            file={file}
            onView={() => onFileSelect(file)}
            onDownload={() => handleDownload(file)}
          />
        ))}
        
        {files.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <p className="text-muted-foreground">No files to display</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
