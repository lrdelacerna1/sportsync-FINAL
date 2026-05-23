import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft, Activity, Trash2 } from 'lucide-react';

const INITIAL_BOOKINGS = [
  { id: 1, title: 'Saturday Smash Session', sport: 'Badminton', date: 'May 25, 2024', time: '4:00 PM', venue: 'Mandaue Smash Arena', location: 'Mandaue', status: 'upcoming', players: 12, maxPlayers: 16 },
  { id: 2, title: 'Pro Singles Ladder', sport: 'Tennis', date: 'May 28, 2024', time: '8:00 AM', venue: 'Busay Racket Club', location: 'Busay', status: 'upcoming', players: 2, maxPlayers: 2 },
  { id: 3, title: 'Community Open Play', sport: 'Pickleball', date: 'May 10, 2024', time: '2:00 PM', venue: 'IT Park Hub', location: 'Cebu City', status: 'past', players: 16, maxPlayers: 16 }
];

export function MyBookings() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [subTab, setSubTab] = useState<'upcoming' | 'history'>('upcoming');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = bookings.filter(b => subTab === 'upcoming' ? b.status === 'upcoming' : b.status === 'past');

  const handleCancel = (id: number) => {
    if (!confirm('Cancel this booking?')) return;
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'past' } : b));
    setSelectedId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
      {!selectedId ? (
        <div className="space-y-4">
          <div className="flex bg-zinc-100 p-1 rounded-xl shadow-inner">
            <button onClick={() => setSubTab('upcoming')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase ${subTab === 'upcoming' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}>Upcoming</button>
            <button onClick={() => setSubTab('history')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase ${subTab === 'history' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}>History</button>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Activity size={40} className="mx-auto text-zinc-200 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">No bookings found</p>
            </div>
          ) : (
            filtered.map(b => (
              <div key={b.id} onClick={() => setSelectedId(b.id)} className="sport-card p-3 flex items-center justify-between bg-white border-black/5 hover:border-brand-neon transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase italic leading-none mb-1">{b.title}</h4>
                    <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">{b.sport} • {b.date} • {b.time}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-zinc-300" />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-black transition-colors"><ChevronLeft size={14} /> Back to List</button>
          <div className="sport-card p-6 border-black/5 bg-white">
            <div className="mb-6">
              <h3 className="text-xl font-black italic uppercase leading-none">{bookings.find(b => b.id === selectedId)?.title}</h3>
              <p className="text-[9px] text-zinc-400">{bookings.find(b => b.id === selectedId)?.venue}</p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0"><Calendar size={16} className="text-brand-neon" /></div>
                <div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Date & Time</p>
                  <p className="text-xs font-bold">{bookings.find(b => b.id === selectedId)?.date} • {bookings.find(b => b.id === selectedId)?.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0"><Calendar size={16} className="text-brand-neon" /></div>
                <div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Venue</p>
                  <p className="text-xs font-bold leading-tight">{bookings.find(b => b.id === selectedId)?.venue}</p>
                </div>
              </div>
            </div>
            {bookings.find(b => b.id === selectedId)?.status === 'upcoming' && (
              <button onClick={() => handleCancel(selectedId!)} className="w-full py-3 bg-red-50 text-red-500 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"><Trash2 size={14} /> Cancel Booking</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
