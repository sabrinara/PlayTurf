const ContactDetails = () => {
    return (
      <div className="py-16 px-8 text-white ">
           <h2 className="text-4xl font-bold text-center mb-4 animate-slide-up text-[#42f5f5]">Contact <span className="text-white">Information</span></h2>
           <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-6" />
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-10" data-aos="fade-up">
          <div className="text-center space-y-2 bg-gradient-to-r from-[#102e47] via-[#1f405f] to-[#102e47] py-4 px-4 rounded-md text-[#42f5f5]">
            <p className="text-xl">Phone:</p>
            <p className="text-sm">+123 456 7890</p>
          </div>
          <div className="text-center space-y-2 bg-gradient-to-r from-[#102e47] via-[#1f405f] to-[#102e47] py-4 px-4 rounded-md text-[#42f5f5]">
            <p className="text-xl">Email:</p>
            <p className="text-sm">support@playturf.com</p>
          </div>
          <div className="text-center space-y-2 bg-gradient-to-r from-[#102e47] via-[#1f405f] to-[#102e47] py-4 px-4 rounded-md text-[#42f5f5]">
            <p className="text-xl">Address:</p>
            <p className="text-sm">1234 Sport Ave, City, Country</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactDetails;
  