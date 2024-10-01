import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/api/api";
import { MdMarkEmailRead } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import Loading from "../shared/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const DashboardUser = () => {
    const id = localStorage.getItem("id");
    const { data, isLoading } = useGetUserProfileQuery({ id });
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        imageUrl: "", 
        imageFile: null as File | null,
    });

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (!data) {
        return <div>No user data found!</div>;
    }

    const { data: user } = data;

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
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        let imageUrl = formData.imageUrl; 
        if (formData.imageFile) {
            imageUrl = await uploadImageToImgbb(formData.imageFile);
            if (!imageUrl) {
                setUploading(false);
                return;
            }
        }

        const updateData = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            imageUrl, 
            role: user?.role || "user",
        };

        try {
            const result = await updateUserProfile({ id: user?._id, data: updateData }).unwrap();
            console.log("Update successful: ", result);
            toast.success("Profile updated successfully");
        } catch (err) {
            console.error("Update failed: ", err);
            toast.error("Update failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className=" ">
            <div className="flex justify-center items-center ">
                    <img src="./welcome.jpg" className="w-1/3  h-[230px] " />
                </div>
            <div className="bg-[#102e47] rounded-md flex flex-col md:flex-row justify-between items-center px-20">

                <div className="text-[#42f5f5] ml-20 flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-10">
                    < h1 className="text-3xl md:text-5xl font-bold font-serif">Hi {user?.name}!</h1>
                        <div>
                            <Dialog>
                                <DialogTrigger>
                                    <Button
                                        onClick={() => {

                                            setFormData({
                                                name: user?.name || "",
                                                phone: user?.phone || "",
                                                address: user?.address || "",
                                                imageUrl: user?.imageUrl || "",
                                                imageFile: null,
                                            });
                                        }}
                                        className="bg-[#000924] text-[#42f5f5] hover:bg-[#42f5f5] hover:text-[#102e47] "
                                    >
                                        <CiEdit className="h-8 w-8" title="Edit Now"/>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-[#102e47] border border-[#42f5f5] text-[#42f5f5]">
                                    <DialogHeader>
                                        <h2>Edit Profile</h2>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full mb-2 bg-[#102e47] text-[#42f5f5]"
                                        />

                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            type="text"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full mb-2 bg-[#102e47] text-[#42f5f5]"
                                        />

                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            type="text"
                                            id="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full mb-2 bg-[#102e47] text-[#42f5f5]"
                                        />

                                        <Label htmlFor="image">Image</Label>
                                        <Input
                                            type="file"
                                            id="imageUrl"
                                            onChange={handleFileChange}
                                            className="w-full mb-2 bg-[#102e47] text-[#42f5f5]"
                                        />

                                        <DialogFooter>
                                            <DialogClose>
                                                <Button
                                                    type="submit"
                                                    className="text-[#102e47] bg-[#42f5f5] hover:bg-[#42f5f5]"
                                                >
                                                    {uploading ? "Updating..." : "Update Profile"}
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <MdMarkEmailRead className="text-2xl" />
                        <h1 className="text-2xl font-bold">{user?.email}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <LuPhoneCall className="text-2xl" />
                        <h1 className="text-2xl font-bold">{user?.phone}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-2xl" />
                        <h1 className="text-2xl font-bold">{user?.address}</h1>
                    </div>

                </div>
                <div>
                    <img src={user?.imageUrl} className="w-60 h-60 rounded-full my-20" />
                </div>
                <div>

                </div>

            </div>



        </div>
    );
};

export default DashboardUser;
