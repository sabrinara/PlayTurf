import React, { ReactNode } from "react"; // Import React and ReactNode
import Loading from "@/pages/shared/Loading";
import { useGetUserProfileQuery } from "@/redux/api/api";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";


interface PrivateRoutersProps {
    children: ReactNode;
}

const PrivateRouters: React.FC<PrivateRoutersProps> = ({ children }) => {
    const id = localStorage.getItem("id");
    const { data, isLoading } = useGetUserProfileQuery({ id });
    
    const location = useLocation();

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const { data: user } = data || {};
    if (user) {
        return <>{children}</>; 
    }
    
    toast.error("Please login first");
    return <Navigate to="/login" state={{ from: location.pathname }} />;
};

export default PrivateRouters;
