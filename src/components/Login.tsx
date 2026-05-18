import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ChevronRight, User, Building2, Shield } from 'lucide-react';

type Role = 'user' | 'owner' | 'admin';

interface Account {
  role: Role;
  name: string;
  email: string;
}

const MOCK_ACCOUNTS: Record<string, Account> = {
  'user@sportsync.com': { role: 'user', name: 'Alex Rivera', email: 'user@sportsync.com' },
  'owner@sportsync.com': { role: 'owner', name: 'Apex Hub Pro', email: 'owner@sportsync.com' },
  'admin@sportsync.com': { role: 'admin', name: 'Admin', email: 'admin@sportsync.com' },
};

const ROLES: { id: Role; label: string; icon: React.ReactNode; hint: string }[] = [
  { id: 'user', label: 'User', icon: <User size={18} />, hint: 'user@sportsync.com' },
  { id: 'owner', label: 'Owner', icon: <Building2 size={18} />, hint: 'owner@sportsync.com' },
];

export const Login: React.FC<{ onLogin: (account: Account) => void }> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<Role>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-fill hint email when role changes
  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleLogin = () => {
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      const account = MOCK_ACCOUNTS[email.toLowerCase().trim()];
      if (account && password === 'password') {
        onLogin(account);
      } else {
        setError('Invalid credentials. Try password: "password"');
      }
      setLoading(false);
    }, 900);
  };

  const currentRoleHint = ROLES.find(r => r.id === selectedRole)?.hint ?? '';

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Top accent strip */}
      <div className="h-1.5 w-full bg-brand-neon shrink-0" />

      {/* Hero */}
      <div className="px-8 pt-10 pb-6 shrink-0">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-1">Welcome back</p>
        <h1 className="text-5xl font-black italic uppercase leading-[0.85] tracking-tighter text-black">
          Sport<br /><span className="text-brand-neon [-webkit-text-stroke:2px_black]">Sync</span>
        </h1>
      </div>

      {/* Role selector */}
      <div className="px-8 mb-6 shrink-0">
        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">Sign in as</p>
        <div className="flex gap-2">
          {ROLES.map(role => (
            <button
              key={role.id}
              onClick={() => handleRoleChange(role.id)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all duration-200 ${selectedRole === role.id
                  ? 'bg-black text-brand-neon border-black shadow-lg'
                  : 'bg-zinc-50 text-zinc-400 border-transparent'
                }`}
            >
              {role.icon}
              <span className="text-[9px] font-black uppercase tracking-widest">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="px-8 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder={currentRoleHint}
                className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3.5 text-xs font-semibold text-black focus:outline-none focus:ring-2 focus:ring-brand-neon/40 placeholder:text-zinc-300 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3.5 pr-12 text-xs font-semibold text-black focus:outline-none focus:ring-2 focus:ring-brand-neon/40 placeholder:text-zinc-300 transition-all"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Hint */}
            <div className="bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-neon shrink-0 animate-pulse" />
                <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">Demo Accounts</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[9px] text-zinc-500 font-medium">
                  <span className="font-black text-black">user@sportsync.com</span> — Player
                </p>
                <p className="text-[9px] text-zinc-500 font-medium">
                  <span className="font-black text-black">owner@sportsync.com</span> — Owner
                </p>
                <p className="text-[9px] text-zinc-500 font-medium">
                  <span className="font-black text-black">admin@sportsync.com</span> — Admin
                </p>
                <p className="text-[9px] text-zinc-400 italic">Password: <span className="font-black text-black">password</span></p>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-black text-red-500 uppercase tracking-wide"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-black text-brand-neon py-5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-between px-6 mt-2 shadow-xl shadow-black/10 active:scale-[0.98] transition-transform disabled:opacity-60"
            >
              <span>{loading ? 'Signing in...' : `Enter as ${ROLES.find(r => r.id === selectedRole)?.label}`}</span>
              {loading
                ? <div className="w-4 h-4 border-2 border-brand-neon border-t-transparent rounded-full animate-spin" />
                : <ChevronRight size={18} />
              }
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom tag */}
      <div className="px-8 pb-6 pt-4 shrink-0 text-center">
        <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.3em]">SportSync © 2026</p>
      </div>
    </div>
  );
};
