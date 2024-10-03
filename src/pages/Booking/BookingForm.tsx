import { useState, ChangeEvent, FormEvent } from 'react';
import { useAddBookingMutation } from '@/redux/api/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
    const facility = localStorage.getItem('facility');
    const parsedFacility = facility ? JSON.parse(facility) : null;
    const facilityId = parsedFacility?._id;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
    });

    const [addBooking] = useAddBookingMutation();
    const [uploading, setUploading] = useState(false);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);
        try {

            await addBooking({
                facility: facilityId,
                ...formData
            }).unwrap();
            localStorage.removeItem('facility');
            toast.success("Booking successful!");
            navigate("/dashboard/mybooking")
           
        } catch (error) {
            toast.error("Booking failed");
            console.log(error);
        } finally {
            setUploading(false);
        }
    };


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Card className="w-[350px] md:w-[500px] bg-transparent md:backdrop-blur-md border border-[#000924]">
            <CardHeader>
                <CardTitle className="text-[#42f5f5] text-center text-3xl">Book <span className="text-white">Facility</span></CardTitle>
                <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="date" className="text-[#42f5f5] mb-1">Date</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    placeholder="Your date to book the facility"
                                    className="bg-[#102e46] text-white "
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="startTime" className="text-[#42f5f5] mb-1">Start Time</Label>
                                <Input
                                    type="time"
                                    name='startTime'
                                    placeholder="Start time"
                                    className="bg-[#102e46] text-white"
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        
                        
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="endTime" className="text-[#42f5f5] mb-1">End Time</Label>
                                <Input
                                    type="time"
                                    name="endTime"
                                    placeholder="Your endTime number"
                                    className="bg-[#102e46] text-white"
                                    value={formData.endTime}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                          
                        </div>

                
                    <CardFooter className="flex flex-col space-y-3 mt-4">
                        <Button type="submit" className="bg-[#102e46] text-[#42f5f5] hover:bg-[#42f5f5] hover:text-[#102e46]  my-2" disabled={uploading}>
                            {uploading ? "Booking..." : "Pay Now"}
                        </Button>
                    </CardFooter>

                </form>
            </CardContent>
        </Card>
        
    );
};

export default BookingForm;
