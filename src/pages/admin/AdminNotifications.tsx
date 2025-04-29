
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const notifications = [
  {
    id: 1,
    title: "Nouvelle commande",
    message: "Table 5: 2 Burgers Classic, 1 Pizza Margherita",
    time: "Il y a 5 minutes",
    read: false,
    type: "order"
  },
  {
    id: 2,
    title: "Réclamation client",
    message: "Martin Dupuis se plaint d'une erreur dans sa commande",
    time: "Il y a 35 minutes",
    read: false,
    type: "claim"
  },
  {
    id: 3,
    title: "Rupture de stock",
    message: "Le produit 'Bière Artisanale' est en rupture de stock",
    time: "Il y a 2 heures",
    read: false,
    type: "stock"
  },
  {
    id: 4,
    title: "Nouveau message",
    message: "Sophie Martin a envoyé un message concernant son horaire",
    time: "Hier",
    read: true,
    type: "message"
  },
  {
    id: 5,
    title: "Mise à jour du système",
    message: "Une mise à jour du système est disponible",
    time: "Il y a 2 jours",
    read: true,
    type: "system"
  },
];

const AdminNotifications = () => {
  const [notifList, setNotifList] = useState(notifications);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin");
  };

  const handleReadAll = () => {
    setNotifList(notifList.map(notif => ({ ...notif, read: true })));
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const handleMarkAsRead = (id: number) => {
    setNotifList(notifList.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    toast.success("Notification marquée comme lue");
  };

  const handleNotificationClick = (notification: any) => {
    // Redirection basée sur le type de notification
    if (notification.type === "claim") {
      navigate("/admin/claims");
    } else if (notification.type === "order") {
      toast.info("Affichage des détails de la commande");
    } else if (notification.type === "stock") {
      navigate("/admin/products");
    }
    
    handleMarkAsRead(notification.id);
  };

  const unreadCount = notifList.filter(notif => !notif.read).length;

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
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-resto-orange">{unreadCount} non lues</Badge>
            )}
          </div>
          <Button variant="outline" onClick={handleReadAll}>
            Tout marquer comme lu
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {notifList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Bell size={64} className="text-muted-foreground mb-4" />
              <p className="text-xl font-medium">Aucune notification</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifList.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`hover:shadow-md transition-shadow cursor-pointer ${!notification.read ? 'border-l-4 border-resto-orange' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4 flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="outline" className="text-resto-orange border-resto-orange">
                            Nouveau
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                      >
                        <Check size={16} />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminNotifications;
