import { useCheckAvailabilityQuery } from '@/redux/api/api';
import { TBooking } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';

const AvailabilityChecker = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    const { data } = useCheckAvailabilityQuery(selectedDate, { skip: !selectedDate });
    const availableSlots = data?.data;

    const handleCheckAvailability = (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        
        if (selectedDate) {
            if (availableSlots?.length) {
                toast.success(`Check available Slots on ${selectedDate}`);
            } else {
                toast.error(`All slots available on ${selectedDate}`);
            }
        }
        setUploading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const formatTime = (time: string) => {
        const [hour, minute] = time.split(':');
        let hours = parseInt(hour);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        
       
        hours = hours % 12 || 12; 

        return `${hours}:${minute} ${suffix}`;
    };

    return (
        <div className=" ">
           <Card className="w-[350px] md:w-[450px] bg-transparent md:backdrop-blur-md border border-[#000924]">
            <CardHeader>
                <CardTitle className="text-[#42f5f5] text-center text-3xl">
                    Check Time <span className="text-white">Availability</span>
                </CardTitle>
                <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
            </CardHeader>
            <CardContent >
                <form onSubmit={handleCheckAvailability}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="date" className="text-[#42f5f5] mb-1">Date</Label>
                            <Input
                                type="date"
                                name="date"
                                placeholder="Select a date to book the facility"
                                className="bg-[#102e46] text-white"
                                value={selectedDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <CardFooter className="flex flex-col space-y-3 mt-4">
                        <Button 
                            type="submit" 
                            className="bg-[#102e46] text-[#42f5f5] hover:bg-[#42f5f5] hover:text-[#102e46]  my-2" 
                            disabled={uploading}
                        >
                            {uploading ? "Checking..." : "Check Availability"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>

        {availableSlots && (
            <div className="bg-[#102e46] py-4  rounded-md mt-2 text-[#42f5f5]">
                <h3 className='text-center mb-2 text-xl'>Available Slots on {selectedDate}- </h3>
                {availableSlots.length ? (
                    availableSlots.map((slot: TBooking, index: number) => (
                        <p key={index} className='text-center'>
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)} is Booked
                        </p>
                    ))
                ) : (
                    <p className="text-center">All slots available</p>
                )}
            </div>
        )}
        </div>
    );
};

export default AvailabilityChecker;
