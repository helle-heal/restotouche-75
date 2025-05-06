
import React, { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface EmployeeLayoutProps {
  children: ReactNode;
}

const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="employee" />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default EmployeeLayout;
