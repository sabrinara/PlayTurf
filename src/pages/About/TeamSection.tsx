

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    bio: "John is the visionary behind PlayTurf, dedicated to innovating the sports booking landscape.",
    photo: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8fHww", 
  },
  {
    name: "Jane Smith",
    role: "COO",
    bio: "With a sharp mind for operations, Jane ensures seamless day-to-day management.",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Michael Brown",
    role: "CTO",
    bio: "Michael leads PlayTurf's technical development, bringing the best user experience to life.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww",
  },
];

const TeamSection = () => {
  return (
    <div className=" px-8">
      <h2 className="text-4xl font-bold text-center mb-4 animate-slide-up text-[#42f5f5]">Meet Our <span className="text-white">Team</span></h2>
      <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 md:mt-20">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-[#102e47] p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform">
            <img src={member.photo} alt={member.name} className="h-40 w-40 rounded-full mx-auto mb-4"/>
            <h3 className="text-2xl font-semibold text-[#42f5f5] text-center">{member.name}</h3>
            <p className="text-center text-[#42f5f5]">{member.role}</p>
            <p className="text-center mb-4 text-white">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
