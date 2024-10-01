import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <div className="bg-[#102e47] text-[#42f5f5] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/">
                <div className="flex items-center">
                  <img src="./navlogo3.png" className="h-14 md:h-20" alt="Logo" />
                </div>
              </Link>
              <p className="ml-4 mb-2">&copy; 2024 PlayTurf. All rights reserved.</p>
            </div>
            < div className='flex flex-col justify-between items-center gap-4 my-10'>
              <div className="flex space-x-4 mb-4 md:mb-0">
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
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaFacebookF size={20} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaTwitter size={20} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaLinkedinIn size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
