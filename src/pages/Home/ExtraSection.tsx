

const ExtraSection = () => {
    return (
        <div>
            <div className="w-full h-screen overflow-hidden relative grid place-items-center">

              <div className="relative z-10  mb-40 text-center">
              <h1 className="font-bold bg-gradient-to-r from-[#42f5f5] to-[#000924] text-transparent bg-clip-text text-5xl md:text-7xl ">
                    PlaYTruF
                </h1>
                <p className="text-xl font-bold text-[#000924] ">Our Special Sport Booking When Winner Hits Is Going On!!!</p>
              </div>


                {/* Parallax background */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1520891102758-5d6525023b0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxzcG9ydHMlMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D)',
                        backgroundAttachment: 'fixed',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: '80%',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ExtraSection;