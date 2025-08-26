import { NavigationBar } from './GSTRHomeComponent/GSTRNavigation';
import MyComponent from './GSTRHomeComponent/GSTRSecondNavigation';
import GSTLedgerComponent from './GSTRHomeComponent/GSTRLedgerComponent';
import LinkComponent from './GSTRHomeComponent/GSTROtherLinkComponent';
import Sidebar from "./Sidebar";
import { useState } from 'react';


export default function GSTR({ businessProfile }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        toggleSidebar={() => setIsSidebarOpen((o) => !o)}
      />

      {/* Main content */}
      <main className="flex-1 pt-2 transition-all duration-300">
        <NavigationBar />
        <MyComponent />
        <GSTLedgerComponent />
      </main>
    </div>

  );
}
