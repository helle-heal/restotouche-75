
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Clock, Calendar } from "lucide-react";

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("present"); // present, absent
  const [clockInTime, setClockInTime] = useState("08:30");
  const [clockOutTime, setClockOutTime] = useState("");
  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: "2025-04-14", clockIn: "08:25", clockOut: "17:05" },
    { date: "2025-04-13", clockIn: "08:30", clockOut: "17:00" },
    { date: "2025-04-12", clockIn: "08:15", clockOut: "16:45" },
  ]);

  const handleClockOut = () => {
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, "0") + ":" + 
                       now.getMinutes().toString().padStart(2, "0");
    
    setClockOutTime(timeString);
    setStatus("absent");
    
    // Ajouter au début de l'historique
    const today = now.toISOString().split("T")[0];
    setAttendanceHistory(prev => [{
      date: today,
      clockIn: clockInTime,
      clockOut: timeString
    }, ...prev]);
    
    toast.success("Pointage de sortie enregistré avec succès");
    
    // Rediriger vers le tableau de bord
    setTimeout(() => {
      navigate("/employee");
    }, 1500);
  };

  const handleClockIn = () => {
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, "0") + ":" + 
                       now.getMinutes().toString().padStart(2, "0");
    
    setClockInTime(timeString);
    setClockOutTime("");
    setStatus("present");
    
    toast.success("Pointage d'entrée enregistré avec succès");
  };

  const handleBackToDashboard = () => {
    navigate("/employee");
    toast.info("Retour au tableau de bord");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="employee" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-2xl font-bold">Pointage</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  État de présence
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`flex items-center gap-2 text-xl font-bold ${status === "present" ? "text-green-600" : "text-gray-500"}`}>
                  <div className={`w-3 h-3 rounded-full ${status === "present" ? "bg-green-600" : "bg-gray-500"}`}></div>
                  <span>{status === "present" ? "Présent" : "Absent"}</span>
                </div>
                
                {status === "present" ? (
                  <>
                    <p className="text-xs text-muted-foreground mt-1">
                      Arrivée: {clockInTime} - Aujourd'hui
                    </p>
                    <Button className="mt-4 w-full" onClick={handleClockOut}>
                      Signaler départ
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground mt-1">
                      Dernier pointage: {attendanceHistory[0]?.date || "N/A"}
                    </p>
                    <Button className="mt-4 w-full" onClick={handleClockIn}>
                      Signaler arrivée
                    </Button>
                  </>
                )}
                
                <Button 
                  variant="outline" 
                  className="mt-3 w-full" 
                  onClick={handleBackToDashboard}
                >
                  Retour au tableau de bord
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Résumé de présence
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="grid grid-cols-3 font-medium mb-2 text-muted-foreground">
                    <span>Date</span>
                    <span>Arrivée</span>
                    <span>Départ</span>
                  </div>
                  {attendanceHistory.map((record, index) => (
                    <div key={index} className="grid grid-cols-3 py-2 border-t">
                      <span>{record.date}</span>
                      <span>{record.clockIn}</span>
                      <span>{record.clockOut}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
