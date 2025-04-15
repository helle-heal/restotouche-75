
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import {
  Home,
  Users,
  ClipboardList,
  BarChartBig,
  Bell,
  MessageSquare,
  LogOut,
  User,
  Clock,
  ShoppingCart,
} from "lucide-react";

interface SidebarProps {
  userType: "admin" | "employee";
}

const Sidebar = ({ userType }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const adminLinks = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Employés", path: "/admin/employees", icon: Users },
    { name: "Tâches", path: "/admin/tasks", icon: ClipboardList },
    { name: "Ventes", path: "/admin/sales", icon: BarChartBig },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
    { name: "Réclamations", path: "/admin/claims", icon: MessageSquare },
    { name: "Profil", path: "/admin/profile", icon: User },
  ];

  const employeeLinks = [
    { name: "Dashboard", path: "/employee", icon: Home },
    { name: "Pointage", path: "/employee/attendance", icon: Clock },
    { name: "Tâches", path: "/employee/tasks", icon: ClipboardList },
    { name: "Commandes", path: "/employee/orders", icon: ShoppingCart },
    { name: "Réclamations", path: "/employee/claims", icon: MessageSquare },
    { name: "Messages", path: "/employee/messages", icon: Bell },
    { name: "Profil", path: "/employee/profile", icon: User },
  ];

  const links = userType === "admin" ? adminLinks : employeeLinks;
  const loginPath = userType === "admin" ? "/login/admin" : "/login/employee";

  return (
    <div className="h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <Logo withText />
      </div>
      <div className="flex flex-col gap-2 p-4 flex-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "sidebar-item",
              pathname === link.path && "sidebar-item-active"
            )}
          >
            <link.icon size={20} />
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <Link to={loginPath} className="sidebar-item text-red-500">
          <LogOut size={20} />
          <span>Déconnexion</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
