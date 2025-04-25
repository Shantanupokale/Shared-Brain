import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
