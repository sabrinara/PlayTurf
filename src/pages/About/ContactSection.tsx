import { FiMapPin } from "react-icons/fi";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineMarkEmailRead } from "react-icons/md";
const ContactSection = () => {
    return (
        <div className=" py-16 px-8 text-white">
            <h2 className="text-4xl font-bold text-center mb-4 animate-slide-up text-[#42f5f5]">Contact <span className="text-white">Us</span></h2>
            <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
            <div className="flex flex-col md:flex-row justify-between items-center text-lg md:gap-10">
                <div className="none md:flex md:w-1/2 mb-8">
                    <img src="./contact.png" alt="Contact Us" className="w-full rounded-lg shadow-lg" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-around items-start text-lg gap-4">
                    <div className="flex justify-center items-center gap-2 bg-[#102e47] rounded-md p-6  text-[#42f5f5] ">
                        <FiMapPin className="text-4xl" />
                        <div>
                            <h3 className="text-2xl font-semibold">Office Address</h3>
                            <p className="text-sm text-white my-1">123 Sports Street, PlayCity, PC 45678</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 bg-[#102e47] rounded-md p-6  text-[#42f5f5] ">
                    <LuPhoneCall className="text-4xl" />
                        <div>
                            <h3 className="text-2xl font-semibold">Phone</h3>
                            <p className="text-sm text-white my-2">+1 (123) 456-7890</p>
                        </div>
                    </div>
                        <div className="flex justify-center items-center gap-2 bg-[#102e47] rounded-md p-6  text-[#42f5f5] ">
                        <MdOutlineMarkEmailRead className="text-4xl"/>
                            <div>
                                <h3 className="text-2xl font-semibold">Email</h3>
                                <p className="text-sm text-white my-2">support@playturf.com</p>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            );
};

            export default ContactSection;
