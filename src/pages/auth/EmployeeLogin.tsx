
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";

const EmployeeLogin = () => {
  const [activeTab, setActiveTab] = useState("login");
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md animate-fade-in">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
        </Button>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm userType="employee" />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm userType="employee" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeLogin;
