

const About = () => {
    return (
        <div >
            <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#102e47] to-[#42f5f5] to-animate-gradient-x text-white py-16 px-8">

                <div className="md:w-1/2 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-6">Our Mission</h1>
                    <p className="text-lg">
                        PlayTurf is committed to connecting sports enthusiasts with the best sports facilities across the region.
                        Our goal is to create a seamless and efficient platform for booking, ensuring athletes have easy access to
                        world-class venues for their practice and events.
                    </p>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 md:ml-12 animate-fade-in">
                    <img src="path-to-mission-image.jpg" alt="Mission" className="rounded-lg shadow-lg w-full h-auto" />
                </div>

            </div>


        </div>
    );
};

export default About;