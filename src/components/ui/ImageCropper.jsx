import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";

// Helper function to create the cropped image file
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid CORS issues on some URLs
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  // Set canvas size to the cropped size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image onto the canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
};

export const ImageCropper = ({ open, setOpen, imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteHandler = useCallback(
    (croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCropSave = async () => {
    try {
      setIsProcessing(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Convert Blob to File object for the form input
      const croppedFile = new File([croppedImageBlob], "cropped-avatar.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      // Pass the File back to parent
      onCropComplete(croppedFile);
      setOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden flex flex-col gap-0 border-none shadow-2xl">
        <DialogHeader className="p-4 border-b border-neutral-100 bg-white">
          <DialogTitle className="text-lg font-semibold text-neutral-900">
            Sesuaikan Foto Profil
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[300px] sm:h-[400px] bg-neutral-900">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1} // Enforce 1:1 Aspect Ratio
              cropShape="round" // Visual aid to show it as a circle
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropCompleteHandler}
              onZoomChange={setZoom}
            />
          )}
        </div>

        <div className="p-4 bg-white border-t border-neutral-100 space-y-4">
          <div className="flex items-center gap-4 px-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase">
              Zoom
            </span>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onValueChange={(val) => setZoom(val[0])}
              className="flex-1"
            />
          </div>
        </div>

        <DialogFooter className="p-4 bg-neutral-50 border-t border-neutral-100 flex flex-row justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg-white"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleCropSave}
            disabled={isProcessing}
            className="bg-neutral-900 hover:bg-neutral-800 text-white min-w-[100px]"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Terapkan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
