
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Check,
  Clock,
  Info,
  AlertTriangle,
  X,
  Settings,
  ShoppingBag,
  User,
  Calendar,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Stock bas - Farine",
    message: "Le stock de farine est sous le seuil minimal. Veuillez commander.",
    time: "Il y a 15 minutes",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "Nouvelle commande #1245",
    message: "Une nouvelle commande d'un montant de 42,50€ a été reçue.",
    time: "Il y a 30 minutes",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    title: "Réclamation client",
    message: "Un client a déposé une réclamation concernant sa commande #1242.",
    time: "Il y a 1 heure",
    read: false,
  },
  {
    id: 4,
    type: "system",
    title: "Maintenance système",
    message: "Une maintenance du système est prévue ce soir à 23h00.",
    time: "Il y a 2 heures",
    read: true,
  },
  {
    id: 5,
    type: "info",
    title: "Sophie a pointé",
    message: "L'employé Sophie Martin a pointé son arrivée à 8h45.",
    time: "Aujourd'hui, 8h45",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "Mise à jour terminée",
    message: "La mise à jour du système a été effectuée avec succès.",
    time: "Hier, 22h30",
    read: true,
  },
];

const AdminNotifications = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Check size={16} />
              <span>Tout marquer comme lu</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Paramètres</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Toutes
                </CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  3 non lues
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Alertes
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  2 non lues
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Informations
                </CardTitle>
                <Info className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">
                  1 non lue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Système
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  0 non lue
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="unread">Non lues</TabsTrigger>
              <TabsTrigger value="alerts">Alertes</TabsTrigger>
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="system">Système</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="mr-4">
                        {notification.type === "alert" && (
                          <div className="bg-red-100 p-2 rounded-full text-red-500">
                            <AlertTriangle size={24} />
                          </div>
                        )}
                        {notification.type === "info" && (
                          <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                            <Info size={24} />
                          </div>
                        )}
                        {notification.type === "system" && (
                          <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                            <Settings size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="bg-blue-500">Nouveau</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="unread" className="space-y-4">
              {notifications.filter(n => !n.read).map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="mr-4">
                        {notification.type === "alert" && (
                          <div className="bg-red-100 p-2 rounded-full text-red-500">
                            <AlertTriangle size={24} />
                          </div>
                        )}
                        {notification.type === "info" && (
                          <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                            <Info size={24} />
                          </div>
                        )}
                        {notification.type === "system" && (
                          <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                            <Settings size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <Badge variant="default" className="bg-blue-500">Nouveau</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="alerts" className="space-y-4">
              {notifications.filter(n => n.type === "alert").map((notification) => (
                <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="mr-4">
                        <div className="bg-red-100 p-2 rounded-full text-red-500">
                          <AlertTriangle size={24} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="bg-blue-500">Nouveau</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="info" className="space-y-4">
              {notifications.filter(n => n.type === "info").map((notification) => (
                <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="mr-4">
                        <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                          <Info size={24} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="bg-blue-500">Nouveau</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="system" className="space-y-4">
              {notifications.filter(n => n.type === "system").map((notification) => (
                <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="mr-4">
                        <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                          <Settings size={24} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="bg-blue-500">Nouveau</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <X size={16} />
                        </Button>
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

export default AdminNotifications;
