
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import { Users, Monitor, Smartphone } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col">
      <header className="container mx-auto p-6">
        <Logo size="lg" />
      </header>

      <main className="flex-1 container mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-resto-blue mb-6 animate-fade-in">
          RestoTouch
        </h1>
        <p className="text-xl mb-12 max-w-2xl animate-slide-in">
          Plateforme complète de gestion et de commande pour votre restaurant
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <Link
            to="/client/kiosk"
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-4 card-hover"
          >
            <Monitor size={48} className="text-resto-orange" />
            <h2 className="text-xl font-bold">Commande sur Borne</h2>
            <p className="text-muted-foreground">
              Interface tactile pour commander sur place
            </p>
            <Button className="mt-4">Commander</Button>
          </Link>

          <Link
            to="/client/mobile"
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-4 card-hover"
          >
            <Smartphone size={48} className="text-resto-orange" />
            <h2 className="text-xl font-bold">Menu Mobile</h2>
            <p className="text-muted-foreground">
              Accédez au menu depuis votre téléphone
            </p>
            <Button className="mt-4">Commander</Button>
          </Link>

          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center gap-4 card-hover">
            <Users size={48} className="text-resto-blue" />
            <h2 className="text-xl font-bold">Espace Personnel</h2>
            <p className="text-muted-foreground">Accès réservé aux membres du personnel</p>
            <div className="flex gap-2 mt-4">
              <Button asChild variant="outline">
                <Link to="/login/admin">Admin</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login/employee">Employé</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto p-6 border-t text-center text-muted-foreground">
        <p>&copy; 2025 RestoTouch - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default Landing;
