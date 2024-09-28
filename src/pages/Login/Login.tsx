import { useAddUsersLoginMutation } from "@/redux/api/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
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
            console.log("Login successful: ", result);
            toast.success("Login successful");
            navigate("/userdashboard");
        } catch (err) {
            console.error("Login failed: ", err);
            toast.error("Login failed");
        } finally {
            setUploading(false); 
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <Card className="w-[350px] md:w-[500px] bg-transparent md:backdrop-blur-md my-10">
                <CardHeader>
                    <CardTitle className="text-orange-600 text-center text-3xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5 ">
                                <label htmlFor="email" className="text-orange-600">Email</label>
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
                                <label htmlFor="password" className="text-orange-600">Password</label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Your Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
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

export default Login;
