
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { User, Plus, Search, Filter, ArrowDownUp } from "lucide-react";

const employees = [
  { id: 1, name: "Jean Dupont", role: "Chef de cuisine", status: "Actif", startDate: "15/03/2022", lastActivity: "Aujourd'hui" },
  { id: 2, name: "Marie Laurent", role: "Serveur", status: "Actif", startDate: "22/05/2022", lastActivity: "Hier" },
  { id: 3, name: "Thomas Petit", role: "Barman", status: "Congé", startDate: "10/01/2023", lastActivity: "Il y a 5 jours" },
  { id: 4, name: "Sophie Martin", role: "Serveur", status: "Actif", startDate: "03/06/2023", lastActivity: "Aujourd'hui" },
  { id: 5, name: "Lucas Bernard", role: "Commis", status: "Inactif", startDate: "12/09/2022", lastActivity: "Il y a 2 semaines" },
];

const AdminEmployees = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des Employés</h1>
          <Button className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            <span>Ajouter un employé</span>
          </Button>
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
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filtrer</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
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
                  {employees.map((employee) => (
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
                          variant={
                            employee.status === "Actif" ? "default" :
                            employee.status === "Congé" ? "warning" : "destructive"
                          }
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.startDate}</TableCell>
                      <TableCell>{employee.lastActivity}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Voir</Button>
                        <Button variant="ghost" size="sm">Éditer</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Affichage de 5 employés sur 12 au total
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Précédent</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminEmployees;
