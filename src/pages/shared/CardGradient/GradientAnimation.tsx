export default function GradientAnimation() {
    return (
      <div className="mx-auto container">
        <h1 className="text-3xl font-bold underline mb-10">Hello world!</h1>
  
        {/* First Image with Gradient Pulse */}
        <div className="relative w-64 h-64 mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-pulse rounded-full"></div>
          <img
            src="https://images.unsplash.com/photo-1726211438453-2996fec54c23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
            alt="Image"
            className="absolute inset-0 m-auto w-48 h-48 object-cover rounded-full"
          />
        </div>
  
        {/* Second Image with Snake-like Gradient Animation */}
        <div className="relative w-64 h-64 mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full animate-snake"></div>
          <img
            src="https://via.placeholder.com/150"
            alt="Image"
            className="absolute inset-0 m-auto w-40 h-40 object-cover rounded-full"
          />
        </div>
  
        {/* Image with Animated Border */}
        <div className="relative w-64 h-64 mb-10">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gradient animate-rotateBorder"></div>
          <img
            src="https://via.placeholder.com/150"
            alt="Image"
            className="absolute inset-0 m-auto w-40 h-40 object-cover rounded-full"
          />
        </div>
  
        {/* Custom Tailwind CSS for border animation */}
        <style>
          {`
            /* Keyframes for animations */
            @keyframes rotateBorder {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
  
            @keyframes snakeMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
  
            /* Animation Classes */
            .animate-rotateBorder {
              animation: rotateBorder 4s linear infinite;
            }
  
            .animate-snake {
              background-size: 300% 300%;
              animation: snakeMove 4s ease-in-out infinite 3s; /* Delay */
            }
  
            /* Custom Gradient Border */
            .border-t-gradient {
              border-top: 4px solid;
              border-image: linear-gradient(90deg, purple, pink, yellow) 1;
            }
          `}
        </style>
  
        <h1 className="text-3xl font-bold underline mb-10">Another</h1>
  
        {/* Image with Animated Gradient Border */}
        <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-8 border-transparent animate-spinGradient"></div>
          <img
            src="https://via.placeholder.com/150"
            alt="Image"
            className="w-40 h-40 object-cover rounded-full"
          />
        </div>
  
        {/* Custom Tailwind CSS for gradient animation */}
        <style>
          {`
            @keyframes spinGradient {
              0% { transform: rotate(0deg); border-image: linear-gradient(0deg, purple, pink, yellow, purple); }
              100% { transform: rotate(360deg); border-image: linear-gradient(360deg, purple, pink, yellow, purple); }
            }
  
            .animate-spinGradient {
              animation: spinGradient 4s linear infinite;
              border-image-slice: 1;
              border-width: 8px;
              border-image: linear-gradient(0deg, purple, pink, yellow, purple);
              animation-delay: 1s; /* Delay before animation starts */
            }
          `}
        </style>
  
        {/* Image with Animated Circular Dotted Border */}
        <div className="flex justify-center items-center h-screen">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full border-8 border-dotted border-transparent animate-spinBorder">
              <div className="absolute inset-0 rounded-full border-8 border-dotted border-transparent bg-gradient-to-r from-pink-500 to-purple-500 animate-[spin_4s_linear_infinite]"></div>
            </div>
            <img
              src="https://via.placeholder.com/150"
              alt="Image"
              className="absolute inset-0 m-auto w-40 h-40 object-cover rounded-full"
            />
          </div>
        </div>
  
        {/* Custom CSS for dotted border animation */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
  
            .animate-spinBorder {
              background: conic-gradient(from 0deg, pink, yellow, purple, pink);
              mask-image: radial-gradient(circle, transparent 60%, black 61%);
              animation: spin 4s linear infinite;
            }
          `}
        </style>
  
      
      </div>
    );
  }
  