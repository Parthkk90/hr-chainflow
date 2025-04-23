
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const [displayAddress, setDisplayAddress] = useState("");

  useEffect(() => {
    if (address) {
      setDisplayAddress(
        `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      );
    }
  }, [address]);

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
      onClick={() => connect()}
      className="flex items-center gap-2"
    >
      <Wallet className="h-4 w-4" />
      <span>Connect Wallet</span>
    </Button>
  );
}
