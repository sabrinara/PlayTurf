import { useAddBookingMutation, useGetSingleFacilityQuery } from "@/redux/api/api";
import { useParams } from "react-router-dom";
import Loading from "../shared/Loading";
import { toast } from "sonner";
import { FaMapMarkerAlt } from "react-icons/fa";


const FacilityDetails = () => {
    const { id: _id } = useParams();

    const { data, isLoading } = useGetSingleFacilityQuery({ id: _id });
    const [addBookings] = useAddBookingMutation();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
                <Loading />
            </div>
        );
    }

    const facility = data?.data;  // Assuming facility is in data object
    console.log(facility);

    const handleBooking = async () => {
        try {
            const result = await addBookings({ facilityId: _id }).unwrap();
            console.log("Booked successfully: ", result);
            toast.success("Booked successfully");
        } catch (error) {
            toast.error("Failed to book");
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

                            {/* <p className="text-2xl font-bold mb-2">{facility?.location || 'Facility Location Not available'}</p> */}
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
                                className="font-bold bg-[#42f5f5] text-[#102e47] px-6 py-2 rounded shadow hover:bg-[#000924] hover:text-[#42f5f5] text-xl"
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
