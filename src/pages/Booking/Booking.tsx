import ScrollButton from "../shared/ScrollButton";
import AFacilityCard from "./AFacilityCard";
import AvailabilityChecker from "./AvailabilityChecker";
import BookingForm from "./BookingForm";


const Booking = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="pt-10">
                <h1 className="text-[#42f5f5] text-center text-3xl">Book <span className="text-white">Now</span></h1>
                <hr className="border-2 border-[#42f5f5] w-5/12 md:w-2/12 mx-auto mb-2" />

            </div>


            <div className="flex flex-col md:flex-row justify-center md:gap-10">
                <div className="w-full md:w-1/3 ml-20">
                    <AFacilityCard />
                </div>
                <div className="w-full md:w-1/2">
                    <AvailabilityChecker />
                    <BookingForm />
                </div>
            </div>
            <ScrollButton />
        </div>
    );
};

export default Booking;