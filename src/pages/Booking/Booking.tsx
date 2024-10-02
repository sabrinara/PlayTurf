import ScrollButton from "../shared/ScrollButton";


const Booking = () => {
    return (
        <div className="pt-10">
            <h1 className="text-[#42f5f5] text-center text-3xl">Book <span className="text-white">Now</span></h1>
            <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
            <ScrollButton />
        </div>
    );
};

export default Booking;