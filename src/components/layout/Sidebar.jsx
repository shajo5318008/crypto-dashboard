import React from 'react';
import { LayoutDashboard, Wallet, LineChart, ArrowLeftRight, Newspaper, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Wallet, label: 'Portfolio' },
    { icon: LineChart, label: 'Markets' },
    { icon: ArrowLeftRight, label: 'Transactions' },
    { icon: Newspaper, label: 'News' },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-surface/50 backdrop-blur-xl h-screen hidden md:flex flex-col sticky top-0">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-300 bg-clip-text text-transparent">
          CryptoViz
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={clsx(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
              item.active 
                ? "bg-primary/10 text-primary" 
                : "text-muted hover:bg-white/5 hover:text-text"
            )}
          >
            <item.icon size={20} className={item.active ? "text-primary" : "text-muted"} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-muted hover:bg-white/5 hover:text-text transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-danger/80 hover:bg-danger/10 hover:text-danger transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
