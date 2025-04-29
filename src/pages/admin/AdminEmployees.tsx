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
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddEmployee = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Employé ajouté avec succès!");
    setShowForm(false);
  };

  const handleBack = () => {
    navigate("/admin");
  };

  // Extracted unique statuses and roles for filtering
  const uniqueStatuses = Array.from(new Set(initialEmployees.map(employee => employee.status)));
  const uniqueRoles = Array.from(new Set(initialEmployees.map(employee => employee.role)));

  // Apply filters and search
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || !statusFilter ? true : employee.status === statusFilter;
    const matchesRole = roleFilter === "all" || !roleFilter ? true : employee.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

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
            <h1 className="text-2xl font-bold">Gestion des Employés</h1>
          </div>
          <Button onClick={handleAddEmployee} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Nouvel Employé</span>
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="search">Rechercher</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        type="search"
                        placeholder="Rechercher un employé..."
                        className="pl-8"
                        value={search}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <Label htmlFor="status-filter">Filtrer par statut</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status-filter" className="w-[180px]">
                        <SelectValue placeholder="Tous les statuts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        {uniqueStatuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <Label htmlFor="role-filter">Filtrer par rôle</Label>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger id="role-filter" className="w-[180px]">
                        <SelectValue placeholder="Tous les rôles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les rôles</SelectItem>
                        {uniqueRoles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Liste des Employés</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {filteredEmployees.length} employé(s)
                </div>
              </div>
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Aucun employé trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <User size={20} className="text-muted-foreground" />
                          {employee.name}
                        </TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>
                          <Badge variant={
                            employee.status === "Actif" ? "default" : 
                            employee.status === "Congé" ? "secondary" : "outline"
                          }>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.startDate}</TableCell>
                        <TableCell>{employee.lastActivity}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast.info(`Voir profil: ${employee.name}`)}>
                              Voir
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => toast.info(`Modifier: ${employee.name}`)}>
                              Modifier
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel employé</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire ci-dessous pour ajouter un nouvel employé.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" placeholder="Jean Dupont" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chef">Chef de cuisine</SelectItem>
                  <SelectItem value="serveur">Serveur</SelectItem>
                  <SelectItem value="barman">Barman</SelectItem>
                  <SelectItem value="commis">Commis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="conge">Congé</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Ajouter l'employé</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEmployees;
