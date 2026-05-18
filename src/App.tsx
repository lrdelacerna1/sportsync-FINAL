import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Users, Bell, User,
  LayoutDashboard, Building2, ClipboardList, LogOut
} from 'lucide-react';

// Screens & modules
import { Onboarding }      from './components/Onboarding';
import { Login }           from './components/Login';
import { UnifiedBooking }  from './components/UnifiedBooking';
import { SocialFeed }      from './components/SocialFeed';
import { EssentialUI }     from './components/EssentialUI';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminDashboard }  from './components/AdminDashboard';

// ── Types ──────────────────────────────────────────────────────────────────
type Role    = 'user' | 'owner' | 'admin';
type UserTab = 'explore' | 'social' | 'notif' | 'account';
type OwnerTab= 'dashboard' | 'bookings' | 'notif' | 'account';

interface Account {
  role: Role;
  name: string;
  email: string;
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [account, setAccount]               = useState<Account | null>(null);

  // Per-role active tabs
  const [userTab,  setUserTab]  = useState<UserTab>('explore');
  const [ownerTab, setOwnerTab] = useState<OwnerTab>('dashboard');

  const handleLogin  = (acc: Account) => setAccount(acc);
  const handleLogout = () => { setAccount(null); };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="mobile-frame flex flex-col">

        {/* Status bar */}
        <div className="h-10 w-full flex justify-between items-center px-8 shrink-0">
          <span className="text-xs font-bold text-black">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-4 rounded-full border border-black/10" />
            <div className="w-4 h-4 rounded-full border border-black/10" />
            <div className="w-6 h-3 rounded-sm border border-black/10 bg-black/5" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <AnimatePresence mode="wait">

            {/* 1. Onboarding */}
            {showOnboarding ? (
              <Onboarding key="onboarding" onFinish={() => setShowOnboarding(false)} />

            /* 2. Login */
            ) : !account ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <Login onLogin={handleLogin} />
              </motion.div>

            /* 3a. USER layout */
            ) : account.role === 'user' ? (
              <motion.div
                key={`user-${userTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {userTab === 'explore' && <UnifiedBooking />}
                {userTab === 'social'  && <SocialFeed />}
                {userTab === 'notif'   && <SocialFeed forceNotifications={true} />}
                {userTab === 'account' && <EssentialUI />}
              </motion.div>

            /* 3b. OWNER layout */
            ) : account.role === 'owner' ? (
              <motion.div
                key={`owner-${ownerTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {ownerTab === 'dashboard' && <SellerDashboard />}
                {ownerTab === 'bookings'  && <SocialFeed />}
                {ownerTab === 'notif'     && <SocialFeed forceNotifications={true} />}
                {ownerTab === 'account'   && <EssentialUI />}
              </motion.div>

            /* 3c. ADMIN layout — full screen, no bottom nav */
            ) : (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <AdminDashboard onLogout={handleLogout} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── USER bottom nav ── */}
        {!showOnboarding && account?.role === 'user' && (
          <nav className="glass-nav h-20 shrink-0 flex items-center justify-around px-2 pb-4">
            <NavIcon active={userTab === 'explore'} onClick={() => setUserTab('explore')} icon={<Search size={22} />}  label="Explore"    />
            <NavIcon active={userTab === 'social'}  onClick={() => setUserTab('social')}  icon={<Users size={22} />}   label="Community"  />
            <NavIcon active={userTab === 'notif'}   onClick={() => setUserTab('notif')}   icon={<Bell size={22} />}    label="Notif"      />
            <NavIcon active={userTab === 'account'} onClick={() => setUserTab('account')} icon={<User size={22} />}    label="Account"    />
          </nav>
        )}

        {/* ── OWNER bottom nav ── */}
        {!showOnboarding && account?.role === 'owner' && (
          <nav className="glass-nav h-20 shrink-0 flex items-center justify-around px-2 pb-4">
            <NavIcon active={ownerTab === 'dashboard'} onClick={() => setOwnerTab('dashboard')} icon={<LayoutDashboard size={22} />} label="Dashboard" />
            <NavIcon active={ownerTab === 'bookings'}  onClick={() => setOwnerTab('bookings')}  icon={<ClipboardList size={22} />}  label="Bookings"  />
            <NavIcon active={ownerTab === 'notif'}     onClick={() => setOwnerTab('notif')}     icon={<Bell size={22} />}           label="Notif"     />
            <NavIcon active={ownerTab === 'account'}   onClick={() => setOwnerTab('account')}   icon={<User size={22} />}           label="Account"   />
          </nav>
        )}

        {/* Logout button for user/owner */}
        {!showOnboarding && account && account.role !== 'admin' && (
          <button
            onClick={handleLogout}
            className="absolute top-12 right-20 z-40 flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 rounded-xl text-[8px] font-black uppercase text-zinc-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={12} /> Logout
          </button>
        )}

        {/* iPhone home indicator */}
        {!showOnboarding && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/10 rounded-full" />
        )}
      </div>
    </div>
  );
}

function NavIcon({ active, onClick, icon, label }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${active ? 'accent-text' : 'text-zinc-400'}`}
    >
      <div className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-brand-neon' : ''}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 20 })}
      </div>
      <span className="text-[8px] font-black tracking-widest uppercase">{label}</span>
    </button>
  );
}
