import { useGetUserProfileQuery } from "@/redux/api/api";
import { Link } from "react-router-dom";


const DashboardNavbar = () => {
    const id = localStorage.getItem("id");
    const { data, isLoading } = useGetUserProfileQuery({ id });
    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
    const { data: user } = data || {};

    return (
        <div className="bg-[#102e46] h-20 rounded-b-lg mb-1 flex justify-between items-center md:px-6">
            <div className="mt-3">
                <Link to="/">
                    <div className="flex items-center">
                        <img src="./navlogo3.png" className="h-14 md:h-16" alt="Logo" />
                    </div>
                </Link>

            </div>
            <div className="flex items-center gap-4 text-[#3ad3d3]">

                <img src={user?.imageUrl} alt="" className="w-14 h-14 rounded-full border-2 border-[#2dadad]" />
                <h1 className="hidden md:inline">{user?.name}</h1>
            </div>
        </div>
    );
};

export default DashboardNavbar;