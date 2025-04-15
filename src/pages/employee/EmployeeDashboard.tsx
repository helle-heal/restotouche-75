
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  Clock,
  Bell,
  MessageSquare,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";

const EmployeeDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="employee" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Statut de présence
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xl font-bold text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Présent</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Arrivée: 08:30 - Aujourd'hui
                </p>
                <Button className="mt-4 w-full">Signaler départ</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Tâches à réaliser
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  2 prioritaires, 1 standard
                </p>
                <Button variant="outline" className="mt-4 w-full">
                  Voir les tâches
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Commandes en attente
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Dernière: il y a 3 min
                </p>
                <Button variant="outline" className="mt-4 w-full">
                  Voir les commandes
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Notifications
                </CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  1 nouvelle tâche assignée
                </p>
                <Button variant="outline" className="mt-4 w-full text-xs">
                  Voir toutes les notifications
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Messages
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  Réponse à votre réclamation
                </p>
                <Button variant="outline" className="mt-4 w-full">
                  Voir les messages
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Actions rapides</h2>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary">Signaler une réclamation</Button>
              <Button className="btn-secondary">Voir mes tâches</Button>
              <Button variant="outline">Consulter les commandes</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
