
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/auth/AdminLogin";
import EmployeeLogin from "./pages/auth/EmployeeLogin";
import KioskMenu from "./pages/client/KioskMenu";
import MobileMenu from "./pages/client/MobileMenu";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";
import EmployeeTasks from "./pages/employee/EmployeeTasks";
import EmployeeOrders from "./pages/employee/EmployeeOrders";
import EmployeeClaims from "./pages/employee/EmployeeClaims";
import EmployeeMessages from "./pages/employee/EmployeeMessages";
import EmployeeProfile from "./pages/employee/EmployeeProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Landing />} />
          
          {/* Interface Authentification */}
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/employee" element={<EmployeeLogin />} />
          
          {/* Interface Client */}
          <Route path="/client/kiosk" element={<KioskMenu />} />
          <Route path="/client/mobile" element={<MobileMenu />} />
          
          {/* Interface Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Interface Employé */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/tasks" element={<EmployeeTasks />} />
          <Route path="/employee/orders" element={<EmployeeOrders />} />
          <Route path="/employee/claims" element={<EmployeeClaims />} />
          <Route path="/employee/messages" element={<EmployeeMessages />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
