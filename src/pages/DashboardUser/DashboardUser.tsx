import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/api/api";
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

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const DashboardUser = () => {
    const { data, isLoading } = useGetUserProfileQuery({});
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        imageFile: null as File | null,
    });

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!data) {
        return <div>No user data found!</div>;
    }

    const { data: user } = data;  // Use optional chaining to avoid destructuring errors if `data` is undefined
    // console.log("user: ", user);

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
    
        let imageUrl = "";
        if (formData.imageFile) {
            imageUrl = await uploadImageToImgbb(formData.imageFile);
            if (!imageUrl) {
                setUploading(false);
                return;
            }
        }
    
        // Ensure the user ID is passed in the request.
        const updateData = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            imageUrl: imageUrl , // Use existing image if not updated
            role: user?.role || "user", // Use existing role if not provided
        };
    
        try {
            const result = await updateUserProfile({ id: user?._id, data: updateData }).unwrap();  // Pass user ID and form data
            console.log( result);
            toast.success("Profile updated successfully");
        } catch (err) {
            console.error("Update failed: ", err);
            toast.error("Update failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className=" px-10 py-40 md:px-0 text-center md:pl-40">
            <h1 className="font-bold bg-gradient-to-r from-pink-500 to-red-900 text-transparent bg-clip-text text-5xl md:text-7xl">
                {user?.name}
            </h1>
            <h1 className="font-bold bg-gradient-to-r from-pink-500 to-red-900 text-transparent bg-clip-text text-5xl md:text-7xl">
                {user?.email}
            </h1>

            <h1 className="text-white">{user?.phone}</h1>
            <h1 className="text-white">{user?.address}</h1>
            <img src={user?.imageUrl} alt=""  className="w-32 h-32 rounded-full mx-auto"/>
            
            <Dialog>
                <DialogTrigger>
                    <Button
                        onClick={() => {
                            // Pre-fill the form with user data when editing
                            setFormData({
                                name: user?.name,
                                phone: user?.phone,
                                address: user?.address,
                                imageFile: null,
                            });
                        }}
                        className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black p-2"
                    >
                        <CiEdit className="h-10 w-10"/>
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-black border border-orange-500 text-orange-500">
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
                            className="w-full mb-2"
                        />

                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            type="text"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full mb-2"
                        />

                        <Label htmlFor="address">Address</Label>
                        <Input
                            type="text"
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full mb-2"
                        />

                        <Label htmlFor="image">Image</Label>
                        <Input
                            type="file"
                            id="imageUrl"
                            onChange={handleFileChange}
                            className="w-full mb-2"
                        />

                        <DialogFooter>
                            <DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black"
                                >
                                    {uploading ? "Updating..." : "Update Profile"}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DashboardUser;
