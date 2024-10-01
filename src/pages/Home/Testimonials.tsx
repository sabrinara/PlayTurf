import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { useGetAllUserQuery } from "@/redux/api/api";
import { TUsers } from "@/types";

const Testimonials = () => {
  const { data } = useGetAllUserQuery({});
  const { data: user } = data || {};

  const fakeReviews = [
    "This facility has exceeded my expectations, I highly recommend it!",
    "The booking process was smooth, and the facility was top-notch!",
    "Excellent service and well-maintained facilities. Will definitely come back!",
    "A great place to unwind and enjoy some sports. Highly recommend!",
    "One of the best experiences I've had with sports facilities. Great staff too!",
    "Amazing atmosphere and well-organized services. I had a fantastic time!",
    "This place is a gem! Everything was perfect, from booking to usage.",
    "A fantastic facility with a professional staff and clean environment!",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); 
  }, []);

  return (
    <div className="mb-10">
      <div className=" md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold my-4 text-center text-[#42f5f5]">
          What Our Client<span className="text-white"> Say</span>
        </h2>
        <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-10 ">
        {user?.slice(4, 8).map((item: TUsers, index: number) => (
          <div
            key={item._id}
            data-aos="fade-up"
            className="p-4 bg-[#102e46] rounded-lg py-10"
          >
            {item?.imageUrl ? (
              <img
                src={item?.imageUrl}
                alt={item?.name}
                className="rounded-full w-28 h-28 mb-4 mx-auto"
              />
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="Profile Image"
                className="rounded-full w-16 h-16 mb-4 mx-auto"
              />
            )}
            <p className="text-white text-center font-bold mb-2">{item?.name}</p>
            <p className="text-white text-center italic">
              {fakeReviews[index % fakeReviews.length]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
