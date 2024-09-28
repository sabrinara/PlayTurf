import { useGetUserProfileQuery } from "@/redux/api/api";


const DashboardUser = () => {
    const {data , isLoading} = useGetUserProfileQuery({});
    if (isLoading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
    return (
        <div className="home flex justify-center items-center px-10 py-40 md:px-0 text-center md:pl-40">
            <h1>DashboardUser</h1>
            <h1>{data?.name}</h1>
            <h1>{data?.email}</h1>
            <h1>{data?.phone}</h1>
        </div>
    );
};

export default DashboardUser;