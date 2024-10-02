import './RoadMap.css';

const RoadMap = () => {
  return (
    <div className="my-10 mt-[84rem] md:mt-[0px]">
      <h2 className="text-3xl md:text-4xl font-bold my-4 text-center text-[#42f5f5]">
        How It <span className="text-white">Works</span>
      </h2>
      <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2" />

      <div className="home flex justify-center items-center px-10 md:px-0 text-center md:pl-40 md:py-0">
        <div className="process start ">
          <ul>
            <li className="one">
              <div className="icon">
                <img src="./images/roadmap/1.png" alt="Process Icon" />
              </div>
              <div className="media-body w-full md:w-2/3">
                <h4>Login First</h4>
                <p>Sign up or log in to your account to get access to all the facilities available on the platform.</p>
              </div>
            </li>
            <li className="two">
              <div className="icon">
                <img src="./images/roadmap/2.png" alt="Process Icon" />
              </div>
              <div className="media-body w-full md:w-2/3">
                <h4>Explore Facilities</h4>
                <p>Browse through a variety of sports facilities, from football fields to tennis courts, and more.</p>
              </div>
            </li>
            <li className="three">
              <div className="icon">
                <img src="./images/roadmap/3.png" alt="Process Icon" />
              </div>
              <div className="media-body w-full md:w-2/3">
                <h4>Search Your Desired Facility</h4>
                <p>Use the search feature to find the facility that best suits your requirements and schedule.</p>
              </div>
            </li>
            <li className="four">
              <div className="icon">
                <img src="./images/roadmap/4.png" alt="Process Icon" />
              </div>
              <div className="media-body w-full md:w-2/3">
                <h4>Book Your Facility</h4>
                <p>Reserve the facility at your preferred time by completing the easy booking process.</p>
              </div>
            </li>
            <li className="five">
              <div className="icon">
                <img src="./images/roadmap/5.png" alt="Process Icon" />
              </div>
              <div className="media-body w-full md:w-2/3">
                <h4 className="text-center">Pay & Enjoy Facility</h4>
                <p>Complete the payment securely and enjoy your facility at the booked time.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
