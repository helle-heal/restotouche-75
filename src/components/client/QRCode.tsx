
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface QRCodeProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCode = ({ isOpen, onClose }: QRCodeProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-xs mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Commander sur mobile</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col items-center gap-4">
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <QrCode size={120} className="text-resto-blue" />
              </div>
              <p className="text-sm text-muted-foreground">
                Scannez ce code QR pour accéder au menu sur votre téléphone
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QRCode;
