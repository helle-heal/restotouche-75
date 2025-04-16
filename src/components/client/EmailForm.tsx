
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import Logo from "../layout/Logo";

interface EmailFormProps {
  onSubmit: (email: string | null) => void;
  onSkip: () => void;
}

const EmailForm = ({ onSubmit, onSkip }: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler un traitement après 1 seconde
    setTimeout(() => {
      setIsLoading(false);
      // Important: pass the email even if it's empty
      onSubmit(email.trim() || null);
      toast.success(email ? "Email enregistré avec succès!" : "Continuer sans email");
    }, 1000);
  };

  const handleSkip = () => {
    onSkip();
    toast.info("Continuer sans email");
  };

  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <Logo size="lg" />
        <CardTitle className="text-2xl mt-4">Bienvenue chez RestoTouch</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client-email">Votre adresse e-mail (optionnel)</Label>
            <Input
              id="client-email"
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Nous vous enverrons votre facture et le statut de votre commande à cette adresse.
            </p>
          </div>
          <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
            {isLoading ? "Traitement en cours..." : "Continuer avec email"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleSkip}
        >
          Continuer sans email
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailForm;
