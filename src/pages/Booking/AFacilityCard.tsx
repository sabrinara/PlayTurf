import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AFacilityCard = () => {
    const facility = localStorage.getItem('facility');
    const facilityData = facility ? JSON.parse(facility) : null;
    
    if (!facilityData) {
        return(

            < div className="text-lg py-4 px-6 h-36 mt-40 text-[#42f5f5] text-center">
                <p>Didn't select any facility. <br /> <span><Link to="/facility" className="text-[#42f5f5] underline">Select Facility</Link></span></p>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center mt-8">
            <div
                key={facilityData._id}
                className="flex flex-col rounded bg-[#102e46] hover:transform hover:scale-105 duration-300 mx-2"
            >
                <div className="relative">
                    <img
                        src={facilityData.imageUrl}
                        alt={facilityData.name}
                        className="h-72 w-full rounded-t-md"
                    />
                    <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md rounded-bl-lg">
                        <p className="font-bold text-[#42f5f5]">
                            ${facilityData.pricePerHour}/hour
                        </p>
                    </div>
                </div>
                <div className="text-xl py-4 px-6 h-36">
                    <h1 className="font-bold text-2xl text-[#42f5f5]">
                        {facilityData.name}
                    </h1>
                    < div className="flex items-center gap-2 text-[20px] text-sm font-bold my-2 text-white">
                                <FaMapMarkerAlt className="text-[#42f5f5] " />
                                {facilityData?.location}
                            </div>
                    <p className="font-light text-sm text-white">
                        {facilityData.description}
                    </p>
                </div>
                <div className="flex justify-center items-center px-6 pb-6">
                    <Link to={`/facility/${facilityData._id}`}>
                        <button className="bg-gradient-to-r from-[#000924] via-[#102e46] to-[#42f5f5] text-white font-bold py-2 px-4 rounded-sm">
                           View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AFacilityCard;
