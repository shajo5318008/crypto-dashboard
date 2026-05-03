import React, { useState, useEffect } from 'react';
import { Moon, Sun, DollarSign, Bell, Check } from 'lucide-react';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD'];

// ─── Helpers to persist settings ─────────────────────────────────────────────
const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
const Toggle = ({ id, enabled, onToggle }) => (
  <button
    id={id}
    onClick={onToggle}
    aria-checked={enabled}
    role="switch"
    className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
      enabled ? 'bg-primary' : 'bg-white/10 hover:bg-white/15'
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
        enabled ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ icon: Icon, title, subtitle, children }) => (
  <div className="glass rounded-2xl p-6">
    <div className="flex items-start gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={17} className="text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-text text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className="space-y-0 divide-y divide-white/5">{children}</div>
  </div>
);

const Row = ({ label, detail, children }) => (
  <div className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
    <div>
      <div className="text-sm font-medium text-text">{label}</div>
      {detail && <div className="text-xs text-muted mt-0.5">{detail}</div>}
    </div>
    {children}
  </div>
);

// ─── Settings Page ────────────────────────────────────────────────────────────
const Settings = () => {
  const [darkMode,   setDarkModeState]   = useState(() => load('theme_dark', true));
  const [currency,   setCurrencyState]   = useState(() => load('currency', 'USD'));
  const [priceAlert, setPriceAlertState] = useState(() => load('notif_price', true));
  const [newsAlert,  setNewsAlertState]  = useState(() => load('notif_news', true));
  const [saved, setSaved] = useState(false);

  // Apply dark mode class on mount and when toggled
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkModeState(next);
    save('theme_dark', next);
  };

  const selectCurrency = (c) => {
    setCurrencyState(c);
    save('currency', c);
  };

  const togglePrice = () => {
    const next = !priceAlert;
    setPriceAlertState(next);
    save('notif_price', next);
  };

  const toggleNews = () => {
    const next = !newsAlert;
    setNewsAlertState(next);
    save('notif_news', next);
  };

  const handleSave = () => {
    // All settings are already auto-saved on change, this just shows confirmation
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text">Settings</h2>
        <p className="text-muted text-sm mt-1">Preferences are saved automatically</p>
      </div>

      {/* ── Appearance ── */}
      <Section icon={darkMode ? Moon : Sun} title="Appearance" subtitle="Control the look of your dashboard">
        <Row
          label="Dark Mode"
          detail={darkMode ? 'Dark theme is active' : 'Light theme is active'}
        >
          <Toggle id="dark-mode-toggle" enabled={darkMode} onToggle={toggleDark} />
        </Row>
      </Section>

      {/* ── Currency ── */}
      <Section icon={DollarSign} title="Display Currency" subtitle="Choose how prices are displayed">
        <div className="pt-1">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {CURRENCIES.map(c => (
              <button
                key={c}
                id={`currency-${c.toLowerCase()}`}
                onClick={() => selectCurrency(c)}
                className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currency === c
                    ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                    : 'bg-black/20 text-muted hover:bg-white/5 hover:text-text'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted mt-3">
            Showing prices in{' '}
            <span className="text-primary font-semibold">{currency}</span>
          </p>
        </div>
      </Section>

      {/* ── Notifications ── */}
      <Section icon={Bell} title="Notifications" subtitle="Choose which alerts you receive">
        <Row label="Price Alerts" detail="Alert when a coin moves more than 5%">
          <Toggle id="toggle-price" enabled={priceAlert} onToggle={togglePrice} />
        </Row>
        <Row label="News Alerts" detail="Breaking crypto news and market updates">
          <Toggle id="toggle-news" enabled={newsAlert} onToggle={toggleNews} />
        </Row>
      </Section>

      {/* Save confirmation */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <span className={`text-xs transition-all duration-300 ${saved ? 'text-success' : 'text-muted/0'}`}>
          All changes saved ✓
        </span>
        <button
          id="settings-save-btn"
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            saved
              ? 'bg-success text-white scale-[1.03]'
              : 'bg-primary hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]'
          }`}
        >
          {saved ? <><Check size={15} /> Saved</> : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
