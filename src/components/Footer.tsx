
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-news-dark-blue text-white mt-10">
      <div className="news-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">ABC</span>
              <span className="text-2xl font-bold text-news-red ml-1">News</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Delivering comprehensive news coverage from around the world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/category/general" className="hover:text-white">U.S.</Link></li>
              <li><Link to="/category/world" className="hover:text-white">International</Link></li>
              <li><Link to="/category/politics" className="hover:text-white">Politics</Link></li>
              <li><Link to="/category/business" className="hover:text-white">Business</Link></li>
              <li><Link to="/category/health" className="hover:text-white">Health</Link></li>
            </ul>
          </div>

          {/* More Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-3">More</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/category/entertainment" className="hover:text-white">Entertainment</Link></li>
              <li><Link to="/category/technology" className="hover:text-white">Technology</Link></li>
              <li><Link to="/category/sports" className="hover:text-white">Sports</Link></li>
              <li><Link to="/category/science" className="hover:text-white">Science</Link></li>
              <li><Link to="/weather" className="hover:text-white">Weather</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} ABC News. All rights reserved. This is a clone built for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
