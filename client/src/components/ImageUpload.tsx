import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Image as ImageIcon } from "lucide-react";
import { formatFileSize } from "@/lib/fileUtils";

export default function ImageUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiRequest('POST', '/api/images/upload', formData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/images'] });
      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded.",
      });
      setIsUploading(false);
      setUploadProgress(0);
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      setIsUploading(false);
      setUploadProgress(0);
    },
  });

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select images to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    for (const file of selectedFiles) {
      // Simulate progress for better UX for each file
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);
      await uploadMutation.mutateAsync(file);
      clearInterval(progressInterval); // Clear interval after each file upload
      setUploadProgress(0); // Reset progress for next file
    }

    setSelectedFiles([]);
    setFileNames([]);
    setIsUploading(false);
    toast({
      title: "All images uploaded",
      description: "All selected images have been uploaded.",
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles: File[] = [];
      const validFileNames: string[] = [];

      acceptedFiles.forEach(file => {
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Invalid file type",
            description: `File ${file.name}: Please upload an image file.`,
            variant: "destructive",
          });
          return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast({
            title: "File too large",
            description: `File ${file.name}: Please upload a file smaller than 5MB.`,
            variant: "destructive",
          });
          return;
        }
        validFiles.push(file);
        validFileNames.push(file.name);
      });

      setSelectedFiles(prev => [...prev, ...validFiles]);
      setFileNames(prev => [...prev, ...validFileNames]);
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif', '.bmp', '.webp'],
    },
    multiple: true,
  });

  const handleManualUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true; // Allow multiple file selection
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        onDrop(Array.from(files));
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary'
            }`}
            data-testid="image-dropzone"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload Image Files</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your image files here, or click to browse
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={(e) => { e.stopPropagation(); handleManualUpload(); }}
                    disabled={isUploading}
                    data-testid="select-images-button"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Select Images
                  </Button>
                  <Button
                    onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                    disabled={isUploading || selectedFiles.length === 0}
                    data-testid="upload-selected-images-button"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Selected Images ({selectedFiles.length})
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Supported formats: JPEG, PNG, GIF, BMP, WebP • Max file size: 5MB
              </div>
            </div>
          </div>

          {fileNames.length > 0 && (
            <div className="mt-4 p-4 border rounded-lg bg-secondary/20">
              <p className="text-sm font-medium mb-2">Imágenes seleccionadas:</p>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                {fileNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  setSelectedFiles([]);
                  setFileNames([]);
                }}
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Clear Selected Images
              </Button>
            </div>
          )}

          {isUploading && (
            <div className="mt-6 space-y-3" data-testid="upload-progress">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Uploading image...</span>
                <span data-testid="upload-percentage">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
