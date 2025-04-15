
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Clock,
  Settings,
  Bell,
  Shield,
} from "lucide-react";

const AdminProfile = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-2xl font-bold">Mon Profil</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center">
            <div className="bg-gray-200 w-24 h-24 rounded-full flex items-center justify-center mr-6">
              <User size={40} className="text-gray-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Alexandre Martin</h2>
              <p className="text-muted-foreground">Directeur</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge>Admin</Badge>
                <Badge variant="outline">Depuis 2022</Badge>
              </div>
            </div>
            <div className="ml-auto">
              <Button className="btn-primary">Modifier la photo</Button>
            </div>
          </div>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Informations personnelles</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="activities">Activités récentes</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">Prénom</label>
                      <Input id="firstName" defaultValue="Alexandre" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Nom</label>
                      <Input id="lastName" defaultValue="Martin" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" defaultValue="alexandre.martin@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                      <Input id="phone" defaultValue="06 12 34 56 78" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="position" className="text-sm font-medium">Poste</label>
                      <Input id="position" defaultValue="Directeur" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="startDate" className="text-sm font-medium">Date d'embauche</label>
                      <Input id="startDate" defaultValue="15/03/2022" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">Biographie</label>
                    <Textarea 
                      id="bio" 
                      rows={4}
                      defaultValue="Directeur du restaurant depuis mars 2022. Plus de 10 ans d'expérience dans la restauration. Spécialiste en gestion d'équipe et optimisation des processus."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Annuler</Button>
                    <Button className="btn-primary">Sauvegarder les modifications</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité du compte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="text-sm font-medium">Mot de passe actuel</label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm font-medium">Nouveau mot de passe</label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-base font-medium mb-2">Connexions récentes</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Shield className="text-green-500" />
                          <div>
                            <div className="font-medium">Paris, France</div>
                            <div className="text-sm text-muted-foreground">Aujourd'hui à 10:45</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50">Cet appareil</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Shield className="text-green-500" />
                          <div>
                            <div className="font-medium">Lyon, France</div>
                            <div className="text-sm text-muted-foreground">Hier à 18:30</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Déconnecter</Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Annuler</Button>
                    <Button className="btn-primary">Mettre à jour le mot de passe</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Bell className="text-primary" />
                        <div>
                          <div className="font-medium">Notifications email</div>
                          <div className="text-sm text-muted-foreground">Recevoir des notifications par email</div>
                        </div>
                      </div>
                      <Button variant="outline">Activé</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Bell className="text-primary" />
                        <div>
                          <div className="font-medium">Notifications dans l'application</div>
                          <div className="text-sm text-muted-foreground">Recevoir des notifications dans l'application</div>
                        </div>
                      </div>
                      <Button variant="outline">Activé</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Bell className="text-primary" />
                        <div>
                          <div className="font-medium">Notifications SMS</div>
                          <div className="text-sm text-muted-foreground">Recevoir des notifications par SMS</div>
                        </div>
                      </div>
                      <Button variant="outline">Désactivé</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Activités récentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {[
                      { icon: User, text: "Vous avez mis à jour votre profil", time: "Aujourd'hui, 11:30" },
                      { icon: Lock, text: "Changement de mot de passe", time: "Hier, 15:45" },
                      { icon: Settings, text: "Paramètres de notification modifiés", time: "12/04/2025, 09:15" },
                      { icon: Mail, text: "Email de confirmation envoyé", time: "10/04/2025, 14:22" },
                      { icon: Calendar, text: "Planning des employés mis à jour", time: "08/04/2025, 16:50" },
                    ].map((activity, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                          <activity.icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.text}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock size={14} />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminProfile;
