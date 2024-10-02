import ScrollButton from "../shared/ScrollButton";
import ContactSection from "./ContactSection";
import HistorySection from "./HistorySection";
import TeamSection from "./TeamSection";


const About = () => {
    return (
        <div >
            <div className="flex flex-col md:flex-row justify-between items-center text-[#42f5f5] py-16 px-8">
                <div className="md:w-1/2 hover:scale-105 hover:ease-in-out hover:duration-300 md:mx-20">
                <h2 className="text-4xl font-bold mb-4 animate-slide-up text-[#42f5f5]">Our <span className="text-white">Mission</span></h2>
                <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12  mb-2" />
                    <p className="text-lg text-white">
                        PlayTurf is committed to connecting sports enthusiasts with the best sports facilities across the region.
                        Our goal is to create a seamless and efficient platform for booking, ensuring athletes have easy access to
                        world-class venues for their practice and events.
                    </p>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 md:ml-0 animate-fade-in">
                    <img src="./mission.png" alt="Mission" className="rounded-lg shadow-lg w-full h-auto" />
                </div>
            </div>
            <TeamSection />
            <HistorySection />
            <ContactSection />

            <ScrollButton />
        </div>
    );
};

export default About;