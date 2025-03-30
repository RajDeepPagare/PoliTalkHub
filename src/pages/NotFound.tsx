
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 py-16">
          <h1 className="text-9xl font-bold text-politics-blue mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-6">This page seems to have gone off the record</p>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved to a different URL.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-politics-blue hover:bg-politics-blue/90" asChild>
              <a href="/">Return to Home</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/forums">Browse Forums</a>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
