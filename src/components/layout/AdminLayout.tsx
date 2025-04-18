
import React, { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Tableau de bord", path: "/admin", icon: "LayoutDashboard" },
    { name: "Employés", path: "/admin/employees", icon: "Users" },
    { name: "Tâches", path: "/admin/tasks", icon: "ClipboardList" },
    { name: "Ventes", path: "/admin/sales", icon: "BarChart" },
    { name: "Produits", path: "/admin/products", icon: "ShoppingBag" },
    { name: "Notifications", path: "/admin/notifications", icon: "Bell" },
    { name: "Réclamations", path: "/admin/claims", icon: "AlertCircle" },
    { name: "Profil", path: "/admin/profile", icon: "User" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        items={menuItems} 
        currentPath={window.location.pathname}
        onNavigate={(path) => navigate(path)}
        userType="admin"
        userName="Admin"
        userRole="Administrateur"
      />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
