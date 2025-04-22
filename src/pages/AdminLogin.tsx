
import { useAccount, useConnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

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
      const connector = connectors[0];
      if (connector) {
        await connect({ connector });
        // After successful connection, navigation is handled by the isConnected effect
      } else {
        toast({
          title: "No wallet found",
          description: "Please install a Web3 wallet like MetaMask",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | HR ChainFlow</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              HR ChainFlow
            </h1>
            <p className="text-gray-500">
              Connect your wallet to access the admin dashboard
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-full max-w-xs mx-auto">
              <Button
                className="w-full py-6 text-lg flex items-center justify-center gap-3"
                size="lg"
                onClick={handleConnect}
                disabled={isLoading}
              >
                <Wallet className="h-5 w-5" />
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              You need to be an authorized admin to access the dashboard
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
