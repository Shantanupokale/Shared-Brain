import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
   
      {/* Example of protected route usage */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="text-center text-2xl font-bold p-10">
              Dashboard (Protected)
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
