import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Link as LinkIcon } from "lucide-react";
import type { Image, McrFile } from "@shared/schema";

export default function ImageGallery() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false);
  const [associatingImage, setAssociatingImage] = useState<Image | null>(null);
  const [selectedMcrFileId, setSelectedMcrFileId] = useState<string | null>(null);
  const { data: images, isLoading, error } = useQuery<Image[]>({ 
    queryKey: ['/api/images'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/images');
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  const { data: mcrFiles, isLoading: isLoadingMcrFiles } = useQuery<McrFile[]>({ 
    queryKey: ['/api/files'],
  });

  const associateMcrMutation = useMutation({
    mutationFn: async (variables: { imageId: string; mcrFileId: string | null }) => {
      return apiRequest('POST', `/api/images/${variables.imageId}/associate-mcr`, { mcrFileId: variables.mcrFileId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/images'] });
      toast({
        title: "MCR associated successfully",
        description: "The MCR file has been linked to the image.",
      });
      setIsAssociateModalOpen(false);
      setAssociatingImage(null);
      setSelectedMcrFileId(null);
    },
    onError: (error) => {
      toast({
        title: "Association failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            Loading images...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-destructive">
          Error loading images: {error.message}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Uploaded Images</CardTitle>
      </CardHeader>
      <CardContent>
        {images && images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img 
                  src={`/images/${image.filename}`} 
                  alt={image.originalName} 
                  className="w-full h-32 object-cover rounded-md shadow-md group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs rounded-b-md flex justify-between items-center">
                  {image.originalName}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => {
                      setAssociatingImage(image);
                      setSelectedMcrFileId(image.associatedMcrFileId || null);
                      setIsAssociateModalOpen(true);
                    }}
                    title="Associate MCR"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-8">
            No images uploaded yet. Upload some to see them here!
          </div>
        )}
      </CardContent>

      <Dialog open={isAssociateModalOpen} onOpenChange={setIsAssociateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Associate MCR File</DialogTitle>
            <DialogDescription>
              Select an MCR file to associate with "{associatingImage?.originalName}".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select onValueChange={setSelectedMcrFileId} value={selectedMcrFileId || ""}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an MCR file" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingMcrFiles ? (
                  <SelectItem value="loading" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading MCR files...
                  </SelectItem>
                ) : (
                  mcrFiles?.map((file) => (
                    <SelectItem key={file.id} value={file.id}>
                      {file.originalName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssociateModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={() => {
                if (associatingImage) {
                  associateMcrMutation.mutate({ imageId: associatingImage.id, mcrFileId: selectedMcrFileId });
                }
              }}
              disabled={associateMcrMutation.isPending || !selectedMcrFileId}
            >
              {associateMcrMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Associate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
