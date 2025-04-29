
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { User, Plus, Search, Filter, ArrowDownUp, ArrowLeft } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const initialEmployees = [
  { id: 1, name: "Jean Dupont", role: "Chef de cuisine", status: "Actif", startDate: "15/03/2022", lastActivity: "Aujourd'hui" },
  { id: 2, name: "Marie Laurent", role: "Serveur", status: "Actif", startDate: "22/05/2022", lastActivity: "Hier" },
  { id: 3, name: "Thomas Petit", role: "Barman", status: "Congé", startDate: "10/01/2023", lastActivity: "Il y a 5 jours" },
  { id: 4, name: "Sophie Martin", role: "Serveur", status: "Actif", startDate: "03/06/2023", lastActivity: "Aujourd'hui" },
  { id: 5, name: "Lucas Bernard", role: "Commis", status: "Inactif", startDate: "12/09/2022", lastActivity: "Il y a 2 semaines" },
];

const AdminEmployees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "Serveur",
    status: "Actif",
  });
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"view" | "edit" | null>(null);

  // Fonction pour déterminer la variante de badge en fonction du statut
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Actif":
        return "default";
      case "Congé":
        return "secondary";
      case "Inactif":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name) {
      toast.error("Veuillez saisir un nom");
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}/${(currentDate.getMonth() + 1).toString().padStart(2, "0")}/${currentDate.getFullYear()}`;

    const newEmployeeEntry = {
      id: employees.length + 1,
      name: newEmployee.name,
      role: newEmployee.role,
      status: newEmployee.status,
      startDate: formattedDate,
      lastActivity: "Aujourd'hui",
    };

    setEmployees([...employees, newEmployeeEntry]);
    setNewEmployee({
      name: "",
      role: "Serveur",
      status: "Actif",
    });
    setDialogOpen(false);
    toast.success("Employé ajouté avec succès!");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewEmployee = (id: number) => {
    setSelectedEmployee(id);
    setViewMode("view");
    toast.info("Affichage des détails de l'employé");
  };

  const handleEditEmployee = (id: number) => {
    setSelectedEmployee(id);
    setViewMode("edit");
    toast.info("Modification du statut de l'employé");
  };

  const handleChangeStatus = (id: number, newStatus: string) => {
    setEmployees(employees.map(employee => 
      employee.id === id ? {...employee, status: newStatus} : employee
    ));
    setSelectedEmployee(null);
    setViewMode(null);
    toast.success("Statut mis à jour avec succès!");
  };

  const handleDeleteEmployee = (id: number) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
    setViewMode(null);
    toast.success("Employé supprimé avec succès!");
  };

  const handleBack = () => {
    navigate("/admin");
  };

  const handleSort = () => {
    const sortedEmployees = [...employees].sort((a, b) => a.name.localeCompare(b.name));
    setEmployees(sortedEmployees);
    toast.info("Liste triée par nom");
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
            <h1 className="text-2xl font-bold">Gestion des Employés</h1>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                <span>Ajouter un employé</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel employé</DialogTitle>
                <DialogDescription>
                  Veuillez remplir les informations ci-dessous pour ajouter un nouvel employé.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="col-span-3"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Rôle
                  </Label>
                  <Select 
                    value={newEmployee.role} 
                    onValueChange={(value) => setNewEmployee({...newEmployee, role: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chef de cuisine">Chef de cuisine</SelectItem>
                      <SelectItem value="Serveur">Serveur</SelectItem>
                      <SelectItem value="Barman">Barman</SelectItem>
                      <SelectItem value="Commis">Commis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Statut
                  </Label>
                  <Select 
                    value={newEmployee.status} 
                    onValueChange={(value) => setNewEmployee({...newEmployee, status: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actif">Actif</SelectItem>
                      <SelectItem value="Congé">Congé</SelectItem>
                      <SelectItem value="Inactif">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddEmployee}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher un employé..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2" onClick={() => toast.info("Filtres appliqués")}>
                  <Filter size={16} />
                  <span>Filtrer</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleSort}
                >
                  <ArrowDownUp size={16} />
                  <span>Trier</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Liste des employés</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date d'embauche</TableHead>
                    <TableHead>Dernière activité</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <User size={16} />
                        </div>
                        {employee.name}
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={getBadgeVariant(employee.status)}
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.startDate}</TableCell>
                      <TableCell>{employee.lastActivity}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewEmployee(employee.id)}
                        >
                          Voir
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditEmployee(employee.id)}
                        >
                          Éditer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Affichage de {filteredEmployees.length} employés sur {employees.length} au total
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Précédent</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </main>
      </div>

      {/* Dialog for viewing and editing employee */}
      {selectedEmployee && viewMode && (
        <Dialog open={true} onOpenChange={() => {
          setSelectedEmployee(null);
          setViewMode(null);
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {viewMode === "view" ? "Détails de l'employé" : "Modifier l'employé"}
              </DialogTitle>
            </DialogHeader>
            {viewMode === "view" ? (
              <div className="space-y-4">
                {employees.filter(e => e.id === selectedEmployee).map(employee => (
                  <div key={employee.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Nom:</span>
                      <span>{employee.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Rôle:</span>
                      <span>{employee.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Statut:</span>
                      <Badge variant={getBadgeVariant(employee.status)}>{employee.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Date d'embauche:</span>
                      <span>{employee.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Dernière activité:</span>
                      <span>{employee.lastActivity}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {employees.filter(e => e.id === selectedEmployee).map(employee => (
                  <div key={employee.id} className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-status" className="text-right">
                        Statut
                      </Label>
                      <Select 
                        defaultValue={employee.status} 
                        onValueChange={(value) => handleChangeStatus(employee.id, value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Actif">Actif</SelectItem>
                          <SelectItem value="Congé">Congé</SelectItem>
                          <SelectItem value="Inactif">Inactif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        Supprimer l'employé
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setSelectedEmployee(null);
                setViewMode(null);
              }}>
                Fermer
              </Button>
              {viewMode === "view" && (
                <Button onClick={() => setViewMode("edit")}>
                  Modifier
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminEmployees;
