import React, { useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Image, McrCommand } from "@shared/schema";

interface ImagePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
  mcrCommands: McrCommand[];
}

export default function ImagePreviewDialog({ isOpen, onClose, image, mcrCommands }: ImagePreviewDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawCommands = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image (important for correct scaling)
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

      // Draw MCR movements
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 2;
      ctx.beginPath();

      let firstMove = true;
      mcrCommands.forEach(cmd => {
        if (cmd.type === 'mouse' && cmd.x !== undefined && cmd.y !== undefined) {
          if (firstMove) {
            ctx.moveTo(cmd.x, cmd.y);
            firstMove = false;
          } else {
            ctx.lineTo(cmd.x, cmd.y);
          }
        }
      });
      ctx.stroke();
    };

    // Ensure image is loaded before drawing
    if (img.complete) {
      drawCommands();
    } else {
      img.onload = drawCommands;
    }

    // Redraw on window resize (optional, but good for responsiveness)
    window.addEventListener('resize', drawCommands);
    return () => window.removeEventListener('resize', drawCommands);

  }, [image, mcrCommands]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Image Preview: {image?.originalName}</DialogTitle>
          <DialogDescription>
            Visual representation of MCR mouse movements.
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-auto flex justify-center items-center">
          <img 
            ref={imgRef}
            src={image ? `/images/${image.filename}` : ""} 
            alt={image?.originalName} 
            className="max-w-full max-h-[70vh] object-contain"
            style={{ display: 'block' }} // Ensure image is visible for natural dimensions
          />
          <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
