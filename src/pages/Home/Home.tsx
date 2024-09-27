
import Banner from "./Banner";
import ExtraSection from "./ExtraSection";
import FeaturedFacility from "./FeaturedFacility";
import RoadMap from "./RoadMap/RoadMap";
import Testimonials from "./Testimonials";



const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedFacility />
      <RoadMap />
      <Testimonials />
      <ExtraSection />

    </div>
  );
};

export default Home;