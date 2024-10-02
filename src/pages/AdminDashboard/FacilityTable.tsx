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
    DialogClose,
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
import { Link} from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";

import { toast } from "sonner";
import { TFacility } from "@/types";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const FacilityTable = () => {
    const { data, isLoading } = useGetAllFacilitiesQuery({});

    const [updateFacility] = useUpdateFacilityMutation();
    const [deleteFacility] = useDeleteFacilityMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const [editFormData, setEditFormData] = useState({
        _id: "",
        name: "",
        description: "",
        pricePerHour: "",
        location: "",
        imageUrl: "" || null as File | null,
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
            imageUrl: e.target.files ? e.target.files[0] : "" || null as File | null,
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

    const handleUpdateFacility = async () => {
        setUploading(true);

        let imageUrl = "";
        if (editFormData.imageUrl) {
            imageUrl = await uploadImageToImgbb(editFormData.imageUrl as File);
        }

        if (!imageUrl && editFormData.imageUrl) {
            setUploading(false);
            return;
        }

        const updateData = {
            _id: editFormData._id,
            name: editFormData.name,
            description: editFormData.description,
            pricePerHour: editFormData.pricePerHour,
            location: editFormData.location,
            imageUrl: imageUrl || editFormData.imageUrl,
        };

        try {
            const result = await updateFacility({ id: editFormData._id, data: updateData }).unwrap();
            console.log("Update successful: ", result);
            toast.success("Facility updated successfully");
            setEditFormData({
                _id: "",
                name: "",
                description: "",
                pricePerHour: "",
                location: "",
                imageUrl: "" || null as File | null,
            });
            setUploading(false);
        } catch (err) {
            console.error("Update failed: ", err);
            toast.error("Update failed");
            setUploading(false);
        }
    };

    const handleDeleteFacility = async (id: string) => {
        try {
            const result = await deleteFacility(id).unwrap();
            console.log("Delete successful: ", result);
            toast.success("Facility deleted successfully");
        } catch (err) {
            console.error("Delete failed: ", err);
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

    const sortedData = sortByPrice
        ? [...filterData].sort((a, b) => a.pricePerHour - b.pricePerHour)
        : [...filterData].sort((a, b) => b.pricePerHour - a.pricePerHour);

    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
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
            <h1 className="text-[#42f5f5] text-center text-3xl">All <span className="text-white">Facilities</span></h1>
            <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />

            <div className="flex relative">
                <input
                    type="text"
                    placeholder="Search by name, description, or location..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-[#42f5f5] px-3 py-2 rounded-none pl-10"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <div className="flex my-2 md:my-10 space-x-4 ml-4">
                    <Button onClick={toggleSortByPrice} className="border border-[#42f5f5] px-3 py-2 rounded-none">
                        {sortByPrice ? "Price: Low to High" : "Price: High to Low"}
                    </Button>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
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
                        <TableRow key={facility._id} className={`${index % 2 === 0 ? "bg-green-50" : "bg-white"}`}>
                            <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                            <TableCell>{facility.name}</TableCell>
                            <TableCell>{facility.location}</TableCell>
                            <TableCell>
                                <Link to={`/facility/${facility._id}`}>
                                    <img
                                        src={facility.imageUrl}
                                        alt={facility.name}
                                        className="w-24 h-24 object-cover"
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
                                    <AiFillDelete className="text-red-600 text-xl" />
                                </button>
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button
                                            onClick={() => setEditFormData(facility as TFacility)}
                                            className="text-blue-500 text-xl"
                                        >
                                            <CiEdit />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-green-50 text-center">
                                        <DialogHeader>
                                            <DialogTitle>Edit Facility</DialogTitle>
                                            <DialogClose />
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="name">Facility Name</Label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    value={editFormData.name}
                                                    onChange={handleEditInputChange}
                                                    className="border-[#42f5f5]"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="description">Description</Label>
                                                <Input
                                                    type="text"
                                                    id="description"
                                                    value={editFormData.description}
                                                    onChange={handleEditInputChange}
                                                    className="border-[#42f5f5]"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="pricePerHour">Price per Hour</Label>
                                                <Input
                                                    type="number"
                                                    id="pricePerHour"
                                                    value={editFormData.pricePerHour}
                                                    onChange={handleEditInputChange}
                                                    className="border-[#42f5f5]"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    type="text"
                                                    id="location"
                                                    value={editFormData.location}
                                                    onChange={handleEditInputChange}
                                                    className="border-[#42f5f5]"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="image">Facility Image</Label>
                                                <Input
                                                    type="file"
                                                    id="image"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="border-[#42f5f5]"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                onClick={handleUpdateFacility}
                                                disabled={uploading}
                                                className="mt-4 bg-[#42f5f5] text-black"
                                            >
                                                {uploading ? "Updating..." : "Update"}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                            <TableCell className="text-right">{facility.pricePerHour}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="mt-4 flex justify-end">
                <PaginationContent>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </PaginationPrevious>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                active={page === currentPage}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </PaginationNext>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default FacilityTable;
