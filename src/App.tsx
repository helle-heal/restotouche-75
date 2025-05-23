
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
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminSales from "./pages/admin/AdminSales";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminClaims from "./pages/admin/AdminClaims";
import AdminProfile from "./pages/admin/AdminProfile";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeAttendance from "./pages/employee/EmployeeAttendance";
import EmployeeTasks from "./pages/employee/EmployeeTasks";
import EmployeeOrders from "./pages/employee/EmployeeOrders";
import EmployeeClaims from "./pages/employee/EmployeeClaims";
import EmployeeMessages from "./pages/employee/EmployeeMessages";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import ProductCategoryManager from "./pages/admin/ProductCategoryManager";
import AdminProducts from "./pages/admin/AdminProducts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/employee" element={<EmployeeLogin />} />
          <Route path="/client/kiosk" element={<KioskMenu />} />
          <Route path="/client/mobile" element={<MobileMenu />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/tasks" element={<AdminTasks />} />
          <Route path="/admin/sales" element={<AdminSales />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/claims" element={<AdminClaims />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/product-category" element={<ProductCategoryManager />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          
          {/* Employee routes */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/tasks" element={<EmployeeTasks />} />
          <Route path="/employee/orders" element={<EmployeeOrders />} />
          <Route path="/employee/claims" element={<EmployeeClaims />} />
          <Route path="/employee/messages" element={<EmployeeMessages />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
