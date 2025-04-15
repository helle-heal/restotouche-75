
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Filter,
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  UserCircle,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const claims = [
  {
    id: 1,
    customer: "Martin Dupuis",
    subject: "Erreur dans la commande",
    message: "J'ai commandé une pizza végétarienne mais j'ai reçu une pizza au jambon. Je suis végétarien et je n'ai pas pu manger ma commande.",
    status: "open",
    priority: "high",
    date: "15/04/2025",
    time: "14:35",
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
  },
];

const AdminClaims = () => {
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
                <div className="text-2xl font-bold">2</div>
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
                <div className="text-2xl font-bold">2</div>
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
                <div className="text-2xl font-bold">15</div>
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
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="open">Nouvelles</TabsTrigger>
              <TabsTrigger value="in-progress">En cours</TabsTrigger>
              <TabsTrigger value="closed">Résolues</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {claims.map((claim) => (
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
                          <Button variant="outline" size="sm">Voir détails</Button>
                          {claim.status !== "closed" && (
                            <Button variant="outline" size="sm">Assigner</Button>
                          )}
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="open" className="space-y-4">
              {claims.filter(c => c.status === "open").map((claim) => (
                <Card key={claim.id}>
                  <CardContent className="p-0">
                    <div className="p-4 border-l-4 border-l-red-500">
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
                          <Badge variant="destructive">Nouvelle</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Voir détails</Button>
                          <Button variant="outline" size="sm">Assigner</Button>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="in-progress" className="space-y-4">
              {claims.filter(c => c.status === "in-progress").map((claim) => (
                <Card key={claim.id}>
                  <CardContent className="p-0">
                    <div className="p-4 border-l-4 border-l-yellow-500">
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
                          <Badge>En cours</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Voir détails</Button>
                          <Button variant="outline" size="sm">Assigner</Button>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="closed" className="space-y-4">
              {claims.filter(c => c.status === "closed").map((claim) => (
                <Card key={claim.id}>
                  <CardContent className="p-0">
                    <div className="p-4 border-l-4 border-l-green-500">
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
                          <Badge variant="secondary">Résolue</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Voir détails</Button>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminClaims;
