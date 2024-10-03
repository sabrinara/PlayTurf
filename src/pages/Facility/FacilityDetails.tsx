import {  useGetSingleFacilityQuery } from "@/redux/api/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../shared/Loading";
import { toast } from "sonner";
import { FaMapMarkerAlt } from "react-icons/fa";


const FacilityDetails = () => {
    const { id: _id } = useParams();

    const { data, isLoading } = useGetSingleFacilityQuery({ id: _id });
    const navigate = useNavigate();
 

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
                <Loading />
            </div>
        );
    }

    const facility = data?.data;  
    console.log(facility);

    const token = localStorage.getItem("token");

    const handleBooking = async () => { 
        if (token) {
        const addBooking = localStorage.setItem("facility", JSON.stringify(facility));
        toast.success("Facility added to booking");
        console.log(addBooking);
        navigate("/dashboard/booking");
        } else {
            toast.error("Please login to continue");
            navigate("/login");
        }
     };
 
 
    return (
        <div className="flex flex-col items-center p-4 text-[#42f5f5] min-h-screen mt-4 md:mt-10">
            <div className="max-w-6xl w-full rounded-lg shadow-lg p-10 animate__animated animate__fadeIn bg-[#102e47]">
                <h1 className="block md:hidden text-4xl font-bold mb-4">{facility?.name || 'Facility Name'}</h1>
                <div className="flex flex-col md:flex-row-reverse md:gap-20">
                    <div className="w-full md:w-1/2">
                        <img
                            src={facility?.imageUrl || 'https://via.placeholder.com/500'}
                            alt="facility"
                            className="w-full md:w-[160vh] h-[60vh] md:h-[78vh] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col md:mt-10 md:ml-6">
                        <div className="text-[#42f5f5] mb-1 md:mb-4">
                            <div className="hidden md:flex justify-between items-center">
                                <h1 className="text-4xl font-extrabold mb-4">{facility?.name || 'Facility Name'}</h1>
                            </div>
                            <div className="flex md:hidden justify-between items-center gap-2 mt-2">
                                <p className="text-2xl font-bold mb-2">Price: <span className="text-white font-bold">{facility?.pricePerHour || 0}/hr $</span></p>


                            </div>
                            <p className="hidden md:block text-xl font-bold mb-2">Price: <span className="text-white font-bold">{facility?.pricePerHour || 0}/hr $</span></p>

                        
                            < div className="flex items-center gap-2 text-[20px] md:text-2xl font-bold mb-2 text-white">
                                <FaMapMarkerAlt className="text-[#42f5f5] text-4xl md:text-2xl" />
                                {facility?.location}
                            </div>
                        </div>
                        <p className="text-justify mb-2 text-white">
                            {facility?.description ? facility.description.slice(0, 300) : 'No description available.'}
                        </p>
                        <div className="flex justify-center md:justify-end animate-bounce mt-10">
                            <button
                                onClick={handleBooking}
                                className="bg-gradient-to-r from-[#000924] via-[#102e46] to-[#42f5f5] text-white  md:text-lg font-bold py-3 px-6 rounded-sm shadow-md hover:scale-105 transition-transform duration-300"
                                title="Booking"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilityDetails;
