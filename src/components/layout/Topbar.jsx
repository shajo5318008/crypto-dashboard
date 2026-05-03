import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="h-20 border-b border-white/10 bg-surface/50 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search assets, news, or traders..." 
            className="w-full bg-black/20 border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-6 pl-6">
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-muted hover:text-text">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </button>
        <button className="flex items-center space-x-3 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium hidden sm:block">User Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
