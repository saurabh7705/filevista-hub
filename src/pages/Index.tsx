
import React, { useState } from "react";
import { FileViewer } from "@/components/FileViewer";
import { FileList } from "@/components/FileList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample file data
const sampleFiles = [
  {
    id: "1",
    name: "sample-image.jpg",
    type: "image/jpeg",
    url: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?w=1200&auto=format&fit=crop&q=80",
    size: 1200000,
    lastModified: "2023-10-15",
  },
  {
    id: "2",
    name: "sample-video.mp4",
    type: "video/mp4",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    size: 5600000,
    lastModified: "2023-09-28",
  },
  {
    id: "3",
    name: "sample-audio.mp3",
    type: "audio/mp3",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    size: 3800000,
    lastModified: "2023-10-01",
  },
  {
    id: "4",
    name: "sample-document.pdf",
    type: "application/pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    size: 860000,
    lastModified: "2023-08-15",
  },
  {
    id: "5",
    name: "sample-text.txt",
    type: "text/plain",
    url: "https://www.w3.org/TR/PNG/iso_8859-1.txt",
    size: 124000,
    lastModified: "2023-10-10",
  },
  {
    id: "6",
    name: "sample-archive.zip",
    type: "application/zip",
    url: "#",
    size: 2450000,
    lastModified: "2023-09-20",
  },
];

const Index = () => {
  const [selectedFile, setSelectedFile] = useState(sampleFiles[0]);
  
  const handleFileSelect = (file: any) => {
    setSelectedFile(file);
    // Add smooth animation when switching files
    const viewerElement = document.getElementById("file-viewer-container");
    if (viewerElement) {
      viewerElement.classList.add("opacity-0");
      viewerElement.classList.add("translate-y-4");
      
      setTimeout(() => {
        viewerElement.classList.remove("opacity-0");
        viewerElement.classList.remove("translate-y-4");
      }, 50);
    }
  };
  
  const handleFileDownload = () => {
    toast.success(`Downloading ${selectedFile.name}`);
    
    const link = document.createElement("a");
    link.href = selectedFile.url;
    link.download = selectedFile.name;
    link.click();
  };
  
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8 transition-all duration-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            File Vista
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A beautiful and functional file viewer that supports multiple file formats with download and fullscreen capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 animate-slide-in" style={{ animationDelay: "0.1s" }}>
          <div className="glass-card rounded-xl overflow-hidden border">
            <div className="p-4 bg-secondary/50 border-b">
              <h2 className="font-medium">Files</h2>
            </div>
            
            <FileList 
              files={sampleFiles} 
              onFileSelect={handleFileSelect}
              className="h-[500px]"
            />
          </div>
          
          <div className="transition-all duration-300 ease-in-out">
            <FileViewer 
              file={selectedFile}
              onDownload={handleFileDownload}
            />
          </div>
        </div>
        
        <div className="mt-8 text-sm text-center text-muted-foreground">
          <p>Supports various file formats including images, videos, audio, documents, and more.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
