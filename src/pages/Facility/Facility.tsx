import { useGetAllFacilitiesQuery } from "@/redux/api/api";
import Loading from "../shared/Loading";
import { TFacility } from "@/types";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import ScrollButton from "../shared/ScrollButton";

const Facility = () => {
    const { data, isLoading } = useGetAllFacilitiesQuery({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const facilities: TFacility[] = data?.data || [];


    const filteredData = facilities.filter((facility: TFacility) => {
        const term = searchTerm.toLocaleUpperCase();
        return (
            facility.name.toLocaleUpperCase().includes(term)
        );
    });


    const sortedData = sortByPrice
        ? [...filteredData].sort((a, b) => a.pricePerHour - b.pricePerHour)
        : [...filteredData].sort((a, b) => b.pricePerHour - a.pricePerHour);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFacilities = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const toggleSortByPrice = () => {
        setSortByPrice(!sortByPrice);
    };

    return (
        <div className="bg-[#000924]  text-[#42f5f5] my-10 md:my-16 mx-2 md:mx-6">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:mb-10">

                <div className="flex relative bg-[#000924] hover:bg-[#102e46] hover:text-white">
                    <input
                        type="text"
                        placeholder="   Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-[#42f5f5] px-2 md:px-6 py-2 rounded-full bg-[#102e46] pl-10"
                    />
                    <FaSearch className="absolute left-3  top-1/2 transform -translate-y-1/2 text-[#42f5f5]" />
                </div>


                <button
                    onClick={toggleSortByPrice}
                    className={`border border-[#42f5f5] bg-[#102e46] text-[#42f5f5] px-6 py-2 rounded-full font-semibold ${sortByPrice ? "bg-[#42f5f5] text-white" : ""
                        }`}
                >
                    Sort by Price Per Hour
                </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {currentFacilities.length > 0 ? (
                    currentFacilities.map((facility: TFacility) => (
                        <div
                            key={facility._id}
                            className="flex flex-col rounded bg-[#102e46] hover:transform hover:scale-105 duration-300 mx-2"
                        >
                            <div className="relative">
                                <img
                                    src={facility.imageUrl}
                                    alt={facility.name}
                                    className="h-72 w-full rounded-t-md"
                                />
                                <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md rounded-bl-lg">
                                    <p className="font-bold text-[#42f5f5]">
                                        ${facility?.pricePerHour}/hour
                                    </p>
                                </div>
                            </div>
                            <div className="text-xl py-4 px-6 h-28">
                                <h1 className="font-bold text-2xl text-[#42f5f5]">
                                    {facility.name}
                                </h1>
                                <p className="font-light text-sm">
                                    {facility.description}
                                </p>

                            </div>
                            <div className="flex justify-center items-center  px-6 pb-6">
                                <Link to={`/facility/${facility._id}`}>
                                    <button className="bg-gradient-to-r from-[#000924] via-[#102e46] to-[#42f5f5] text-white font-bold py-2 px-4 rounded-sm">
                                        Explore More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No facilities found.</p>
                )}
            </div>


            <div className="my-6 md:my-10 text-[#42f5f5]">
                <Pagination>
                    <PaginationContent>

                        <PaginationItem>
                            <PaginationPrevious>
                                <PaginationLink
                                    className={`hover:bg-[#102e46] hover:text-[#42f5f5] ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}

                                >
                                    Previous
                                </PaginationLink>
                            </PaginationPrevious>
                        </PaginationItem>


                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={currentPage === index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`hover:bg-[#42f5f5] hover:text-[#102e46] ${currentPage === index + 1 ? "bg-[#42f5f5] text-[#102e46]" : ""}`}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}


                        <PaginationItem>
                            <PaginationNext>
                                <PaginationLink
                                    className={`hover:bg-[#000924] hover:text-[#42f5f5] ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
                                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}

                                >
                                    Next
                                </PaginationLink>
                            </PaginationNext>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <ScrollButton />
        </div>
    );
};

export default Facility;
