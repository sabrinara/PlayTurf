import { useGetAllUserQuery } from "@/redux/api/api";
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
import { TUsers } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import ScrollButton from "../shared/ScrollButton";

const AddAdminTable = () => {
   
    const { data, isLoading } = useGetAllUserQuery({ });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; 
    
   

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const { data: user } = data || {};
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = user?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(user?.length / itemsPerPage);


    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="pt-10">
            <h1 className="text-[#42f5f5] text-center text-3xl">All <span className="text-white">Users</span></h1>
            <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
            <Table className="text-[#42f5f5]">
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Users</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="">Image</TableHead>
                        <TableHead className="">Role</TableHead>
                        <TableHead >User Role</TableHead>
                    </TableRow>
                </TableHeader>
         
                { currentUsers.length > 0 ? (
                      currentUsers?.map((item: TUsers, index: number) => (
                        <TableBody key={index}>
                            <TableRow className="hover:bg-[#102e47]">
                                <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell className="">
                                    {
                                        item.imageUrl ? <img src={item.imageUrl} alt="profile" className="w-10 h-10 rounded-full" /> : <img src="https://via.placeholder.com/150" alt="profile" className="w-10 h-10 rounded-full" />
                                    }
                                </TableCell>
                                <TableCell className="">{item.role}</TableCell>
                                <TableCell className="">
                                    {item.role === "admin" ? (
                                        <button className="text-[#42f5f5] bg-[#102e47] p-2 rounded-md">Admin</button>
                                    ) : (
                                        <button className="bg-[#42f5f5] text-[#102e47] p-2 rounded-md font-bold">User</button>
                                    )}
                                </TableCell>
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

export default AddAdminTable;