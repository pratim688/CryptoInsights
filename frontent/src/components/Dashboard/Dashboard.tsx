import React from "react";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex-shrink-0" >
      <Sidebar /> {/* Prevent sidebar from shrinking */}

      </div>
      
      {/* Main Content */}
      <main className="flex-grow h-full overflow-auto mt-4 p-4"> {/* Ensure full height and scrollable */}
        {/* Child Routes Render Here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
