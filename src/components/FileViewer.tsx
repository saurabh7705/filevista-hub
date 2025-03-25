
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Maximize, Minimize } from "lucide-react";
import { FileIcon } from "./FileIcon";
import { cn } from "@/lib/utils";

type FileViewerProps = {
  file: {
    name: string;
    type: string;
    url: string;
    size?: number;
  };
  className?: string;
  onDownload?: () => void;
};

export function FileViewer({ file, className, onDownload }: FileViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const toggleFullscreen = () => {
    const element = document.getElementById("file-viewer-container");
    
    if (!document.fullscreenElement) {
      element?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
      return;
    }
    
    // Default download behavior
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.click();
  };
  
  const renderFilePreview = () => {
    const fileType = file.type.toLowerCase();
    
    // Image types
    if (fileType.match(/^image\/(jpeg|jpg|png|gif|webp|svg|bmp|tiff)$/) || 
        fileType.endsWith('.jpg') || 
        fileType.endsWith('.jpeg') || 
        fileType.endsWith('.png') || 
        fileType.endsWith('.gif') || 
        fileType.endsWith('.webp') || 
        fileType.endsWith('.svg') || 
        fileType.endsWith('.bmp') || 
        fileType.endsWith('.tiff')) {
      return (
        <img 
          src={file.url} 
          alt={file.name}
          className="max-w-full max-h-[500px] object-contain rounded-md animate-scale-in" 
        />
      );
    }
    
    // Video types
    if (fileType.match(/^video\/(mp4|webm|ogg)$/) || 
        fileType.endsWith('.mp4') || 
        fileType.endsWith('.webm') || 
        fileType.endsWith('.ogg')) {
      return (
        <video 
          src={file.url} 
          controls
          className="max-w-full max-h-[500px] rounded-md animate-scale-in"
        />
      );
    }
    
    // Audio types
    if (fileType.match(/^audio\/(mp3|wav|ogg|aac|flac)$/) || 
        fileType.endsWith('.mp3') || 
        fileType.endsWith('.wav') || 
        fileType.endsWith('.ogg') || 
        fileType.endsWith('.aac') || 
        fileType.endsWith('.flac')) {
      return (
        <div className="flex flex-col items-center justify-center p-4 animate-scale-in">
          <FileIcon type={file.type} size={64} className="mb-4" />
          <audio 
            src={file.url} 
            controls
            className="w-full"
          />
        </div>
      );
    }
    
    // PDF types
    if (fileType === 'application/pdf' || fileType.endsWith('.pdf')) {
      return (
        <object 
          data={file.url} 
          type="application/pdf"
          className="w-full h-[500px] rounded-md animate-scale-in"
        >
          <div className="flex flex-col items-center justify-center p-10">
            <p>Unable to display PDF. <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Open PDF in new tab</a></p>
          </div>
        </object>
      );
    }
    
    // Text types
    if (fileType === 'text/plain' || fileType.endsWith('.txt')) {
      return (
        <div className="w-full h-[500px] bg-white rounded-md p-4 overflow-auto animate-scale-in border border-gray-200">
          <iframe 
            src={file.url} 
            title={file.name}
            className="w-full h-full border-0" 
            sandbox="allow-same-origin"
          />
        </div>
      );
    }
    
    // Default file icon for unsupported types
    return (
      <div className="flex flex-col items-center justify-center p-10 animate-scale-in">
        <FileIcon type={file.type} size={96} className="mb-6" />
        <p className="text-lg font-medium text-center text-balance">
          {file.name}
        </p>
        {file.size && (
          <p className="text-sm text-muted-foreground mt-2">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </div>
    );
  };
  
  return (
    <Card className={cn("overflow-hidden glass-card", 
      isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none" : "",
      className)}
      id="file-viewer-container"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <FileIcon type={file.type} size={20} />
          <p className="font-medium text-sm truncate max-w-[260px] sm:max-w-[400px]">
            {file.name}
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDownload}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Download"
          >
            <Download size={18} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleFullscreen}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 flex items-center justify-center">
        {renderFilePreview()}
      </CardContent>
    </Card>
  );
}
