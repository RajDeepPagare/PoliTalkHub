
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-politics-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PoliTalkHub</h3>
            <p className="text-sm text-gray-300">
              A platform for meaningful political discourse and engagement.
              Connect with others, discuss issues, and make a difference.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/news" className="hover:text-white">News Feed</Link></li>
              <li><Link to="/forums" className="hover:text-white">Discussion Forums</Link></li>
              <li><Link to="/campaigns" className="hover:text-white">Campaigns</Link></li>
              <li><Link to="/legislation" className="hover:text-white">Legislation Tracking</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Community</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/guidelines" className="hover:text-white">Community Guidelines</Link></li>
              <li><Link to="/moderation" className="hover:text-white">Moderation Policy</Link></li>
              <li><Link to="/fact-checking" className="hover:text-white">Fact Checking</Link></li>
              <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} PoliTalkHub. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto">
              Twitter
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto">
              Facebook
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto">
              Instagram
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0 h-auto">
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
