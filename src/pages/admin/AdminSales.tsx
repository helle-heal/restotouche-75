
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Area, 
  Bar, 
  Legend 
} from "recharts";
import { 
  CreditCard, 
  DollarSign, 
  Users, 
  ShoppingBag,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Download,
} from "lucide-react";

const salesData = [
  { name: "Lun", total: 1250 },
  { name: "Mar", total: 1400 },
  { name: "Mer", total: 1800 },
  { name: "Jeu", total: 1600 },
  { name: "Ven", total: 2400 },
  { name: "Sam", total: 3200 },
  { name: "Dim", total: 2100 },
];

const productData = [
  { name: "Pizzas", value: 35 },
  { name: "Burgers", value: 25 },
  { name: "Salades", value: 15 },
  { name: "Desserts", value: 12 },
  { name: "Boissons", value: 13 },
];

const AdminSales = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Rapport des Ventes</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Période</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              <span>Exporter</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Ventes totales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 450,75 €</div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+12,5%</span>
                  <span className="text-muted-foreground">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Commandes
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">546</div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+8,2%</span>
                  <span className="text-muted-foreground">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Clients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">412</div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+5,3%</span>
                  <span className="text-muted-foreground">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Ticket moyen
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">22,80 €</div>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">-1,8%</span>
                  <span className="text-muted-foreground">vs mois dernier</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="daily">Journalier</TabsTrigger>
              <TabsTrigger value="weekly">Hebdomadaire</TabsTrigger>
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes hebdomadaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={salesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#F97316"
                        fill="#FDBA74"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des ventes par produit</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      width={500}
                      height={300}
                      data={productData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Pourcentage" fill="#1E3A8A" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes journalières</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Sélectionnez une date pour voir les ventes journalières
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes hebdomadaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={salesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#F97316"
                        fill="#FDBA74"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes mensuelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Sélectionnez un mois pour voir les ventes mensuelles
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminSales;
