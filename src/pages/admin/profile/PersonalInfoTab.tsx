
import React from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface PersonalInfoTabProps {
  profileInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
  };
  setProfileInfo: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
  }>>;
  handleProfileUpdate: (e: React.FormEvent) => void;
}

const PersonalInfoTab = ({ profileInfo, setProfileInfo, handleProfileUpdate }: PersonalInfoTabProps) => {
  return (
    <>
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
                onChange={(e) => setProfileInfo({
                  ...profileInfo,
                  firstName: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input 
                id="lastName"
                value={profileInfo.lastName}
                onChange={(e) => setProfileInfo({
                  ...profileInfo,
                  lastName: e.target.value
                })}
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
                onChange={(e) => setProfileInfo({
                  ...profileInfo,
                  email: e.target.value
                })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input 
              id="phone"
              value={profileInfo.phone}
              onChange={(e) => setProfileInfo({
                ...profileInfo,
                phone: e.target.value
              })}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Enregistrer les modifications</Button>
          </div>
        </form>
      </CardContent>
    </>
  );
};

export default PersonalInfoTab;
