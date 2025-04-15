
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md animate-fade-in">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
        </Button>
        <LoginForm userType="admin" />
      </div>
    </div>
  );
};

export default AdminLogin;
