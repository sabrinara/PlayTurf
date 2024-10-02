
import ScrollButton from "../shared/ScrollButton";
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
      <ExtraSection />
      <Testimonials />
      <ScrollButton />

    </div>
  );
};

export default Home;