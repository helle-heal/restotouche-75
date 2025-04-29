
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Filter,
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  UserCircle,
  Calendar,
  Edit,
  CheckCircle,
  XCircle,
  RotateCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialClaims = [
  {
    id: 1,
    customer: "Martin Dupuis",
    subject: "Erreur dans la commande",
    message: "J'ai commandé une pizza végétarienne mais j'ai reçu une pizza au jambon. Je suis végétarien et je n'ai pas pu manger ma commande.",
    status: "open",
    priority: "high",
    date: "15/04/2025",
    time: "14:35",
    assignedTo: "",
    response: ""
  },
  {
    id: 2,
    customer: "Sophie Moreau",
    subject: "Retard de livraison",
    message: "Ma commande est arrivée avec plus de 45 minutes de retard et les plats étaient froids.",
    status: "in-progress",
    priority: "medium",
    date: "15/04/2025",
    time: "12:15",
    assignedTo: "Jean Dupont",
    response: ""
  },
  {
    id: 3,
    customer: "Thomas Lefevre",
    subject: "Problème de paiement",
    message: "J'ai été débité deux fois pour ma commande. Pourriez-vous vérifier et me rembourser le montant en trop ?",
    status: "in-progress",
    priority: "medium",
    date: "14/04/2025",
    time: "18:22",
    assignedTo: "Marie Laurent",
    response: ""
  },
  {
    id: 4,
    customer: "Laura Petit",
    subject: "Service client",
    message: "Le serveur a été très impoli avec moi lors de ma visite ce midi. Je suis très déçue du service.",
    status: "open",
    priority: "high",
    date: "14/04/2025",
    time: "13:47",
    assignedTo: "",
    response: ""
  },
  {
    id: 5,
    customer: "Antoine Bernard",
    subject: "Qualité des plats",
    message: "Les frites étaient trop cuites et le burger pas assez. Très déçu de la qualité pour le prix payé.",
    status: "closed",
    priority: "low",
    date: "12/04/2025",
    time: "20:05",
    assignedTo: "Thomas Petit",
    response: "Nous sommes désolés pour cette expérience. Votre prochain repas sera à -50% pour compenser cet incident."
  },
];

