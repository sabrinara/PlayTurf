import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div
      className="flex justify-center items-center relative bg-[#000924]"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/D9xZW9f/not.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="  p-40 rounded-lg   ml-80 absolute">
        <Link to="/">
          <Button className="border-2 border-[#42f5f5] px-6 py-5 rounded-none bg-transparent text-[#42f5f5] mt-4  hover:text-white">
            Back To Home</Button>
        </Link>
       
      </div>
    </div>
  );
}