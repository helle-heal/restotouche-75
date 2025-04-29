
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Bell, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Types pour les messages
interface Message {
  id: string;
  title: string;
  content: string;
  sender: string;
  senderRole: string;
  date: string;
  isRead: boolean;
  type: "notification" | "response" | "info";
}

const EmployeeMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "MSG-001",
      title: "Réponse à votre réclamation",
      content: "Nous avons programmé une intervention technique pour le four défectueux. Un technicien passera demain à 9h. Merci de vous assurer que la cuisine sera accessible.",
      sender: "Michel Dupont",
      senderRole: "Manager",
      date: "2025-04-14T11:30:00",
      isRead: false,
      type: "response"
    },
    {
      id: "MSG-002",
      title: "Modification du planning",
      content: "Suite à la demande de plusieurs employés, les horaires du week-end ont été ajustés. Veuillez consulter le nouveau planning sur le tableau d'affichage.",
      sender: "Sophie Martin",
      senderRole: "Directrice",
      date: "2025-04-13T15:45:00",
      isRead: true,
      type: "info"
    },
    {
      id: "MSG-003",
      title: "Nouvelle tâche assignée",
      content: "Une nouvelle tâche 'Inventaire des boissons' vous a été assignée. Elle est à réaliser avant la fin de semaine.",
      sender: "Système",
      senderRole: "Notification",
      date: "2025-04-13T09:20:00",
      isRead: true,
      type: "notification"
    }
  ]);

  // Marquer un message comme lu
  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
    toast.success("Message marqué comme lu");
  };

  // Marquer tous les messages comme lus
  const markAllAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, isRead: true })));
    toast.success("Tous les messages ont été marqués comme lus");
  };

  // Navigation vers le tableau de bord
  const handleBackToDashboard = () => {
    navigate("/employee");
    toast.info("Retour au tableau de bord");
  };

  // Navigation vers les réclamations
  const navigateToClaims = () => {
    navigate("/employee/claims");
    toast.info("Navigation vers les réclamations");
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtenir l'icône selon le type de message
  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case "notification":
        return <Bell className="h-5 w-5 text-amber-500" />;
      case "response":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "info":
        return <Bell className="h-5 w-5 text-green-500" />;
    }
  };

  // Filtrer les messages non lus
  const unreadMessages = messages.filter(msg => !msg.isRead);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="employee" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Messages</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBackToDashboard}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tableau de bord
              </Button>
              <Button onClick={navigateToClaims}>
                Nouvelle réclamation
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {unreadMessages.length > 0 && (
            <div className="mb-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Tout marquer comme lu
              </Button>
            </div>
          )}
          
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500">Vous n'avez pas de messages</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card 
                  key={message.id} 
                  className={`${!message.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
                  onClick={() => !message.isRead && markAsRead(message.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-2 bg-gray-100">
                          {getMessageIcon(message.type)}
                        </div>
                        <CardTitle className="text-base font-medium">
                          {message.title}
                          {!message.isRead && (
                            <Badge className="ml-2 bg-blue-500">Nouveau</Badge>
                          )}
                        </CardTitle>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(message.date)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{message.content}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="h-3 w-3 mr-1" />
                      <span>De: {message.sender} ({message.senderRole})</span>
                    </div>
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

export default EmployeeMessages;
