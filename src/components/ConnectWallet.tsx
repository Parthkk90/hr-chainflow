
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [displayAddress, setDisplayAddress] = useState("");

  useEffect(() => {
    if (address) {
      setDisplayAddress(
        `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      );
    }
  }, [address]);

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
    >
      <Wallet className="h-4 w-4" />
      <span>Connect Wallet</span>
    </Button>
  );
}
