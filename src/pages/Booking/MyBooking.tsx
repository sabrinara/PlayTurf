import ScrollButton from "../shared/ScrollButton";
import Loading from "../shared/Loading";
import {
    Table,
    TableBody,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TBooking } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useCancelBookingMutation, useGetUserBookingsQuery } from "@/redux/api/api";
import { toast } from "sonner";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";


const MyBooking = () => {
  
    const { data, isLoading } = useGetUserBookingsQuery({});
    const [cancelBooking] = useCancelBookingMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;



    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const { data: booking } = data || {};

    // console.log(booking);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentbookings = booking?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(booking?.length / itemsPerPage);


    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleCancelBooking = async (id: string) => {
        try {
            await cancelBooking(id).unwrap();
            toast.success("Booking canceled successfully");
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="pt-10">
            <h1 className="text-[#42f5f5] text-center text-3xl">All <span className="text-white">Users</span></h1>
            <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
            <Table className="text-[#42f5f5]">
                <TableHeader>
                    <TableRow>
                        <TableHead className="">S/N</TableHead>
                        <TableHead>Booking Date</TableHead>
                        <TableHead>StartTime</TableHead>
                        <TableHead className="">EndTime</TableHead>
                        <TableHead className="pl-12">Facility </TableHead>
                        <TableHead >Payable Amount</TableHead>
                        <TableHead >Status</TableHead>
                        <TableHead >Cancel Booking</TableHead>
                    </TableRow>
                </TableHeader>

                {currentbookings.length > 0 ? (
                    currentbookings?.map((item: TBooking, index: number) => (
                        <TableBody key={index}>
                            <TableRow className="hover:bg-[#102e47]">
                                <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.startTime}</TableCell>
                                <TableCell >{item.endTime}</TableCell>
                                <Link to={`/facility/${item.facility._id}`}>
                                <TableCell className="flex gap-2 items-center">
                           
                                    {
                                        item.facility.imageUrl ? <img src={item.facility.imageUrl} alt="image" className="w-10 h-10 rounded-full" /> : <img src="https://via.placeholder.com/150" alt="profile" className="w-10 h-10 rounded-full" />
                                    }
                                    <p> {item.facility.name}</p>
                               
                                </TableCell>
                                </Link>
                                <TableCell className="pl-12">{item.payableAmount} $</TableCell>
                                
                                <TableCell className="">
                                    {item.isBooked === "confirmed" ? (
                                        <button className="text-[#42f5f5] bg-[#102e47] p-2 rounded-md">Confirmed</button>
                                    ) : (
                                        <button className="bg-[#42f5f5] text-[#102e47] p-2 rounded-md font-bold">Cancel</button>
                                    )}
                                </TableCell>
                               {
                                item.isBooked === "confirmed" ? <TableCell className="text-center">
                                <button onClick={() => handleCancelBooking(item._id)}>
                                    <AiFillDelete className="text-[#42f5f5] text-xl" />
                                </button>
                                </TableCell> : <TableCell className="pl-8">
                                    <Link to ="/facility">Book again
                                    </Link>
                                </TableCell>
                               }
                            </TableRow>
                        </TableBody>
                    ))
                ) : (
                    <p className="text-center text-2xl text-[#42f5f5]">No user found</p>
                )}

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

export default MyBooking;