
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Clock, CheckCircle2, Timer, X } from "lucide-react";
import { toast } from "sonner";

// Types pour les commandes
type OrderStatus = "nouvelle" | "en_préparation" | "prête" | "livrée" | "annulée";
type OrderType = "sur_place" | "à_emporter";
type PaymentMethod = "carte" | "espèces";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  type: OrderType;
  tableNumber?: string;
  paymentMethod: PaymentMethod;
  total: number;
  createdAt: string;
  customerEmail: string;
}

const EmployeeOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "CMD-001",
      items: [
        { id: "1", name: "Burger Classique", quantity: 2, price: 8.5 },
        { id: "2", name: "Frites", quantity: 1, price: 3.5 },
        { id: "3", name: "Coca-Cola", quantity: 2, price: 2.5, options: ["Sans glace"] }
      ],
      status: "nouvelle",
      type: "sur_place",
      tableNumber: "12",
      paymentMethod: "carte",
      total: 25.5,
      createdAt: "2025-04-15T14:30:00",
      customerEmail: "client@example.com"
    },
    {
      id: "CMD-002",
      items: [
        { id: "1", name: "Pizza Margherita", quantity: 1, price: 12 },
        { id: "2", name: "Tiramisu", quantity: 1, price: 5 }
      ],
      status: "en_préparation",
      type: "à_emporter",
      paymentMethod: "espèces",
      total: 17,
      createdAt: "2025-04-15T14:15:00",
      customerEmail: "client2@example.com"
    },
    {
      id: "CMD-003",
      items: [
        { id: "1", name: "Salade César", quantity: 1, price: 9.5 },
        { id: "2", name: "Eau minérale", quantity: 1, price: 2 }
      ],
      status: "prête",
      type: "sur_place",
      tableNumber: "5",
      paymentMethod: "carte",
      total: 11.5,
      createdAt: "2025-04-15T13:45:00",
      customerEmail: "client3@example.com"
    }
  ]);

  // Passer à l'état suivant d'une commande
  const advanceOrderStatus = (orderId: string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        let nextStatus: OrderStatus = order.status;
        
        switch (order.status) {
          case "nouvelle":
            nextStatus = "en_préparation";
            toast.success("Commande prise en charge");
            break;
          case "en_préparation":
            nextStatus = "prête";
            toast.success("Commande marquée comme prête");
            break;
          case "prête":
            nextStatus = "livrée";
            toast.success("Commande marquée comme livrée");
            break;
          default:
            break;
        }
        
        return { ...order, status: nextStatus };
      }
      return order;
    }));
  };

  // Annuler une commande
  const cancelOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "annulée" } : order
    ));
    
    toast.error("Commande annulée");
  };

  // Format de l'heure
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Navigation vers le tableau de bord
  const handleBackToDashboard = () => {
    navigate("/employee");
    toast.info("Navigation vers le tableau de bord");
  };

  // Filtrer les commandes par statut
  const newOrders = orders.filter(order => order.status === "nouvelle");
  const inProgressOrders = orders.filter(order => order.status === "en_préparation");
  const readyOrders = orders.filter(order => order.status === "prête");
  const completedOrders = orders.filter(order => order.status === "livrée" || order.status === "annulée");

  // Couleurs et icônes selon status
  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case "nouvelle":
        return { 
          color: "bg-blue-100 text-blue-800", 
          icon: <ShoppingCart className="h-4 w-4 mr-1" /> 
        };
      case "en_préparation":
        return { 
          color: "bg-yellow-100 text-yellow-800", 
          icon: <Timer className="h-4 w-4 mr-1" /> 
        };
      case "prête":
        return { 
          color: "bg-green-100 text-green-800", 
          icon: <CheckCircle2 className="h-4 w-4 mr-1" /> 
        };
      case "livrée":
        return { 
          color: "bg-purple-100 text-purple-800", 
          icon: <CheckCircle2 className="h-4 w-4 mr-1" /> 
        };
      case "annulée":
        return { 
          color: "bg-red-100 text-red-800", 
          icon: <X className="h-4 w-4 mr-1" /> 
        };
    }
  };

  // Traduire le statut en français
  const translateStatus = (status: OrderStatus) => {
    switch (status) {
      case "nouvelle": return "Nouvelle";
      case "en_préparation": return "En préparation";
      case "prête": return "Prête";
      case "livrée": return "Livrée";
      case "annulée": return "Annulée";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="employee" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Commandes</h1>
            <Button variant="outline" onClick={handleBackToDashboard}>
              Retour au tableau de bord
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <div className="space-y-4">
              <h2 className="font-medium flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2 text-blue-500" />
                Nouvelles commandes ({newOrders.length})
              </h2>
              
              {newOrders.map(order => (
                <Card key={order.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">{order.id}</CardTitle>
                      <Badge className={getStatusInfo(order.status).color}>
                        {getStatusInfo(order.status).icon}
                        {translateStatus(order.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(order.createdAt)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span>{order.total.toFixed(2)} €</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span className="bg-gray-200 px-2 py-1 rounded mr-2">
                        {order.type === "sur_place" ? "Sur place" : "À emporter"}
                      </span>
                      {order.tableNumber && (
                        <span className="bg-gray-200 px-2 py-1 rounded">
                          Table {order.tableNumber}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => advanceOrderStatus(order.id)}
                      >
                        Prendre en charge
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-none text-red-600" 
                        onClick={() => cancelOrder(order.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {newOrders.length === 0 && (
                <Card className="bg-gray-50 border border-dashed">
                  <CardContent className="flex items-center justify-center py-6">
                    <p className="text-sm text-muted-foreground">Aucune nouvelle commande</p>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="space-y-4">
              <h2 className="font-medium flex items-center">
                <Timer className="h-4 w-4 mr-2 text-yellow-500" />
                En préparation ({inProgressOrders.length})
              </h2>
              
              {inProgressOrders.map(order => (
                <Card key={order.id} className="border-l-4 border-l-yellow-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">{order.id}</CardTitle>
                      <Badge className={getStatusInfo(order.status).color}>
                        {getStatusInfo(order.status).icon}
                        {translateStatus(order.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(order.createdAt)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span className="bg-gray-200 px-2 py-1 rounded mr-2">
                        {order.type === "sur_place" ? "Sur place" : "À emporter"}
                      </span>
                      {order.tableNumber && (
                        <span className="bg-gray-200 px-2 py-1 rounded">
                          Table {order.tableNumber}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700" 
                      onClick={() => advanceOrderStatus(order.id)}
                    >
                      Marquer comme prête
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {inProgressOrders.length === 0 && (
                <Card className="bg-gray-50 border border-dashed">
                  <CardContent className="flex items-center justify-center py-6">
                    <p className="text-sm text-muted-foreground">Aucune commande en préparation</p>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="space-y-4">
              <h2 className="font-medium flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Prêtes à servir ({readyOrders.length})
              </h2>
              
              {readyOrders.map(order => (
                <Card key={order.id} className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">{order.id}</CardTitle>
                      <Badge className={getStatusInfo(order.status).color}>
                        {getStatusInfo(order.status).icon}
                        {translateStatus(order.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(order.createdAt)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span className="bg-gray-200 px-2 py-1 rounded mr-2">
                        {order.type === "sur_place" ? "Sur place" : "À emporter"}
                      </span>
                      {order.tableNumber && (
                        <span className="bg-gray-200 px-2 py-1 rounded">
                          Table {order.tableNumber}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700" 
                      onClick={() => advanceOrderStatus(order.id)}
                    >
                      Marquer comme livrée
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {readyOrders.length === 0 && (
                <Card className="bg-gray-50 border border-dashed">
                  <CardContent className="flex items-center justify-center py-6">
                    <p className="text-sm text-muted-foreground">Aucune commande prête</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {completedOrders.length > 0 && (
            <div className="mt-8">
              <h2 className="font-medium mb-4">Commandes terminées (aujourd'hui)</h2>
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-xs font-medium text-gray-500">
                      <tr>
                        <th className="px-4 py-3 text-left">ID</th>
                        <th className="px-4 py-3 text-left">Heure</th>
                        <th className="px-4 py-3 text-left">Type</th>
                        <th className="px-4 py-3 text-right">Total</th>
                        <th className="px-4 py-3 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {completedOrders.map(order => (
                        <tr key={order.id} className="text-sm">
                          <td className="px-4 py-3">{order.id}</td>
                          <td className="px-4 py-3">{formatTime(order.createdAt)}</td>
                          <td className="px-4 py-3">{order.type === "sur_place" ? "Sur place" : "À emporter"}</td>
                          <td className="px-4 py-3 text-right">{order.total.toFixed(2)} €</td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center">
                              <Badge className={getStatusInfo(order.status).color}>
                                {getStatusInfo(order.status).icon}
                                {translateStatus(order.status)}
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeOrders;
