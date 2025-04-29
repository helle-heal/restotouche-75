
import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Camera, Key, Lock, Mail, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/avatar.png");
  
  // Information du profil
  const [profileInfo, setProfileInfo] = useState({
    firstName: "Admin",
    lastName: "Restouch",
    email: "admin@restouch.com",
    phone: "+212 5 22 33 44 55",
    role: "Administrateur"
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleBack = () => {
    navigate("/admin");
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil mis à jour avec succès");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    toast.success("Mot de passe modifié avec succès");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center">
          <Button 
            variant="ghost" 
            className="p-2 mr-4" 
            onClick={handleBack}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Mon Profil</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={profileImage || "https://via.placeholder.com/150"} 
                    alt="Photo de profil" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button 
                  size="icon" 
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
                  onClick={() => toast.info("Fonctionnalité à venir")}
                >
                  <Camera size={14} />
                </Button>
              </div>
              <div>
                <h2 className="text-xl font-bold">{profileInfo.firstName} {profileInfo.lastName}</h2>
                <p className="text-muted-foreground">{profileInfo.role}</p>
              </div>
            </div>

            <Tabs defaultValue="info">
              <TabsList className="mb-6">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <User size={16} />
                  Informations
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Lock size={16} />
                  Sécurité
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Settings size={16} />
                  Préférences
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input 
                            id="firstName"
                            value={profileInfo.firstName}
                            onChange={(e) => setProfileInfo({...profileInfo, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input 
                            id="lastName"
                            value={profileInfo.lastName}
                            onChange={(e) => setProfileInfo({...profileInfo, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="email"
                            type="email"
                            className="pl-9"
                            value={profileInfo.email}
                            onChange={(e) => setProfileInfo({...profileInfo, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input 
                          id="phone"
                          value={profileInfo.phone}
                          onChange={(e) => setProfileInfo({...profileInfo, phone: e.target.value})}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit">Enregistrer les modifications</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Changer le mot de passe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            className="pl-9"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordFormChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <Input 
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordFormChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input 
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordFormChange}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit">Changer le mot de passe</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Fonctionnalité à venir
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProfile;
