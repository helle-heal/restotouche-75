
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingCart, Clock, CreditCard, TrendingUp, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleNotifications = () => {
    navigate("/admin/notifications");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleNavigation("/admin/sales")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total des ventes
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4 520,75 €</div>
                <p className="text-xs text-muted-foreground">
                  +15% par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => toast.info("Détails des commandes")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Commandes aujourd'hui
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  5 en préparation, 37 terminées
                </p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleNavigation("/admin/employees")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Employés présents
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8/12</div>
                <p className="text-xs text-muted-foreground">
                  4 absents aujourd'hui
                </p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleNavigation("/admin/tasks")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Tâches en cours
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  7 terminées, 8 en attente
                </p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleNavigation("/admin/sales")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Ticket moyen
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">19,25 €</div>
                <p className="text-xs text-muted-foreground">
                  +2,5% cette semaine
                </p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-all" onClick={handleNotifications}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Notifications
                </CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  3 nouvelles réclamations
                </p>
                <Button variant="outline" className="mt-4 w-full text-xs" onClick={(e) => {
                  e.stopPropagation();
                  handleNavigation("/admin/notifications");
                }}>
                  Voir toutes les notifications
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Actions rapides</h2>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary" onClick={() => handleNavigation("/admin/sales")}>
                Voir les ventes
              </Button>
              <Button className="btn-secondary" onClick={() => handleNavigation("/admin/employees")}>
                Gérer les employés
              </Button>
              <Button className="btn-secondary" onClick={() => handleNavigation("/admin/tasks")}>
                Nouvelles tâches
              </Button>
              <Button variant="outline" onClick={() => handleNavigation("/admin/claims")}>
                Réclamations
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
