const milestones = [
  { year: "2018", description: "PlayTurf was founded with a vision to simplify sports facility booking." },
  { year: "2019", description: "Expanded partnerships with over 50 sports venues across the region." },
  { year: "2021", description: "Reached 100,000 active users, a significant milestone in our journey." },
  { year: "2023", description: "Expanded to 10+ cities with major partnerships with premium facilities." },
];

const HistorySection = () => {
  return (
    <div className="py-16 px-8 text-white">
      <h2 className="text-4xl font-bold text-center mb-4 animate-slide-up text-[#42f5f5]">
        Our <span className="text-white">Journey</span>
      </h2>
      <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-8" />
      <div className="relative flex flex-col items-center">
        <div className="absolute left-1/2 w-p transform -translate-x-1/2"></div>
        <div className="space-y-12 mt-10">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex flex-col items-center animate-slide-up transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#42f5f5] flex items-center justify-center text-black font-bold text-xl">
                  <h1 className="text-center ">{milestone.year}</h1>               
                </div>
                <div className="border-l-2 border-[#42f5f5] h-8 mx-4"></div>
                <p className="text-xl text-center">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
