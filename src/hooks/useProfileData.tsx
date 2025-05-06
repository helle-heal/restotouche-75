
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

export interface ProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useProfileData() {
  const [profileImage, setProfileImage] = useState("/avatar.png");
  
  // Profile information
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    firstName: "Admin",
    lastName: "Restouch",
    email: "admin@restouch.com",
    phone: "+212 5 22 33 44 55",
    role: "Administrateur"
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
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

  return {
    profileImage,
    profileInfo,
    setProfileInfo,
    passwordForm,
    setPasswordForm,
    handleProfileUpdate,
    handlePasswordChange,
    handlePasswordFormChange
  };
}
