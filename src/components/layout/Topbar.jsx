import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Bell, TrendingUp, TrendingDown,
  X, Check, LogOut, ChevronDown, User
} from 'lucide-react';

// ─── Static notification data ─────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'up',   title: 'BTC price increased',       detail: 'Bitcoin jumped +2.74% in the last hour', time: '2 min ago',  read: false },
  { id: 2, type: 'down', title: 'ETH dropped 2%',            detail: 'Ethereum fell to $3,483 — monitor your position', time: '15 min ago', read: false },
  { id: 3, type: 'up',   title: 'SOL all-time high addresses', detail: 'Solana hits record 2.5M daily active users', time: '1h ago',   read: true },
  { id: 4, type: 'down', title: 'DOT correction warning',    detail: 'Polkadot down -1.34% — possible retracement', time: '3h ago',   read: true },
];

// ─── Reusable: close-on-outside-click ────────────────────────────────────────
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

// ─── Avatar initials ──────────────────────────────────────────────────────────
const initials = (email = '') => email.split('@')[0].slice(0, 2).toUpperCase() || 'U';

// ─── Topbar ───────────────────────────────────────────────────────────────────
const Topbar = ({ user, onLogout }) => {
  /* ── Notifications ── */
  const [notifOpen, setNotifOpen]       = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const notifRef = useRef(null);
  useClickOutside(notifRef, () => setNotifOpen(false));

  const unread = notifications.filter(n => !n.read).length;
  const markRead    = (id) => setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()   => setNotifications(p => p.map(n => ({ ...n, read: true })));

  /* ── User menu ── */
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);
  useClickOutside(userRef, () => setUserOpen(false));

  return (
    <header className="h-18 border-b border-white/10 bg-surface/50 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between sticky top-0 z-40 gap-4">

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Search assets, news, or traders..."
            className="w-full bg-black/20 border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-text placeholder-muted/50
              focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3 shrink-0">

        {/* ── Bell ── */}
        <div className="relative" ref={notifRef}>
          <button
            id="notif-bell-btn"
            onClick={() => setNotifOpen(p => !p)}
            className={`relative p-2.5 rounded-full transition-all duration-200 ${
              notifOpen ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-white/5 hover:text-text'
            }`}
          >
            <Bell size={19} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-primary rounded-full flex items-center justify-center text-[9px] font-bold text-white px-0.5 animate-pulse">
                {unread}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          <div className={`absolute right-0 top-[calc(100%+10px)] w-80 glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden
              transition-all duration-200 origin-top-right
              ${notifOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <span className="font-semibold text-sm text-text">Notifications</span>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary hover:text-blue-300 transition-colors flex items-center gap-1">
                    <Check size={11} /> Mark all read
                  </button>
                )}
                <button onClick={() => setNotifOpen(false)} className="p-1 rounded-lg hover:bg-white/5 text-muted hover:text-text transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
              {notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors ${!n.read ? 'bg-primary/[0.04]' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${n.type === 'up' ? 'bg-success/10' : 'bg-danger/10'}`}>
                    {n.type === 'up'
                      ? <TrendingUp size={14} className="text-success" />
                      : <TrendingDown size={14} className="text-danger" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold leading-tight ${n.read ? 'text-muted' : 'text-text'}`}>{n.title}</span>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted mt-0.5">{n.detail}</p>
                    <p className="text-[10px] text-muted/50 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── User menu ── */}
        <div className="relative" ref={userRef}>
          <button
            id="user-menu-btn"
            onClick={() => setUserOpen(p => !p)}
            className={`flex items-center gap-2 p-1 pr-3 rounded-full border transition-all duration-200 ${
              userOpen ? 'bg-white/5 border-white/15' : 'border-white/5 hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user ? initials(user.email) : <User size={14} />}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none gap-0.5">
              <span className="text-[10px] text-muted">Signed in as</span>
              <span className="text-xs font-medium text-text max-w-[110px] truncate">{user?.email ?? 'Guest'}</span>
            </div>
            <ChevronDown size={13} className={`text-muted hidden sm:block transition-transform duration-200 ${userOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User dropdown */}
          <div className={`absolute right-0 top-[calc(100%+10px)] w-52 glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden
              transition-all duration-200 origin-top-right
              ${userOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            {/* Profile card */}
            <div className="px-4 py-3.5 border-b border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user ? initials(user.email) : 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text capitalize truncate">
                  {user?.email?.split('@')[0] ?? 'User'}
                </div>
                <div className="text-xs text-muted truncate">{user?.email}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-1.5">
              <button
                id="logout-btn"
                onClick={() => { setUserOpen(false); onLogout(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-danger/80 hover:bg-danger/10 hover:text-danger transition-all duration-200 text-sm font-medium"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Topbar;
