import { useGetAllFacilitiesQuery } from "@/redux/api/api";
import { TFacility } from "@/types";
import { Link } from "react-router-dom";


const FeaturedFacility = () => {
    const { data } = useGetAllFacilitiesQuery({});

    console.log(data)

    // if (isLoading) {
    //     return (
    //         <div>
    //             <Loading />
    //         </div>
    //     );
    // }
    const { data: facilities } = data || {};
    console.log(facilities);
    return (
        <div className="bg-[#000924] h-screen text-[#42f5f5] my-20 mx-10">
            <div className="md:mt-10 mb-10 md:mb-14">
                <h2 className="text-2xl md:text-4xl font-bold my-4 text-center text-[#42f5f5]">Our Popular <span className="text-white">Facilities</span></h2>
                <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                    facilities?.slice(0, 3).map((facility: TFacility) => (
                        <div key={facility._id} className="flex flex-col rounded  bg-[#102e46] hover:transform hover:scale-105 duration-300">
                            <div className="relative">
                                <img src={facility.imageUrl} alt={facility.name} className="h-72 w-full rounded-t-md " />


                                <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md rounded-bl-lg">
                                    <p className="font-bold  text-[#42f5f5]">{facility?.pricePerHour}</p>
                                </div>
                            </div>
                            <div className="text-xl py-4 px-6 h-24">
                                <h1 className="font-bold text-2xl text-[#42f5f5]"> {facility.name}</h1>

                                <p className="font-light text-sm">
                                    {facility.description.split('.')[0] + '.'}
                                </p>

                            </div>
                            <div className="flex justify-center md:justify-start items-center  px-6 pb-6 ">

                                <Link to={`/facility/${facility._id}`}>
                                    <button className="bg-gradient-to-r from-[#000924] via-[#102e46] to-[#42f5f5] text-white font-bold py-2 px-4 rounded-sm">Explore More</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                <div className="flex justify-center md:justify-normal items-center md:items-start bg-[#102e46] rounded-md">
                    <Link to={"/facility"}>
                        <div className="flex justify-center items-center gap-1 2 transform hover:scale-105 transition-transform duration-300 px-3 bg-[#102e46] h-[70vh] rounded-md w-72 " title="View more">
                            <div className="flex justify-center items-center ">
                                <button className="relative flex items-center justify-center border-2 border-[#42f5f5] text-[#42f5f5]  px-6 py-3 rounded-ss w-20 h-20 bg-[#102e46] shadow-lg transition duration-300 ml-28">


                                </button>
                                <h1 className="absolute font-semibold text-xl  ml-6 mr-4 bg-[#102e46] py-1">
                                    View More
                                </h1>
                                {/* <FaArrowRight className="  text-[#42f5f5] text-lg mt-1 " /> */}
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

        </div>
    );
};

export default FeaturedFacility;