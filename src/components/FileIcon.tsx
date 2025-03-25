
import React from "react";
import {
  File,
  FileArchive,
  FileAudio,
  FileImage,
  FileVideo,
  Folder,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FileIconProps = {
  type: string;
  className?: string;
  size?: number;
};

export function FileIcon({ type, className, size = 24 }: FileIconProps) {
  const fileType = type.toLowerCase();
  
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
    return <FileImage className={cn("text-blue-500", className)} size={size} />;
  }
  
  // Video types
  if (fileType.match(/^video\/(mp4|webm|ogg|mpeg|avi|mov|wmv|flv)$/) || 
      fileType.endsWith('.mp4') || 
      fileType.endsWith('.webm') || 
      fileType.endsWith('.ogg') || 
      fileType.endsWith('.mpeg') || 
      fileType.endsWith('.avi') || 
      fileType.endsWith('.mov') || 
      fileType.endsWith('.wmv') || 
      fileType.endsWith('.flv')) {
    return <FileVideo className={cn("text-purple-500", className)} size={size} />;
  }
  
  // Audio types
  if (fileType.match(/^audio\/(mp3|wav|ogg|aac|flac)$/) || 
      fileType.endsWith('.mp3') || 
      fileType.endsWith('.wav') || 
      fileType.endsWith('.ogg') || 
      fileType.endsWith('.aac') || 
      fileType.endsWith('.flac')) {
    return <FileAudio className={cn("text-green-500", className)} size={size} />;
  }
  
  // Archive types
  if (fileType.match(/^application\/(zip|x-rar-compressed|x-7z-compressed|x-tar|gzip)$/) || 
      fileType.endsWith('.zip') || 
      fileType.endsWith('.rar') || 
      fileType.endsWith('.7z') || 
      fileType.endsWith('.tar') || 
      fileType.endsWith('.gz')) {
    return <FileArchive className={cn("text-amber-500", className)} size={size} />;
  }
  
  // Directory
  if (fileType === 'directory' || fileType === 'folder') {
    return <Folder className={cn("text-blue-400", className)} size={size} />;
  }
  
  // Default file icon
  return <File className={cn("text-gray-500", className)} size={size} />;
}
