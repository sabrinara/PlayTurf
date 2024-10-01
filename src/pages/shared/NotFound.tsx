import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div
      className="flex justify-center items-center relative bg-[#000924]"
      style={{
        backgroundImage: `url('./not.jpg')`,
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
        {/* <h1 className="text-4xl font-bold text-green-800">404 - Not Found</h1>
        <p className="mt-4 text-lg text-green-600">
          Sorry, the page you are looking for does not exist.
        </p> */}
      </div>
    </div>
  );
}