export default function Footer() {
  return (
    <div>
   
      <div className="bg-[#102e47] text-[#42f5f5] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h5 className="text-lg font-bold text-[#42f5f5]">PlayTurf</h5>
              <p>&copy; 2024 PlayTurf. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="/about" className="hover:text-white underline">
                About
              </a>
              <a href="/contact" className="hover:text-white underline">
                Contact
              </a>
              <a href="/privacy" className="hover:text-white underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
