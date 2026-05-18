import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  HelpCircle, 
  Shield, 
  CreditCard, 
  History, 
  Award, 
  ChevronRight,
  Bell,
  LogOut,
  Wallet,
  Camera,
  MapPin,
  Calendar,
  ChevronLeft,
  Star,
  Check,
  Activity,
  Trophy,
  Trash2,
  MessageSquare,
  Image as ImageIcon,
  Send,
  X,
  Flag,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SubView = 'main' | 'history' | 'details' | 'badges';

export function EssentialUI() {
  const [view, setView] = useState<SubView>('main');

  const renderContent = () => {
    switch (view) {
      case 'history':
        return <BookingHistory onBack={() => setView('main')} />;
      case 'details':
        return <ProfileDetails onBack={() => setView('main')} />;
      case 'badges':
        return <BadgesView onBack={() => setView('main')} />;
      default:
        return <MainAccountMenu setView={setView} />;
    }
  };

  return (
    <div className="flex-1 overflow-hidden relative flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 overflow-y-auto no-scrollbar"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MainAccountMenu({ setView }: { setView: (v: SubView) => void }) {
  return (
    <div className="pb-10">
      {/* Profile Header */}
      <header className="p-6 pt-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-brand p-1">
              <img 
                src="https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&q=80&w=200" 
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button 
              onClick={() => setView('badges')}
              className="absolute -bottom-1 -right-1 accent-bg p-1.5 rounded-full ring-4 ring-black"
            >
              <Award size={12} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-black italic leading-none text-black">Alex Rivera</h2>
            <p className="accent-text text-[10px] font-black uppercase tracking-widest mt-1">ELITE PRO • #42 RANK</p>
          </div>
          <button className="p-2 bg-zinc-100 rounded-full text-zinc-400">
            <Settings size={20} />
          </button>
        </div>

        {/* Badges/Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <StatBox label="Rank" value="ELITE" onClick={() => setView('badges')} />
          <StatBox label="Level" value="4" />
          <StatBox label="PP" value="1.2k" />
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
          <MenuSection title="Account">
            <MenuItem 
                icon={<User size={18} />} 
                label="Profile Details" 
                onClick={() => setView('details')}
            />
            <MenuItem 
                icon={<History size={18} />} 
                label="Booking History" 
                badge="8" 
                onClick={() => setView('history')}
            />
            <MenuItem 
                icon={<Wallet size={18} />} 
                label="Payment Wallet" 
                sublabel="Linked to GCash" 
            />
          </MenuSection>

          <MenuSection title="Preferences">
            <MenuItem icon={<Bell size={18} />} label="Notifications" toggle />
            <MenuItem icon={<Shield size={18} />} label="Privacy & Terms" />
          </MenuSection>

          <MenuSection title="Support">
             <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-dashed border-zinc-300 bg-zinc-50/50">
                <HelpCircle size={24} className="text-zinc-400" />
                <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Help Center</p>
             </div>
          </MenuSection>

          <button className="w-full py-4 flex items-center justify-center gap-2 text-red-500 font-black uppercase tracking-widest text-[10px] border border-red-500/10 rounded-2xl mt-4">
            <LogOut size={16} />
            Log Out Account
          </button>
        </div>
      </header>
    </div>
  );
}

function StatBox({ label, value, onClick }: { label: string, value: string, onClick?: () => void }) {
  return (
    <button 
        onClick={onClick}
        className="sport-card bg-zinc-50 border-black/5 p-3 flex flex-col items-center transition-transform hover:scale-105 shadow-none"
    >
      <span className="text-[8px] text-zinc-400 uppercase font-black tracking-widest">{label}</span>
      <span className="text-lg font-black italic text-black">{value}</span>
    </button>
  );
}

function BookingHistory({ onBack }: { onBack: () => void }) {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'incoming' | 'past'>('incoming');
  const [view, setView] = useState<'list' | 'review' | 'report' | 'reports' | 'reportDetail'>('list');
  const [reports, setReports] = useState<any[]>([
    { id: 1, venue: 'Apex Pickleball', category: 'Facility', status: 'Pending', date: '18 May', narrative: 'The net was slightly loose.' },
    { id: 2, venue: 'Zenith Studio', category: 'Staff', status: 'Resolved', date: '15 May', narrative: 'Instructor was 5 mins late.' }
  ]);

  const [historyData, setHistoryData] = useState([
    { 
      id: 1, 
      venue: 'Apex Pickleball', 
      time: '18 May, 10:00 AM', 
      status: 'Completed', 
      amount: '₱650', 
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=200',
      receipt: 'SS-8821',
      items: ['Court Fee (2h)', 'Pro Paddle (x2)', 'Ball Set'],
      type: 'past'
    },
    { 
      id: 4, 
      venue: 'Elite Pickleball Club', 
      time: '20 May, 4:00 PM', 
      status: 'Confirmed', 
      amount: '₱1,100', 
      image: 'https://images.unsplash.com/photo-1593120150993-94c6f505494d?auto=format&fit=crop&q=80&w=200',
      receipt: 'SS-8942',
      items: ['Match Fee', 'Coach Service'],
      type: 'incoming'
    },
    { 
      id: 2, 
      venue: 'Zenith Studio', 
      time: '15 May, 5:00 PM', 
      status: 'Completed', 
      amount: '₱450', 
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200',
      receipt: 'SS-8712',
      items: ['Class Fee', 'Premium Mat'],
      type: 'past'
    },
    { 
      id: 5, 
      venue: 'BGC Sports Center', 
      time: '22 May, 8:00 AM', 
      status: 'Confirmed', 
      amount: '₱350', 
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=200',
      receipt: 'SS-9021',
      items: ['Badminton Court (1h)'],
      type: 'incoming'
    },
    { 
      id: 3, 
      venue: 'Smash Arena', 
      time: '12 May, 2:00 PM', 
      status: 'Cancelled', 
      amount: 'Refunded', 
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=200',
      receipt: 'SS-8655',
      items: ['Court Fee (1h)'],
      type: 'past'
    },
  ]);

  const handleCancelBooking = (bookingId: number) => {
    setHistoryData(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'Cancelled', amount: 'Refunded', type: 'past' } : booking
    ));
    setSelectedBooking(null);
  };

  const handleAddReport = (report: any) => {
    setReports([report, ...reports]);
    setView('reports');
  };

  const filteredHistory = historyData.filter(h => h.type === activeTab);

  if (view === 'review' && selectedBooking) {
    return <ReviewView booking={selectedBooking} onBack={() => setView('list')} />;
  }

  if (view === 'report' && selectedBooking) {
    return <ReportFormView booking={selectedBooking} onBack={() => setView('list')} onSubmit={handleAddReport} />;
  }

  if (view === 'reports') {
    return <ReportsListView 
      reports={reports} 
      onBack={() => setView('list')} 
      onSelectReport={(report) => {
        setSelectedReport(report);
        setView('reportDetail');
      }} 
    />;
  }

  if (view === 'reportDetail' && selectedReport) {
    return <ReportDetailView report={selectedReport} onBack={() => setView('reports')} />;
  }

  if (selectedBooking) {
    return (
      <div className="p-6">
        <header className="flex items-center gap-4 mb-4">
          <button onClick={() => setSelectedBooking(null)} className="p-2 bg-zinc-100 rounded-full text-black">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black">Booking Details</h2>
        </header>

        <div className="flex flex-col items-center text-center py-4">
             <div className="w-full sport-card bg-zinc-50 p-6 mb-8 text-left border-black/5 shadow-none">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Receipt #{selectedBooking.receipt}</span>
                    <button onClick={() => setView('report')} className="flex items-center gap-1 text-[10px] font-black text-zinc-400 uppercase hover:text-black transition-colors">
                        <Flag size={10} /> Report
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <img src={selectedBooking.image} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-tight text-black">{selectedBooking.venue}</p>
                            <p className="text-[10px] text-zinc-500 italic uppercase font-black tracking-widest">{selectedBooking.time}</p>
                        </div>
                    </div>
                    
                    <div className="pt-2 border-t border-black/5">
                        <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Items Summary</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedBooking.items.map((item: string, i: number) => (
                                <span key={i} className="text-[9px] font-black bg-white px-2 py-0.5 border border-black/5 rounded uppercase">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-black/5 flex justify-between items-end">
                        <div>
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Status</p>
                            <p className={`text-[10px] font-black uppercase ${selectedBooking.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>
                                {selectedBooking.status}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Paid</p>
                            <p className="text-xl font-black italic text-black">{selectedBooking.amount}</p>
                        </div>
                    </div>
                </div>
             </div>

             <div className="w-full flex flex-col gap-3">
                {selectedBooking.status === 'Confirmed' ? (
                    <>
                        <button className="w-full py-5 accent-bg rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <MapPin size={14} /> Get Directions
                        </button>
                        <button 
                            onClick={() => handleCancelBooking(selectedBooking.id)}
                            className="w-full py-5 border border-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 size={14} /> Cancel Booking
                        </button>
                    </>
                ) : selectedBooking.status === 'Completed' ? (
                    <>
                        <button 
                            onClick={() => setView('review')}
                            className="w-full py-5 accent-bg rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-brand-neon/20"
                        >
                            <Star size={14} /> Rate & Review
                        </button>
                        <button className="w-full py-5 border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <History size={14} /> Rebook
                        </button>
                    </>
                ) : (
                    <button className="w-full py-5 border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                        <History size={14} /> Try Rebooking
                    </button>
                )}
                <button 
                    onClick={() => setView('reports')}
                    className="w-full py-5 border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    <ClipboardList size={14} /> View Reports
                </button>
             </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex flex-col gap-6 mb-8">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full text-black shrink-0">
                <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black leading-none">Booking History</h2>
        </div>

        <div className="flex p-1 bg-zinc-100 rounded-xl">
            <button 
                onClick={() => setActiveTab('incoming')}
                className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'incoming' ? 'bg-white text-black shadow-sm' : 'text-zinc-400'}`}
            >
                Incoming <span className="ml-1 opacity-50">({historyData.filter(h => h.type === 'incoming').length})</span>
            </button>
            <button 
                onClick={() => setActiveTab('past')}
                className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'past' ? 'bg-white text-black shadow-sm' : 'text-zinc-400'}`}
            >
                Past <span className="ml-1 opacity-50">({historyData.filter(h => h.type === 'past').length})</span>
            </button>
        </div>
      </header>
      
      <div className="space-y-4 pb-20">
        {filteredHistory.length > 0 ? (
          filteredHistory.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedBooking(item)}
              className="sport-card p-4 bg-zinc-50 border-black/5 flex items-center gap-4 cursor-pointer hover:border-black transition-colors"
            >
              <div className="relative">
                  <img src={item.image} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  {item.status === 'Confirmed' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-neon rounded-full border-2 border-zinc-50 ring-2 ring-brand-neon/20 animate-pulse" />
                  )}
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black uppercase text-black leading-none mb-1">{item.venue}</h4>
                <p className="text-[10px] text-zinc-500 italic font-medium">{item.time}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <p className="text-[10px] font-black italic text-black">{item.amount}</p>
                <p className={`text-[8px] font-black uppercase tracking-widest ${
                    item.status === 'Cancelled' ? 'text-red-500' : 
                    item.status === 'Confirmed' ? 'text-black' : 
                    'text-green-500'
                }`}>
                    {item.status}
                </p>
                <ChevronRight size={10} className="text-zinc-400" />
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4">
                 <History size={24} className="text-zinc-200" />
             </div>
             <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">No {activeTab} bookings</p>
          </div>
        )}

        <button 
            onClick={() => setView('reports')}
            className="w-full py-4 bg-zinc-50 border border-black/5 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
        >
            <AlertCircle size={14} /> My Reports & Support
        </button>
      </div>
    </div>
  );
}

function ReportFormView({ booking, onBack, onSubmit }: { booking: any, onBack: () => void, onSubmit: (report: any) => void }) {
  const [category, setCategory] = useState('');
  const [narrative, setNarrative] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Facility', 'Staff', 'Equipment', 'Safety', 'Other'];

  const handleSubmit = () => {
    if (!category || !narrative) return;
    setIsSubmitting(true);
    setTimeout(() => {
        onSubmit({
            id: Math.random(),
            venue: booking.venue,
            category,
            narrative,
            status: 'Pending',
            date: 'Today',
            attachments
        });
        setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full text-black">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black">Report Issue</h2>
      </header>

      <div className="space-y-8">
        {/* Session Card */}
        <div className="sport-card bg-zinc-50 p-4 border-black/5 flex items-center gap-4">
            <img src={booking.image} className="w-12 h-12 rounded-xl object-cover shrink-0" />
            <div>
                <h3 className="text-xs font-black uppercase text-black leading-none mb-1">{booking.venue}</h3>
                <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">{booking.time}</p>
            </div>
        </div>

        {/* Categories */}
        <div>
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 block ml-1">Select Category</label>
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight border transition-all ${
                            category === cat ? 'bg-black text-brand-neon border-black' : 'bg-white text-zinc-400 border-black/5'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Narrative */}
        <div className="space-y-4">
             <div className="relative">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">Narrative (Description)</label>
                <div className="relative">
                    <MessageSquare size={16} className="absolute left-4 top-4 text-zinc-300" />
                    <textarea 
                        value={narrative}
                        onChange={(e) => setNarrative(e.target.value)}
                        placeholder="Explain what happened..."
                        className="w-full bg-zinc-50 border border-black/5 rounded-2xl p-4 pl-12 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black/10 min-h-[120px] resize-none placeholder:text-zinc-300"
                    />
                </div>
             </div>

             {/* Attachments */}
             <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">Add Proof (Optional)</label>
                <div className="flex gap-2">
                    {attachments.map((at, idx) => (
                        <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-black/5">
                            <img src={at} className="w-full h-full object-cover" />
                            <button 
                                onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                            >
                                <X size={10} />
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={() => setAttachments([...attachments, booking.image])}
                        className="w-16 h-16 rounded-xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-1 text-zinc-400 hover:border-black/20 hover:text-black transition-all"
                    >
                        <ImageIcon size={16} />
                        <span className="text-[8px] font-black uppercase tracking-tight">Add</span>
                    </button>
                </div>
             </div>
        </div>

        <button 
            onClick={handleSubmit}
            disabled={!category || !narrative || isSubmitting}
            className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                category && narrative ? 'accent-bg shadow-xl shadow-brand-neon/20' : 'bg-zinc-100 text-zinc-300'
            }`}
        >
            {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
                <>Submit Report <Send size={14} /></>
            )}
        </button>
      </div>
    </div>
  );
}

function ReportsListView({ reports, onBack, onSelectReport }: { reports: any[], onBack: () => void, onSelectReport: (report: any) => void }) {
  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full text-black">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black">Report Status</h2>
      </header>

      <div className="space-y-4">
        {reports.map((report) => (
           <div key={report.id} className="sport-card p-4 bg-zinc-50 border-black/5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-xs font-black uppercase text-black leading-none mb-1">{report.venue}</h4>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{report.category}</p>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-sm ${
                        report.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                        {report.status}
                    </span>
                </div>
                <p className="text-[10px] text-zinc-600 border-t border-black/5 pt-2 mt-2 italic font-medium line-clamp-2">"{report.narrative}"</p>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-[8px] text-zinc-400 uppercase font-black">{report.date}</span>
                    <button 
                        onClick={() => onSelectReport(report)}
                        className="text-[8px] font-black uppercase tracking-widest underline italic"
                    >
                        Details
                    </button>
                </div>
           </div>
        ))}
      </div>
    </div>
  );
}

function ReportDetailView({ report, onBack }: { report: any, onBack: () => void }) {
  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full text-black">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black">Report Detail</h2>
      </header>

      <div className="space-y-6">
        <div className="sport-card bg-zinc-50 p-6 border-black/5">
             <div className="flex justify-between items-center mb-6">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    report.status === 'Resolved' ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-yellow-100 text-yellow-600 border border-yellow-200'
                }`}>
                    {report.status}
                </span>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{report.date}</span>
             </div>

             <div className="mb-6">
                 <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Venue</h4>
                 <h3 className="text-lg font-black uppercase italic text-black">{report.venue}</h3>
             </div>

             <div className="mb-6">
                 <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Category</h4>
                 <p className="font-bold text-black uppercase tracking-wider text-xs">{report.category}</p>
             </div>

             <div className="mb-6">
                 <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Narrative</h4>
                 <div className="bg-white p-4 rounded-xl border border-black/5">
                    <p className="text-sm font-medium italic text-zinc-600 leading-relaxed">"{report.narrative}"</p>
                 </div>
             </div>

             {report.attachments && report.attachments.length > 0 && (
                 <div>
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Attachments</h4>
                    <div className="flex gap-2 flex-wrap">
                        {report.attachments.map((at: string, idx: number) => (
                            <img key={idx} src={at} className="w-20 h-20 rounded-xl object-cover border border-black/5" />
                        ))}
                    </div>
                 </div>
             )}
        </div>

        <div className="p-6 bg-zinc-50 rounded-2xl border border-black/5 flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-brand-neon flex items-center justify-center shrink-0">
                 <Activity size={20} className="text-black" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-black leading-none mb-1">Investigation in progress</p>
                <p className="text-[9px] text-zinc-500 font-medium">Our team is reviewing your report. You will receive a notification once resolved.</p>
             </div>
        </div>

        <button 
            className="w-full py-5 border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
            onClick={onBack}
        >
            Back to List
        </button>
      </div>
    </div>
  );
}


function ReviewView({ booking, onBack }: { booking: any, onBack: () => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleReview = () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        onBack();
    }, 1500);
  };

  const addMockAttachment = () => {
    setAttachments([...attachments, booking.image]);
  };

  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full text-black">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black">Rate Your Session</h2>
      </header>

      <div className="flex flex-col gap-8">
        {/* Session Card */}
        <div className="sport-card bg-zinc-50 p-4 border-black/5 flex items-center gap-4">
            <img src={booking.image} className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div>
                <h3 className="text-xs font-black uppercase text-black">{booking.venue}</h3>
                <p className="text-[10px] text-zinc-500 italic uppercase font-black tracking-widest">{booking.time}</p>
            </div>
        </div>

        {/* Rating Stars */}
        <div className="text-center">
             <p className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] mb-4">Tap to rate</p>
             <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-2 transition-all ${rating >= star ? 'text-black scale-110' : 'text-zinc-200'}`}
                    >
                        <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} />
                    </button>
                ))}
             </div>
        </div>

        {/* Comment Area */}
        <div className="space-y-4">
             <div className="relative">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">Write your feedback</label>
                <div className="relative">
                    <MessageSquare size={16} className="absolute left-4 top-4 text-zinc-300" />
                    <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="How was the court? The equipment? The staff?"
                        className="w-full bg-zinc-50 border border-black/5 rounded-2xl p-4 pl-12 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black/10 min-h-[120px] resize-none placeholder:text-zinc-300"
                    />
                </div>
             </div>

             {/* Attachments */}
             <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 block ml-1">Add Photos (Optional)</label>
                <div className="flex gap-2">
                    {attachments.map((at, idx) => (
                        <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-black/5">
                            <img src={at} className="w-full h-full object-cover" />
                            <button 
                                onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                            >
                                <X size={10} />
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={addMockAttachment}
                        className="w-16 h-16 rounded-xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-1 text-zinc-400 hover:border-black/20 hover:text-black transition-all"
                    >
                        <ImageIcon size={16} />
                        <span className="text-[8px] font-black uppercase tracking-tight">Add</span>
                    </button>
                </div>
             </div>
        </div>

        {/* Submit */}
        <button 
            onClick={handleReview}
            disabled={rating === 0 || isSubmitting}
            className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                rating > 0 ? 'accent-bg shadow-xl shadow-brand-neon/20' : 'bg-zinc-100 text-zinc-300'
            }`}
        >
            {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    Submit Review <Send size={14} />
                </>
            )}
        </button>
      </div>
    </div>
  );
}

