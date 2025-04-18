
import React, { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

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
