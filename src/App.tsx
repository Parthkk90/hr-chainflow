
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { wagmiConfig, getWeb3ModalComponent } from "@/lib/web3config";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import Attendance from "./pages/Attendance";
import Contracts from "./pages/Contracts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {getWeb3ModalComponent()}
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/contracts" element={<Contracts />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
