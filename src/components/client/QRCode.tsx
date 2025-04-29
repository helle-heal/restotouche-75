
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface QRCodeProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCode = ({ isOpen, onClose }: QRCodeProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Commander sur mobile</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col md:flex-row items-center gap-4 p-4">
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <QrCode size={120} className="text-resto-blue" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-medium mb-2">Scannez ce code QR</p>
                <p className="text-sm text-muted-foreground">
                  Utilisez l'appareil photo de votre téléphone pour scanner ce code et accéder au menu directement sur votre mobile
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QRCode;
