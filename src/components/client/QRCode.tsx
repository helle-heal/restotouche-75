
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

const QRCode = () => {
  return (
    <Card className="w-full max-w-xs text-center animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Commander sur mobile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <QrCode size={120} className="text-resto-blue" />
        </div>
        <p className="text-sm text-muted-foreground">
          Scannez ce code QR pour accéder au menu sur votre téléphone
        </p>
      </CardContent>
    </Card>
  );
};

export default QRCode;
