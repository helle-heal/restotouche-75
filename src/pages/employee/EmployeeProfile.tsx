import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Shield, 
  LogOut, 
  Edit,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

const EmployeeProfile = () => {
  const navigate = useNavigate();
  
  // État pour les informations de l'employé
  const [employee] = useState({
    id: "EMP-123",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    address: "12 Rue de la Paix, 75002 Paris",
    position: "Serveur",
    department: "Service en salle",
    hireDate: "2023-05-15",
    workingHours: "35h/semaine",
    roles: ["service", "caisse", "préparation"],
    availability: {
      monday: "9h - 17h",
      tuesday: "9h - 17h",
      wednesday: "Repos",
      thursday: "9h - 17h",
      friday: "9h - 17h",
      saturday: "10h - 18h",
      sunday: "Repos"
    }
  });
  
  // Navigation vers le tableau de bord
  const handleBackToDashboard = () => {
    navigate("/employee");
    toast.info("Retour au tableau de bord");
  };

  // Fonction pour se déconnecter
  const handleLogout = () => {
    toast.info("Déconnexion en cours...");
    setTimeout(() => {
      navigate("/login/employee");
    }, 1500);
  };
  
  // Fonction pour éditer le profil
  const handleEdit = () => {
    toast.info("Fonctionnalité d'édition en cours de développement");
  };
  
  // Fonction pour consulter les pointages
  const handleViewAttendance = () => {
    navigate("/employee/attendance");
    toast.info("Navigation vers les pointages");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="employee" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Mon Profil</h1>
            <Button variant="outline" onClick={handleBackToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
                        {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                      </div>
                      <Button 
                        size="icon" 
                        className="absolute bottom-0 right-0 rounded-full" 
                        variant="outline"
                        onClick={handleEdit}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <h2 className="text-xl font-bold mt-2">
                    {employee.firstName} {employee.lastName}
                  </h2>
                  <p className="text-muted-foreground">{employee.position}</p>
                  <p className="text-sm text-muted-foreground">
                    ID: {employee.id}
                  </p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{employee.address}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    className="mt-8 w-full" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-500" />
                    Informations professionnelles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Poste
                      </h3>
                      <p>{employee.position}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Département
                      </h3>
                      <p>{employee.department}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Date d'embauche
                      </h3>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p>{new Date(employee.hireDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Heures de travail
                      </h3>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p>{employee.workingHours}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Compétences
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {employee.roles.map((role, index) => (
                        <Badge key={index} className="capitalize">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    Horaires habituels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2">
                    {Object.entries(employee.availability).map(([day, hours]) => (
                      <div key={day} className="flex justify-between py-2 border-b">
                        <span className="font-medium capitalize">
                          {day === "monday" && "Lundi"}
                          {day === "tuesday" && "Mardi"}
                          {day === "wednesday" && "Mercredi"}
                          {day === "thursday" && "Jeudi"}
                          {day === "friday" && "Vendredi"}
                          {day === "saturday" && "Samedi"}
                          {day === "sunday" && "Dimanche"}
                        </span>
                        <span className={hours === "Repos" ? "text-red-500" : ""}>
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    Derniers pointages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {[
                      { date: "2025-04-14", in: "08:25", out: "17:05" },
                      { date: "2025-04-13", in: "08:30", out: "17:00" },
                      { date: "2025-04-12", in: "08:15", out: "16:45" },
                      { date: "2025-04-11", in: "08:30", out: "17:10" },
                      { date: "2025-04-10", in: "08:20", out: "16:55" }
                    ].map((record, index) => (
                      <div key={index} className="flex justify-between py-2">
                        <span>{new Date(record.date).toLocaleDateString('fr-FR')}</span>
                        <div className="space-x-4">
                          <span className="text-green-600">{record.in}</span>
                          <span>-</span>
                          <span className="text-red-600">{record.out}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={handleViewAttendance}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Voir tous les pointages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeProfile;
