
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProfileHeaderProps {
  profileImage: string;
  firstName: string;
  lastName: string;
  role: string;
}

const ProfileHeader = ({ profileImage, firstName, lastName, role }: ProfileHeaderProps) => {
  return (
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
        <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
        <p className="text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
