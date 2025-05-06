
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { User, Key, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import ProfileHeader from "./profile/ProfileHeader";
import PersonalInfoTab from "./profile/PersonalInfoTab";
import SecurityTab from "./profile/SecurityTab";
import PreferencesTab from "./profile/PreferencesTab";
import { useProfileData } from "@/hooks/useProfileData";

const AdminProfile = () => {
  const {
    profileImage,
    profileInfo,
    setProfileInfo,
    passwordForm,
    handlePasswordFormChange,
    handleProfileUpdate,
    handlePasswordChange,
  } = useProfileData();

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
