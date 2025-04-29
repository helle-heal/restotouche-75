
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, CreditCard, Download, Filter, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Données fictives pour les ventes
const salesData = {
  today: 520.75,
  yesterday: 480.50,
  week: 3250.80,
  month: 14520.75,
  year: 158740.50
};

const productSalesData = [
  { id: 1, name: "Burger Classic", quantity: 124, total: 1054.00, trend: "+12%" },
  { id: 2, name: "Pizza Margherita", quantity: 98, total: 882.00, trend: "+8%" },
  { id: 3, name: "Salade César", quantity: 65, total: 487.50, trend: "-3%" },
  { id: 4, name: "Limonade Maison", quantity: 143, total: 500.50, trend: "+15%" },
  { id: 5, name: "Dessert Tiramisu", quantity: 87, total: 478.50, trend: "+5%" }
];

const AdminSales = () => {
  const [period, setPeriod] = useState("month");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin");
  };

  const handleExport = () => {
    alert("Export des données de vente en cours...");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="p-2" 
              onClick={handleBack}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Ventes</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="yesterday">Hier</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download size={16} className="mr-2" />
              Exporter
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Ventes totales
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesData[period as keyof typeof salesData].toFixed(2)} €</div>
                <p className="text-xs text-muted-foreground">
                  +15% par rapport à la période précédente
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Transactions
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">254</div>
                <p className="text-xs text-muted-foreground">
                  +8% par rapport à la période précédente
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Panier moyen
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,50 €</div>
                <p className="text-xs text-muted-foreground">
                  +5% par rapport à la période précédente
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Commandes
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  Aujourd'hui
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="products">Par produit</TabsTrigger>
              <TabsTrigger value="categories">Par catégorie</TabsTrigger>
              <TabsTrigger value="time">Par période</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>Ventes par produit</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                  </Button>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Produit</th>
                        <th className="text-right py-3">Quantité vendue</th>
                        <th className="text-right py-3">Total</th>
                        <th className="text-right py-3">Évolution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productSalesData.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="py-3">{product.name}</td>
                          <td className="text-right py-3">{product.quantity}</td>
                          <td className="text-right py-3">{product.total.toFixed(2)} €</td>
                          <td className={`text-right py-3 ${product.trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                            {product.trend}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes par catégorie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Graphique des ventes par catégorie</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="time">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des ventes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Graphique de l'évolution des ventes</p>
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
