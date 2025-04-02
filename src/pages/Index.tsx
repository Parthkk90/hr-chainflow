
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BusinessProposalModel from "@/components/BusinessProposalModel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Business Proposal | HR ChainFlow</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Business Proposal</h1>
          <p className="text-muted-foreground">
            Generate a comprehensive business proposal based on the HR ChainFlow system features.
          </p>
        </div>
        
        <BusinessProposalModel />
        
        <div className="flex justify-end">
          <Button onClick={() => navigate("/dashboard")} className="flex items-center">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Index;
