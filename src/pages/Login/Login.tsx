import { useAddUsersLoginMutation } from "@/redux/api/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Login = () => {
    const [addUsersLogin] = useAddUsersLoginMutation();
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = {
            email: formData.email,
            password: formData.password,
        };

        setUploading(true);

        try {
            const result = await addUsersLogin(loginData).unwrap();
            const token = localStorage.setItem("token", result.token);
            const id = localStorage.setItem("id", result.data._id);
            console.log("Login successful: ", result, token, id);
            toast.success("Login successful");
            navigate("/dashboard");
        } catch (err) {
            console.error("Login failed: ", err);
            toast.error("Login failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-[#000924] flex justify-center items-center h-screen">
            <h2>Login</h2>
            <Card className="w-[350px] md:w-[500px] bg-transparent md:backdrop-blur-md my-10">
                <CardHeader>
                    <CardTitle className="text-[#42f5f5] text-center text-3xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5 ">
                                <label htmlFor="email" className="text-[#42f5f5]">Email</label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Your email"
                                    className="bg-[#102e46]"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5 ">
                                <label htmlFor="password" className="text-[#42f5f5]">Password</label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Your Password"
                                    className="bg-[#102e46]"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <CardFooter className="flex flex-col space-y-3 mt-4">
                            <Button type="submit" className="bg-[#102e46] text-[#42f5f5] hover:bg-[#42f5f5] hover:text-[#102e46]" disabled={uploading}>
                                {uploading ? "Submitting..." : "Submit"}
                            </Button>
                        </CardFooter>
                        <CardFooter className="flex flex-col space-y-1 ">
                            <h1 className="text-[#42f5f5]">Don't have an account? 
                                <small className="ml-2 underline"><Link to="/signup">Register</Link></small>
                                 </h1>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
