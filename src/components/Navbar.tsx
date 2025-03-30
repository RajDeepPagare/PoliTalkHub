
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, Bell, MessageSquare, User } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-2xl text-politics-blue">Poli<span className="text-politics-red">TalkHub</span></span>
            </Link>
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search topics..." 
                className="pl-8"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              <Link to="/news">News</Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              <Link to="/forums">Forums</Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              <Link to="/campaigns">Campaigns</Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              <Link to="/legislation">Legislation</Link>
            </Button>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-politics-red"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="default" className="bg-politics-blue hover:bg-politics-blue/90" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex items-center relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search topics..." 
                className="pl-8 w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/news">News</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/forums">Forums</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/campaigns">Campaigns</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/legislation">Legislation</Link>
              </Button>
              <div className="h-px bg-border my-2"></div>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/profile">Profile</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/notifications">Notifications</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/messages">Messages</Link>
              </Button>
              <Button variant="default" className="bg-politics-blue hover:bg-politics-blue/90 w-full mt-2" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
