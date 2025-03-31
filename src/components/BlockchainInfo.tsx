
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount, useNetwork, useBalance } from "wagmi";
import { LinkIcon, CheckSquareIcon, XSquareIcon } from "lucide-react";

export default function BlockchainInfo() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address: address,
  });

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Blockchain Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-amber-600">
            <XSquareIcon className="mr-2 h-5 w-5" />
            <span>Not connected to blockchain</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect your wallet to interact with HR smart contracts
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Blockchain Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-green-600">
          <CheckSquareIcon className="mr-2 h-5 w-5" />
          <span>Connected to blockchain</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Network</h3>
            <p>{chain?.name || "Unknown"}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Balance</h3>
            <p>{balance ? `${parseFloat(balance?.formatted).toFixed(4)} ${balance?.symbol}` : "Loading..."}</p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground">Wallet Address</h3>
            <div className="flex items-center">
              <p className="text-xs md:text-sm truncate">{address}</p>
              <a
                href={`https://${chain?.id === 1 ? "" : chain?.id === 137 ? "polygon." : chain?.id === 80001 ? "mumbai.polygonscan." : chain?.id === 11155111 ? "sepolia.etherscan." : ""}etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-hrblue-500 hover:text-hrblue-700"
              >
                <LinkIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
