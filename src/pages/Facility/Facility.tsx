import { useGetAllFacilitiesQuery } from "@/redux/api/api";
import Loading from "../shared/Loading";
import { TFacility } from "@/types";
import { Link } from "react-router-dom";

const Facility = () => {
    const { data, isLoading } = useGetAllFacilitiesQuery({});

    console.log(data)

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }
    const { data: facilities } = data || {};
    console.log(facilities);
    return (
        <div className="bg-[#000924] h-screen text-[#42f5f5] mt-20 mx-10">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {
                facilities?.map((facility : TFacility) => (
                    <div key={facility._id} className="flex flex-col rounded  bg-[#102e46] hover:transform hover:scale-105 duration-300">
                    <div className="relative">
                        <img src={facility.imageUrl} alt={facility.name} className="h-72 w-full rounded-t-md " />
                      
                    
                        <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md rounded-bl-lg">
                            <p className="font-bold  text-[#42f5f5]">{facility?.pricePerHour}</p>
                        </div>
                    </div>
                    <div className="text-xl py-4 px-6 h-24">
                        <h1 className="font-bold text-2xl text-[#42f5f5]"> {facility.name}</h1>

                        <p className="font-light text-sm">{facility.description}</p>
                    </div>
                    <div className="flex justify-between items-center md:items-start px-6 pb-6 ">
                     
                        <Link to={`/facility/${facility._id}`}>
                            <button className="bg-gradient-to-r from-[#000924] via-[#102e46] to-[#42f5f5] text-white font-bold py-2 px-4 rounded-sm">Explore More</button>
                        </Link>
                    </div>
                </div>
            ))}
          
         </div>
         
        </div>
    );
};

export default Facility;