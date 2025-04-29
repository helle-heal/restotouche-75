
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  Plus,
  AlertCircle,
  Calendar,
  Users,
  ArrowLeft
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialTasks = [
  {
    id: 1,
    title: "Inventaire cuisine",
    status: "completed",
    assignee: "Jean Dupont",
    dueDate: "Terminé il y a 2 jours",
    priority: "medium",
  },
  {
    id: 2,
    title: "Nettoyage salle",
    status: "in-progress",
    assignee: "Marie Laurent",
    dueDate: "Aujourd'hui",
    priority: "high",
  },
  {
    id: 3,
    title: "Commander nappes",
    status: "pending",
    assignee: "Non assigné",
    dueDate: "Demain",
    priority: "low",
  },
  {
    id: 4,
    title: "Entretien machine à café",
    status: "pending",
    assignee: "Thomas Petit",
    dueDate: "18/04/2025",
    priority: "medium",
  },
  {
    id: 5,
    title: "Formation nouveau serveur",
    status: "pending",
    assignee: "Sophie Martin",
    dueDate: "20/04/2025",
    priority: "high",
  },
];

const AdminTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "medium",
    assignee: "Non assigné",
    dueDate: "",
  });

  const handleBack = () => {
    navigate("/admin");
  };

  const handleAddTask = () => {
    if (!newTask.title) {
      toast.error("Veuillez saisir un titre pour la tâche");
      return;
    }

    const newTaskEntry = {
      id: tasks.length + 1,
      title: newTask.title,
      status: "pending",
      assignee: newTask.assignee,
      dueDate: newTask.dueDate || "Non définie",
      priority: newTask.priority as "low" | "medium" | "high",
    };

    setTasks([...tasks, newTaskEntry]);
    setNewTask({
      title: "",
      priority: "medium",
      assignee: "Non assigné",
      dueDate: "",
    });
    setDialogOpen(false);
    toast.success("Nouvelle tâche créée avec succès!");
  };

  const handleMarkCompleted = (taskId: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? {...task, status: "completed"} : task
    );
    setTasks(updatedTasks);
    toast.success("Tâche marquée comme terminée!");
  };

  const handleAssignToEmployee = (taskId: number, employeeName: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, assignee: employeeName} : task
    );
    setTasks(updatedTasks);
    toast.success(`Tâche assignée à ${employeeName}`);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getPendingTasksCount = () => {
    return tasks.filter(t => t.status === "pending").length;
  };
  
  const getInProgressTasksCount = () => {
    return tasks.filter(t => t.status === "in-progress").length;
  };
  
  const getCompletedTasksCount = () => {
    return tasks.filter(t => t.status === "completed").length;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Gestion des Tâches</h1>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                <span>Nouvelle tâche</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle tâche</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations ci-dessous pour créer une nouvelle tâche.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titre
                  </Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="col-span-3"
                    placeholder="Ex: Nettoyage de la cuisine"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priorité
                  </Label>
                  <Select 
                    value={newTask.priority} 
                    onValueChange={(value) => setNewTask({...newTask, priority: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Haute</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="low">Basse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assignee" className="text-right">
                    Assigné à
                  </Label>
                  <Select 
                    value={newTask.assignee} 
                    onValueChange={(value) => setNewTask({...newTask, assignee: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Assigner à" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jean Dupont">Jean Dupont</SelectItem>
                      <SelectItem value="Marie Laurent">Marie Laurent</SelectItem>
                      <SelectItem value="Thomas Petit">Thomas Petit</SelectItem>
                      <SelectItem value="Sophie Martin">Sophie Martin</SelectItem>
                      <SelectItem value="Non assigné">Non assigné</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Échéance
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddTask}>Créer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Tâches en attente
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getPendingTasksCount()}</div>
                <p className="text-xs text-muted-foreground">
                  {tasks.filter(t => t.status === "pending" && t.priority === "high").length} tâches prioritaires
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Tâches en cours
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getInProgressTasksCount()}</div>
                <p className="text-xs text-muted-foreground">
                  {tasks.filter(t => t.status === "in-progress" && t.priority === "high").length > 0 ? `${tasks.filter(t => t.status === "in-progress" && t.priority === "high").length} en retard` : 'Toutes dans les délais'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Tâches terminées
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getCompletedTasksCount()}</div>
                <p className="text-xs text-muted-foreground">
                  Cette semaine
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="in-progress">En cours</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center border-l-4 p-4"
                      style={{
                        borderLeftColor: task.status === 'completed' 
                          ? '#10b981' 
                          : task.status === 'in-progress' 
                            ? '#f59e0b' 
                            : '#6b7280'
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{task.title}</h3>
                          <Badge 
                            variant={
                              task.priority === "high" ? "destructive" : 
                              task.priority === "medium" ? "default" : "secondary"
                            }
                          >
                            {task.priority === "high" ? "Haute" : 
                             task.priority === "medium" ? "Moyenne" : "Basse"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {task.status !== "completed" && task.assignee === "Non assigné" && (
                          <Select 
                            onValueChange={(value) => handleAssignToEmployee(task.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Assigner à" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Jean Dupont">Jean Dupont</SelectItem>
                              <SelectItem value="Marie Laurent">Marie Laurent</SelectItem>
                              <SelectItem value="Thomas Petit">Thomas Petit</SelectItem>
                              <SelectItem value="Sophie Martin">Sophie Martin</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        <Button 
                          variant={task.status === "completed" ? "ghost" : "outline"} 
                          size="sm"
                          disabled={task.status === "completed"}
                          onClick={() => task.status !== "completed" && handleMarkCompleted(task.id)}
                        >
                          {task.status === "completed" ? "Terminé" : "Marquer terminé"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              {tasks.filter(t => t.status === "pending").map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center border-l-4 p-4"
                      style={{ borderLeftColor: '#6b7280' }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{task.title}</h3>
                          <Badge 
                            variant={
                              task.priority === "high" ? "destructive" : 
                              task.priority === "medium" ? "default" : "secondary"
                            }
                          >
                            {task.priority === "high" ? "Haute" : 
                             task.priority === "medium" ? "Moyenne" : "Basse"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {task.assignee === "Non assigné" && (
                          <Select 
                            onValueChange={(value) => handleAssignToEmployee(task.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Assigner à" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Jean Dupont">Jean Dupont</SelectItem>
                              <SelectItem value="Marie Laurent">Marie Laurent</SelectItem>
                              <SelectItem value="Thomas Petit">Thomas Petit</SelectItem>
                              <SelectItem value="Sophie Martin">Sophie Martin</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkCompleted(task.id)}
                        >
                          Marquer terminé
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="in-progress" className="space-y-4">
              {tasks.filter(t => t.status === "in-progress").map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center border-l-4 p-4"
                      style={{ borderLeftColor: '#f59e0b' }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{task.title}</h3>
                          <Badge 
                            variant={
                              task.priority === "high" ? "destructive" : 
                              task.priority === "medium" ? "default" : "secondary"
                            }
                          >
                            {task.priority === "high" ? "Haute" : 
                             task.priority === "medium" ? "Moyenne" : "Basse"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkCompleted(task.id)}
                        >
                          Marquer terminé
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              {tasks.filter(t => t.status === "completed").map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center border-l-4 p-4"
                      style={{ borderLeftColor: '#10b981' }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{task.title}</h3>
                          <Badge 
                            variant={
                              task.priority === "high" ? "destructive" : 
                              task.priority === "medium" ? "default" : "secondary"
                            }
                          >
                            {task.priority === "high" ? "Haute" : 
                             task.priority === "medium" ? "Moyenne" : "Basse"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" disabled>
                          Terminé
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

export default AdminTasks;
