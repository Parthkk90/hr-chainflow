
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  BriefcaseBusiness,
  Calendar,
  FileText,
  BarChart4,
  Menu,
  X,
  Wallet
} from "lucide-react";

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-10 lg:hidden">
        <div className="flex justify-between items-center px-4 py-3">
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseBusiness className="h-6 w-6 text-hrblue-600" />
            <span className="font-bold text-xl text-hrblue-700">HR ChainFlow</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar text-sidebar-foreground shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseBusiness className="h-6 w-6" />
            <span className="font-bold text-xl">HR ChainFlow</span>
          </Link>
        </div>

        <nav className="mt-6">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                to="/"
                className="flex items-center py-2 px-3 rounded-md hover:bg-sidebar-accent font-medium"
              >
                <BarChart4 className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                className="flex items-center py-2 px-3 rounded-md hover:bg-sidebar-accent font-medium"
              >
                <Users className="mr-3 h-5 w-5" />
                Employees
              </Link>
            </li>
            <li>
              <Link
                to="/payroll"
                className="flex items-center py-2 px-3 rounded-md hover:bg-sidebar-accent font-medium"
              >
                <Wallet className="mr-3 h-5 w-5" />
                Payroll
              </Link>
            </li>
            <li>
              <Link
                to="/attendance"
                className="flex items-center py-2 px-3 rounded-md hover:bg-sidebar-accent font-medium"
              >
                <Calendar className="mr-3 h-5 w-5" />
                Attendance
              </Link>
            </li>
            <li>
              <Link
                to="/contracts"
                className="flex items-center py-2 px-3 rounded-md hover:bg-sidebar-accent font-medium"
              >
                <FileText className="mr-3 h-5 w-5" />
                Contracts
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay to close menu on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
