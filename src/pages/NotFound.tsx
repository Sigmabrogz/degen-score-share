
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DefiLogo } from "@/components/cluster-logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-defi-dark p-4">
      <div className="glass-panel neo-shadow p-8 rounded-xl max-w-md w-full animate-fade-in">
        <div className="mb-6 flex justify-center">
          <DefiLogo />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-center text-defi-green monument-font">404</h1>
        <p className="text-xl text-white/80 mb-8 text-center">This page doesn't exist in the DeFi universe</p>
        
        <div className="flex justify-center">
          <Button 
            className="bg-defi-green text-black hover:bg-defi-green-light hover:shadow-[0_0_15px_rgba(172,255,127,0.5)]"
            onClick={() => window.location.href = '/'}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
