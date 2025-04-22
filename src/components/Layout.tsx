
import { useAccount } from "wagmi";
import { Outlet, Navigate } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import ConnectWallet from "./ConnectWallet";
import { Helmet } from "react-helmet";

export default function Layout() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>HR ChainFlow - Blockchain HR Management</title>
      </Helmet>
      
      <div className="min-h-screen flex">
        <NavigationMenu />
        
        <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
          <header className="h-16 border-b border-border flex items-center justify-end px-4 lg:px-8 sticky top-0 bg-background z-10">
            <ConnectWallet />
          </header>
          
          <main className="flex-1 p-4 pt-8 lg:p-8 mt-12 lg:mt-0">
            <Outlet />
          </main>
          
          <footer className="border-t border-border py-4 px-8 text-center text-sm text-muted-foreground">
            <p>
              HR ChainFlow © {new Date().getFullYear()} - Powered by Blockchain Technology
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
