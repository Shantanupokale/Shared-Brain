import { Routes, Route } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "@/components/Dashboard/Dashboard";
import SharedBrain from "@/components/SharedBrainPage/SharedBrain";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Wrapping the Dashboard route with ProtectedRoute */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route path="/brain/:shareLink" element={<SharedBrain />} />

      {/* 🔥 Catch-all route for invalid URLs */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
