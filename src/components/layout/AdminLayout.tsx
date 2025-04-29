
import React, { ReactNode, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Log current location to check routing
  useEffect(() => {
    console.log("Current admin location:", location.pathname);
  }, [location]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
