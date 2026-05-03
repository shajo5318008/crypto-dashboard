import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, TrendingUp, AlertCircle, LogIn } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    if (!email.trim())                return 'Please enter your email address.';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address.';
    if (password.length < 4)          return 'Password must be at least 4 characters.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = { email, name: email.split('@')[0] };
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="w-full max-w-sm relative" style={{ animation: 'loginCardIn 0.35s cubic-bezier(.22,1,.36,1)' }}>
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">

          {/* Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-500 shadow-lg shadow-primary/30 mb-4">
              <TrendingUp size={26} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-300 to-purple-400 bg-clip-text text-transparent">
              CryptoViz
            </h1>
            <p className="text-muted text-sm mt-1">Sign in to your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full bg-black/20 border border-white/8 rounded-xl py-3 pl-10 pr-4 text-text placeholder-muted/40
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30
                    hover:border-white/15 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Min. 4 characters"
                  autoComplete="current-password"
                  className="w-full bg-black/20 border border-white/8 rounded-xl py-3 pl-10 pr-11 text-text placeholder-muted/40
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30
                    hover:border-white/15 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Inline error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm mt-1
                bg-gradient-to-r from-primary to-blue-500 text-white
                hover:from-blue-500 hover:to-primary
                hover:shadow-lg hover:shadow-primary/25
                active:scale-[0.98] transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </>
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes loginCardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
};

export default Login;
