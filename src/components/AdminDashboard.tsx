import React, { useState } from 'react';
import {
  Users, Flag, BarChart3, ShieldCheck, Trash2,
  ChevronRight, CheckCircle, Clock, AlertCircle,
  TrendingUp, Activity, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Total Users',    value: '1,284', change: '+8%',  icon: <Users size={16} /> },
  { label: 'Active Venues',  value: '42',    change: '+2%',  icon: <Activity size={16} /> },
  { label: 'Open Reports',   value: '7',     change: '-3%',  icon: <Flag size={16} /> },
  { label: 'Revenue / mo',   value: '₱182k', change: '+15%', icon: <TrendingUp size={16} /> },
];

const USERS = [
  { id: 1, name: 'Alex Rivera',  role: 'user',  status: 'Active',   email: 'user@sportsync.com'  },
  { id: 2, name: 'Apex Hub Pro', role: 'owner', status: 'Active',   email: 'owner@sportsync.com' },
  { id: 3, name: 'Maria S.',     role: 'user',  status: 'Suspended',email: 'maria@example.com'   },
  { id: 4, name: 'Coach Dave',   role: 'owner', status: 'Active',   email: 'dave@example.com'    },
];

const REPORTS = [
  { id: 1, target: 'Maria S.',       category: 'Harassment', status: 'Pending',  date: 'Today'   },
  { id: 2, target: 'Apex Pickleball',category: 'Facility',   status: 'Resolved', date: '17 May'  },
  { id: 3, target: 'Coach Dave',     category: 'Spam',       status: 'Pending',  date: '16 May'  },
];

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<'overview' | 'users' | 'reports' | 'venues'>('overview');
  const [users, setUsers] = useState(USERS);
  const [reports, setReports] = useState(REPORTS);
  const [venueApps, setVenueApps] = useState([
    { id: 1, name: 'Cebu Pickleball Hub', owner: 'owner@sportsync.com', location: 'Cebu IT Park', sport: 'Pickleball', status: 'Pending', submitted: '20 May' },
    { id: 2, name: 'Zenith Yoga Studio', owner: 'zenith@studio.com', location: 'Cebu Business Park', sport: 'Yoga', status: 'Pending', submitted: '18 May' },
  ] as { id: number; name: string; owner: string; location: string; sport: string; status: 'Pending' | 'Approved' | 'Declined'; submitted: string }[]);

  const approveVenue = (id: number) => {
    setVenueApps(prev => prev.map(v => v.id === id ? { ...v, status: 'Approved' } : v));
  };

  const declineVenue = (id: number) => {
    setVenueApps(prev => prev.map(v => v.id === id ? { ...v, status: 'Declined' } : v));
  };

  const toggleSuspend = (id: number) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ));
  };

  const resolveReport = (id: number) => {
    setReports(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'Resolved' } : r
    ));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-10 pb-4 shrink-0">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Control Panel</p>
            <h1 className="text-4xl font-black italic uppercase leading-none text-black">
              Admin<br /><span className="text-brand-neon [-webkit-text-stroke:1.5px_black]">Hub</span>
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-xl text-[9px] font-black uppercase text-zinc-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-zinc-100 p-1 rounded-xl">
          {(['overview', 'users', 'reports', 'venues'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-black text-brand-neon shadow-sm' : 'text-zinc-500'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-10">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="sport-card p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-zinc-50 border border-black/5 rounded-lg text-black">{s.icon}</div>
                    <span className={`text-[10px] font-black italic ${s.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{s.change}</span>
                  </div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <h3 className="text-2xl font-black italic leading-none">{s.value}</h3>
                </motion.div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="sport-card p-5">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Weekly Bookings</p>
              <div className="flex items-end justify-between gap-2 h-24">
                {[55, 80, 60, 95, 70, 88, 65].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className={`w-full rounded-t-sm ${i === 3 ? 'bg-brand-neon' : 'bg-zinc-200'}`}
                    />
                    <span className="text-[7px] font-black text-zinc-400 uppercase">{['M','T','W','T','F','S','S'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick flags */}
            <div className="sport-card p-4 border-yellow-200 bg-yellow-50">
              <div className="flex items-center gap-3">
                <AlertCircle size={18} className="text-yellow-600 shrink-0" />
                <div>
                  <p className="text-xs font-black uppercase text-black leading-none mb-1">
                    {reports.filter(r => r.status === 'Pending').length} Pending Reports
                  </p>
                  <p className="text-[9px] text-zinc-500 font-medium">Require admin review</p>
                </div>
                <button onClick={() => setTab('reports')} className="ml-auto">
                  <ChevronRight size={16} className="text-zinc-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {tab === 'users' && (
          <div className="space-y-3">
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-4">
              {users.length} Registered Accounts
            </p>
            {users.map(u => (
              <div key={u.id} className="sport-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-black text-sm uppercase shrink-0">
                  {u.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase italic text-black leading-none mb-1 truncate">{u.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${u.role === 'owner' ? 'bg-brand-neon text-black' : 'bg-zinc-100 text-zinc-500'}`}>
                      {u.role}
                    </span>
                    <span className={`text-[8px] font-black uppercase ${u.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                      {u.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleSuspend(u.id)}
                  className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${
                    u.status === 'Active'
                      ? 'bg-red-50 text-red-500 hover:bg-red-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {u.status === 'Active' ? 'Suspend' : 'Restore'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── REPORTS ── */}
        {tab === 'reports' && (
          <div className="space-y-3">
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-4">
              {reports.filter(r => r.status === 'Pending').length} open · {reports.filter(r => r.status === 'Resolved').length} resolved
            </p>
            {reports.map(r => (
              <div key={r.id} className={`sport-card p-4 ${r.status === 'Pending' ? 'border-yellow-200' : 'border-black/5 opacity-60'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{r.category}</p>
                    <h4 className="text-xs font-black uppercase italic text-black">{r.target}</h4>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${r.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                    {r.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-black/5">
                  <span className="text-[8px] font-black text-zinc-400 uppercase">{r.date}</span>
                  {r.status === 'Pending' && (
                    <button
                      onClick={() => resolveReport(r.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-brand-neon rounded-lg text-[8px] font-black uppercase hover:scale-105 transition-transform"
                    >
                      <CheckCircle size={10} /> Resolve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── VENUES (ADMIN VERIFICATION) ── */}
        {tab === 'venues' && (
          <div className="space-y-3">
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-4">
              {venueApps.filter(v => v.status === 'Pending').length} pending venue applications
            </p>
            {venueApps.map(v => (
              <div key={v.id} className={`sport-card p-4 flex flex-col gap-3 ${v.status === 'Pending' ? '' : 'opacity-80'}`}>
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-zinc-50 border border-black/5 rounded-xl text-zinc-400 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black uppercase italic text-black truncate">{v.name}</h4>
                    <p className="text-[9px] text-zinc-500">{v.sport} · {v.location} · {v.owner}</p>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${v.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : v.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {v.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => approveVenue(v.id)}
                    disabled={v.status !== 'Pending'}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${v.status === 'Pending' ? 'bg-black text-brand-neon' : 'bg-zinc-100 text-zinc-400'}`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => declineVenue(v.id)}
                    disabled={v.status !== 'Pending'}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${v.status === 'Pending' ? 'bg-red-50 text-red-500' : 'bg-zinc-100 text-zinc-400'}`}
                  >
                    Decline
                  </button>
                  <div className="ml-auto text-[8px] text-zinc-400">Submitted {v.submitted}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