function ProfileDetails({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full text-black">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black">Profile Details</h2>
      </header>

      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&q=80&w=200" 
            className="w-32 h-32 rounded-full border-4 border-brand-neon p-1" 
          />
          <button className="absolute bottom-0 right-0 p-2 bg-black text-brand-neon rounded-full ring-4 ring-white">
            <Camera size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <InputGroup label="Full Name" value="Alex Rivera" />
        <InputGroup label="Email Address" value="alex.rivera@example.com" />
        <InputGroup label="Phone Number" value="+63 912 345 6789" />
        <InputGroup label="Primary Sport" value="Pickleball" />
      </div>

      <button className="w-full accent-bg py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-neon/20 mt-10">
        Save Changes
      </button>
    </div>
  );
}

function BadgesView({ onBack }: { onBack: () => void }) {
  const badges = [
    { title: 'Early Bird', desc: 'Booked 5 mornings', icon: <Star />, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Iron Lung', desc: '3 hour match streak', icon: <Activity />, color: 'bg-red-100 text-red-600' },
    { title: 'Elite Member', desc: '#1 Rank in QC', icon: <Trophy />, color: 'bg-purple-100 text-purple-600' },
    { title: 'Social Star', desc: '10 match joins', icon: <Star />, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full text-black">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-black">Your Badges</h2>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, i) => (
          <div key={i} className="sport-card p-6 flex flex-col items-center text-center bg-zinc-50 border-black/5 h-48 justify-center">
            <div className={`p-4 rounded-full mb-4 ${badge.color}`}>
              {React.cloneElement(badge.icon as React.ReactElement, { size: 32 })}
            </div>
            <h4 className="text-xs font-black uppercase text-black mb-1">{badge.title}</h4>
            <p className="text-[10px] text-zinc-500 italic">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputGroup({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block ml-1">{label}</label>
      <input 
        type="text" 
        defaultValue={value}
        className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-sm font-black text-black focus:outline-none focus:ring-1 focus:ring-black/10"
      />
    </div>
  );
}

function MenuSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-3 ml-1">{title}</h3>
      <div className="sport-card bg-white divide-y divide-black/5 shadow-sm overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function MenuItem({ 
  icon, 
  label, 
  sublabel, 
  badge, 
  toggle,
  onClick
}: { 
  icon: React.ReactNode, 
  label: string, 
  sublabel?: string, 
  badge?: string,
  toggle?: boolean,
  onClick?: () => void
}) {
  return (
    <div 
        onClick={onClick}
        className="flex items-center justify-between p-4 bg-transparent hover:bg-zinc-50 transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        <div className="text-zinc-300 group-hover:text-black transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-tight text-black">{label}</p>
          {sublabel && <p className="text-[8px] text-zinc-400 italic">{sublabel}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="accent-bg text-[8px] font-black px-1.5 py-0.5 rounded-sm">
            {badge}
          </span>
        )}
        {toggle ? (
          <div className="w-8 h-4 bg-zinc-200 border border-black/5 rounded-full relative p-0.5 shadow-inner">
            <div className="w-2.5 h-3 bg-white rounded-full ml-auto shadow-sm" />
          </div>
        ) : (
          <ChevronRight size={14} className="text-zinc-400" />
        )}
      </div>
    </div>
  );
}
