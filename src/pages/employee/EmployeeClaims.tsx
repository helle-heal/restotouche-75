
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  CheckCircle, 
  MessageSquare, 
  Send, 
  RotateCw,
  Clock,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

// Types pour les réclamations
type ClaimStatus = "en_attente" | "en_traitement" | "résolue" | "rejetée";
type ClaimPriority = "basse" | "moyenne" | "haute";

interface Claim {
  id: string;
  title: string;
  description: string;
  status: ClaimStatus;
  priority: ClaimPriority;
  createdAt: string;
  response?: {
    text: string;
    respondedAt: string;
    respondedBy: string;
  };
}

const EmployeeClaims = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "REC-001",
      title: "Problème avec l'équipement de cuisine",
      description: "Le four ne fonctionne pas correctement, il ne chauffe pas à la température définie et s'éteint parfois de manière aléatoire.",
      status: "en_traitement",
      priority: "haute",
      createdAt: "2025-04-10T09:15:00",
      response: {
        text: "Nous avons programmé une intervention technique pour demain matin. En attendant, veuillez utiliser le four de secours.",
        respondedAt: "2025-04-10T11:30:00",
        respondedBy: "Michel (Manager)"
      }
    },
    {
      id: "REC-002",
      title: "Horaires de travail",
      description: "Je souhaiterais discuter de la possibilité d'adapter mes horaires de travail pour des raisons personnelles.",
      status: "en_attente",
      priority: "moyenne",
      createdAt: "2025-04-13T14:20:00"
    }
  ]);
  
  const [newClaimTitle, setNewClaimTitle] = useState("");
  const [newClaimDescription, setNewClaimDescription] = useState("");
  const [newClaimPriority, setNewClaimPriority] = useState<ClaimPriority>("moyenne");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Soumettre une nouvelle réclamation
  const submitClaim = () => {
    if (!newClaimTitle.trim() || !newClaimDescription.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      const newClaim: Claim = {
        id: `REC-00${claims.length + 1}`,
        title: newClaimTitle,
        description: newClaimDescription,
        status: "en_attente",
        priority: newClaimPriority,
        createdAt: new Date().toISOString()
      };
      
      setClaims([newClaim, ...claims]);
      setNewClaimTitle("");
      setNewClaimDescription("");
      setNewClaimPriority("moyenne");
      setIsSubmitting(false);
      
      toast.success("Réclamation envoyée avec succès");
    }, 1000);
  };

  // Navigation vers le tableau de bord
  const handleBackToDashboard = () => {
    navigate("/employee");
    toast.info("Retour au tableau de bord");
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Couleurs et icônes selon statut
  const getStatusInfo = (status: ClaimStatus) => {
    switch (status) {
      case "en_attente":
        return { 
          color: "bg-yellow-100 text-yellow-800", 
          icon: <Clock className="h-4 w-4 mr-1" /> 
        };
      case "en_traitement":
        return { 
          color: "bg-blue-100 text-blue-800", 
          icon: <RotateCw className="h-4 w-4 mr-1" /> 
        };
      case "résolue":
        return { 
          color: "bg-green-100 text-green-800", 
          icon: <CheckCircle className="h-4 w-4 mr-1" /> 
        };
      case "rejetée":
        return { 
          color: "bg-red-100 text-red-800", 
          icon: <AlertCircle className="h-4 w-4 mr-1" /> 
        };
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="employee" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Réclamations</h1>
            <Button variant="outline" onClick={handleBackToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nouvelle réclamation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Titre
                      </label>
                      <Input 
                        placeholder="Sujet de votre réclamation"
                        value={newClaimTitle}
                        onChange={(e) => setNewClaimTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Description
                      </label>
                      <Textarea 
                        placeholder="Décrivez votre problème ou requête en détail..."
                        rows={5}
                        value={newClaimDescription}
                        onChange={(e) => setNewClaimDescription(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Priorité
                      </label>
                      <div className="flex gap-4">
                        {["basse", "moyenne", "haute"].map((priority) => (
                          <label key={priority} className="flex items-center">
                            <input 
                              type="radio"
                              name="priority"
                              value={priority}
                              checked={newClaimPriority === priority}
                              onChange={() => setNewClaimPriority(priority as ClaimPriority)}
                              className="mr-2"
                            />
                            <span className="capitalize">{priority}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      type="button"
                      className="w-full"
                      onClick={submitClaim}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer la réclamation
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Mes réclamations</h2>
              
              {claims.length === 0 ? (
                <Card className="bg-gray-50 border border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <MessageSquare className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Vous n'avez pas encore soumis de réclamations</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {claims.map(claim => (
                    <Card key={claim.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-sm font-medium">
                            {claim.title}
                          </CardTitle>
                          <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full 
                            {getStatusInfo(claim.status).color}">
                            {getStatusInfo(claim.status).icon}
                            <span className="capitalize">{claim.status.replace('_', ' ')}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          ID: {claim.id} | Soumise le {formatDate(claim.createdAt)}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{claim.description}</p>
                        
                        {claim.response && (
                          <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mt-2">
                            <div className="flex items-center text-xs font-medium text-blue-700 mb-1">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Réponse de {claim.response.respondedBy}
                            </div>
                            <p className="text-sm">{claim.response.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(claim.response.respondedAt)}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeClaims;
