
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Types pour les tâches
type TaskPriority = "haute" | "moyenne" | "basse";
type TaskStatus = "en_attente" | "en_cours" | "terminée";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedBy: string;
}

const EmployeeTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Préparer la salle avant l'ouverture",
      description: "Nettoyer les tables, placer les couverts et vérifier la propreté",
      priority: "haute",
      status: "en_attente",
      dueDate: "2025-04-15",
      assignedBy: "Michel (Manager)"
    },
    {
      id: "2",
      title: "Réapprovisionner le stock de boissons",
      description: "Commander les boissons manquantes selon la liste fournie",
      priority: "moyenne",
      status: "en_cours",
      dueDate: "2025-04-16",
      assignedBy: "Sophie (Directrice)"
    },
    {
      id: "3",
      title: "Vérifier le fonctionnement des caisses",
      description: "S'assurer que les terminaux de paiement fonctionnent correctement",
      priority: "basse",
      status: "terminée",
      dueDate: "2025-04-14",
      assignedBy: "Michel (Manager)"
    }
  ]);

  // Fonction pour démarrer une tâche
  const startTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: "en_cours" } : task
    ));
    toast.success("Tâche démarrée avec succès");
  };

  // Fonction pour terminer une tâche
  const completeTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: "terminée" } : task
    ));
    toast.success("Tâche marquée comme terminée");
  };

  // Fonction pour retourner au tableau de bord
  const goToDashboard = () => {
    navigate("/employee");
    toast.info("Retour au tableau de bord");
  };

  // Couleurs selon priorité
  const priorityColors = {
    haute: "bg-red-100 text-red-800",
    moyenne: "bg-yellow-100 text-yellow-800",
    basse: "bg-green-100 text-green-800"
  };

  // Filtrer les tâches par statut
  const pendingTasks = tasks.filter(task => task.status === "en_attente");
  const inProgressTasks = tasks.filter(task => task.status === "en_cours");
  const completedTasks = tasks.filter(task => task.status === "terminée");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="employee" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mes Tâches</h1>
          <Button variant="outline" size="sm" onClick={goToDashboard}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au Dashboard
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Card>
              <CardHeader className="bg-amber-50 border-b">
                <CardTitle className="text-sm font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                  À faire ({pendingTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {pendingTasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Aucune tâche en attente</p>
                ) : (
                  <div className="space-y-4">
                    {pendingTasks.map(task => (
                      <div key={task.id} className="border rounded-lg p-3 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={priorityColors[task.priority]}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Échéance: {task.dueDate}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Assigné par: {task.assignedBy}
                        </p>
                        <Button 
                          className="w-full" 
                          size="sm"
                          onClick={() => startTask(task.id)}
                        >
                          Démarrer
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50 border-b">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  En cours ({inProgressTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {inProgressTasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Aucune tâche en cours</p>
                ) : (
                  <div className="space-y-4">
                    {inProgressTasks.map(task => (
                      <div key={task.id} className="border rounded-lg p-3 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={priorityColors[task.priority]}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Échéance: {task.dueDate}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Assigné par: {task.assignedBy}
                        </p>
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700" 
                          size="sm"
                          onClick={() => completeTask(task.id)}
                        >
                          Terminer
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-green-50 border-b">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Terminées ({completedTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {completedTasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Aucune tâche terminée</p>
                ) : (
                  <div className="space-y-4">
                    {completedTasks.map(task => (
                      <div key={task.id} className="border rounded-lg p-3 bg-white shadow-sm opacity-80">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge className={priorityColors[task.priority]}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Échéance: {task.dueDate}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Assigné par: {task.assignedBy}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeTasks;
