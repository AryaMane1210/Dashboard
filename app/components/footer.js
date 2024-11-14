const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* Left side  */}
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h3 className="text-2xl font-semibold">Finsta</h3>
              <p className="text-sm mt-2">Social media admin dashboard</p>
            </div>
  
            {/* Middle */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-x-8 sm:space-y-0">
              <p className="text-gray-400 hover:text-white">Privacy Policy</p>
              <p href="/terms" className="text-gray-400 hover:text-white">Terms of Service</p>
              <p href="/contact" className="text-gray-400 hover:text-white">Contact Us</p>
            </div>
  
            {/* Right side */}
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i> {/* Facebook Icon */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i> {/* Twitter Icon */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i> {/* Instagram Icon */}
              </a>
            </div>
          </div>
  
          {/* Copyright Part */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">© 2024 Finsta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  