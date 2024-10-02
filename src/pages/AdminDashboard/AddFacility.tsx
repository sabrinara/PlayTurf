import { useAddFacilityMutation } from "@/redux/api/api";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,

} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddFacility = () => {
    const [addfacility] = useAddFacilityMutation();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imageFile: null as File | null,
        location: "",
        pricePerHour: "",

    });
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            imageFile: e.target.files ? e.target.files[0] : null,
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
            toast.error("Failed to upload image");
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        let imageUrl = "";
        if (formData.imageFile) {
            imageUrl = await uploadImageToImgbb(formData.imageFile);
        }

        if (!imageUrl) {
            setUploading(false);
            return;
        }

        const facilityData = {
            name: formData.name,
            description: formData.description,
            location: formData.location,
            imageUrl: imageUrl,
            pricePerHour: Number (formData.pricePerHour),
        };

        try {
            const result = await addfacility(facilityData).unwrap();
            console.log("Add facility successful: ", result);
            toast.success("Facility added successfully");
            navigate("/dashboard/facilitytable");
        } catch (err) {
            console.error("Add facility failed: ", err);
            toast.error("Add facility failed");
        } finally {
            setUploading(false);
        }
    };



    return (
        <div className="bg-[#000924] h-screen flex items-center justify-center   pb-10">


           
                <Card className="w-[350px] md:w-[500px] bg-[#102e47] md:bg-transparent md:backdrop-blur-md my-10 border border-[#000924]" >
                    <CardHeader>
                        <h1 className="text-[#42f5f5] text-center text-3xl">Add <span className="text-white">Facility</span></h1>
                        <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
                        <CardDescription className="text-center">
                            Add a new facility to Playturf
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5 text-[#42f5f5]">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        className="text-[#42f5f5] bg-[#102e47]"
                                        type="text"
                                        id="name"
                                        placeholder="Write the facility name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 text-[#42f5f5]">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                         className="text-[#42f5f5] bg-[#102e47]"
                                        type="text"
                                        id="description"
                                        placeholder="Write the facility description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 text-[#42f5f5]">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                         className="text-[#42f5f5] bg-[#102e47]"
                                        type="text"
                                        id="location"
                                        placeholder="Write the facility location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5 text-[#42f5f5]">
                                    <Label htmlFor="pricePerHour">Price per hour</Label>
                                    <Input
                                        className="text-[#42f5f5] bg-[#102e47]"
                                        type="number"
                                        id="pricePerHour"
                                        placeholder="Enter the facility price per hour"
                                        value={formData.pricePerHour}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>


                                <div className="flex flex-col space-y-1.5 text-[#42f5f5]">
                                    <Label htmlFor="imageUrl">Image</Label>
                                    <Input
                                         className="text-[#42f5f5] bg-[#102e47]"
                                        type="file"
                                        id="imageUrl"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>

                            </div>

                            <CardFooter className="flex justify-between items-center mt-6 -mr-6 -ml-6">
                                <Button variant="outline" type="button"  className="bg-[#42f5f5] text-[#102e47] font-bold">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#102e47]"
                                    disabled={uploading}
                                >
                                    {uploading ? "Saving..." : "Save"}
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>

    );
};

export default AddFacility;