import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import sliderImage1 from "@/assets/banner.jpg";
import sliderImage2 from "@/assets/banner2.jpg";
import sliderImage3 from "@/assets/banner3.jpg";
import { Link } from "react-router-dom";
const Banner = () => {

    const sliderData = [
        {
            id: 1,
            image: sliderImage1,
            subText: "PlayTurf Services",
            text: "Leopard Lily",
            details: "The symbol of strength and resilience. Purify your home {{br}} with leopard lily plants.",
        },
        {
            id: 2,
            image: sliderImage2,
            subText: "PlayTurf Services",
            text: "Calathea Plant",
            details: "It is a long established fact a reader by {{br}} the readable content looking.",
        },
        {
            id: 3,
            image: sliderImage3,
            subText: "PlayTurf Services",
            text: "Spring Plant",
            details: "We’re Spring Plant, When you’ve got your {{br}} health, you got everything.",
        },
    ];
    return (
        <div className=" w-full h-full md:h-[500px] bg-black mt-10">
            <Carousel
                className="relative overflow-hidden rounded-lg shadow-lg"
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent className="flex ">
                    {sliderData.map((slider) => (
                        <CarouselItem key={slider.id} className="min-w-full">
                            <Card className="rounded-none bg-black">
                                <CardContent
                                    className="flex  h-[250px] w-full  md:h-[500px] p-0"
                                    style={{
                                        backgroundImage: `url(${slider.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        transition: "transform 0.5s ease",
                                        transform: "scale(1)",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                >
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-mono  bg-sky-200 bg-opacity-50 p-1 md:p-10 rounded ">
                                        <h1 className="font-extrabold text-3xl md:text-5xl bg-gradient-to-r from-[#000924] via-[#102e46] to-[#42f5f5] bg-clip-text text-transparent pb-1 md:pb-2">PlayTurf</h1>
                                        <p className='hidden md:flex text-xl text-[#102e46] font-bold mx-10 py-2'>We provide your desire sports facility services.</p>
                                        <Link to='/facility'>
                                            <button className="px-3 md:px-6 py-1 md:py-3 bg-gradient-to-r from-[#000924] via-[#102e46] to-[#42f5f5] text-white font-bold rounded text-xl mt-2 ">
                                                Book Now
                                            </button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-1 md:p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
                    &#9664;
                </CarouselPrevious>
                <CarouselNext className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-1 md:p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
                    &#9654;
                </CarouselNext>
            </Carousel>
        </div>
    );
};

export default Banner;
