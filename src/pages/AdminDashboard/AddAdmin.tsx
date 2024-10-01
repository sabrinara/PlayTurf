import { useAddUsersSignupMutation } from "@/redux/api/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddAdmin = () => {
    const [addUsersSignup] = useAddUsersSignupMutation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        imageFile: null as File | null,
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
            if (!imageUrl) {
                setUploading(false);
                return;
            }
        }

        const signupData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            image: imageUrl,
            role: "admin",
        };

        try {
            const result = await addUsersSignup(signupData).unwrap();
            console.log("Admin Add successful: ", result);
            toast.success("Admin added successful");
            navigate("/dashboard/allusers");

        } catch (err) {
            console.error("Admin Add failed: ", err);
            toast.error("Admin Add failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-[#000924] h-screen flex flex-col justify-center   pb-10">

            <div className=" flex justify-center items-center ">
                <Card className="w-[350px] md:w-[600px] bg-transparent md:backdrop-blur-md border border-[#000924]">
                    <CardHeader>
                        <CardTitle className="text-[#42f5f5] text-center text-3xl">Add <span className="text-white">Admin</span></CardTitle>
                        <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5 ">
                                        <Label htmlFor="name" className="text-[#42f5f5] mb-1">Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="Your name"
                                            className="bg-[#102e46] text-white "
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5 ">
                                        <Label htmlFor="email" className="text-[#42f5f5] mb-1">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="Your email"
                                            className="bg-[#102e46] text-white"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5 ">
                                        <Label htmlFor="phone" className="text-[#42f5f5] mb-1">Phone Number</Label>
                                        <Input
                                            type="text"
                                            id="phone"
                                            placeholder="Your phone number"
                                            className="bg-[#102e46] text-white"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5 ">
                                        <Label htmlFor="password" className="text-[#42f5f5] mb-1">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            className="bg-[#102e46] text-white"
                                            placeholder="Your Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5 ">
                                        <Label htmlFor="address" className="text-[#42f5f5] mb-1">Address</Label>
                                        <Input
                                            type="text"
                                            id="address"
                                            className="bg-[#102e46] text-white"
                                            placeholder="Your address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5 ">
                                        <Label htmlFor="imageFile" className="text-[#42f5f5] mb-1">Profile Image</Label>
                                        <Input
                                            type="file"
                                            id="imageFile"
                                            className="bg-[#102e46] text-white"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>
                            <CardFooter className="flex flex-col space-y-3 mt-4">
                                <Button type="submit" className="bg-[#102e46] text-[#42f5f5] hover:bg-[#42f5f5] hover:text-[#102e46] md:px-60 my-2" disabled={uploading}>
                                    {uploading ? "Adding Admin..." : "Add Admin"}
                                </Button>
                            </CardFooter>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddAdmin;
