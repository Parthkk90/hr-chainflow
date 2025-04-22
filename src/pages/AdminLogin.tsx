
import { useAccount, useConnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, ShieldCheck, Users, BadgeCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

const benefitList = [
  {
    icon: <ShieldCheck className="text-primary/90 h-7 w-7" />,
    title: "Secure & Private",
    description: "Your employee data is encrypted and managed using blockchain security, ensuring only you control access."
  },
  {
    icon: <Users className="text-hrblue-600 h-7 w-7" />,
    title: "Easy Team Management",
    description: "Manage payroll, attendance, and contracts for all employees in one powerful dashboard."
  },
  {
    icon: <BadgeCheck className="text-hrteal-600 h-7 w-7" />,
    title: "Verified Blockchain Records",
    description: "All admin operations are permanently recorded—transparent, auditable, and reliable."
  }
];

const AdminLogin = () => {
  const { isConnected } = useAccount();
  const { connect, connectors, isLoading, error } = useConnect();
  const navigate = useNavigate();

  // Automatically navigate to dashboard when connected
  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Connection failed",
        description: error.message,
        variant: "destructive"
      });
    }
  }, [error]);

  const handleConnect = async () => {
    try {
      // Try to connect with MetaMask first
      const metamaskConnector = connectors.find(c => c.id === 'metaMask');
      
      if (metamaskConnector) {
        await connect({ connector: metamaskConnector });
      } else {
        // Fallback to any available connector
        const availableConnector = connectors[0];
        if (availableConnector) {
          await connect({ connector: availableConnector });
        } else {
          toast({
            title: "No wallet found",
            description: "Please install a Web3 wallet like MetaMask",
            variant: "destructive"
          });
        }
      }
    } catch (err) {
      console.error("Connection error:", err);
      toast({
        title: "Connection failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | HR ChainFlow</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 animate-fade-in">
        {/* Side image for large screens */}
        <div className="hidden md:flex flex-1 items-center justify-center pr-8">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
            alt="Team working at computer" 
            className="rounded-2xl shadow-xl object-cover h-[400px] w-[340px] border border-border animate-scale-in"
            loading="lazy"
          />
        </div>
        <div className="w-full max-w-md p-8 space-y-8 bg-white/90 rounded-2xl shadow-lg flex flex-col items-center z-10">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 animate-fade-in">
              HR ChainFlow
            </h1>
            <p className="text-gray-500 animate-fade-in">
              Connect your wallet to access the admin dashboard
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="w-full max-w-xs mx-auto">
              <Button
                className="w-full py-6 text-lg flex items-center justify-center gap-3 animate-scale-in"
                size="lg"
                onClick={handleConnect}
                disabled={isLoading}
              >
                <Wallet className="h-5 w-5" />
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4 animate-fade-in">
              You need to be an authorized admin to access the dashboard
            </p>
          </div>
          {/* Benefits Card Animated */}
          <div className="mt-8 w-full">
            <div className="bg-gradient-to-r from-blue-100 via-teal-100 to-purple-50 rounded-xl p-5 shadow flex flex-col gap-5 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Why use HR ChainFlow?
              </h2>
              <div className="flex flex-col gap-3">
                {benefitList.map((benefit, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-3 transition-transform hover:scale-105">
                    <div className="flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900">{benefit.title}</div>
                      <div className="text-sm text-gray-600">{benefit.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-400">Powered by Blockchain Technology</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

