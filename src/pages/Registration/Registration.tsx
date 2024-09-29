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

const Registration = () => {
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
            role: "user",
        };

        try {
            const result = await addUsersSignup(signupData).unwrap();
            console.log("Registration successful: ", result);
            toast.success("Registration successful");
            navigate("/login");
        } catch (err) {
            console.error("Registration failed: ", err);
            toast.error("Registration failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white my-10">
            <h2>Sign Up</h2>
            <Card className="w-[350px] md:w-[500px] bg-transparent md:backdrop-blur-md my-10">
                <CardHeader>
                    <CardTitle className="text-orange-600 text-center text-3xl">Registration</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="name" className="text-orange-600">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="email" className="text-orange-600">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="phone" className="text-orange-600">Phone Number</Label>
                                <Input
                                    type="text" 
                                    id="phone"
                                    placeholder="Your phone number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="password" className="text-orange-600">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Your Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="address" className="text-orange-600">Address</Label>
                                <Input
                                    type="text"
                                    id="address"
                                    placeholder="Your address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="imageFile" className="text-orange-600">Profile Image</Label>
                                <Input
                                    type="file"
                                    id="imageFile"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                        </div>
                        <CardFooter className="flex flex-col space-y-3 mt-4">
                            <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={uploading}>
                                {uploading ? "Submitting..." : "Submit"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Registration;
