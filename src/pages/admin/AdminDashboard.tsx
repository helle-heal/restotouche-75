
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Package, Tag, Users, ClipboardList, BarChartBig, Bell, MessageSquare, ArrowUp, ArrowDown } from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord administrateur</h1>
        
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Ventes Aujourd'hui</CardTitle>
              <BarChartBig className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4 580 DH</div>
              <div className="flex items-center mt-1 text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12%</span>
                <span className="text-muted-foreground ml-1">vs hier</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Commandes du jour</CardTitle>
              <ShoppingCart className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <div className="flex items-center mt-1 text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+8%</span>
                <span className="text-muted-foreground ml-1">vs hier</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Employés actifs</CardTitle>
              <Users className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8/10</div>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-muted-foreground">2 absents aujourd'hui</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Réclamations</CardTitle>
              <MessageSquare className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center mt-1 text-sm">
                <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">-2</span>
                <span className="text-muted-foreground ml-1">cette semaine</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Accès rapides */}
        <h2 className="text-xl font-semibold mb-4">Accès rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Catégories et Produits</CardTitle>
              <Tag className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <Link to="/admin/product-category">
                <Button className="w-full">Gérer</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Employés</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <Link to="/admin/employees">
                <Button className="w-full">Gérer</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Tâches</CardTitle>
              <ClipboardList className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <Link to="/admin/tasks">
                <Button className="w-full">Gérer</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Ventes</CardTitle>
              <BarChartBig className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <Link to="/admin/sales">
                <Button className="w-full">Analyser</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Activité récente */}
        <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
        <Card>
          <CardHeader>
            <CardTitle>Derniers événements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full bg-blue-100 p-2 mr-3">
                  <ShoppingCart className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Nouvelle commande #4872</p>
                  <p className="text-sm text-muted-foreground">Il y a 5 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Sophie Martin a pointé son arrivée</p>
                  <p className="text-sm text-muted-foreground">Il y a 32 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-red-100 p-2 mr-3">
                  <MessageSquare className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Nouvelle réclamation de Martin Dupuis</p>
                  <p className="text-sm text-muted-foreground">Il y a 1 heure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
