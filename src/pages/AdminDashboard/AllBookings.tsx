import { useGetAllBookingsQuery } from "@/redux/api/api";
import Loading from "../shared/Loading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { TBooking } from "@/types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import ScrollButton from "../shared/ScrollButton";
const AllBookings = () => {
    const { data, isLoading } = useGetAllBookingsQuery({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const { data: bookings } = data || {};

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = bookings?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(bookings?.length / itemsPerPage);


    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div className="py-16 text-white">
                   <h1 className="text-[#42f5f5] text-center text-3xl">All <span className="text-white">Bookings</span></h1>
                   <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />

            <Table className="mt-8">
                <TableHeader className="hover:bg-[#102e47] text-[#42f5f5]">
                    <TableRow className="hover:bg-[#102e47] text-[#42f5f5]">
                        <TableHead>Booking</TableHead>
                        <TableHead>User Details</TableHead>
                        <TableHead>Facility</TableHead>
                        <TableHead>Amount Paid</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentBookings?.map((booking: TBooking, index: number) => (
                        <TableRow key={booking._id} className="hover:bg-[#102e47]">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                 <br />
                                < div className="flex items-center gap-2">
                                    <FaUserClock className="text-[#42f5f5]" />
                                    {booking.user.name}
                                </div>
                                < div className="flex items-center gap-2">
                                    <MdOutlineMail className="text-[#42f5f5]" />
                                    {booking.user.email}
                                </div>
                                < div className="flex items-center gap-2">
                                    <FaPhoneAlt className="text-[#42f5f5]" />
                                    {booking.user.phone}
                                </div>
                            
                            </TableCell>
                            <TableCell>
                                {booking?.facility?.name} <br />
                                < div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-[#42f5f5]" />
                                    {booking?.facility?.location}
                                </div>
                            </TableCell>
                            <TableCell>${booking.payableAmount}</TableCell>
                            <TableCell>
                                <span className={` rounded-full text-md font-bold px-4 py-2 ${booking.isBooked === "confirmed" ? "bg-[#42f5f5] text-[#102e47] " : "bg-[#102e47] text-[#42f5f5] "}`}>{booking.isBooked}</span>
                            </TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>
                                {booking.startTime} - {booking.endTime}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="my-6 md:my-10 text-[#42f5f5]">
                <Pagination>
                    <PaginationContent>

                        <PaginationItem>
                            <PaginationPrevious>
                                <PaginationLink
                                    className={`hover:bg-[#102e46] hover:text-[#42f5f5] ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
                                    onClick={() => currentPage > 1 && handleClick(currentPage - 1)}

                                >
                                    Previous
                                </PaginationLink>
                            </PaginationPrevious>
                        </PaginationItem>


                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={currentPage === index + 1}
                                    onClick={() => handleClick(index + 1)}
                                    className={`hover:bg-[#42f5f5] hover:text-[#102e46] ${currentPage === index + 1 ? "bg-[#42f5f5] text-[#102e46]" : ""}`}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}


                        <PaginationItem>
                            <PaginationNext>
                                <PaginationLink
                                    className={`hover:bg-[#000924] hover:text-white ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
                                    onClick={() => currentPage < totalPages && handleClick(currentPage + 1)}

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

export default AllBookings;
