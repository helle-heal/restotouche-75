
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { User, Key, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

// Import components
import ProfileHeader from "./profile/ProfileHeader";
import PersonalInfoTab from "./profile/PersonalInfoTab";
import SecurityTab from "./profile/SecurityTab";
import PreferencesTab from "./profile/PreferencesTab";

const AdminProfile = () => {
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
    <AdminLayout>
      <header className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
      </header>

      <main className="overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <ProfileHeader 
            profileImage={profileImage}
            firstName={profileInfo.firstName}
            lastName={profileInfo.lastName}
            role={profileInfo.role}
          />

          <Tabs defaultValue="info">
            <TabsList className="mb-6">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <User size={16} />
                Informations
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Key size={16} />
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings size={16} />
                Préférences
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <Card>
                <PersonalInfoTab 
                  profileInfo={profileInfo}
                  setProfileInfo={setProfileInfo}
                  handleProfileUpdate={handleProfileUpdate}
                />
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <SecurityTab 
                  passwordForm={passwordForm}
                  handlePasswordFormChange={handlePasswordFormChange}
                  handlePasswordChange={handlePasswordChange}
                />
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <PreferencesTab />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminProfile;
