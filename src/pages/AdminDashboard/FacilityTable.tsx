import { useDeleteFacilityMutation, useGetAllFacilitiesQuery, useUpdateFacilityMutation } from "@/redux/api/api";
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
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import { toast } from "sonner";
import { TFacility } from "@/types";
import ScrollButton from "../shared/ScrollButton";
import { DialogClose } from "@radix-ui/react-dialog";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const FacilityTable = () => {
    const { data, isLoading } = useGetAllFacilitiesQuery({});
    const [updateFacility] = useUpdateFacilityMutation();
    const [deleteFacility] = useDeleteFacilityMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const [editFacilityId, setEditFacilityId] = useState<string>("");
    const [editFormData, setEditFormData] = useState({

        name: "",
        description: "",
        pricePerHour: "",
        location: "",
        imageUrl: "",
        imageFile: null as File | null,
    });
    const [uploading, setUploading] = useState(false);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const { data: facilities } = data || {};

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({
            ...editFormData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({
            ...editFormData,
            imageFile: e.target.files ? e.target.files[0] : "" || (null as File | null),
        });
    };

    const uploadImageToImgbb = async (file: File) => {
        const imageFormData = new FormData();
        imageFormData.append("image", file);

        try {
            const response = await fetch(image_upload_api, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            }
            throw new Error("Image upload failed");
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleUpdateFacility = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        let imageUrl = editFormData.imageUrl;
        if (editFormData.imageFile) {
            imageUrl = await uploadImageToImgbb(editFormData.imageFile);
            if (!imageUrl) {
                setUploading(false);
                return;
            }
        }

        const updateData = {
            name: editFormData.name,
            description: editFormData.description,
            pricePerHour: Number(editFormData.pricePerHour),
            location: editFormData.location,
            imageUrl,
        };

        try {
            await updateFacility({ id: editFacilityId, data: updateData }).unwrap();
            toast.success("Facility updated successfully");

        } catch (err) {
            toast.error("Update failed");

        } finally {
            setUploading(false);
        }
    };


    const handleDeleteFacility = async (id: string) => {
        try {
            await deleteFacility(id).unwrap();
            toast.success("Facility deleted successfully");
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const filterData = facilities?.filter((facility: TFacility) => {
        return (
            facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            facility.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            facility.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const sortedData = [...filterData].sort((a, b) => {
        if (sortByPrice) {
            return ( a.pricePerHour - b.pricePerHour ) * ( b.pricePerHour - a.pricePerHour );
        }
        return 0;
    })

    // const sortedData = sortByPrice
    //     ? [...filterData].sort((a, b) => a.pricePerHour - b.pricePerHour)
    //     : [...filterData].sort((a, b) => b.pricePerHour - a.pricePerHour);

    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const toggleSortByPrice = () => {
        setSortByPrice(!sortByPrice);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="pt-10">
            <h1 className="text-[#42f5f5] text-center text-3xl">
                All <span className="text-white">Facilities</span>
            </h1>
            <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:mb-10">

                <div className="flex relative bg-[#000924] hover:bg-[#102e46] hover:text-white">
                    <input
                        type="text"
                        placeholder="   Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
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

            <Table className="bg-[#000924]">
                <TableHeader>
                    < TableRow className="hover:bg-[#102e46]">
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-center">Image</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Delete</TableHead>
                        <TableHead>Edit</TableHead>
                        <TableHead className="text-right">Price/Hour</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((facility: TFacility, index) => (
                        <TableRow key={facility._id} className={`hover:bg-[#102e46] text-[#42f5f5] ${index % 2 === 0 ? "bg-[#000924] border-[#000924]" : " border-[#000924]"}`}>
                            <TableCell className="font-medium">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </TableCell>
                            <TableCell>{facility.name}</TableCell>
                            <TableCell>{facility.location}</TableCell>
                            <TableCell>
                                <Link to={`/facility/${facility._id}`}>
                                    <img
                                        src={facility.imageUrl}
                                        alt={facility.name}
                                        className="w-20 h-20 object-cover"
                                    />
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link to={`/facility/${facility._id}`}>
                                    <VscOpenPreview className="text-xl" title="View Details" />
                                </Link>
                            </TableCell>
                            <TableCell>
                                <button onClick={() => handleDeleteFacility(facility._id)}>
                                    <AiFillDelete className="text-[#42f5f5] text-xl" />
                                </button>
                            </TableCell>
                            <TableCell>
                                <Dialog >
                                    <DialogTrigger asChild>
                                        <button onClick={() => {
                                            setEditFacilityId(facility._id);
                                            setEditFormData({
                                                name: facility.name,
                                                description: facility.description,
                                                pricePerHour: facility.pricePerHour.toString(),
                                                location: facility.location,
                                                imageUrl: facility?.imageUrl || "",
                                                imageFile: null,


                                            });
                                        }}>
                                            <CiEdit className="text-lg text-[#42f5f5]" />
                                        </button>

                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-[#000924] text-[#42f5f5]">
                                        <DialogHeader>
                                            <DialogTitle className="text-[#42f5f5] text-center text-2xl">Edit <span className="text-white">Facility</span></DialogTitle>

                                            <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
                                        </DialogHeader>
                                        <form onSubmit={handleUpdateFacility}>
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Facility Name"
                                                value={editFormData.name}
                                                onChange={handleEditInputChange}
                                                className="bg-[#102e46]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Input
                                                id="description"
                                                placeholder="Description"
                                                value={editFormData.description}
                                                onChange={handleEditInputChange}
                                                className="bg-[#102e46]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                placeholder="Location"
                                                value={editFormData.location}
                                                onChange={handleEditInputChange}
                                                className="bg-[#102e46]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pricePerHour">Price Per Hour</Label>
                                            <Input
                                                id="pricePerHour"
                                                type="number"
                                                placeholder="Price Per Hour"
                                                value={editFormData.pricePerHour}
                                                onChange={handleEditInputChange}
                                                className="bg-[#102e46]"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="imageUrl">Image</Label>
                                            <Input
                                                id="imageUrl"
                                                type="file"
                                                onChange={handleFileChange}
                                                className="bg-[#102e46]"
                                            />
                                        </div>

                                        <DialogFooter>
                                            <DialogClose >
                                            <Button
                                                type="submit"
                                                className="text-[#42f5f5] bg-[#102e47] hover:bg-[#42f5f5] mt-3 hover:text-[#102e47] "
                                            >
                                                {uploading ? "Updating..." : "Update Facility"}
                                            </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                            <TableCell className="text-right">
                                ${facility.pricePerHour.toFixed(2)}
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
                                    className={`hover:bg-[#000924] hover:text-[#42f5f5] ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
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

export default FacilityTable;
