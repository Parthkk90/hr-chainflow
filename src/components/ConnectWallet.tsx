
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading } = useConnect();
  const { disconnect } = useDisconnect();
  const [displayAddress, setDisplayAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      setDisplayAddress(
        `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      );
    }
  }, [address]);

  useEffect(() => {
    // If connected, navigate to dashboard
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

  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    } else {
      toast({
        title: "No wallet found",
        description: "Please install a Web3 wallet like MetaMask",
        variant: "destructive"
      });
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium hidden md:inline">
          {displayAddress}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      className="flex items-center gap-2"
      disabled={isLoading}
    >
      <Wallet className="h-4 w-4" />
      <span>{isLoading ? "Connecting..." : "Connect Wallet"}</span>
    </Button>
  );
}
