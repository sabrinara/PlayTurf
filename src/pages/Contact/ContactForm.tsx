import { useEffect, useState } from "react";
import 'aos/dist/aos.css';
import Aos from 'aos';
import { toast } from "sonner";

const ContactForm = () => {
    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    // Use union type for event to handle both input and textarea
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        toast.success("Message sent successfully");
    };

    return (
        <div className="py-16 px-8 text-white ">
            <h2 className="text-4xl font-bold text-center mb-4 animate-slide-up text-[#42f5f5]">
                Contact <span className="text-white">Us</span>
            </h2>
            <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-6" />

            <div className="flex flex-col md:flex-row-reverse justify-center items-center text-lg md:gap-10">
                <div className="none md:flex md:w-1/2 mb-8">
                <img src="./contact2.png" alt="Contact Us" />
                </div>
                <div className="w-full md:w-1/2 md:pl-20">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6" data-aos="fade-up">
                <div>
                    <label className="block mb-2 text-lg text-[#42f5f5]">Name</label>
                    <input
                        type="text"
                        name="name"
                        
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-[#102e47] text-white rounded-md"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-lg text-[#42f5f5]">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-[#102e47] text-white rounded-md"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-lg text-[#42f5f5]">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-[#102e47] text-white rounded-md"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-lg text-[#42f5f5]">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-[#102e47] text-white rounded-md h-40"
                    />
                </div>
                <button type="submit" className="bg-[#42f5f5] hover:bg-[#35bdbd] p-3 rounded-md w-full text-xl text-black font-bold">Submit</button>
            </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
