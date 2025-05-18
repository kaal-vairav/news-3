
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const categories = [
  { name: 'Home', path: '/' },
  { name: 'U.S.', path: '/category/general' },
  { name: 'International', path: '/category/world' },
  { name: 'Politics', path: '/category/politics' },
  { name: 'Business', path: '/category/business' },
  { name: 'Health', path: '/category/health' },
  { name: 'Entertainment', path: '/category/entertainment' },
  { name: 'Technology', path: '/category/technology' },
  { name: 'Sports', path: '/category/sports' },
];

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    if (showSearch) setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showMobileMenu) setShowMobileMenu(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search/${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="news-navbar">
      <div className="news-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-news-red">ABC</span>
              <span className="text-2xl font-bold text-news-dark-blue ml-1">News</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex space-x-4">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  to={category.path}
                  className="text-sm font-medium hover:text-news-red"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {/* Search and User */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="py-3 border-t">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-news-light-blue"
              />
              <Button type="submit" className="bg-news-red hover:bg-red-700 rounded-l-none">
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && isMobile && (
          <div className="md:hidden border-t py-2">
            <div className="flex flex-col space-y-2 px-2 pb-3">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  to={category.path}
                  className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
