
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "../layout/Logo";
import { toast } from "@/components/ui/sonner";

interface LoginFormProps {
  userType: "admin" | "employee";
}

const LoginForm = ({ userType }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler une connexion réussie après 1 seconde
    setTimeout(() => {
      setIsLoading(false);
      
      // Redirection selon le type d'utilisateur
      if (userType === "admin") {
        toast.success("Connecté en tant qu'administrateur");
        navigate("/admin");
      } else {
        toast.success("Connecté en tant qu'employé");
        navigate("/employee");
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <Logo size="lg" />
        <CardTitle className="text-2xl mt-4">
          {userType === "admin" ? "Administration" : "Espace Employé"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@restouch.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
