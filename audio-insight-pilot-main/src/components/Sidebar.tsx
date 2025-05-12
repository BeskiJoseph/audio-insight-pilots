
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BarChart, FileText, List, PieChart, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: BarChart,
    },
    {
      name: "All Calls",
      path: "/calls",
      icon: List,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: PieChart,
    },
    {
      name: "Documentation",
      path: "/docs",
      icon: FileText,
    },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } flex-shrink-0 fixed left-0 top-0 h-full z-20 bg-sidebar transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full py-4">
        <div className={`${collapsed ? "mx-auto" : "mx-6"} mb-8 mt-2`}>
          {collapsed ? (
            <div className="w-8 h-8 rounded-md bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold">CI</span>
            </div>
          ) : (
            <div className="font-bold text-xl text-white">
              <span className="text-brand-300">Call</span>
              <span>Insights</span>
            </div>
          )}
        </div>

        <div className="mx-3 mb-4">
          <Link to="/upload">
            <Button
              variant="default"
              className={`${
                collapsed ? "justify-center p-2" : "justify-start"
              } w-full bg-brand-500 hover:bg-brand-600 transition-all`}
            >
              <Upload className={`h-5 w-5 ${!collapsed && "mr-2"}`} />
              {!collapsed && <span>Upload Call</span>}
            </Button>
          </Link>
        </div>

        <Separator className="my-2 bg-sidebar-accent" />

        <nav className="space-y-1 px-3 mt-2 flex-1">
          {navigationItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  collapsed ? "px-2" : "px-3"
                } ${
                  isActive(item.path)
                    ? "bg-sidebar-accent text-white"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-50 hover:text-white"
                }`}
              >
                <item.icon className={`h-5 w-5 ${!collapsed && "mr-2"}`} />
                {!collapsed && <span>{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center text-gray-400 hover:text-white hover:bg-sidebar-accent hover:bg-opacity-50"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? ">" : "<"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
