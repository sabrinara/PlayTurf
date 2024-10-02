
import Loading from "@/pages/shared/Loading";
import { useGetUserProfileQuery } from "@/redux/api/api";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRouters = ({  children }) => {
    const id = localStorage.getItem("id");
    const { data, isLoading } = useGetUserProfileQuery({ id });
    
    const location = useLocation();
    // console.log(location.pathname);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

 const { data: user } = data || {};
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location.pathname} ></Navigate>

};

export default PrivateRouters;