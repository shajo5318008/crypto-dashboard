import React from 'react';
import { LayoutDashboard, Wallet, LineChart, ArrowLeftRight, Newspaper, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Wallet,          label: 'Portfolio',  id: 'portfolio' },
  { icon: LineChart,       label: 'Markets',    id: 'markets' },
  { icon: ArrowLeftRight,  label: 'Transactions', id: 'transactions' },
  { icon: Newspaper,       label: 'News',       id: 'news' },
];

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 border-r border-white/10 bg-surface/50 backdrop-blur-xl h-screen hidden md:flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-300 bg-clip-text text-transparent">
          CryptoViz
        </h1>
        <p className="text-muted text-xs mt-1">Analytics Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={clsx(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative',
                isActive
                  ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(59,130,246,0.12)]'
                  : 'text-muted hover:bg-white/5 hover:text-text'
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
              )}
              <item.icon
                size={20}
                className={clsx(
                  'shrink-0 transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-muted group-hover:text-text'
                )}
              />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <button
          onClick={() => setActivePage('settings')}
          className={clsx(
            'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative',
            activePage === 'settings'
              ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(59,130,246,0.12)]'
              : 'text-muted hover:bg-white/5 hover:text-text'
          )}
        >
          {activePage === 'settings' && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
          )}
          <Settings
            size={20}
            className={clsx(
              'shrink-0 transition-all duration-300',
              activePage === 'settings' ? 'text-primary' : 'text-muted group-hover:text-text group-hover:rotate-45'
            )}
          />
          <span className="font-medium text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-danger/70 hover:bg-danger/10 hover:text-danger transition-colors">
          <LogOut size={20} className="shrink-0" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
