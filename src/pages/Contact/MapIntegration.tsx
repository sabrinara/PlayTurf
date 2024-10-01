const MapIntegration = () => {
    return (
      <div className="py-10">
          <h2 className="text-4xl font-bold text-center mb-4 animate-slide-up text-[#42f5f5]">Our <span className="text-white">Location</span></h2>
          <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-6" />
        <div className="mt-6 flex justify-center">
       
          <iframe
            title="office-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345095045!2d144.95373561531863!3d-37.81627957975152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57734f843e7b339!2sVictoria%20Market!5e0!3m2!1sen!2sau!4v1632488843533!5m2!1sen!2sau"
            width="1400"
            height="450"
            className="border-none rounded-lg shadow-lg"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default MapIntegration;
  