const AdminClaims = () => {
  const [claims, setClaims] = useState(initialClaims);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [processing, setProcessing] = useState(false);
  const [availableStaff] = useState([
    "Jean Dupont", "Marie Laurent", "Thomas Petit", "Sophie Martin", "Lucas Bernard"
  ]);

  // Filter claims based on search and active tab
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = searchTerm === "" || 
      claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || claim.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  // Stats calculations
  const newClaims = claims.filter(c => c.status === "open").length;
  const inProgressClaims = claims.filter(c => c.status === "in-progress").length;
  const resolvedClaims = claims.filter(c => c.status === "closed").length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const viewClaimDetails = (claim: any) => {
    setSelectedClaim(claim);
    setResponseText(claim.response || "");
    setAssignTo(claim.assignedTo || "");
    setShowDetailDialog(true);
  };

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponseText(e.target.value);
  };

  const handleAssignChange = (value: string) => {
    setAssignTo(value);
  };

  const updateClaimStatus = (status: "open" | "in-progress" | "closed") => {
    if (!selectedClaim) return;

    setProcessing(true);
    
    setTimeout(() => {
      const updatedClaims = claims.map(claim => 
        claim.id === selectedClaim.id 
          ? { 
              ...claim, 
              status, 
              response: status === "closed" ? responseText : claim.response,
              assignedTo: assignTo || claim.assignedTo
            }
          : claim
      );
      
      setClaims(updatedClaims);
      setProcessing(false);
      setShowDetailDialog(false);
      
      toast.success(`Réclamation ${
        status === "in-progress" ? "en cours de traitement" : 
        status === "closed" ? "clôturée" : "réouverte"
      }`);
    }, 500);
  };

  const handleSubmit = () => {
    if (selectedClaim.status === "open") {
      if (!assignTo) {
        toast.error("Veuillez assigner cette réclamation à un membre de l'équipe");
        return;
      }
      updateClaimStatus("in-progress");
    } else if (selectedClaim.status === "in-progress") {
      if (!responseText) {
        toast.error("Veuillez ajouter une réponse avant de clôturer la réclamation");
        return;
      }
      updateClaimStatus("closed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des Réclamations</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filtrer</span>
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Nouvelles réclamations
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newClaims}</div>
                <p className="text-xs text-muted-foreground">
                  Aujourd'hui
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  En cours de traitement
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressClaims}</div>
                <p className="text-xs text-muted-foreground">
                  Temps moyen de résolution: 2h
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Réclamations résolues
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resolvedClaims}</div>
                <p className="text-xs text-muted-foreground">
                  Ce mois-ci
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher dans les réclamations..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="open">Nouvelles</TabsTrigger>
              <TabsTrigger value="in-progress">En cours</TabsTrigger>
              <TabsTrigger value="closed">Résolues</TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              {filteredClaims.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">Aucune réclamation trouvée</p>
                  </CardContent>
                </Card>
              ) : (
                filteredClaims.map((claim) => (
                  <Card key={claim.id}>
                    <CardContent className="p-0">
                      <div className="p-4 border-l-4"
                        style={{
                          borderLeftColor: claim.status === 'open' 
                            ? '#ef4444' 
                            : claim.status === 'in-progress' 
                              ? '#f59e0b' 
                              : '#10b981'
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{claim.subject}</h3>
                            <Badge 
                              variant={
                                claim.priority === "high" ? "destructive" : 
                                claim.priority === "medium" ? "default" : "secondary"
                              }
                            >
                              {claim.priority === "high" ? "Prioritaire" : 
                              claim.priority === "medium" ? "Normale" : "Basse"}
                            </Badge>
                            <Badge 
                              variant={
                                claim.status === "open" ? "destructive" : 
                                claim.status === "in-progress" ? "default" : "secondary"
                              }
                            >
                              {claim.status === "open" ? "Nouvelle" : 
                              claim.status === "in-progress" ? "En cours" : "Résolue"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => viewClaimDetails(claim)}
                            >
                              <Edit size={16} className="mr-1" />
                              Traiter
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{claim.message}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <UserCircle size={14} />
                            <span>{claim.customer}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{claim.date} - {claim.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare size={14} />
                            <span>Réclamation #{claim.id}</span>
                          </div>
                          {claim.assignedTo && (
                            <div className="flex items-center gap-1">
                              <UserCircle size={14} />
                              <span>Assignée à: {claim.assignedTo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </Tabs>
        </main>
      </div>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Traitement de la réclamation #{selectedClaim?.id}</DialogTitle>
            <DialogDescription>
              {selectedClaim?.status === "open" ? "Assignez cette réclamation pour commencer son traitement" : 
               selectedClaim?.status === "in-progress" ? "Ajoutez une réponse pour résoudre cette réclamation" :
               "Cette réclamation est résolue"}
            </DialogDescription>
          </DialogHeader>

          {selectedClaim && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Client</Label>
                <p className="font-medium">{selectedClaim.customer}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Sujet</Label>
                <p className="font-medium">{selectedClaim.subject}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Message</Label>
                <Card className="mt-1">
                  <CardContent className="p-3 text-sm">
                    {selectedClaim.message}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Label htmlFor="assign">Assigné à</Label>
                <Select 
                  value={assignTo} 
                  onValueChange={handleAssignChange}
                  disabled={selectedClaim.status === "closed"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un employé" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStaff.map((staff) => (
                      <SelectItem key={staff} value={staff}>{staff}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="response">Réponse</Label>
                <Textarea 
                  id="response"
                  value={responseText}
                  onChange={handleResponseChange}
                  placeholder="Rédigez votre réponse au client..."
                  rows={5}
                  disabled={selectedClaim.status === "closed"}
                />
              </div>
              
              <DialogFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      selectedClaim.status === "open" ? "destructive" : 
                      selectedClaim.status === "in-progress" ? "default" : "secondary"
                    }
                    className="py-1 px-2 text-xs"
                  >
                    {selectedClaim.status === "open" ? (
                      <><AlertCircle size={14} className="mr-1" /> Nouvelle</>
                    ) : selectedClaim.status === "in-progress" ? (
                      <><RotateCw size={14} className="mr-1" /> En cours</>
                    ) : (
                      <><CheckCircle size={14} className="mr-1" /> Résolue</>
                    )}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {selectedClaim.date} à {selectedClaim.time}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {selectedClaim.status !== "closed" && (
                    <Button 
                      onClick={handleSubmit} 
                      disabled={processing}
                    >
                      {processing ? (
                        <><RotateCw className="mr-2 h-4 w-4 animate-spin" /> Traitement...</>
                      ) : selectedClaim.status === "open" ? (
                        <><RotateCw className="mr-2 h-4 w-4" /> Commencer le traitement</>
                      ) : (
                        <><CheckCircle className="mr-2 h-4 w-4" /> Résoudre la réclamation</>
                      )}
                    </Button>
                  )}
                  {selectedClaim.status !== "open" && (
                    <Button 
                      variant="outline" 
                      onClick={() => updateClaimStatus("open")} 
                      disabled={processing || selectedClaim.status === "open"}
                    >
                      <XCircle className="mr-2 h-4 w-4" /> Réouvrir
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminClaims;
